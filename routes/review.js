const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const RController = require('../controllers/reviews')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

router.post('/', isLoggedIn, validateReview, catchAsync(RController.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(RController.deleteReview))

module.exports = router