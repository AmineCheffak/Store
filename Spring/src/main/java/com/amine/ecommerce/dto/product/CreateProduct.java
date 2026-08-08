package com.amine.ecommerce.dto.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateProduct(


        @NotNull(message = "Name is required")
        @Size(min = 3, max = 50)
        String name,

        @NotNull(message = "Description is required")
        @Size(min = 10, max = 200)
        String description,

        @Min(value = 0, message = "Stock must be >= 0")
        int stock,

        @NotNull(message = "Category is required")
        String category,

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        double price,


        @NotNull(message = "Category is required")
        List<String> images

) {
}
