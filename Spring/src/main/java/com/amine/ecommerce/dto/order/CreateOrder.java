package com.amine.ecommerce.dto.order;

import java.util.List;
import java.util.UUID;

public record CreateOrder(
        UUID user,
        List<ProductRef> products
) {
    public record ProductRef(UUID id) {
    }
}