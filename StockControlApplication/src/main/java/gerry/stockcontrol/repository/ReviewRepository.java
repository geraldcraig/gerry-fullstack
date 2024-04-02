package gerry.stockcontrol.repository;

import gerry.stockcontrol.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
