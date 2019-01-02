"use strict";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const devicesType = new Schema({ device: Schema.Types.ObjectId });

let RoomSchema = new mongoose.Schema({
    room: String,
    block: String,
    temperatureSensor: Schema.Types.ObjectId,
    cardiacSensor: Schema.Types.ObjectId,
    ecgDevice: Schema.Types.ObjectId,
    patient: Schema.Types.ObjectId,
    status: { type: String, default: "active" },
    created: { type: Date, default: Date.now }
});

let RoomModel = mongoose.model("Room", RoomSchema, "Rooms");

export default RoomModel;
