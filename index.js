require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({extensions: true}))
app.get('/', (req, res) => {
   res.send("Server listening on port 5000");
})

app.use('/static/images', express.static(path.join(__dirname, 'static/images')))

app.use('/api/admin', require('./routes/admin.route'))
app.use('/api/news', require('./routes/news.route')) 
app.use('/api/reviews', require('./routes/reviews.route'))
app.use('/api/projects', require('./routes/projects.route'))

const start = async () => {
   try{
      mongoose.set("strictQuery", true);
      await mongoose.connect(process.env.URL_MONGO, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log('Connect MongoDB');
      app.listen(PORT, () => {
         console.log("Server listening on port " + PORT)
      })
   }
   catch(err){
      console.error(err)
   }
}

start()