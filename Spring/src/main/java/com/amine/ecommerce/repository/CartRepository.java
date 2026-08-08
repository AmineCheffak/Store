package com.amine.ecommerce.repository;

import com.amine.ecommerce.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, UUID> {

    List<Cart> findAllByClientId(UUID clientId);
    boolean existsByClientIdAndProductId(
            UUID IDP,
            UUID IDC
    );
    long countByClientId(UUID clientId);
}
