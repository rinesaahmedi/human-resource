const express = require("express");
const router = express.Router();

// Services
const reviewService = require("./review.service");

// Create a new review
router.post("", async (req, res) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error while creating review: ${error.message}`,
    });
  }
});

// Get all reviews
router.get("", async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update review
router.put("/:id", async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body
    );

    return res.json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete review
router.delete("/:id", async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    await reviewService.deleteReview(req.params.id);
    return res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
