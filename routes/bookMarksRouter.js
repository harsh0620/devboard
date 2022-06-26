import express from "express";
const router = express.Router();
import {
  createBookMark,
  deleteBookMark,
  getAllBookMarks,
  updateBookMark,
} from "../controllers/bookMarkController.js";
router.route("/").post(createBookMark).get(getAllBookMarks);

router.route("/:id").delete(deleteBookMark).patch(updateBookMark);

export default router;
