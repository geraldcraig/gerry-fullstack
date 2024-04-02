package gerry.stockcontrol.repository;

import gerry.stockcontrol.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByDescriptionContainingIgnoreCase(String description);

    List<Product> findByStockGreaterThanEqual(int stocklevel);
}
