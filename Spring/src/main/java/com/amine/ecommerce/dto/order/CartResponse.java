package com.amine.ecommerce.dto.order;

import java.util.UUID;

public record CartResponse(
        UUID id,
        UUID clientId,
        UUID productId
) {}