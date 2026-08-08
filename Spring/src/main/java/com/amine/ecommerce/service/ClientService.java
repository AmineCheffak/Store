package com.amine.ecommerce.service;

import com.amine.ecommerce.Config.JwtHelper;
import com.amine.ecommerce.dto.client.CreateClient;
import com.amine.ecommerce.dto.client.LoginRequest;
import com.amine.ecommerce.dto.client.Update;
import com.amine.ecommerce.entities.Client;
import com.amine.ecommerce.entities.Enums.Role;
import com.amine.ecommerce.repository.ClientRepository;
import com.amine.ecommerce.response.CustomResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ClientService  {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager AuthenticationManager;
    @Autowired
    private JwtHelper JwtHelper;

    public Client createClient(CreateClient request) {

        Client client = new Client();

        client.setUsername(request.username());
        client.setPassword(passwordEncoder.encode(request.password()));
        client.setRole(Role.USER);

        return clientRepository.save(client);
    }


    public String login(LoginRequest request) {

        AuthenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        Client client = clientRepository.findByUsername(request.username())
                .orElseThrow(CustomResponseException::badCredentials);

        Map<String,Object> customClaims = new HashMap<>();
        customClaims.put("userId",client.getId());
        return JwtHelper.generateToken(customClaims,client);

    }

    public Client UpdateById(UUID id, Update request) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() ->
                        CustomResponseException.ResourceNotFound("Client with id : " + id + " Not Found")
                );

        client.setAddras(request.address());
        client.setFirstName(request.firstName());
        client.setLastName(request.lastName());
        client.setAge(request.age());
        client.setAvatar(request.avatar());
        client.setEmail(request.email());
        client.setPhone(request.phone());
        client.setDateCreate(request.dateCreate());

        return clientRepository.save(client);
    }


    public Client findById(UUID id){
        return clientRepository.findById(id).orElseThrow(()->
                CustomResponseException.ResourceNotFound("Client with id : " + id + " Not Found")
        );
    }
}