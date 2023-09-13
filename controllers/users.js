const User = require('../models/user')

module.exports.showRegister = (req, res) => {
    res.render('users/register')
}

module.exports.createUser = async (req, res) => {
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
}

module.exports.showLogin = (req, res) => {
    res.render('users/login')
}

module.exports.loginSuccessfully = (req, res) => {
    const returnUrl = res.locals.returnTo || '/campgrounds'
    req.flash('success', 'Welcome back!')
    res.redirect(returnUrl)
}

module.exports.logoutUser = (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err)
        }
        req.flash('success', 'You have successfully logged out!')
        res.redirect('/campgrounds')
    })
}