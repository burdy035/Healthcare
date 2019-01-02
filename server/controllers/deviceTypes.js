"use strict";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import DeviceType from "../models/deviceTypes";

import _ from "lodash";

let salt = bcrypt.genSaltSync(10);

const changeAlias = alias => {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " "
    );
    str = str.replace(/ + /g, " ");
    str = str.replace(/\ /g, "-");
    str = str.trim();
    return str;
};

const addDeviceType = async (req, res) => {
    const { name, manufacturingDate, expiryDate, brand } = req.body;

    try {
        let nameId = changeAlias(name);

        let type = new DeviceType({
            name,
            nameId,
            manufacturingDate,
            expiryDate,
            brand,
            status: "active"
        });

        let result = await type.save();

        delete result.status;

        res.status(200).json({
            success: true,
            data: {
                deviceTypes: [result]
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getDeviceTypes = async (req, res) => {
    try {
        let types = await DeviceType.find({ status: "active" });

        if (types) {
            res.status(200).json({ success: true, data: types });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

const deleteDeviceType = async (req, res) => {
    try {
        let { typeIds } = req.body;

        if (_.isArray(typeIds)) {
            let result = await DeviceType.updateMany(
                { _id: { $in: [...typeIds] } },
                { $set: { status: "deteled" } }
            );

            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Documents not found"
                });
            } else {
                let types = await DeviceType.find(
                    { status: "active" },
                    { status: 0 }
                );

                if (!types) {
                    res.status(404).json({
                        success: false,
                        error: "Something went wrong!"
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Delete success",
                    data: {
                        deviceTypeList: types
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

export default {
    addDeviceType,
    getDeviceTypes,
    deleteDeviceType
};
