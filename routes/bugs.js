const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Bugs = require('../models/Bugs');

// @ROUTE GET /api/bugs
//@DESC GEt all bugs
// access private
router.get('/', auth, async (req, res) => {
  console.log('getting the bugs sir');
  try {
    const bugs = await Bugs.find({}).sort({
      date: -1,
    });
    res.json(bugs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error, Check bugsjs GET for errors');
  }
});

//@ROUTE POST /api/bugs
//@DESC POST A BUG
// ACCESS PRIVATE
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, status, severity } = req.body;

    try {
      const newBug = new Bugs({
        name,
        description,
        status,
        severity,
      });

      const savedBug = await newBug.save();

      res.json(savedBug);
      console.log('Bug Added to DB ');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error Check bugs route post');
    }
  }
);

// @ROUTE PUT /api/bugs/:id
// @DESC Update a bug
// Access PRIVATE

router.put('/:id', auth, async (req, res) => {
  console.log('update route hit ');
  const { name, description, status, severity } = req.body;
  //BUG OBJECT
  const bugsFields = {};
  if (name) bugsFields.name = name;
  if (description) bugsFields.description = description;
  if (status) bugsFields.status = status;
  if (severity) bugsFields.severity = severity;

  try {
    let bugs = await Bugs.findById(req.params.id);
    console.log('getting bug by id');
    if (!bugs)
      return res.status(400).json({ msg: 'No bug with that ID FOUND' });
    console.log('getting ready to update');
    bugs = await Bugs.findByIdAndUpdate(
      req.params.id,
      { $set: bugsFields },
      { new: true }
    );
    res.json(bugs);
    console.log('updated bug saved');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error Check update ROUTE');
  }
});

// @ROUTE DELETE  /api/bugs.:id
// @DESC DELETE BUG
// ACCESS PRIVATE
router.delete('/:id', auth, async (req, res) => {
  try {
    let bugs = await Bugs.findById(req.params.id);
    if (!bugs) return res.status(404).json({ msg: 'BUG NOT FOUND' });
    await Bugs.findByIdAndRemove(req.params.id);
    console.log('BUG EXTERMINATED !!!');
    res.json({ msg: 'Bug Removed sir' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server ERROR, CHECK DELETE ROUTE. ');
  }
});

module.exports = router;
