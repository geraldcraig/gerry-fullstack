package gerry.stockcontrol.service;

import gerry.stockcontrol.exception.ReviewNotFoundException;
import gerry.stockcontrol.model.Review;
import gerry.stockcontrol.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl {
    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) throws ReviewNotFoundException {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found with id: " + id));
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review review) throws ReviewNotFoundException {
        Review existingReview = getReviewById(id);
        existingReview.setName(review.getName());
        existingReview.setDescription(review.getDescription());
        existingReview.setReview(review.getReview());
        return reviewRepository.save(existingReview);
    }

    public void deleteReview(Long id) throws ReviewNotFoundException {
        getReviewById(id);
        reviewRepository.deleteById(id);
    }
}
