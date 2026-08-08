package com.amine.ecommerce.Config;

import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(c -> {
                    CorsConfigurationSource source = corsConfigurationSource();
                    c.configurationSource(source);
                })
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(
                            //login / register
                            HttpMethod.POST,
                                    "/auth/v1/register", "/auth/v1/login"
                            ).permitAll()
                            .requestMatchers(HttpMethod.PUT,"/auth/v1/{Id}").hasAnyRole("ADMIN","USER")
                            .requestMatchers(HttpMethod.GET,"/auth/v1/{Id}").hasAnyRole("ADMIN","USER")
                            //Product
                            .requestMatchers("/auth/v1/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET, "/products/v1", "/products/v1/{id}","/products/v1/Category/{text}").permitAll()
                            .requestMatchers(HttpMethod.POST, "/products/v1").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/products/v1/{id}").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/products/v1/{id}").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.GET,"/products/v1/search/{text}").hasAnyRole("ADMIN","USER")
                            //Order
                            .requestMatchers(HttpMethod.POST,"/orders/v1").hasAnyRole("USER","ADMIN")
                            .requestMatchers(HttpMethod.POST,"/carts/v1").hasAnyRole("USER","ADMIN")
                            .requestMatchers(HttpMethod.DELETE,"/orders/v1/{id}").hasAnyRole("USER","ADMIN")
                            .requestMatchers(HttpMethod.DELETE,"/carts/v1/{id}").hasAnyRole("USER","ADMIN")
                            .requestMatchers(HttpMethod.GET,"/orders/v1/{id}").hasAnyRole("ADMIN","USER")
                            .requestMatchers(HttpMethod.GET,"/orders/v1/{id}/All").hasAnyRole("ADMIN","USER")
                            .requestMatchers(HttpMethod.GET,"/carts/v1/{id}").hasAnyRole("ADMIN","USER")
                            .requestMatchers(HttpMethod.GET,"/carts/v1/{id}/count").hasAnyRole("ADMIN","USER")
                            .requestMatchers(HttpMethod.GET,"orders/v1").hasRole("ADMIN")

                            .anyRequest().authenticated();
                })
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationManager(authenticationManager(http));
        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        var authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

        return authBuilder.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public Hibernate6Module hibernate6Module() {
        Hibernate6Module module = new Hibernate6Module();
        module.configure(Hibernate6Module.Feature.FORCE_LAZY_LOADING, true);
        return module;
    }
}