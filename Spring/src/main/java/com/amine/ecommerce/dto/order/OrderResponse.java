package com.amine.ecommerce.dto.order;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record OrderResponse(
        UUID id,
        Instant createdAt,
        List<ProductItem> products,
        UUID client,
        double totalPrice
) {
    public record ProductItem(UUID id, String status) {
    }
}