package com.amine.ecommerce.service;


import com.amine.ecommerce.dto.order.CartResponse;
import com.amine.ecommerce.dto.order.CreateCart;
import com.amine.ecommerce.entities.Cart;
import com.amine.ecommerce.entities.Client;
import com.amine.ecommerce.entities.Product;
import com.amine.ecommerce.repository.CartRepository;
import com.amine.ecommerce.repository.ClientRepository;
import com.amine.ecommerce.repository.ProductRepository;
import com.amine.ecommerce.response.CustomResponseException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class CartService {


    @Autowired
    CartRepository CartRepository;
    @Autowired
    ProductRepository ProductRepository;
    @Autowired
    ClientRepository ClientRepository;

    @SneakyThrows
    public CartResponse Create(CreateCart request) {

        Product product = ProductRepository.findById(request.product())
                .orElseThrow(() ->
                        CustomResponseException.ResourceNotFound(
                                "Id : " + request.product() + " is not found"
                        )
                );

        Client client = ClientRepository.findById(request.client())
                .orElseThrow(() ->
                        CustomResponseException.ResourceNotFound(
                                "Id : " + request.client() + " is not found"
                        )
                );

        if (CartRepository.existsByClientIdAndProductId(
                client.getId(),
                product.getId()
        )) {
            throw CustomResponseException.ResourceAlreadyExists(
                    "Product already exists in cart"
            );
        }

        Cart cart = new Cart();
        cart.setClient(client);
        cart.setProduct(product);

        Cart saved = CartRepository.save(cart);

        return new CartResponse(
                saved.getId(),
                saved.getClient().getId(),
                saved.getProduct().getId()
        );
    }

    public List<CartResponse> findAllByClientId(UUID clientId) {
        return CartRepository.findAllByClientId(clientId)
                .stream()
                .map(cart -> new CartResponse(
                        cart.getId(),
                        cart.getClient().getId(),
                        cart.getProduct().getId()
                ))
                .toList();
    }


    public void delete(UUID Id){
        CartRepository.deleteById(Id);
    }

    public long countByClientId(UUID clientId) {
        return CartRepository.countByClientId(clientId);
    }

}
