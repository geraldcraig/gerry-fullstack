package gerry.stockcontrol.controller;

import gerry.stockcontrol.exception.ReviewNotFoundException;
import gerry.stockcontrol.model.Review;
import gerry.stockcontrol.service.ReviewServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private final ReviewServiceImpl reviewServiceImpl;

    public ReviewController(ReviewServiceImpl reviewServiceImpl) {
        this.reviewServiceImpl = reviewServiceImpl;
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewServiceImpl.getAllReviews();
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) throws ReviewNotFoundException {
        return reviewServiceImpl.getReviewById(id);
    }

    @PostMapping
    public Review createProduct(@RequestBody Review review) {
        return reviewServiceImpl.createReview(review);
    }

    @PutMapping("/{id}")
    public Review updateProduct(@PathVariable Long id, @RequestBody Review review) throws ReviewNotFoundException {
        return reviewServiceImpl.updateReview(id, review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) throws ReviewNotFoundException {
        reviewServiceImpl.deleteReview(id);
    }
}
