"use strict";

import Rooms from "../models/rooms";
import Documents from "../models/patientsDocuments";

const getPatientsTrackingList = async (req, res) => {
    try {
        let docs = await Rooms.aggregate([
            {
                $match: {
                    patient: { $ne: null }
                }
            },
            {
                $lookup: {
                    from: "Patients",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient"
                }
            },
            {
                $unwind: "$patient"
            }
        ]);
        docs = docs.map(d => {
            let patient = d.patient;

            d.name = patient.name;
            d.age = patient.age;
            d.gender = patient.gender === "0" ? "Nam" : "Nữ";

            d.patient = patient._id;

            return d;
        });

        res.status(200).json({
            success: true,
            data: {
                patientsTrackingList: docs
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default {
    getPatientsTrackingList
};
