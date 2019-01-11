"use strict";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let PatientSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    doctor: Schema.Types.ObjectId,
    nurse: Schema.Types.ObjectId,
    state: Schema.Types.ObjectId,
    major: Schema.Types.ObjectId,
    cp: String,
    trestbps: String,
    chol: String,
    fbs: String,
    restecg: String,
    thalach: String,
    exang: String,
    oldpeak: String,
    result: String,
    isHearDisease: Boolean,
    hearDiseaseRate: String,
    trainingData: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date },
    status: { type: String, default: "active" },
    update: Schema.Types.Mixed
});

let PatientModel = mongoose.model("Patient", PatientSchema, "Patients");

export default PatientModel;
