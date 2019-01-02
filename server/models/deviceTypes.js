"use strict";
import mongoose from "mongoose";

let DeviceTypes = new mongoose.Schema({
    label: String,
    nameId: { type: String, unique: true },
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now }
});

let DeviceTypesModel = mongoose.model("DeviceType", DeviceTypes, "DeviceTypes");

export default DeviceTypesModel;
