const cron = require('node-cron');
const { createSheetVolunteers, updateSheetVolunteers } = require('./services/volunteers')

const сronStart = () => {
   updateSheetVolunteers()
   
   cron.schedule('0 * * * *', () => {
      createSheetVolunteers()
      console.log('create sheet volunteers');
   })
   
   cron.schedule('* * * * *', () => {
      updateSheetVolunteers()
      console.log('update sheet Volunteers');
   });
}

module.exports = сronStart