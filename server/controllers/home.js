import Duties from "../models/duties";

const getMonthDuties = async (req, res) => {
    try {
        const { month } = req.query;

        let duties = await Duties.aggregate([
            {
                $project: {
                    month: {
                        $month: "$start"
                    },
                    start: 1,
                    end: 1,
                    title: 1,
                    user: 1,
                    note: 1
                }
            },
            {
                $match: {
                    month: parseInt(month)
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

        let userDuties = duties.map(d => {
            d.title = `${d.user.name}-${d.note ? d.note : ""}`;

            return d;
        });

        if (!duties) {
            res.status(404).json({
                success: false,
                error: "Something went wrong"
            });
        } else {
            res.status(200).json({
                success: true,
                data: {
                    duties: userDuties
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
};

export default {
    getMonthDuties
};
