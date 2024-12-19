const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createReview(reviewData) {
  try {
    const newReview = await prisma.review.create({
      data: {
        employeeId: reviewData.employeeId,
        reviewDate: reviewData.reviewDate,
        comments: reviewData.comments,
      },
    });
    return newReview;
  } catch (error) {
    throw new Error("Error creating review: " + error.message);
  }
}

async function getAllReviews() {
  try {
    return await prisma.review.findMany({
      include: {
        employee: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching reviews: " + error.message);
  }
}

async function getReviewById(id) {
  try {
    return await prisma.review.findUnique({
      where: { id: Number(id) },
      include: {
        employee: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching review: " + error.message);
  }
}

async function updateReview(id, reviewData) {
  try {
    return await prisma.review.update({
      where: { id: Number(id) },
      data: reviewData,
    });
  } catch (error) {
    throw new Error("Error updating review: " + error.message);
  }
}

async function deleteReview(id) {
  try {
    return await prisma.review.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error("Error deleting review: " + error.message);
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
