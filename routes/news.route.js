const express = require('express');
const router = express.Router();
const News = require('../models/news.module');
const { verifyToken } = require('../middleware/admin.middleware');

// GET api/news - Get all news
router.get('/', (req, res) => {
   News.find()
    .then(news =>{
      res.json(news)
    })
    .catch(err => {
      res.status(404).json({ msg: 'News not found' })});
});

// GET api/news/:id - Get one news by id
router.get('/:id', (req, res) => {
  console.log("id: ", req.params.id)
  News.findById(req.params.id)
    .then(news => {
      console.log("news:", news)
      res.json(news)
    })
    .catch(err => res.status(404).json({ msg: 'News not found' }));
});

// GET api/news - Add/save news
router.post('/', verifyToken, (req, res) => {
   News.create(req.body)
    .then(news => {
      res.json({ msg: 'News added successfully' })
    })
    .catch(err => res.status(400).json({ error: 'Failed to add news' }));
});

// GET api/news/:id - Update news
router.put('/:id', verifyToken, (req, res) => {
   News.findByIdAndUpdate(req.params.id, req.body)
    .then(news => res.json({ msg: 'Successfully updated' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update database' })
    );
});

// GET api/news/:id - Delete book
router.delete('/:id', verifyToken, (req, res) => {
   News.findByIdAndRemove(req.params.id, req.body)
    .then(news => res.json({ mgs: 'news successfully deleted' }))
    .catch(err => res.status(404).json({ error: 'News not found' }));
});

module.exports = router;