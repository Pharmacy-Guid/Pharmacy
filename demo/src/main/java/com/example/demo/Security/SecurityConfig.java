package com.example.demo.Security;

import com.example.demo.filter.CustomAuthenticationFilter;
import com.example.demo.filter.CustomAuthorizationFilter;
//import jdk.nashorn.internal.ir.annotations.Immutable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter  {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public SecurityConfig(UserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/login");
        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/medicines/search**").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.POST,"/login").permitAll();
        http.authorizeRequests().antMatchers( HttpMethod.GET,"/pharmacies").permitAll();//////
        http.authorizeRequests().antMatchers( HttpMethod.POST,"/users").permitAll();

        http.authorizeRequests().antMatchers( HttpMethod.PUT,"/users").hasAuthority("user");
        http.authorizeRequests().antMatchers( HttpMethod.POST,"/users/addPharmacy").hasAuthority("user");
        http.authorizeRequests().antMatchers( HttpMethod.POST,"/medicines").hasAuthority("user");
        http.authorizeRequests().antMatchers( HttpMethod.DELETE,"/medicines/{id}").hasAuthority("user");
        http.authorizeRequests().antMatchers( HttpMethod.PUT,"/medicines/{id}").hasAuthority("user");
        http.authorizeRequests().antMatchers( HttpMethod.PUT,"/pharmacies/{id}").hasAuthority("user");
        http.authorizeRequests().antMatchers( HttpMethod.PUT,"/users/pharmacy/{id}").hasAuthority("user");
        http.authorizeRequests().antMatchers( HttpMethod.DELETE,"/pharmacies/{id}").hasAuthority("user");
        http.authorizeRequests().antMatchers( HttpMethod.PUT,"/users/{id}").hasAuthority("user");
        // Define the authorization patterns below
//        http.authorizeRequests().anyRequest().permitAll();
//        http.authorizeRequests().antMatchers( HttpMethod.POST,"/drivers").hasAnyAuthority("driver");
//        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }



    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        List<String> origin=new ArrayList<>();
        origin.add("*");
        List<String> methods=new ArrayList<>();
        methods.add("HEAD");
        methods.add("POST");
        methods.add("PUT");
        methods.add("DELETE");
        methods.add("GET");
        methods.add("PATCH");
        List<String> headrs=new ArrayList<>();
        headrs.add("Authorization");
        headrs.add("Cache-Control");
        headrs.add("Content-Type");
        final CorsConfiguration corsConfiguration=new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(origin);
        corsConfiguration.setAllowedMethods(methods);
        corsConfiguration.setAllowCredentials(false);
        corsConfiguration.setAllowedHeaders(headrs);
        final UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);
        return source;
    }


}
