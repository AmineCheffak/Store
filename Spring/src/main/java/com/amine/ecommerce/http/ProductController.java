package com.amine.ecommerce.http;

import com.amine.ecommerce.dto.product.CreateProduct;
import com.amine.ecommerce.dto.product.UpdateProduct;
import com.amine.ecommerce.entities.Product;
import com.amine.ecommerce.response.GlobalResponse;
import com.amine.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products/v1")

public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<GlobalResponse<Product>> create(@Valid @RequestBody CreateProduct request) {
        Product product = productService.Create(request);
        return new ResponseEntity<>(new GlobalResponse<>(product), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<GlobalResponse<List<Product>>> findAll(
//
//            @Reqe
    ) {
        List<Product> products = productService.findAll();
        return new ResponseEntity<>(new GlobalResponse<>(products), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GlobalResponse<Product>> findById(@PathVariable UUID id) {
        Product product = productService.findById(id);
        return new ResponseEntity<>(new GlobalResponse<>(product), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GlobalResponse<Product>> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateProduct request) {
        Product product = productService.Update(id, request);
        return new ResponseEntity<>(new GlobalResponse<>(product), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        productService.DeleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search/{text}")
    public ResponseEntity<GlobalResponse<List<Product>>> search(@PathVariable String text) {
        List<Product> products = productService.search(text);
        return new ResponseEntity<>(new GlobalResponse<>(products), HttpStatus.OK);
    }

    @GetMapping("/Category/{text}")
    public ResponseEntity<GlobalResponse<List<Product>>> findByCategory(@PathVariable String text){
        List<Product> products = productService.findByCategory(text);
        return new ResponseEntity<>(new GlobalResponse<>(products),HttpStatus.OK);
    }
}
