package com.orrs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orrs.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
