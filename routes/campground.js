const express = require('express')
const router = express.Router()
const CGController = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')

router.get('/', catchAsync(CGController.index))

router.get('/new', isLoggedIn ,CGController.renderNewForm)

router.post('/', isLoggedIn ,validateCampground, catchAsync(CGController.createCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(CGController.renderEditForm))

router.get('/:id', catchAsync(CGController.showCampground))

router.put('/:id', isLoggedIn, isAuthor , validateCampground, catchAsync(CGController.updateCampground))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(CGController.deleteCampground))

module.exports = router