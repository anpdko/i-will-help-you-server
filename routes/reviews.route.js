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

// GET api/reviews/:id - Get one review by id
router.get('/:id', (req, res) => {
  console.log("id: ", req.params.id)
  Reviews.findById(req.params.id)
    .then(review => {
      console.log("review:", review)
      res.json(review)
    })
    .catch(err => res.status(404).json({ message: 'Review not found' }));
});

// GET api/reviews - Add/save review
router.post('/', verifyToken, (req, res) => {
  Reviews.create(req.body)
    .then(review => {
      res.json({ message: 'Review added successfully' })
    })
    .catch(err => res.status(400).json({ message: 'Failed to add review' }));
});

// GET api/reviews/:id - Update review
router.put('/:id', verifyToken, (req, res) => {
  Reviews.findByIdAndUpdate(req.params.id, req.body)
    .then(review => res.json({ message: 'Successfully updated' }))
    .catch(err =>
      res.status(400).json({ message: 'Unable to update database' })
    );
});

// GET api/reviews/:id - Delete review
router.delete('/:id', verifyToken, (req, res) => {
  Reviews.findByIdAndRemove(req.params.id, req.body)
    .then(review => res.json({ message: 'Review successfully deleted' }))
    .catch(err => res.status(404).json({ message: 'Review not found' }));
});

module.exports = router;