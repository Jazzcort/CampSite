const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const { storeReturn } = require('../middleware')
const UserController = require('../controllers/users')

router.route('/register')
    .get(UserController.showRegister)
    .post(catchAsync(UserController.createUser))

router.route('/login')
    .get(UserController.showLogin)
    .post(storeReturn, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), UserController.loginSuccessfully)

router.get('/logout', UserController.logoutUser)

module.exports = router