const { Schema, model, default: mongoose } = require("mongoose");

const VolunteerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    country: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    daysVolunteer: [
      {
        day: {
          type: String,
          required: true,
        },
        timeStart: {
          type: String,
          required: true,
        },
        timeFinish: {
          type: String,
          required: true,
        },
      },
    ],
    languages: [
      {
        language: {
          type: String,
          default: "",
        },
        level: {
          type: String,
          default: "",
        },
      },
    ],
    skills: [String],
    comment: {
      type: String,
      required: false,
      default: "",
    },
    mailing: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Volunteers = mongoose.model("volunteer", VolunteerSchema);

module.exports = { Volunteers };
