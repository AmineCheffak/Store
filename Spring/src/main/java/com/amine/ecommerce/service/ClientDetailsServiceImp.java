package com.amine.ecommerce.service;

import com.amine.ecommerce.entities.Client;
import com.amine.ecommerce.repository.ClientRepository;
import com.amine.ecommerce.response.CustomResponseException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ClientDetailsServiceImp implements UserDetailsService {

    private final ClientRepository clientRepository;

    public ClientDetailsServiceImp(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client client = clientRepository.findByUsername(username)
                .orElseThrow(CustomResponseException::badCredentials);

        // Client implements UserDetails directly — نرجعوه مباشرة
        return client;
    }
}
