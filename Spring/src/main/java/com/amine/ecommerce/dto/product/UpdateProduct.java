package com.amine.ecommerce.dto.product;

import jakarta.validation.constraints.*;

import java.util.List;

public record UpdateProduct(

        @NotNull(message = "Name is required")
        @Size(min = 3, max = 50)
        String name,

        @NotNull(message = "Description is required")
        @Size(min = 10, max = 200)
        String description,

        @NotNull(message = "Stock is required")
        @Min(value = 0, message = "Stock must be >= 0")
        Integer stock,      // <- wrapper

        @NotNull(message = "Category is required")
        String category,

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        Double price,       // <- wrapper

        @NotEmpty(message = "Images list cannot be empty")
        List<String> images

) {
}
