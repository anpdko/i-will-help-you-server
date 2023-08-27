const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema({
   translations: [{
      language: {
         type: String, // ('en', 'ua')
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      slogan: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      goals: [{
         tag: {
            type: String,
         },
         desc:{
            type: String,
         }
      }],
      criteria: [{
         tag: {
            type: String,
         },
         desc:{
            type: String,
         }
      }]
   }],
   imgCover: {
      type: String,
      default: "img.png",
      required: true
   },
   publisher: {
      type: Boolean,
      default: true
   },
   published_date: {
      type: Date,
      default: Date.now
   },
   updated_date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Projects = mongoose.model('projects', ProjectsSchema);