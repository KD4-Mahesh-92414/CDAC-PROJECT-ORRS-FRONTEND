package com.orrs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.orrs.dto.response.UserAdminViewDTO;
import com.orrs.entities.User;
import com.orrs.enums.AccountStatus;

public interface UserRepository extends JpaRepository<User, Long>{

	boolean existsByEmail(String email);
	boolean existsByMobile(String mobile);
	boolean existsByAadharNo(String aadharNo);
	Optional<User> findByEmail(String email);
	
	@Query("select new com.orrs.dto.response.UserAdminViewDTO(u.id, u.fullName, u.email, u.mobile, u.role, u.status) from User u where u.status != :status")
	List<UserAdminViewDTO> fetchAllUsers(@Param("status") AccountStatus status );
}
