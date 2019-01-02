import mongoose from "mongoose";
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

let DB_PATH = process.env.DB_PATH;

const connectDatabase = async () => {
    try {
        const result = await mongoose.connect(
            process.env.DB_PATH,
            { useNewUrlParser: true }
        );

        if (result) {
            return "success";
        } else {
            return "error";
        }
    } catch (error) {
        return "error";
    }
};

export default connectDatabase;
