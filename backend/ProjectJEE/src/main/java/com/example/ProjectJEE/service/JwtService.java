package com.example.ProjectJEE.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.zip.CheckedOutputStream;

@Service
public class JwtService {

    private static final Key SECRET_KEY = Keys.hmacShaKeyFor("tt/tMaTsPvG5cy1c1EhKhKEb22Pr69j55n5MxEAIyUU=".getBytes());


    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;
    private final Set<String> invalidatedTokens = new HashSet<>();

    // Ajouter un token à la liste noire
    public void invalidateToken(String token) {
        invalidatedTokens.add(token);
    }

    // Vérifier si le token est invalide
    public boolean isTokenInvalid(String token) {
        return invalidatedTokens.contains(token);
    }

    // Générer le token JWT avec les rôles
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .toList());
        return generateToken(claims, userDetails);
    }

    // Construire le token JWT
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(SECRET_KEY)
                .compact();
    }

    // Extract claims
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Extract username
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract roles
    public List<String> extractRoles(String token) {
        return extractAllClaims(token).get("roles", List.class);
    }

    // Check token validity
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extract specific claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Check if token has ROLE_ADMIN
    public boolean hasRoleAdmin(String token) {
        List<String> roles = extractRoles(token);
        return roles != null && roles.contains("ROLE_ADMIN");
    }

    public long getExpirationTime() {
        return jwtExpiration;
    }
}
