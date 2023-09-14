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
    file: [{
      fileName: {
        type: String,
        required: true,
      },
      fileData: {
        type: Buffer, // Використовуйте тип Buffer для зберігання даних файлу
        required: true,
      },
    }],
    typeOfAssistance:[{
      name: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    }],
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



const needHelps = mongoose.model("needHelps", needHelpsSchema);

module.exports = { needHelps };
