const express = require('express');
const router = express.Router();
const Reviews = require('../models/reviews.module');
const { verifyToken } = require('../middleware/admin.middleware');

// GET api/reviews - Get all reviews
router.get('/', (req, res) => {
  Reviews.find()
    .then(reviews =>{
      res.json(reviews)
    })
    .catch(err => {
      res.status(404).json({ msg: 'Reviews not found' })});
});

// GET api/reviews/:id - Get one reviews by id
router.get('/:id', (req, res) => {
  console.log("id: ", req.params.id)
  Reviews.findById(req.params.id)
    .then(reviews => {
      console.log("reviews:", reviews)
      res.json(reviews)
    })
    .catch(err => res.status(404).json({ msg: 'Reviews not found' }));
});

// GET api/reviews - Add/save reviews
router.post('/', verifyToken, (req, res) => {
  Reviews.create(req.body)
    .then(reviews => {
      res.json({ msg: 'Reviews added successfully' })
    })
    .catch(err => res.status(400).json({ error: 'Failed to add reviews' }));
});

// GET api/reviews/:id - Update reviews
router.put('/:id', verifyToken, (req, res) => {
  Reviews.findByIdAndUpdate(req.params.id, req.body)
    .then(reviews => res.json({ msg: 'Successfully updated' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update database' })
    );
});

// GET api/reviews/:id - Delete reviews
router.delete('/:id', verifyToken, (req, res) => {
  Reviews.findByIdAndRemove(req.params.id, req.body)
    .then(reviews => res.json({ mgs: 'Reviews successfully deleted' }))
    .catch(err => res.status(404).json({ error: 'News not found' }));
});

module.exports = router;