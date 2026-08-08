# Store




Spring/
└── src/
    └── main/
        └── java/
            └── com/
                └── amine/
                    └── ecommerce/
                        ├── Config/
                        │   ├── JwtAuthFilter.java
                        │   ├── JwtHelper.java
                        │   └── SecurityConfig.java
                        │
                        ├── dto/
                        │   ├── client/
                        │   │   ├── CreateClient.java
                        │   │   ├── LoginRequest.java
                        │   │   └── Update.java
                        │   │
                        │   ├── order/
                        │   │   ├── CartResponse.java
                        │   │   ├── CreateCart.java
                        │   │   ├── CreateOrder.java
                        │   │   └── OrderResponse.java
                        │   │
                        │   └── product/
                        │
                        ├── entities/
                        │   ├── Enums/
                        │   ├── Cart.java
                        │   ├── Client.java
                        │   ├── Order.java
                        │   └── Product.java
                        │
                        ├── http/
                        │   ├── AuthController.java
                        │   ├── CartController.java
                        │   ├── OrderController.java
                        │   └── ProductController.java
                        │
                        ├── repository/
                        │   ├── CartRepository.java
                        │   ├── ClientRepository.java
                        │   ├── OrderRepository.java
                        │   └── ProductRepository.java
                        │
                        ├── response/
                        │   ├── CustomResponseException.java
                        │   ├── GlobalExceptionResponse.java
                        │   └── GlobalResponse.java
                        │
                        ├── service/
                        │   ├── CartService.java
                        │   ├── ClientDetailsServiceImpl.java
                        │   ├── ClientService.java
                        │   ├── OrderService.java
                        │   └── ProductService.java
                        │
                        └── EcommerceApplication.java
