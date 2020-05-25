const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const keys = require('../../config/keys');

router.get('/:abc', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // res.send({msg:req.params.abc})
    Profile.findOne({
        email: req.params.abc
    }).then(profile => {
        if (!profile) {
            return res.json({
               user:req.user
            })
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});

module.exports = router;