import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
    {
        value: {
            type: String,
            required: true,
            min: 1,
            max: 100
        },
        key: {
            type: String,
            required: true,
            min: 1,
            max: 100
        }
    }
);

const Data = mongoose.model("Data", DataSchema);
export default Data;