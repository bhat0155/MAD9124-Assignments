const { model, Schema } = require("mongoose");
const { validate18Holes } = require("./utils");

const roundSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    // username: {
    //   type: String,
    //   required: true,
    //   minLength: 3,
    //   maxLength: 64,
    // },
    user:{
      type: Schema.Types.ObjectId,
      ref: "User",
      minLength: 3,
      maxLength: 64,
      required: true
    },
    scores: {
      type: [Number],
      required: true,
      validate: [validate18Holes, "scores must be length 18"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model("Round", roundSchema);
