import Users from "../models/users";
import Duties from "../models/duties";

import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

const getAllUsers = async (req, res) => {
    try {
        let { userReq } = req;

        let users = [];

        if (userReq.role === "admin" || userReq.role === "manager") {
            if (userReq.role === "admin") {
                users = await Users.find({
                    role: { $ne: "admin" },
                    status: "active"
                }).select({
                    _id: 1,
                    name: 1
                });
            } else if (userReq.role === "manager") {
                users = await Users.find({
                    role: { $ne: "admin" },
                    major: ObjectId(userReq.major),
                    status: "active"
                }).select({
                    _id: 1,
                    name: 1
                });
            }

            if (!users) {
                res.status(200).json({
                    success: false,
                    error: "Not Found!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: {
                        users
                    }
                });
            }
        } else {
            res.status(200).json({
                success: false,
                error: "Permission denied!"
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

const addDuty = async (req, res) => {
    try {
        let { userDutyId, start, end, note } = req.body;

        let newDuty = new Duties({
            user: userDutyId,
            start,
            end,
            note
        });

        let result = await newDuty.save();

        if (!result) {
            res.status(404).json({
                success: false,
                error: "Not found!"
            });
        } else {
            let docs = await Duties.aggregate([
                {
                    $match: {
                        _id: ObjectId(result._id),
                        status: "active"
                    }
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $project: {
                        start: 1,
                        end: 1,
                        note: 1,
                        "user.name": 1,
                        "user._id": 1
                    }
                }
            ]);

            let newDuty = docs[0];

            if (newDuty) {
                newDuty.title = `${newDuty.user.name}-${
                    newDuty.note ? newDuty.note : ""
                }`;

                res.status(200).json({
                    success: true,
                    data: {
                        newDuty: newDuty
                    }
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: "Co loi"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Something went wrong!"
        });
    }
};

const getDutiesOfWeek = async (req, res) => {
    try {
        const { startDay, endDay } = req.body;

        let { userReq } = req;

        if (userReq.role === "admin" || userReq.role === "manager") {
            let duties = await getDuties(startDay, endDay, userReq);

            if (!duties) {
                res.status(404).json({
                    success: false,
                    error: "Not found!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: {
                        duties
                    }
                });
            }
        } else {
            res.status(200).json({
                success: false,
                error: "Permission denied!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Something!!"
        });
    }
};

const deleteDuty = async (req, res) => {
    try {
        const { dutyId, startDay, endDay } = req.body;

        let result = await Duties.updateOne(
            {
                _id: ObjectId(dutyId)
            },
            {
                $set: {
                    status: "delete"
                }
            }
        );

        if (!result) {
            res.status(404).json({
                success: false,
                error: "Not found!"
            });
        } else {
            let duties = await getDuties(startDay, endDay);

            if (!duties) {
                res.status(404).json({
                    success: false,
                    error: "Not found!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: {
                        duties
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Something!!"
        });
    }
};

const editDuty = async (req, res) => {
    try {
        const { dutyId, title, userDutyId, startDay, endDay } = req.body;

        let result = await Duties.updateOne(
            {
                _id: ObjectId(dutyId)
            },
            {
                $set: {
                    title,
                    user: ObjectId(userDutyId)
                }
            }
        );

        if (!result) {
            res.status(404).json({
                success: false,
                error: "Not found!"
            });
        } else {
            let duties = await getDuties(startDay, endDay);

            if (!duties) {
                res.status(404).json({
                    success: false,
                    error: "Not found!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: {
                        duties
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Something!!"
        });
    }
};

const getDuties = async (startDay, endDay, userReq) => {
    try {
        let docs = [];

        if (userReq.role === "admin") {
            docs = await Duties.aggregate([
                {
                    $match: {
                        start: {
                            $gte: new Date(startDay),
                            $lt: new Date(endDay)
                        },
                        status: "active"
                    }
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                }
            ]);
        } else if (userReq.role === "manager") {
            docs = await Duties.aggregate([
                {
                    $match: {
                        start: {
                            $gte: new Date(startDay),
                            $lt: new Date(endDay)
                        },
                        status: "active"
                    }
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $match: {
                        "user.major": {
                            $eq: ObjectId(userReq.major)
                        }
                    }
                }
            ]);
        }

        let duties = docs.map(d => {
            d.title = `${d.user.name}-${d.note ? d.note : ""}`;

            return d;
        });

        return duties;
    } catch (error) {
        throw error;
    }
};

export default {
    getAllUsers,
    addDuty,
    getDutiesOfWeek,
    deleteDuty,
    editDuty
};
