package gerry.stockcontrol.controller;

import gerry.stockcontrol.exception.ProductNotFoundException;
import gerry.stockcontrol.model.Product;
import gerry.stockcontrol.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/products")
// http://localhost:8080/api/products
public class ProductController {

    @Autowired
    private final ProductServiceImpl productServiceImpl;

    public ProductController(ProductServiceImpl productServiceImpl) {
        this.productServiceImpl = productServiceImpl;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productServiceImpl.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) throws ProductNotFoundException {
        return productServiceImpl.getProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productServiceImpl.createProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) throws ProductNotFoundException {
        return productServiceImpl.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) throws ProductNotFoundException {
        productServiceImpl.deleteProduct(id);
    }

    // http://localhost:8080/api/products/searchname
    @GetMapping("/searchname")
    public List<Product> searchProductsByName(@RequestParam(value = "name") String name) {
        return productServiceImpl.findByName(name);
    }

    // http://localhost:8080/api/products/searchdescription
    @GetMapping("/searchdescription")
    public List<Product> searchProductsByDescription(@RequestParam(value = "description") String description) {
        return productServiceImpl.findByDescription(description);
    }

    // http://localhost:8080/api/products/searchstocklevel
    @GetMapping("/searchstocklevel")
    public List<Product> searchProductsByStockLevel(@RequestParam(value = "stocklevel") int stocklevel) {
        return productServiceImpl.findByStockLevel(stocklevel);
    }

//    @GetMapping("/queryname")
//    public List<Product> getProductByQueryName(@RequestParam(value="name") String queryname) {
//        return productServiceImpl.findProductByQueryName(queryname);
//    }
}

