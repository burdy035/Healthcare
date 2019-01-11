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
                    status: "active",
                    patient: {
                        $ne: null
                    }
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
                    block: 1,
                    "patient.name": 1,
                    "patient._id": 1
                }
            }
        ]);
        console.log(rooms);
        let rooms2 = await Rooms.find({
            status: "active",
            patient: {
                $eq: null
            }
        });

        rooms = rooms.map(r => {
            r.patient = { _id: r.patient._id, label: r.patient.name };

            return r;
        });

        rooms = rooms.concat(rooms2);

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
        console.log(error);
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
            cardiacSensor
        } = req.body;

        let isExistTemp;
        let isExistCardiac;
        let isPatient;
        if (temperatureSensor) {
            isExistTemp = await Rooms.find({
                temperatureSensor: ObjectId(temperatureSensor)
            });
        }

        if (cardiacSensor) {
            isExistCardiac = await Rooms.find({
                cardiacSensor: ObjectId(cardiacSensor)
            });
        }

        if (patient) {
            isPatient = await Rooms.find({
                patient: ObjectId(patient)
            });
        }

        if (isExistTemp && isExistTemp.length) {
            res.json({
                success: false,
                error: "Thiết bị đã được sử dụng"
            });
        } else if (isExistCardiac && isExistCardiac.length) {
            res.json({
                success: false,
                error: "Thiết bị đã được sử dụng"
            });
        } else if (isPatient && isPatient.length) {
            res.json({
                success: false,
                error: "Bệnh nhân đã ở phòng khác"
            });
        } else {
            let newRoom = new Rooms({
                room,
                temperatureSensor: temperatureSensor
                    ? ObjectId(temperatureSensor)
                    : null,
                cardiacSensor: cardiacSensor ? ObjectId(cardiacSensor) : null,
                block,
                patient: patient ? ObjectId(patient) : null
            });

            let result = await newRoom.save();

            console.log(result);

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
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getDevicesInfo = async (req, res) => {
    try {
        let categories = ["temperatureSensor", "cardiacSensor"];

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
        const {
            roomId,
            room,
            block,
            patient,
            temperatureSensor,
            cardiacSensor
        } = req.body;

        let isExistTemp;
        let isExistCardiac;
        let isPatient;
        if (temperatureSensor) {
            isExistTemp = await Rooms.findOne({
                temperatureSensor: ObjectId(temperatureSensor)
            });

            if (isExistTemp && `${isExistTemp._id}` === `${roomId}`) {
                isExistTemp = null;
            }
        }

        if (cardiacSensor) {
            isExistCardiac = await Rooms.findOne({
                cardiacSensor: ObjectId(cardiacSensor)
            });

            if (isExistCardiac && `${isExistCardiac._id}` === `${roomId}`) {
                isExistCardiac = null;
            }
        }

        if (patient) {
            isPatient = await Rooms.findOne({
                patient: ObjectId(patient)
            });

            if (isPatient && `${isPatient._id}` === `${roomId}`) {
                isPatient = null;
            }
        }
        console.log(isExistTemp, isExistCardiac, isPatient);
        if (isExistTemp) {
            res.json({
                success: false,
                error: "Thiết bị đã được sử dụng"
            });
        } else if (isExistCardiac) {
            res.json({
                success: false,
                error: "Thiết bị đã được sử dụng"
            });
        } else if (isPatient) {
            res.json({
                success: false,
                error: "Bệnh nhân đã ở phòng khác"
            });
        } else {
            let result = await Rooms.updateOne(
                { _id: ObjectId(roomId) },
                {
                    $set: {
                        patient: patient ? ObjectId(patient) : null,
                        block,
                        room,
                        temperatureSensor: temperatureSensor
                            ? ObjectId(temperatureSensor)
                            : null,
                        cardiacSensor: cardiacSensor
                            ? ObjectId(cardiacSensor)
                            : null
                    }
                }
            );

            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Lỗi xảy ra"
                });
            } else {
                let rooms = await queryRooms();

                res.status(200).json({
                    success: false,
                    data: {
                        roomList: [...rooms]
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

const queryRooms = async () => {
    try {
        let rooms = await Rooms.aggregate([
            {
                $match: {
                    status: "active",
                    patient: {
                        $ne: null
                    }
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
                    block: 1,
                    "patient.name": 1,
                    "patient._id": 1
                }
            }
        ]);

        let rooms2 = await Rooms.find({
            status: "active",
            patient: {
                $eq: null
            }
        });

        rooms = rooms.map(r => {
            r.patient = r.patient.name;

            return r;
        });

        rooms = rooms.concat(rooms2);

        return rooms;
    } catch (error) {
        throw error;
    }
};

export default {
    getRooms,
    addRoom,
    getDevicesInfo,
    editRoom
};
