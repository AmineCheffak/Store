package com.amine.ecommerce.dto.client;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateClient(
        @NotBlank String username,
        @NotBlank @Size(min = 8) String password) {
}
