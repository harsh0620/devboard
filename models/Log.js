import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    contentLog: {
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

export default mongoose.model("Log", LogSchema);
