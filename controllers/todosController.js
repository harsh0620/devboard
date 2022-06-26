import Todo from "../models/Todo.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
const createTodo = async (req, res) => {
  const { contentTodo } = req.body;
  if (!contentTodo) {
    throw new BadRequestError("Please Provide All Values");
  }
  req.body.createdBy = req.user.userId;
  const todo = await Todo.create(req.body);
  res.status(StatusCodes.CREATED).json({ todo });
};

const updateTodo = async (req, res) => {
  const { id: todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId });
  if (!todo) {
    throw new NotFoundError(`No todo with id :${todoId}`);
  }
  checkPermissions(req.user, todo.createdBy);

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId },
    { checked: true },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedTodo });
};
const deleteTodo = async (req, res) => {
  const { id: todoId } = req.params;

  const todo = await Todo.findOne({ _id: todoId });

  if (!todo) {
    throw new CustomError.NotFoundError(`No todo with id : ${todoId}`);
  }

  checkPermissions(req.user, todo.createdBy);

  await todo.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Todo removed" });
};
const getAllTodos = async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ todos });
};
export { createTodo, deleteTodo, getAllTodos, updateTodo };
