package com.amine.ecommerce.service;


import com.amine.ecommerce.dto.order.CreateOrder;
import com.amine.ecommerce.dto.order.OrderResponse;
import com.amine.ecommerce.entities.Client;
import com.amine.ecommerce.entities.Order;
import com.amine.ecommerce.entities.Product;
import com.amine.ecommerce.repository.ClientRepository;
import com.amine.ecommerce.repository.OrderRepository;
import com.amine.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.amine.ecommerce.response.CustomResponseException;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {


    @Autowired
    private OrderRepository OrderRepository;

    @Autowired
    private ProductRepository ProductRepository;

    @Autowired
    private ClientRepository ClientRepository;

    public Order CreateOneOrder(CreateOrder request) {

        Client client = ClientRepository.findById(request.user()).orElseThrow(
                () -> CustomResponseException.ResourceNotFound("User not found")
        );

        List<Product> products = request.products()
                .stream()
                .map(p -> ProductRepository.findById(p.id())
                        .orElseThrow(() -> CustomResponseException.ResourceNotFound("Product not found: " + p.id())))
                .toList();
        double total = products.stream()
                .mapToDouble(Product::getPrice)
                .sum();


        Order order = new Order();
        order.setClient(client);
        order.setProducts(products);
        order.setTotalPrice(total);
        order.setCreatedAt(new Date());

        return OrderRepository.save(order);
    }

    public List<Order> findAllOrder() {
        return OrderRepository.findAll();
    }

    public Order findById(UUID Id) {
        return OrderRepository.findById(Id)
                .orElseThrow(
                        () -> CustomResponseException.ResourceNotFound("Order with id : " + Id + " Not Found")
                );
    }

    public void deleteById(UUID Id) {
        if (!OrderRepository.existsById(Id)) {
            throw CustomResponseException.ResourceNotFound("Order with id : " + Id + " Not Found");
        }
        OrderRepository.deleteById(Id);
    }


    private OrderResponse toResponse(Order order) {
        List<OrderResponse.ProductItem> products = order.getProducts().stream()
                .map(p -> new OrderResponse.ProductItem(p.getId(), p.getSTATUS()))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getCreatedAt().toInstant(),
                products,
                order.getClient().getId(),
                order.getTotalPrice()
        );
    }

    public List<OrderResponse> findAllOrderId(UUID id) {
        return OrderRepository.findAllByClientId(id)
                .stream()
                .map(this::toResponse)
                .toList();
    }

}
