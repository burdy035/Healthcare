"use strict";

import svm from "node-svm";

import Documents from "../models/patientsDocuments";
import Users from "../models/users";
import Settings from "../models/settings";
import Rooms from "../models/rooms";
import Models from "../models/model";

import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

const getDocuments = async (req, res) => {
    try {
        let { userReq } = req;

        if (userReq) {
            let docs = await queryDocuments(userReq);

            let majors = [];

            if (userReq.role === "admin") {
                majors = await Settings.find({
                    type: "major"
                });
            } else {
                majors = await Settings.find({
                    type: "major",
                    _id: ObjectId(userReq.major)
                });
            }

            if (!docs) {
                res.status(404).json({
                    success: false,
                    error: "Khong tim thay"
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: {
                        documentsList: docs,
                        majors: majors
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const addDocument = async (req, res) => {
    try {
        let body = req.body;
        let { userReq } = req;

        const Document = new Documents({
            ...body,
            status: "active"
        });

        let result = await Document.save();

        if (!result) {
            res.status(404).json({
                success: false,
                error: "Không tìm thấy"
            });
        } else {
            if (userReq) {
                let docs = await queryDocuments(userReq);

                res.status(200).json({
                    success: true,
                    data: {
                        documentsList: docs
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getHeartDiseaseRate = async (req, res) => {
    try {
        const { patientId } = req.query;

        let doc = await Documents.findOne({ _id: ObjectId(patientId) });

        if (!doc) {
            res.status(404).json({
                success: false,
                error: "Khong tim thay"
            });
        } else {
            let keys = [
                "age",
                "gender",
                "cp",
                "trestbps",
                "chol",
                "fbs",
                "restecg",
                "thalach",
                "exang",
                "oldpeak"
            ];

            let input = keys.map(k => {
                return parseFloat(doc[k]);
            });

            let mRecord = await Models.findOne({ type: "heartDiseaseRate" });

            let clf = new svm.restore(JSON.parse(mRecord.model));

            let predict = clf.predictProbabilitiesSync(input);

            let predictResult = predict["1"];

            predictResult = `${predictResult * 100}`;
            predictResult = predictResult.substr(0, 5);
            res.status(200).json({
                success: true,
                data: {
                    heartDiseaseRate: `${predictResult} %`
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getDocumentsForm = async (req, res) => {
    try {
        let patientStates = await Settings.find({
            type: "patientState"
        }).select({
            _id: 1,
            label: 1
        });

        let doctors = await Users.find({ role: "doctor" }).select({
            name: 1,
            _id: 1
        });

        let nurses = await Users.find({ role: "nurse" }).select({
            name: 1,
            _id: 1
        });

        res.status(200).json({
            success: true,
            data: {
                patientStates,
                doctors,
                nurses
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const editDocument = async (req, res) => {
    try {
        let { userReq } = req;

        let {
            _id,
            name,
            age,
            gender,
            cp,
            trestbps,
            chol,
            fbs,
            restecg,
            thalach,
            exang,
            oldpeak,
            isHearDisease,
            state,
            doctor,
            nurse,
            room
        } = req.body;

        let update = {
            cp,
            trestbps,
            chol,
            fbs,
            restecg,
            thalach,
            exang,
            oldpeak
        };

        let doc = await Documents.updateOne(
            {
                _id: _id
            },
            {
                $set: {
                    name,
                    age,
                    gender,
                    isHearDisease,
                    state: ObjectId(state),
                    doctor: ObjectId(doctor),
                    nurse: ObjectId(nurse),
                    room:
                        !room || room !== "Chưa xác định"
                            ? ObjectId(room)
                            : null,
                    update
                }
            },
            {
                upsert: true
            }
        );

        if (!doc) {
            res.status(404).json({
                success: false,
                error: "Khong tim thay"
            });
        } else {
            let docs = await queryDocuments(userReq);

            res.status(200).json({
                success: true,
                data: {
                    documentsList: docs
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const deleteDocuments = async (req, res) => {
    try {
        let { documentIds } = req.body;
        let { userReq } = req;

        let isExist = await Rooms.aggregate([
            {
                $match: {
                    patient: {
                        $in: documentIds.map(d => {
                            return ObjectId(d);
                        })
                    }
                }
            }
        ]);

        if (isExist.length > 0) {
            res.json({
                success: false,
                error: "Không thể xoá"
            });
        } else {
            let doc = await Documents.updateOne(
                { _id: { $in: documentIds } },
                {
                    $set: {
                        status: "delete"
                    }
                }
            );
            if (!doc) {
                res.status(404).json({
                    success: false,
                    error: "Khong tim thay"
                });
            } else {
                let docs = await queryDocuments(userReq);

                res.status(200).json({
                    success: true,
                    data: {
                        documentsList: docs
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const queryDocuments = async userReq => {
    try {
        let docs = [];

        if (userReq.role === "admin") {
            docs = await Documents.aggregate([
                {
                    $match: { trainingData: false, status: "active" }
                },
                {
                    $lookup: {
                        from: "Rooms",
                        localField: "_id",
                        foreignField: "patient",
                        as: "room"
                    }
                },
                {
                    $lookup: {
                        from: "Settings",
                        localField: "state",
                        foreignField: "_id",
                        as: "state"
                    }
                },
                {
                    $lookup: {
                        from: "Settings",
                        localField: "major",
                        foreignField: "_id",
                        as: "major"
                    }
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "doctor",
                        foreignField: "_id",
                        as: "doctor"
                    }
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "nurse",
                        foreignField: "_id",
                        as: "nurse"
                    }
                },

                {
                    $unwind: "$state"
                },
                {
                    $unwind: "$major"
                },
                {
                    $unwind: "$nurse"
                },
                {
                    $unwind: "$doctor"
                },
                {
                    $project: {
                        __v: 0,
                        createdAt: 0,
                        trainingData: 0
                    }
                }
            ]);
        } else {
            docs = await Documents.aggregate([
                {
                    $match: {
                        trainingData: false,
                        major: { $eq: ObjectId(userReq.major) },
                        status: "active"
                    }
                },
                {
                    $lookup: {
                        from: "Rooms",
                        localField: "_id",
                        foreignField: "patient",
                        as: "room"
                    }
                },
                {
                    $lookup: {
                        from: "Settings",
                        localField: "state",
                        foreignField: "_id",
                        as: "state"
                    }
                },
                {
                    $lookup: {
                        from: "Settings",
                        localField: "major",
                        foreignField: "_id",
                        as: "major"
                    }
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "doctor",
                        foreignField: "_id",
                        as: "doctor"
                    }
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "nurse",
                        foreignField: "_id",
                        as: "nurse"
                    }
                },

                {
                    $unwind: "$state"
                },
                {
                    $unwind: "$major"
                },
                {
                    $unwind: "$nurse"
                },
                {
                    $unwind: "$doctor"
                },
                {
                    $project: {
                        __v: 0,
                        createdAt: 0,
                        trainingData: 0
                    }
                }
            ]);
        }

        docs = docs.map(doc => {
            let r = doc.room;

            let state = doc.state;
            doc.room = doc.room[0]
                ? {
                      _id: r[0]._id,
                      label: `${r[0].room} - Block ${r[0].block}`
                  }
                : "Chưa xác định";
            doc.state = {
                _id: state._id,
                label: state.label
            };
            if (doc.update) {
                let update = doc.update;

                Object.keys(update).map(k => {
                    if (doc[k]) {
                        return (doc[k] = update[k]);
                    }
                });
            }

            delete doc.update;

            return doc;
        });

        return docs;
    } catch (error) {
        throw error;
    }
};

export default {
    getDocuments,
    addDocument,
    getHeartDiseaseRate,
    getDocumentsForm,
    editDocument,
    deleteDocuments
};
