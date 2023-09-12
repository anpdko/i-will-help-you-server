const { Schema, model, default: mongoose } = require("mongoose");

const needHelpsSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nameFileLoading: {
      type: String,
    },
    opportunityConnect: {
      type: Boolean,
    },
    healingHaven: {
      type: Boolean,
    },
    eduHorizon: {
      type: Boolean,
    },
    eduConnect: {
      type: Boolean,
    },
    contentUplift: {
      type: Boolean,
    },
    compassionCare: {
      type: Boolean,
    },
    project7: {
      type: Boolean,
    },
    comment: {
      type: String,
      default: "",
    },
    mailing: {
      type: Boolean,
      default: false,
    },
    dataProcessing: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);

needHelpsSchema.path("opportunityConnect").validate(function () {
  return (
    this.opportunityConnect ||
    this.healingHaven ||
    this.eduHorizon ||
    this.eduConnect ||
    this.contentUplift ||
    this.compassionCare ||
    this.project7
  );
}, "At least one checkbox must be selected.");

const needHelps = mongoose.model("needHelps", needHelpsSchema);

module.exports = { needHelps };
