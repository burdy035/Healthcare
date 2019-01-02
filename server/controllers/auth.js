"use strict";

import bcrypt from "bcryptjs";
import mongoose, { Types } from "mongoose";

import jwt from "jsonwebtoken";

import User from "../models/users";

const ObjectId = Types.ObjectId;

let salt = bcrypt.genSaltSync(10);

const login = async (req, res, next) => {
    let { username, password } = req.body;

    if (!username || !password) {
        res.json({
            status: "error",
            errorCode: "invalid-username-or-password",
            error: "Invalid username or password!"
        });
    }
    let user = await User.aggregate([
        {
            $match: {
                username
            }
        },
        {
            $lookup: {
                from: "Settings",
                localField: "role",
                foreignField: "role",
                as: "role"
            }
        },
        {
            $lookup: {
                from: "Settings",
                localField: "major",
                foreignField: "_id",
                as: "major"
            }
        },
        {
            $unwind: "$role"
        },
        {
            $unwind: "$major"
        }
    ]);

    if (!user) {
        res.json({
            status: "error",
            errorCode: "user-not-found",
            error: "User not found!"
        });
    } else {
        user = user[0];

        let matchingPassword = bcrypt.compareSync(password, user.password);

        if (!matchingPassword) {
            res.json({
                status: "error",
                errorCode: "password-not-match",
                error: "Invalid password!"
            });
        } else {
            let token = jwt.sign(
                {
                    data: user._id
                },
                "secret",
                { expiresIn: "5d" }
            );

            res.json({
                status: "success",
                data: {
                    user: {
                        email: user.email,
                        role: user.role,
                        username: user.username,
                        name: user.name,
                        age: user.age,
                        birthday: user.birthday,
                        _id: user._id,
                        gender: user.gender,
                        major: user.major,
                        token
                    }
                }
            });
        }
    }
};

const checkUserAuthentication = async (req, res) => {
    try {
        let { userId, userToken } = req.body;

        let user = await User.findOne({ _id: ObjectId(userId) });

        let decoded = jwt.verify(userToken, "secret");

        if (decoded && user._id == decoded.data) {
            res.status(200).json({
                success: true,
                data: {
                    user: {
                        email: user.email,
                        role: user.role,
                        username: user.username,
                        age: user.age,
                        name: user.name,
                        birthday: user.birthday,
                        _id: user._id,
                        gender: user.gender
                    }
                }
            });
        } else {
            res.json({
                success: false,
                error: "Please login"
            });
        }
    } catch (error) {
        res.json({
            success: false,
            error: "Please login"
        });
    }
};

export default {
    login,
    checkUserAuthentication
};
