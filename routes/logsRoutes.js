import express from "express";
const router = express.Router();
import {
  createLog,
  deleteLog,
  getAllLogs,
  updateLog,
} from "../controllers/logsController.js";
router.route("/").post(createLog).get(getAllLogs);

router.route("/:id").delete(deleteLog).patch(updateLog);

export default router;
