const { Schema, model } = require("mongoose");

const fullNameRegexp = /^[A-Za-zА-Яа-яЁёҐґІіЇїЄє\s-]+$/;
const languageOptions = ["en", "ua"];

const TeamsSchema = new Schema(
  {
    translations: [
      {
        language: {
          type: String,
          enum: languageOptions, // ('en', 'ua')
          required: true,
        },
        fullName: {
          type: String,
          match: fullNameRegexp,
          required: true,
        },
        activity: {
          type: String,
          required: true,
        },
      },
    ],
    imgPath: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      default: "",
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Teams = model("teams", TeamsSchema);

module.exports = { Teams };
