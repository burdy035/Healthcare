"use strict";
import mongoose from "mongoose";

let DeviceStateSchema = new mongoose.Schema({
    label: String,
    status: String,
    createdAt: { type: Date, default: Date.now }
});

let DeviceStateModel = mongoose.model(
    "DeviceState",
    DeviceStateSchema,
    "DeviceStates"
);

export default DeviceStateModel;
