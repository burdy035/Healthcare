"use strict";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
let SettingSchema = new mongoose.Schema({
    label: String,
    type: String,
    value: String,
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now }
});

let SettingsModel = mongoose.model("Setting", SettingSchema, "Settings");

export default SettingsModel;
