package com.amine.ecommerce.http;

import com.amine.ecommerce.dto.client.CreateClient;
import com.amine.ecommerce.dto.client.LoginRequest;
import com.amine.ecommerce.dto.client.Update;
import com.amine.ecommerce.entities.Client;
import com.amine.ecommerce.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.amine.ecommerce.response.GlobalResponse;
import java.util.UUID;

@RestController
@RequestMapping("/auth/v1/")
public class AuthController {

    @Autowired
    private ClientService clientService;

    @PostMapping("/register")
    public ResponseEntity<GlobalResponse<Client>> register(
            @Valid @RequestBody CreateClient request) {
        Client client = clientService.createClient(request);
        return new ResponseEntity<>(new GlobalResponse<>(client), HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<GlobalResponse<String>> register(
            @Valid @RequestBody LoginRequest request) {

        String token = clientService.login(request);

        return new ResponseEntity<>(new GlobalResponse<>(token), HttpStatus.CREATED);
    }


    @PutMapping("/{Id}")
    public ResponseEntity<GlobalResponse<Client>> UpdateById(
            @PathVariable UUID Id,
            @Valid @RequestBody Update request
    ){
        return new ResponseEntity<>(
                new GlobalResponse<>(
                        clientService.UpdateById(Id,request)
                ),HttpStatus.CREATED
        );
    }

    @GetMapping("/{Id}")
    public ResponseEntity<GlobalResponse<Client>> findById(@PathVariable UUID Id){
        return new ResponseEntity<>(new GlobalResponse<>(clientService.findById(Id)),HttpStatus.OK);
    }


}