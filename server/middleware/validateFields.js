import Users from "../models/users";

import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

const validate = (method, fields) => {
    return async (req, res, next) => {
        try {
            let missingField = [];

            fields.map((k, i) => {
                let field = req[`${method === "post" ? "body" : "query"}`][k];
                if (!field) {
                    missingField.push(k);
                }
            });

            if (missingField.length > 0) {
                res.json({
                    succces: false,
                    error: "Missing field!"
                });
            } else {
                let { id } = method === "post" ? req.body : req.query;

                let userReq = await Users.findOne({
                    _id: id
                }).select({
                    _id: 1,
                    role: 1,
                    major: 1
                });

                if (!userReq) {
                    res.json({
                        succces: false,
                        error: "Permission denied!"
                    });
                } else {
                    req.userReq = userReq;

                    next();
                }
            }
        } catch (error) {
            res.json({
                succces: false,
                error: "Missing field!"
            });
        }
    };
};

export default validate;
