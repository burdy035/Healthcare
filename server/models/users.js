"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    name: String,
    gender: String,
    role: String,
    birthday: Date,
    age: Number,
    major: Schema.Types.ObjectId,
    token: String,
    password: String,
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: new Date() }
});

let UserModel = mongoose.model("User", UserSchema, "Users");

export default UserModel;
