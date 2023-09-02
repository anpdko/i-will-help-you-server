const express = require('express');
const router = express.Router();
const Projects = require('../models/projects.module');
const { verifyToken } = require('../middleware/admin.middleware');


// const data = require("../data/projects.json")
// router.get('/add', (req, res) => {
//   try {
//     data.map(async (elem) => {
//       await Projects.create(elem)
//     })
//     res.json("OK")
//   }
//   catch(err) {
//     console.log(err);
//   }
// });

// GET api/projects - Get all projects
router.get('/', (req, res) => {
  try {
      Projects.find()
      .then(projects =>{
        res.json(projects)
      })
      .catch(err => {
        res.status(404).json({ message: 'Projects not found' })});
  }
  catch(err) {
    console.log(err);
    res.status(404).json({ err, message: 'Server Error' });
  }
});

// GET api/projects/:id - Get one project by id
router.get('/:id', (req, res) => {
  console.log("id: ", req.params.id)
  Projects.findById(req.params.id)
    .then(project => {
      console.log("project:", project)
      res.json(project)
    })
    .catch(err => res.status(404).json({ message: 'Project not found' }));
});

// GET api/projects - Add/save project
router.post('/', verifyToken, (req, res) => {
   Projects.create(req.body)
    .then(project => {
      res.json({ message: 'project added successfully' })
    })
    .catch(err => res.status(400).json({ message: 'Failed to add project' }));
});

// GET api/projects/:id - Update project
router.put('/:id', verifyToken, (req, res) => {
   Projects.findByIdAndUpdate(req.params.id, req.body)
    .then(project => res.json({ message: 'Successfully updated' }))
    .catch(err =>
      res.status(400).json({ message: 'Unable to update database' })
    );
});

// GET api/projects/:id - Delete project
router.delete('/:id', verifyToken, (req, res) => {
   Projects.findByIdAndRemove(req.params.id, req.body)
    .then(project => res.json({ message: 'Project successfully deleted' }))
    .catch(err => res.status(404).json({ message: 'Project not found' }));
});

module.exports = router;