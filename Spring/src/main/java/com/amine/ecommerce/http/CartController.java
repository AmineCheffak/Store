package com.amine.ecommerce.http;


import com.amine.ecommerce.dto.order.CartResponse;
import com.amine.ecommerce.dto.order.CreateCart;
import com.amine.ecommerce.entities.Cart;
import com.amine.ecommerce.response.GlobalResponse;
import com.amine.ecommerce.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/carts/v1")
public class CartController {




    @Autowired
    CartService CartService;


    @PostMapping
    public ResponseEntity<GlobalResponse<CartResponse>> Create(@Valid @RequestBody CreateCart request){
        return new ResponseEntity<>(
                new GlobalResponse<>(CartService.Create(request))
                , HttpStatus.CREATED
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<GlobalResponse<List<CartResponse>>> findAllByClientId(
            @PathVariable UUID id
    ) {
        return new ResponseEntity<>(
                new GlobalResponse<>(
                        CartService.findAllByClientId(id)
                ),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id){
        CartService.delete(id);
    }

    @GetMapping("/{id}/count")
    public ResponseEntity<GlobalResponse<Long>> countByClientId(
            @PathVariable UUID id
    ) {
        return new ResponseEntity<>(
                new GlobalResponse<>(
                        CartService.countByClientId(id)
                ),
                HttpStatus.OK
        );
    }


}
