"use strict";

import DeviceState from "../models/deviceState";
import Settings from "../models/settings";

import { changeAlias } from "../services/ultils";

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

export default {
    addDeviceState,
    getSettingData,
    addSettingData
};
