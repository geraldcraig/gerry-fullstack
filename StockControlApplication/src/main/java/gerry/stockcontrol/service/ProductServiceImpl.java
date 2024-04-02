package gerry.stockcontrol.service;

import gerry.stockcontrol.exception.ProductNotFoundException;
import gerry.stockcontrol.model.Product;
import gerry.stockcontrol.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) throws ProductNotFoundException {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) throws ProductNotFoundException {
        Product existingProduct = getProductById(id);
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) throws ProductNotFoundException {
        getProductById(id);
        productRepository.deleteById(id);
    }

    public List<Product> findByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> findByDescription(String description) {
        return productRepository.findByDescriptionContainingIgnoreCase(description);
    }

    public List<Product> findByStockLevel(int stocklevel) {
        return productRepository.findByStockGreaterThanEqual(stocklevel);
    }

}
