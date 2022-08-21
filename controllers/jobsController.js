import Job from "../models/Job.js";
import Todo from "../models/Todo.js";
import Log from "../models/Log.js";
import BookMark from "../models/BookMark.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please Provide All Values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Job.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //

  // setup pagination
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  // result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = 1;

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }
  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  let contributionsLog = await Log.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
          date: {
            $dayOfMonth: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  let contributionsTodo = await Todo.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
          date: {
            $dayOfMonth: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  let contributionsJob = await Job.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
          date: {
            $dayOfMonth: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  let values = {};
  const map = new Map(Object.entries(values));

  contributionsJob.map((data) => {
    let month = data._id.month;
    if (data._id.month < 10) {
      month = `0${data._id.month}`;
    }
    let dates = data._id.date;
    if (data._id.date < 10) {
      dates = `0${data._id.date}`;
    }
    map.set(`${data._id.year}-${month}-${dates}`, data.count);
    return 0;
  });
  contributionsLog.map((data) => {
    let month = data._id.month;
    if (data._id.month < 10) {
      month = `0${data._id.month}`;
    }
    let dates = data._id.date;
    if (data._id.date < 10) {
      dates = `0${data._id.date}`;
    }
    map.set(`${data._id.year}-${month}-${dates}`, data.count);
    return 0;
  });
  contributionsTodo.map((data) => {
    let month = data._id.month;
    if (data._id.month < 10) {
      month = `0${data._id.month}`;
    }
    let dates = data._id.date;
    if (data._id.date < 10) {
      dates = `0${data._id.date}`;
    }
    map.set(`${data._id.year}-${month}-${dates}`, data.count);
    return 0;
  });
  values = Object.fromEntries(map);
  let contributions = values;

  let todo = await Todo.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId(req.user.userId),
        checked: false,
      },
    },
  ]);
  let todoLength = todo.length;
  todo = await Todo.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId(req.user.userId),
        checked: true,
      },
    },
  ]);
  let todoCompletedLength = todo.length;
  const bookmarks = await BookMark.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyApplications,
    todoLength,
    bookmarks,
    contributions,
    todoCompletedLength,
  });
};
export { createJob, deleteJob, getAllJobs, updateJob, showStats };
