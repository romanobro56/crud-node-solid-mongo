import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import dataRoutes from "./routes/data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(cors());

app.use("/data", dataRoutes);

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log("listening on " + PORT));
}).catch((error) => console.log(`${error} did not connect`));