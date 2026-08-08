package com.amine.ecommerce.service;

import com.amine.ecommerce.entities.Product;
import com.amine.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.amine.ecommerce.dto.product.CreateProduct;
import com.amine.ecommerce.response.CustomResponseException;
import java.util.List;
import java.util.UUID;
import com.amine.ecommerce.dto.product.UpdateProduct;

@Service
public class ProductService {

    @Autowired
    private ProductRepository ProductRepository;




    public Product Create(CreateProduct request){

        Product product = new Product();

        product.setName(request.name());
        product.setDescription(request.description());
        product.setStock(request.stock());
        product.setImages(request.images());
        product.setCategory(request.category());
        product.setPrice(request.price());

        return ProductRepository.save(product);
    }


    public List<Product> findAll() {
        return ProductRepository.findAll();
    }

    public Product findById(UUID id) {
        return ProductRepository.findById(id)
                .orElseThrow(() ->
                        CustomResponseException.ResourceNotFound("Product with id : " + id + " Not Found")
                );
    }

    public void DeleteById(UUID Id) {
        if (!ProductRepository.existsById(Id)) {
            throw CustomResponseException.ResourceNotFound("Product with id : " + Id + " Not Found");
        }
        ProductRepository.deleteById(Id);
    }

    public Product Update(UUID Id,UpdateProduct request) {
        Product product = ProductRepository.findById(Id)
                .orElseThrow(() ->
                        CustomResponseException.ResourceNotFound("Product with id : " + Id + " Not Found")
                );

        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setStock(request.stock());
        product.setImages(request.images());
        product.setCategory(request.category());

        return ProductRepository.save(product);
    }

    public List<Product> search(String text) {
        return ProductRepository.Search(text);
    }

    public List<Product> findByCategory(String text){
        return ProductRepository.findByCategory(text);
    }


}