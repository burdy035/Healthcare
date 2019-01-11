"use strict";

import DeviceState from "../models/deviceState";
import Settings from "../models/settings";

import { Types } from "mongoose";

import { changeAlias } from "../services/ultils";

const ObjectId = Types.ObjectId;

const addDeviceState = async (req, res) => {
    try {
        const { label } = req.body;

        console.log(label);

        let State = new DeviceState({
            label,
            status: "active"
        });

        let result = await State.save();

        if (!result) {
            res.status(404).json({ error: "Thêm thất bại", success: false });
        } else {
            delete result.status;

            res.status(200).json({
                success: false,
                data: {
                    deviceStateData: [result]
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

const getSettingData = async (req, res) => {
    try {
        let deviceStates = await Settings.find({ type: "deviceState" }).select({
            status: 0
        });

        let patientStates = await Settings.find({
            type: "patientState"
        }).select({
            status: 0
        });

        let userRoles = await Settings.find({ type: "userRoles" }).select({
            status: 0
        });

        let major = await Settings.find({
            type: "major",
            status: "active"
        }).select({
            status: 0
        });

        if (!deviceStates) {
            res.status(404).json({
                error: "Something went wrong!",
                success: false
            });
        } else {
            res.status(200).json({
                success: true,
                data: {
                    deviceStateData: deviceStates,
                    patientStateData: patientStates,
                    userRolesData: userRoles,
                    majorData: major
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

const addSettingData = async (req, res) => {
    try {
        const { label, type } = req.body;

        let value = changeAlias(label);

        let Setting = new Settings({
            label,
            type,
            value,
            status: "active"
        });

        let result = await Setting.save();

        if (!result) {
            res.status(404).json({ error: "Thêm thất bại", success: false });
        } else {
            delete result.status;

            res.status(200).json({
                success: false,
                data: {
                    [`${type}Data`]: [result]
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

const deleteSetting = async (req, res) => {
    try {
        const { settingId } = req.body;

        let isExist = await Settings.aggregate([
            {
                $match: {
                    _id: { $eq: ObjectId(settingId) }
                }
            },
            {
                $lookup: {
                    from: "Patients",
                    localField: "_id",
                    foreignField: "major",
                    as: "patient"
                }
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "_id",
                    foreignField: "major",
                    as: "user"
                }
            },
            {
                $unwind: "$patient"
            },
            {
                $unwind: "$user"
            }
        ]);

        if (isExist.length > 0) {
            res.json({
                success: false,
                error: "Không thể xoá"
            });
        } else {
            let result = await Settings.updateOne(
                {
                    _id: ObjectId(settingId)
                },
                {
                    $set: {
                        status: "delete"
                    }
                }
            );

            let settingsData = await querySettingData();

            if (result) {
                res.json({
                    success: true,
                    data: {
                        ...settingsData
                    }
                });
            } else {
                res.json({
                    success: false,
                    error: "Co lỗi xảy ra"
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, success: false });
    }
};

const querySettingData = async () => {
    try {
        let deviceStates = await Settings.find({ type: "deviceState" }).select({
            status: 0
        });

        let patientStates = await Settings.find({
            type: "patientState"
        }).select({
            status: 0
        });

        let userRoles = await Settings.find({ type: "userRoles" }).select({
            status: 0
        });

        let major = await Settings.find({
            type: "major",
            status: "active"
        }).select({
            status: 0
        });

        return {
            deviceStateData: deviceStates,
            patientStateData: patientStates,
            userRolesData: userRoles,
            majorData: major
        };
    } catch (error) {
        throw error;
    }
};

export default {
    addDeviceState,
    getSettingData,
    addSettingData,
    deleteSetting
};
