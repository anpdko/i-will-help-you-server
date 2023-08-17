const {Schema, model} = require('mongoose')

const schema = new Schema({
   login: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      require: true
   }
})

module.exports = Admin = model('Admin', schema)