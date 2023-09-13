const express = require('express')
const router = express.Router()
const CGController = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(CGController.index))
    .post(isLoggedIn, upload.array('image'), validateCampground , catchAsync(CGController.createCampground))

router.get('/new', isLoggedIn, CGController.renderNewForm)

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(CGController.renderEditForm))

router.route('/:id')
    .get(catchAsync(CGController.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(CGController.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(CGController.deleteCampground))

module.exports = router