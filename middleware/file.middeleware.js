const multer = require('multer')

const storage = multer.diskStorage({
   destination: './static/images',
   filename: function (req, file, cb){
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
   }
})

const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb) => {
   if(types.includes(file.mimetype)){
      cb(null, true)
   }
   else {
      cb(null, false)
   }
}

module.exports = multer({
   storage: storage, fileFilter
})