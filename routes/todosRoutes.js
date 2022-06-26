import express from "express";
const router = express.Router();
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todosController.js";
router.route("/").post(createTodo).get(getAllTodos);

router.route("/:id").delete(deleteTodo).patch(updateTodo);

export default router;
