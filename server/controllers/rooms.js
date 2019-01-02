"use strict";
import Rooms from "../models/rooms";
import DeviceTypes from "../models/deviceTypes";
import Devices from "../models/devices";
import Documents from "../models/patientsDocuments";

import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

const getRooms = async (req, res) => {
    try {
        let rooms = await Rooms.aggregate([
            {
                $match: {
                    status: "active"
                }
            },
            {
                $lookup: {
                    from: "Patients",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient"
                }
            },
            {
                $unwind: "$patient"
            },
            {
                $project: {
                    room: 1,
                    temperatureSensor: 1,
                    cardiacSensor: 1,
                    ecgDevice: 1,
                    block: 1,
                    "patient.name": 1,
                    "patient._id": 1
                }
            }
        ]);

        rooms = rooms.map(r => {
            r.patient = r.patient.name;

            return r;
        });

        if (rooms) {
            res.status(200).json({
                success: true,
                data: {
                    roomList: [...rooms]
                }
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Không tìm thấy"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const addRoom = async (req, res) => {
    try {
        const {
            room,
            block,
            patient,
            temperatureSensor,
            cardiacSensor,
            ecgDevice
        } = req.body;

        let newRoom = new Rooms({
            room,
            temperatureSensor: ObjectId(temperatureSensor),
            cardiacSensor: ObjectId(cardiacSensor),
            ecgDevice: ObjectId(ecgDevice),
            block,
            patient: ObjectId(patient)
        });

        let result = await newRoom.save();

        if (!result) {
            res.status(404).json({
                success: false,
                error: "Thêm thất bại"
            });
        } else {
            delete result.status;

            res.status(200).json({
                success: true,
                data: {
                    roomList: [result]
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getDevicesInfo = async (req, res) => {
    try {
        let categories = ["temperatureSensor", "ecgDevice", "cardiacSensor"];

        let docs = await DeviceTypes.aggregate([
            {
                $match: {
                    nameId: { $in: categories }
                }
            },
            {
                $lookup: {
                    from: "Devices",
                    localField: "_id",
                    foreignField: "category",
                    as: "devices"
                }
            }
        ]);

        let devicesDataForm = docs.reduce((result, doc) => {
            console.log(doc.nameId);

            result[doc.nameId] = { ...doc };

            return result;
        }, {});

        let patientsNa = await Rooms.find({ patient: { $ne: null } }).select({
            patient: 1
        });

        let patients = await Documents.find({
            trainingData: false,
            _id: { $nin: patientsNa }
        }).select({ _id: 1, name: 1 });

        if (!docs) {
            res.status(404).json({
                success: false,
                error: "Không tìm thấy"
            });
        } else {
            res.status(200).json({
                success: true,
                data: {
                    devicesDataForm: devicesDataForm,
                    patientsDataForm: patients
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const editRoom = async (req, res) => {
    try {
        console.log(req.body);

        const {
            roomId,
            room,
            block,
            patient,
            temperatureSensor,
            ecgDevice,
            cardiacSensor
        } = req.body;

        let result = await Rooms.updateOne(
            { _id: ObjectId(roomId) },
            {
                $set: {
                    patient: ObjectId(patient),
                    block,
                    room,
                    temperatureSensor: temperatureSensor
                        ? ObjectId(temperatureSensor)
                        : null,
                    cardiacSensor: cardiacSensor
                        ? ObjectId(cardiacSensor)
                        : null,
                    ecgDevice: ecgDevice ? ObjectId(ecgDevice) : null
                }
            }
        );

        if (!result) {
            res.status(404).json({
                success: false,
                error: "Lỗi xảy ra"
            });
        } else {
            res.status(200).json({
                success: false,
                data: {
                    updatedRoom: [...result]
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

export default {
    getRooms,
    addRoom,
    getDevicesInfo,
    editRoom
};
