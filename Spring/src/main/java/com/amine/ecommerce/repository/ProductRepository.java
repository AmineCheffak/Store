package com.amine.ecommerce.repository;

import com.amine.ecommerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Query(
            "SELECT p FROM Product p WHERE " +
                    "(LOWER(p.Name) LIKE LOWER(CONCAT('%', :text, '%')) " +
                    "OR LOWER(p.Description) LIKE LOWER(CONCAT('%', :text, '%')))" +
                    "OR LOWER(p.Category) LIKE LOWER(CONCAT('%', :text, '%'))"
    )
    List<Product> Search(@Param("text") String text);

    @Query("SELECT p FROM Product p WHERE lower(p.Category) = lower(:category)")
    List<Product> findByCategory(@Param("category") String category);
}
