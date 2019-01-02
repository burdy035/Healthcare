"use strict";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let patientDataSchema = new mongoose.Schema({
    patientId: { type: String },
    type: { type: String },
    data: { type: Array },
    date: { type: String },
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now }
});

let patientDataModel = mongoose.model("Data", patientDataSchema, "Data");

export default patientDataModel;
