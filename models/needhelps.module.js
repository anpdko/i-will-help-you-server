const { Schema, model, Types } = require("mongoose");

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
    },
    file: [{
      type: String,
    }],
    typeOfAssistance:[{
      type: Types.ObjectId, 
      ref: 'projects'
    }],
    comment: {
      type: String,
      default: "",
    },
    mailing: {
      type: Boolean,
      default: false,
    }
  },
  { versionKey: false, timestamps: true }
);



const NeedHelps = model("needHelps", needHelpsSchema);

module.exports = { NeedHelps };
