package com.orrs.security;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;


@Component
public class JwtUtils {

	@Value("${jwt.expiration.time}")
	private Long jwtExpirationTime;
	
	@Value("${jwt.secret}")
	private String jwtSecret;
	
	private SecretKey secretKey;
	
	@PostConstruct
	public void myInit() {
		secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	//create JWT - header , payload, signature
	public String generateToken(UserPrincipal principal) {
		//issued_at  
		Date now=new Date();
		//expiration time
		Date expiresAt=new Date(now.getTime()+jwtExpirationTime);
		return Jwts.builder() //creates a builder for JWT creation
				.subject(principal.getEmail()) //setting subject
				.issuedAt(now) //issued_at
				.expiration(expiresAt) //expiration
				//custom claims - user id & user role
				.claims(Map.of("user_id", principal.getUserId()
						, "user_role", principal.getUserRole()))
				.signWith(secretKey)//sign the JWT
				.compact();
				
	}
	public Claims validateToken(String jwt) {
		return Jwts.parser() //attach a parser
				.verifyWith(secretKey)
				.build() //builds JwtsParser
				.parseSignedClaims(jwt)
				.getPayload();
		
	}
}
