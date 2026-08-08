package com.amine.ecommerce.dto.client;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotBlank
        String username,
        @NotBlank
        @Size(min = 8, max = 30)
        String password
){
}
