package com.amine.ecommerce.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomResponseException extends RuntimeException {


    private int Code;
    private String message;

    public static CustomResponseException ResourceNotFound(String message) {
        return new CustomResponseException(404, message);
    }

    public static CustomResponseException badCredentials() {
        return new CustomResponseException(401, "Bad Credentials");
    }


    public static Exception ResourceAlreadyExists(String productAlreadyExistsInCart) {
        return new CustomResponseException(409,productAlreadyExistsInCart);
    }
}
