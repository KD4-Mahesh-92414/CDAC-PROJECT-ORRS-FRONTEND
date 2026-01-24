package com.orrs.entities;

import java.time.LocalDate;

import com.orrs.enums.AccountStatus;
import com.orrs.enums.Gender;
import com.orrs.enums.PreferedClass;
import com.orrs.enums.Role;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@AttributeOverride(name="id", column = @Column(name="user_id"))
@Getter
@Setter
@ToString

public class User extends BaseEntity{

	@Column(name="full_name", length = 50, nullable = false)
	private String fullName;
	
	@Column(length= 60, unique = true, nullable = false)
	private String email;
	
	@Column(length =100, nullable = false)
	private String password;
	
	@Column(length = 12, nullable = false, unique = true)
	private String mobile;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	private LocalDate dob;
	
	private String address;
	
	@Column(length = 12, name="aadhar_no", unique = true)
	private String aadharNo;
	
	@Enumerated(EnumType.STRING)
	private Role role = Role.ROLE_CUSTOMER;
	
	@Enumerated(EnumType.STRING)
	@Column(name="account_status")
	private AccountStatus status = AccountStatus.ACTIVE;
	
	@Enumerated(EnumType.STRING)
	@Column(name="prefered_class")
	private PreferedClass prefClass;
	
	@Column(name="is_email_verified")
	private boolean isEmailVerified;
	
}
