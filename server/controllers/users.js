"use strict";
import Users from "../models/users";

import Duties from "../models/duties";

import Documents from "../models/patientsDocuments";

import Settings from "../models/settings";

import moment from "moment";

import bcrypt from "bcryptjs";

import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

let salt = bcrypt.genSaltSync(10);

const addUser = async (req, res) => {
    try {
        const {
            name,
            birthday,
            gender,
            role,
            username,
            major,
            password,
            cpassword
        } = req.body;

        if (password !== cpassword) {
            res.status(404).json({
                success: false,
                error: "Password must be match!"
            });
        } else {
            let hashPassword = bcrypt.hashSync(password, salt);

            let age =
                new Date().getFullYear() - new Date(birthday).getFullYear();

            let newUser = new Users({
                name,
                birthday,
                gender,
                role,
                username,
                major: ObjectId(major),
                age,
                password: hashPassword
            });

            let result = await newUser.save();

            if (!result) {
                res.status(404).json({
                    success: false,
                    error: "Khong tim thay"
                });
            } else {
                let addedUser = await Users.aggregate([
                    {
                        $match: {
                            _id: ObjectId(result._id),
                            status: "active"
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
                    },
                    {
                        $project: {
                            password: 0,
                            status: 0
                        }
                    }
                ]);

                if (addUser && addedUser[0]) {
                    addedUser = addedUser[0];

                    addedUser.gender = addedUser.gender === "1" ? "Nam" : "Nữ";
                    addedUser.birthday = moment(addedUser.birthday).format(
                        "DD/MM/YYYY"
                    );

                    res.status(200).json({
                        success: true,
                        data: {
                            addedUser: addedUser
                        }
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        error: "Network error!"
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Khong tim thay"
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const { userId } = req.query;

        let user = await Users.aggregate([
            {
                $match: {
                    _id: ObjectId(userId)
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
                $unwind: "$major"
            }
        ]);

        if (user && user[0]) {
            user = user[0];

            if (user.role !== "admin" && user.role !== "manager") {
                res.status(200).json({
                    success: false,
                    error: "Khong co quyen truy cap"
                });
            } else {
                let docs;

                if (user.role === "admin") {
                    docs = await queryUsers("all");
                } else if (user.role === "manager") {
                    docs = await queryUsers(user.major._id);
                }

                let major = await Settings.find({
                    type: "major",
                    status: "active"
                }).select({
                    status: 0
                });

                if (!docs) {
                    res.status(404).json({
                        success: false,
                        error: "Khong tim thay"
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        data: {
                            userList: docs,
                            majors: major
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Khong tim thay"
        });
    }
};

const queryUsers = async major => {
    try {
        let docs;

        if (major === "all") {
            docs = await Users.aggregate([
                {
                    $match: {
                        role: { $ne: "admin" },
                        status: "active"
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
                },
                {
                    $project: {
                        password: 0,
                        status: 0
                    }
                }
            ]);
        } else {
            docs = await Users.aggregate([
                {
                    $match: {
                        role: { $ne: "admin" },
                        major: ObjectId(major),
                        status: "active"
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
                },
                {
                    $project: {
                        password: 0,
                        status: 0
                    }
                }
            ]);
        }

        docs = docs.map(d => {
            d.gender = d.gender === "1" ? "Nam" : "Nữ";
            d.birthday = moment(d.birthday).format("DD/MM/YYYY");

            return d;
        });

        return docs;
    } catch (error) {
        throw error;
    }
};

const getUserDetail = async (req, res) => {
    try {
        let { userId } = req.query;

        let docs = await Users.aggregate([
            {
                $match: {
                    _id: ObjectId(userId)
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
                $unwind: "$role"
            },
            {
                $project: {
                    status: 0,
                    __v: 0,
                    password: 0
                }
            }
        ]);

        let currentMonth = parseInt(moment().format("MM"));

        let duties = await Duties.aggregate([
            {
                $project: {
                    month: { $month: "$start" },
                    day: { $dayOfMonth: "$start" },
                    time: 1,
                    user: 1,
                    start: 1,
                    end: 1,
                    title: 1
                }
            },
            {
                $match: {
                    user: ObjectId(userId),
                    month: currentMonth
                }
            }
        ]);

        let userDuties = duties.reduce((result, duty) => {
            let start = moment(duty.start).format("hh:mm");
            let end = moment(duty.end).format("hh:mm");

            result[`${duty.day}`] = {
                title: duty.title,
                time: `${start} - ${end}`
            };

            return result;
        }, {});

        let followingPatients = await Documents.aggregate([
            {
                $match: {
                    $or: [
                        { doctor: ObjectId(userId) },
                        { nurse: ObjectId(userId) }
                    ]
                }
            },
            {
                $lookup: {
                    from: "Rooms",
                    localField: "_id",
                    foreignField: "patient",
                    as: "room"
                }
            },
            { $unwind: "$room" },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    room: 1,
                    age: 1,
                    gender: 1
                }
            }
        ]);

        followingPatients = followingPatients.map(fp => {
            return fp;
        });

        if (!docs || docs.length < 1) {
            res.status(404).json({
                success: false,
                error: "User khong tim thay"
            });
        } else {
            let userDetail = docs[0];

            userDetail.role = userDetail.role.label;

            userDetail.birthday = moment(userDetail.birthday).format(
                "MM/DD/YYYY"
            );

            res.status(200).json({
                success: true,
                data: {
                    userDetail,
                    userDuties,
                    followingPatients
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Something went wrong!"
        });
    }
};

const changePassword = async (req, res) => {
    try {
        let { userId, password, cpassword, oldPassword } = req.body;

        if (password !== cpassword) {
            res.status(404).json({
                success: false,
                error: "Password must match!"
            });
        } else {
            let user = await Users.findOne({ _id: ObjectId(userId) });

            if (!user) {
                res.status(200).json({
                    success: false,
                    error: "Khong tim thay"
                });
            } else {
                let hashPassword = bcrypt.hashSync(oldPassword, salt);

                let compare = bcrypt.compareSync(oldPassword, user.password);

                if (!compare) {
                    res.status(200).json({
                        success: false,
                        error: "Mat khau cu khong dung"
                    });
                } else {
                    let newPassword = bcrypt.hashSync(password, salt);

                    user.password = newPassword;

                    let result = await user.save();

                    if (result) {
                        res.status(200).json({
                            success: true,
                            data: {}
                        });
                    } else {
                        res.status(200).json({
                            success: false,
                            error: "Co loi xay ra"
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            error: "Something went wrong!"
        });
    }
};

const deleteUsers = async (req, res) => {
    try {
        let { userId, userIds } = req.body;

        console.log(userIds);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            error: "Something went wrong!"
        });
    }
};

export default {
    addUser,
    getUsers,
    getUserDetail,
    changePassword,
    deleteUsers
};
