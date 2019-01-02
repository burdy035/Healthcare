import jwt from "jsonwebtoken";

import Users from "../models/users";

import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

const checkToken = async (req, res, next) => {
    try {
        let token = req.headers["x-token"];

        let userId = req.headers["user-id"];

        let user = await Users.findOne({ _id: ObjectId(userId) });

        let decoded = jwt.verify(token, "secret");

        if (user && decoded.data == user._id) {
            next();
        } else {
            res.json({
                success: false,
                error: "Please login",
                errorCode: "invalidToken"
            });
        }
    } catch (error) {
        res.json({
            success: false,
            error: "Please login",
            errorCode: "invalidToken"
        });
    }
};

export default checkToken;
