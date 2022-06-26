import mongoose from "mongoose";

const BookMarkSchema = new mongoose.Schema(
  {
    contentBookMark: {
      type: String,
      required: [true, "Please provide content name"],
    },
    bookMarkLink: {
      type: String,
      required: [true, "Please provide content name"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookMark", BookMarkSchema);
