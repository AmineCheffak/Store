package com.amine.ecommerce.dto.client;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

public record Update(

        @Email(message = "Invalid email")
        @Size(max = 255, message = "Email is too long")
        String email,

        @Min(value = 13, message = "Age must be at least 13")
        @Max(value = 120, message = "Age must be less than or equal to 120")
        Integer age,

        @Size(min = 3, max = 255, message = "Address must be between 3 and 255 characters")
        String address,

        @Size(max = 500, message = "Avatar URL is too long")
        String avatar,

        @Pattern(
                regexp = "^[+]?[0-9]{9,15}$",
                message = "Invalid phone number"
        )
        String phone,

        Date dateCreate,

        @NotBlank
        @Column(unique = true, nullable = false)
        String firstName,

        @NotBlank
        @Column(unique = true, nullable = false)
        String lastName

) {
}