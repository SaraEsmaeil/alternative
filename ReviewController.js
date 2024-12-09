const Review = require('../models/reviewModel');

// Create a new review
const createReview = async (req, res) => {
  const { reviewerId, revieweeId, itemId, rating, comment } = req.body;

  if (!reviewerId || !revieweeId || !itemId || !rating) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  try {
    const review = new Review({
      reviewerId,
      revieweeId,
      itemId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create review',
      error: error.message,
    });
  }
};

// Get all reviews written by a specific user
const getReviewsByUser = async (req, res) => {
  const { reviewerId } = req.params;

  try {
    const reviews = await Review.find({ reviewerId }).populate('revieweeId', 'name email');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve reviews',
      error: error.message,
    });
  }
};

// Get all reviews for a specific user
const getReviewsForUser = async (req, res) => {
  const { revieweeId } = req.params;

  try {
    const reviews = await Review.find({ revieweeId })
      .populate('reviewerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve reviews',
      error: error.message,
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.remove();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete review',
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getReviewsByUser,
  getReviewsForUser,
  deleteReview,
};
