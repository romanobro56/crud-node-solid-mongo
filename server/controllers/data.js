import Data from "../models/data.js";


export const create = async (req, res) => {
    try{
        const {
            value,
            key
        } = req.body;
        const newData = new Data({
            value,
            key
        });
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const read = async (req, res) => {
    try{
        const { key } = req.params;
        const data = await Data.find({ key });
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
export const update = async (req, res) => {
    try{
        const {
            value,
            key
        } = req.body;
        console.log(value);
        console.log(key);
        const data = await Data.findOneAndUpdate({key}, {value});
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export const remove = async (req, res) => {
    try{
        const { key } = req.params;
        const data = await Data.findOneAndDelete({ key });
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}