package com.amine.ecommerce.dto.order;

import java.util.UUID;

public record CreateCart(
         UUID client,
         UUID product
) {
}
