const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const keys = require('../../config/keys');

router.get('/', (req, res) => {
    Blog.find()
        .sort({
            date: -1
        })
        .then(blog => res.json(blog))
        .catch(err => res.status(404).json({
            noblogfound: 'No blog found'
        }));
});

router.get('/:id', (req, res) => {
    Blog.findOne({
            id: req.params.title
        })
        .then(blog => res.json(blog))
        .catch(err =>
            res.status(404).json({
                noblogfound: 'No blog found with that title'
            })
        );
});

router.post('/create', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        date: new Date(),
        author: req.user.name
    });
    newBlog.save().then(post => res.json(post)).catch(err => res.json({
        msg: 'error in saving'
    }));
})

module.exports = router;