package com.amine.ecommerce.repository;

import com.amine.ecommerce.entities.Cart;
import com.amine.ecommerce.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findAllByClientId(UUID clientId);
}
