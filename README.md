# 🛒 Store - E-Commerce Application

Store is a full-stack e-commerce application built with a modern web architecture.
The project is divided into a Spring Boot backend and a React.js frontend.

---

## 🛠️ Technologies

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT (JSON Web Token)
- Maven
- MariaDB

### Frontend

- React.js
- JavaScript
- Axios
- Tailwind CSS

### Database

- MariaDB
- JPA / Hibernate for ORM

---

# 🏗️ Project Architecture

The backend follows a layered architecture based on separation of responsibilities.

```text
Client / React.js
       │
       │ HTTP / REST API
       ▼
┌──────────────────────┐
│     Controllers      │
│   (HTTP Layer)       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Services       │
│   (Business Logic)   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Repositories     │
│   (Data Access)      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    JPA / Hibernate   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       MariaDB        │
└──────────────────────┘
```
```text
com.amine.ecommerce
│
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

```
# 🎨 Frontend Structure

The frontend is developed using **React.js** and is organized into reusable components, pages, and sections.

The main frontend source code is located inside:

```text
reactjs/src/
src/
│
├── assets/
│
├── Component/
│   ├── Button.jsx
│   ├── Cart.jsx
│   ├── Header.jsx
│   ├── login-form.jsx
│   ├── Nav.jsx
│   └── SignUp-form.jsx
│
├── Page/
│   ├── admin.jsx
│   ├── Carts.jsx
│   ├── Description.jsx
│   ├── HistoryOrder.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   └── UserProfile.jsx
│
├── section/
│   ├── About.jsx
│   ├── Banner.jsx
│   └── Footer.jsx
│
├── App.jsx
├── index.css
└── main.jsx
