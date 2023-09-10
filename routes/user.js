const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const { storeReturn } = require('../middleware')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const registerUser = await User.register(user, password)
        req.login(registerUser, err => {
            if (err) {
                return next(err)
            }
            req.flash('success', 'Welcome to CampSite!')
            res.redirect('/campgrounds')
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', storeReturn, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const returnUrl = res.locals.returnTo || '/campgrounds'
    req.flash('success', 'Welcome back!')
    res.redirect(returnUrl)
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err)
        }
        req.flash('success', 'You have successfully logged out!')
        res.redirect('/campgrounds')
    })
})

module.exports = router