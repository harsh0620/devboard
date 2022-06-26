import BookMark from "../models/BookMark.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
const getAllBookMarks = async (req, res) => {
  const bookMark = await BookMark.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ bookMark });
};
const createBookMark = async (req, res) => {
  const { contentBookMark, bookMarkLink } = req.body;

  if (!contentBookMark || !bookMarkLink) {
    throw new BadRequestError("Please Provide All Values");
  }

  req.body.createdBy = req.user.userId;
  const bookMark = await BookMark.create(req.body);
  res.status(StatusCodes.CREATED).json({ bookMark });
};

const deleteBookMark = async (req, res) => {
  const { id: bookMarkId } = req.params;
  const bookMark = await BookMark.findOne({ _id: bookMarkId });
  if (!bookMark) {
    throw new CustomError.NotFoundError(`No BookMark with id : ${bookMarkId}`);
  }
  checkPermissions(req.user, bookMark.createdBy);
  await bookMark.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! BookMark removed" });
};

const updateBookMark = async (req, res) => {
  const { id: bookMarkId } = req.params;
  const { contentBookMark, bookMarkLink } = req.body;
  if (!contentBookMark || !bookMarkLink) {
    throw new BadRequestError("Please provide all values");
  }
  const bookMark = await BookMark.findOne({ _id: bookMarkId });
  if (!bookMark) {
    throw new NotFoundError(`No BookMark with id :${bookMarkId}`);
  }
  checkPermissions(req.user, bookMark.createdBy);
  const updatedbookMark = await BookMark.findOneAndUpdate(
    { _id: bookMarkId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedbookMark });
};
export { createBookMark, deleteBookMark, getAllBookMarks, updateBookMark };
