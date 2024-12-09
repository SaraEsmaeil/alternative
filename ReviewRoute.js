const express = require('express');
const {
  createReview,
  getReviewsByUser,
  getReviewsForUser,
  deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

// Route to create a review
router.post('/', createReview);

// Route to get all reviews written by a specific user
router.get('/by/:reviewerId', getReviewsByUser);

// Route to get all reviews for a specific user
router.get('/for/:revieweeId', getReviewsForUser);

// Route to delete a review
router.delete('/:id', deleteReview);

module.exports = router;
