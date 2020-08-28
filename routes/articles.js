const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Articles = require('../models/KB');
const User = require('../models/User');

//@ROUTE GET /api/articles
//@DESC GET all Articles
//@access Private -- will make private
router.get('/', auth, async (req, res) => {
  console.log('getting all articles');
  try {
    const articles = await Articles.find({}).sort({
      date: -1,
    });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error, Check get all articles route');
  }
});

//@ROUTE PUT /api/articles/:id
// @DESC Update Article
// ACCESS PRIVATE.
router.put('/:id', auth, async (req, res) => {
  console.log('update  articles route hit ');
  const { name, description, author } = req.body;
  //Article OBJECT
  const articleFields = {};
  if (name) articleFields.name = name;
  if (description) articleFields.description = description;
  if (author) articleFields.author = author;

  try {
    let articles = await Articles.findById(req.params.id);
    console.log('getting Article by id');
    if (!articles)
      return res.status(400).json({ msg: 'No Article with that ID Found ' });

    articles = await Articles.findByIdAndUpdate(
      req.params.id,
      { $set: articleFields },
      { new: true }
    );
    res.json(articles);
    console.log('article updated');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error Check update ROUTE on Articles');
  }
});

//@ROUTE POST /api/article
//@DESC POST A ARTICLE
// ACCESS PRIVATE ?? -- will make private
router.post('/', auth, async (req, res) => {
  const { name, description, date, author } = req.body;
  try {
    console.log('posting new article');

    const newArticle = new Articles({
      name,
      description,
      date,
      author,
    });
    const savedArticle = await newArticle.save();
    res.json(savedArticle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error Check Articles Post Route. ');
  }
});

//@ROUTE DELETE /api/articles
//@DESC DELETE articles
//access private

router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('delete article route hit');
    let articles = await Articles.findById(req.params.id);
    if (!articles) return res.status(400).json({ msg: 'Article not found' });
    await Articles.findByIdAndRemove(req.params.id);
    console.log('86ing the article');
    res.json({ msg: 'Article deleted, Clark is gonna be mad' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server ERROR*');
  }
});

module.exports = router;
