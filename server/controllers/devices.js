"use strict";

import bcrypt from "bcryptjs";
import Devices from "../models/devices";
import DeviceTypes from "../models/deviceTypes";
import DeviceStates from "../models/deviceState";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

let salt = bcrypt.genSaltSync(10);

const addDevice = async (req, res) => {
    const {
        category,
        label,
        state,
        port,
        manufacturingDate,
        expiryDate
    } = req.body;

    try {
        let device = new Devices({
            category: ObjectId(category),
            label,
            state: ObjectId(state),
            port,
            manufacturingDate,
            expiryDate,
            status: "active"
        });

        let result = await device.save();

        if (!result) {
            res.status(404).json({ success: false, error: "Can not create!" });
        } else {
            let docs = await queryDevices();

            if (!docs && docs[0]) {
                res.status(404).json({
                    success: false,
                    error: "Something went wrong!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: {
                        devicesList: docs
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Something went wrong!!"
        });
    }
};

const getDevices = async (req, res) => {
    try {
        let docs = await queryDevices();

        if (docs) {
            res.status(200).json({
                success: true,
                data: {
                    devicesList: docs
                }
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Something went wrong!!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong!!"
        });
    }
};

const getAddDeviceDataForm = async (req, res) => {
    try {
        let category = await DeviceTypes.find({ status: "active" }).select({
            _id: 1,
            label: 1
        });

        let states = await DeviceStates.find({ status: "active" }).select({
            _id: 1,
            label: 1
        });

        if (!category) {
            res.status(404).json({ success: false, error: "Not found!" });
        } else {
            let data = {
                category,
                state: states
            };

            res.status(200).json({ success: true, data: data });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteDevices = async (req, res) => {
    try {
        let { deviceIds } = req.body;

        console.log(deviceIds);

        deviceIds = deviceIds.map(d => {
            return ObjectId(d);
        });

        let result = await Devices.updateMany(
            {
                _id: { $in: deviceIds }
            },
            {
                $set: {
                    status: "delete"
                }
            }
        );
        console.log(result);
        if (!result) {
            res.json({ success: false, error: "Khong tim thay" });
        } else {
            let devices = await queryDevices();

            res.json({
                success: true,
                data: {
                    devicesList: devices
                }
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const queryDevices = async () => {
    try {
        let docs = await Devices.aggregate([
            {
                $match: {
                    status: "active"
                }
            },
            {
                $lookup: {
                    from: "DeviceTypes",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: "DeviceStates",
                    localField: "state",
                    foreignField: "_id",
                    as: "state"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $unwind: "$state"
            },
            {
                $project: {
                    status: 0,
                    __v: 0,
                    "category.status": 0,
                    "category.createdAt": 0,
                    "category.__v": 0,
                    "category.nameId": 0,
                    "state.nameId": 0,
                    "state.status": 0,
                    "state.createdAt": 0,
                    "state.__v": 0
                }
            }
        ]);

        if (docs) {
            console.log(docs);

            return docs;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const editDevice = async (req, res) => {
    try {
        let {
            deviceId,
            port,
            label,
            state,
            category,
            manufacturingDate,
            expiryDate
        } = req.body;

        let result = await Devices.updateMany(
            {
                _id: ObjectId(deviceId)
            },
            {
                $set: {
                    port,
                    label,
                    state,
                    category,
                    manufacturingDate,
                    expiryDate
                }
            }
        );
        if (!result) {
            res.json({ success: false, error: "Khong tim thay" });
        } else {
            let devices = await queryDevices();

            res.json({
                success: true,
                data: {
                    devicesList: devices
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export default {
    addDevice,
    getDevices,
    getAddDeviceDataForm,
    deleteDevices,
    editDevice
};
