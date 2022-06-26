import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    contentTodo: {
      type: String,
      required: [true, "Please provide content name"],
    },
    checked: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", TodoSchema);
