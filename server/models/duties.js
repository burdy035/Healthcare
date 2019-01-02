"use strict";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let DutySchema = new mongoose.Schema({
    start: Date,
    end: Date,
    user: Schema.Types.ObjectId,
    note: String,
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now }
});

let DutyModel = mongoose.model("Duty", DutySchema, "Duties");

export default DutyModel;
