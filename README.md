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


Store/
│
├── Spring/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/amine/ecommerce/
│   │   │   │
│   │   │   └── resources/
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── reactjs/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
