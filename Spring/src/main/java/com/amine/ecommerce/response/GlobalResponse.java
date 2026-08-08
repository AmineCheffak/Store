package com.amine.ecommerce.response;


import lombok.Getter;

import java.util.List;


@Getter
public class GlobalResponse<T> {

    private final static String ERROR = "error";
    private final static String SUCCESS = "success";
    private String status;
    private T data;

    private List<ErrorItem> errors;

    public GlobalResponse(List<ErrorItem> errors) {
        this.errors = errors;
        this.data = null;
        this.status = ERROR;
    }

    public GlobalResponse(T data) {
        this.data = data;
        this.errors = null;
        this.status = SUCCESS;
    }

    public record ErrorItem(String message) {
    }
}
