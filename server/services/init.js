import heartDiseaseRate from "./trainPredictHeartDiseaseModel";

import afPrediction from "./afPrepareData";

import heartRateDetection from "./detectHr";

import DeviceTypes from "../models/deviceTypes";

import Settings from "../models/settings";

import Users from "../models/users";

const init = async () => {
    try {
        let adminMajor = await Settings.findOneAndUpdate(
            {
                type: "major",
                value: "all"
            },
            {
                $set: {
                    type: "major",
                    value: "all",
                    label: "Tất cả",
                    status: "hidden"
                }
            },
            {
                upsert: true,
                new: true
            }
        );

        let admin = new Users({
            username: "admin",
            role: "admin",
            name: "Ta Dinh Nui",
            email: "admin",
            role: "admin",
            password:
                "$2a$10$39wXX3msBYNOco0aDH0QVeVWDsY6rSMwfGq6nDr8f2faVSj.j0S1i"
        });

        let initAdmin = await Users.findOneAndUpdate(
            {
                username: "admin",
                role: "admin"
            },
            {
                $set: {
                    username: "admin",
                    role: "admin",
                    name: "Ta Dinh Nui",
                    email: "admin",
                    role: "admin",
                    major: adminMajor._id,
                    password:
                        "$2a$10$39wXX3msBYNOco0aDH0QVeVWDsY6rSMwfGq6nDr8f2faVSj.j0S1i"
                }
            }
        );

        console.log(initAdmin);

        let types = [
            { nameId: "temperatureSensor", label: "Sensor đo nhiệt độ" },
            { nameId: "ecgDevice", label: "Sensor đo điện tim" },
            { nameId: "cardiacSensor", label: "Thiết bị đo nhịp tim" }
        ];

        let result = await DeviceTypes.bulkWrite(
            types.map(t => {
                return {
                    updateOne: {
                        filter: { nameId: t.nameId },
                        update: { $set: { label: t.label } },
                        upsert: true,
                        setDefaultsOnInsert: true
                    }
                };
            })
        );

        let userRoles = [
            {
                role: "admin",
                label: "Admin",
                value: "admin",
                type: "userRoles"
            },
            {
                role: "doctor",
                label: "Bác sĩ",
                value: "doctor",
                type: "userRoles"
            },
            {
                role: "nurse",
                label: "Y tá",
                value: "nurse",
                type: "userRoles"
            },
            {
                role: "manager",
                value: "manager",
                label: "Trưởng phòng",
                type: "userRoles"
            }
        ];

        let initRoleResult = await Settings.bulkWrite(
            userRoles.map(r => {
                return {
                    updateOne: {
                        filter: { role: r.role, type: r.type, value: r.value },
                        update: { $set: { ...r } },
                        upsert: true,
                        setDefaultsOnInsert: true
                    }
                };
            })
        );

        let majorsSetting = [
            {
                type: "major",
                value: "khoa-tim-mach",
                label: "Khoa tim mạch"
            }
        ];

        let initMajorResult = await Settings.bulkWrite(
            majorsSetting.map(m => {
                return {
                    updateOne: {
                        filter: { type: m.type, value: m.value },
                        update: { $set: { ...m } },
                        upsert: true,
                        setDefaultsOnInsert: true
                    }
                };
            })
        );

        if (!result || !initRoleResult || !initMajorResult) {
            console.log("Can not init default database");
        } else {
            await heartDiseaseRate();

            await afPrediction();

            await heartRateDetection();

            console.log("Init success");
        }
    } catch (error) {
        console.log(error);
    }
};

export default init;
