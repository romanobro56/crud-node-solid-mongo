import express from "express";
import { create, read, update, remove } from "../controllers/data.js";

const router = express.Router();

router.post("/create", create);
router.get("/read/:key", read);
router.patch("/update", update);
router.delete("/remove/:key", remove);

export default router;