"use strict";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
let predict = new mongoose.Schema({
    type: { type: String, unique: true },
    model: { type: Schema.Types.Mixed },
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now }
});

let predictModel = mongoose.model("Predict", predict, "Models");

export default predictModel;
