import Log from "../models/Log.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const getAllLogs = async (req, res) => {
  const logs = await Log.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ logs });
};
const createLog = async (req, res) => {
  const { contentLog } = req.body;

  if (!contentLog) {
    throw new BadRequestError("Please Provide All Values");
  }
  req.body.createdBy = req.user.userId;
  const log = await Log.create(req.body);
  res.status(StatusCodes.CREATED).json({ log });
};

const deleteLog = async (req, res) => {
  const { id: logId } = req.params;
  const log = await Log.findOne({ _id: logId });
  if (!log) {
    throw new CustomError.NotFoundError(`No log with id : ${logId}`);
  }
  checkPermissions(req.user, log.createdBy);
  await log.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Log removed" });
};

const updateLog = async (req, res) => {
  const { id: logId } = req.params;
  const { contentLog } = req.body;
  if (!contentLog) {
    throw new BadRequestError("Please provide all values");
  }
  const log = await Log.findOne({ _id: logId });
  if (!log) {
    throw new NotFoundError(`No log with id :${logId}`);
  }
  checkPermissions(req.user, log.createdBy);
  const updatedLog = await Log.findOneAndUpdate({ _id: logId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedLog });
};
export { createLog, deleteLog, getAllLogs, updateLog };
