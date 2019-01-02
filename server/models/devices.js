"use strict";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let DeviceSchema = new mongoose.Schema({
    category: Schema.Types.ObjectId,
    label: String,
    state: Schema.Types.ObjectId,
    port: String,
    manufacturingDate: Date,
    expiryDate: Date,
    status: String,
    createdAt: { type: Date, default: Date.now }
});

let DeviceModel = mongoose.model("Device", DeviceSchema, "Devices");

export default DeviceModel;
