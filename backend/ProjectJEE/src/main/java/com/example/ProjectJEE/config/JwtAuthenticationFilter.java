package com.example.ProjectJEE.config;

import com.example.ProjectJEE.service.JwtService;
import com.example.ProjectJEE.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class); // Create logger instance

    private final HandlerExceptionResolver handlerExceptionResolver;
    private final JwtService jwtService;
    private final CustomUserDetailsService CustomUserDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService CustomUserDetailsService,
            HandlerExceptionResolver handlerExceptionResolver
    ) {
        this.jwtService = jwtService;
        this.CustomUserDetailsService = CustomUserDetailsService;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);  // No Bearer token, just pass the request along
            return;
        }

        try {
            final String jwt = authHeader.substring(7);  // Extract the token part
            logger.info("Extracted JWT Token: {}", jwt);  // Log the JWT token

            final String username = jwtService.extractUsername(jwt);  // Extract the username from the token
            logger.info("Extracted Username from JWT: {}", username);  // Log the extracted username

            if (username != null) {
                UserDetails userDetails = CustomUserDetailsService.loadUserByUsername(username);
                logger.info("User Details for username {}: {}", username, userDetails);  // Log user details
                // Cast UserDetails to com.example.ProjectJEE.model.User
                if (userDetails instanceof com.example.ProjectJEE.model.User) {
                    com.example.ProjectJEE.model.User user = (com.example.ProjectJEE.model.User) userDetails;
                    logger.info("User object after casting: {}", user);
                    // Validate the token
                    if (jwtService.isTokenValid(jwt, user)) {
                        logger.info("Token is valid for user: {}", username);  // Log successful token validation
                        // Token is valid, create authentication token
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                user,
                                null,
                                user.getAuthorities()
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    } else {
                        logger.warn("Invalid or expired token for username: {}", username);  // Log invalid token attempt
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("Invalid or expired token");
                        return;
                    }
                } else {
                    logger.warn("UserDetails is not an instance of com.example.ProjectJEE.model.User for username: {}", username);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Invalid token");
                    return;
                }
            } else {
                logger.warn("Invalid token: Username is null");  // Log if username is null
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid token");
                return;
            }

            filterChain.doFilter(request, response);  // Continue with the filter chain
        } catch (Exception e) {
            logger.error("Error during token validation", e);  // Log any errors that occur
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid token");
        }
    }

}
