package com.amine.ecommerce.http;

import com.amine.ecommerce.dto.order.CreateOrder;
import com.amine.ecommerce.dto.order.OrderResponse;
import com.amine.ecommerce.entities.Order;
import com.amine.ecommerce.response.GlobalResponse;
import com.amine.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders/v1")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<GlobalResponse<Order>> create(@Valid @RequestBody CreateOrder request) {
        Order order = orderService.CreateOneOrder(request);
        return new ResponseEntity<>(new GlobalResponse<>(order), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<GlobalResponse<List<Order>>> findAll() {
        List<Order> orders = orderService.findAllOrder();
        return new ResponseEntity<>(new GlobalResponse<>(orders), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GlobalResponse<Order>> findById(@PathVariable UUID id) {
        Order order = orderService.findById(id);
        return new ResponseEntity<>(new GlobalResponse<>(order), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        orderService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/{id}/All")
    public ResponseEntity<GlobalResponse<List<OrderResponse>>> findAllOrder(@PathVariable UUID id) {
        return new ResponseEntity<>(new GlobalResponse<>(orderService.findAllOrderId(id)), HttpStatus.OK);
    }
}
