const express = require('express');
const router = express.Router();
const Reviews = require('../models/reviews.module');
const { verifyToken } = require('../middleware/admin.middleware');

// GET api/reviews - Get all reviews
router.get('/', (req, res) => {
  try {
    Reviews.find()
      .then(reviews =>{
        res.json(reviews)
      })
      .catch(err => {
        res.status(404).json({ message: 'Reviews not found' })});
  }
  catch(err) {
    console.log(err);
    res.status(404).json({ err, message: 'Server Error' });
  }
});

// GET api/reviews/:id - Get one reviews by id
router.get('/:id', (req, res) => {
  console.log("id: ", req.params.id)
  Reviews.findById(req.params.id)
    .then(reviews => {
      console.log("reviews:", reviews)
      res.json(reviews)
    })
    .catch(err => res.status(404).json({ message: 'Reviews not found' }));
});

// GET api/reviews - Add/save reviews
router.post('/', verifyToken, (req, res) => {
  Reviews.create(req.body)
    .then(reviews => {
      res.json({ message: 'Reviews added successfully' })
    })
    .catch(err => res.status(400).json({ message: 'Failed to add reviews' }));
});

// GET api/reviews/:id - Update reviews
router.put('/:id', verifyToken, (req, res) => {
  Reviews.findByIdAndUpdate(req.params.id, req.body)
    .then(reviews => res.json({ message: 'Successfully updated' }))
    .catch(err =>
      res.status(400).json({ message: 'Unable to update database' })
    );
});

// GET api/reviews/:id - Delete reviews
router.delete('/:id', verifyToken, (req, res) => {
  Reviews.findByIdAndRemove(req.params.id, req.body)
    .then(reviews => res.json({ message: 'Reviews successfully deleted' }))
    .catch(err => res.status(404).json({ message: 'News not found' }));
});

module.exports = router;