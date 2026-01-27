# Admin Features Implementation Documentation

## Overview
This document describes the implementation of admin dashboard statistics and user management CRUD APIs for the admin panel.

## 1. Enhanced Admin Dashboard Statistics

### Updated Stats Response
```json
{
    "message": "Dashboard statistics retrieved successfully",
    "status": "SUCCESS",
    "data": {
        "totalTrains": 200,
        "totalActiveTrains": 150,
        "totalStations": 100,
        "totalActiveStations": 75,
        "totalScheduledTrains": 9000,
        "totalBookingsToday": 45,
        "totalUsersRegistered": 1250
    }
}
```

### New Statistics Added
- **totalTrains**: Count of all trains (active + inactive)
- **totalStations**: Count of all stations (active + inactive)

### Repository Updates
- `StationRepository.countTotalStations()` - Added for total stations count
- Existing `countActiveStations()` for active stations count

## 2. User Management CRUD APIs

### Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users (existing UserService) | ADMIN |
| GET | `/admin/users/{userId}` | Get user by ID | ADMIN |
| POST | `/admin/users` | Create new user | ADMIN |
| PUT | `/admin/users/{userId}` | Update user | ADMIN |
| PATCH | `/admin/users/{userId}/status` | Update user status (existing) | ADMIN |
| PATCH | `/admin/users/{userId}/suspend` | Suspend user (existing) | ADMIN |
| DELETE | `/admin/users/{userId}` | Delete user | ADMIN |

### 2.1 Get All Users

**Endpoint**: `GET /admin/users`
**Uses**: Existing `UserService.getAllUsers()` method

**Response**: Returns existing UserAdminViewDTO format from UserService

### 2.6 Update User Status

**Endpoint**: `PATCH /admin/users/{userId}/status`
**Uses**: Existing `UserService.updateUserStatus()` method

**Request**:
```json
{
    "status": "SUSPENDED"
}
```

**Features**:
- Uses existing UpdateStatusReqDTO
- Supports ACTIVE, SUSPENDED, DELETED status changes
- Maintains existing business logic

### 2.7 Suspend User

**Endpoint**: `PATCH /admin/users/{userId}/suspend`
**Uses**: Existing `UserService.suspendUserById()` method

**Features**:
- Quick suspend action (no request body needed)
- Sets user status to SUSPENDED
- Uses existing business logic

### 2.2 Get User by ID

**Endpoint**: `GET /admin/users/{userId}`

**Response**: Same as individual user object above

### 2.3 Create New User

**Endpoint**: `POST /admin/users`

**Request**:
```json
{
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "mobile": "9876543211",
    "gender": "FEMALE",
    "role": "STAFF",
    "status": "ACTIVE",
    "aadharNo": "123456789013",
    "address": "456 Oak St, City"
}
```

**Features**:
- Validates unique email, mobile, and Aadhaar number
- Sets default password "User@123" (user can change later)
- All fields validated according to business rules
- Returns created user details

### 2.4 Update User

**Endpoint**: `PUT /admin/users/{userId}`

**Request**: Same structure as create user

**Features**:
- Validates unique constraints excluding current user
- Updates all user details including role and status
- Maintains data integrity

### 2.5 Delete User

**Endpoint**: `DELETE /admin/users/{userId}`

**Features**:
- Soft delete (sets status to DELETED)
- Modifies email and mobile to allow re-registration
- Preserves data for audit purposes

## 3. Data Transfer Objects (DTOs)

### AdminCreateUserReqDTO
```java
{
    "fullName": "string (required, 2-100 chars)",
    "email": "string (required, valid email)",
    "mobile": "string (required, 10-digit Indian mobile)",
    "gender": "enum (MALE/FEMALE/OTHER, required)",
    "role": "enum (CUSTOMER/ADMIN/STAFF, required)",
    "status": "enum (ACTIVE/SUSPENDED/DELETED, required)",
    "aadharNo": "string (optional)",
    "address": "string (optional)"
}
```

### AdminUpdateUserReqDTO
Same structure as AdminCreateUserReqDTO

### AdminUserRespDTO
```java
{
    "id": "Long",
    "fullName": "string",
    "email": "string",
    "mobile": "string",
    "gender": "enum",
    "role": "enum",
    "status": "enum",
    "aadharNo": "string",
    "address": "string",
    "createdAt": "LocalDateTime",
    "updatedAt": "LocalDateTime"
}
```

## 4. Validation Rules

### Email Validation
- Must be valid email format
- Must be unique across all non-deleted users

### Mobile Validation
- Must be 10-digit Indian mobile number (starts with 6-9)
- Must be unique across all non-deleted users

### Aadhaar Validation
- Optional field
- If provided, must be unique across all non-deleted users

### Full Name Validation
- Required field
- Must be between 2-100 characters

### Enum Validations
- **Gender**: MALE, FEMALE, OTHER
- **Role**: CUSTOMER, ADMIN, STAFF
- **AccountStatus**: ACTIVE, SUSPENDED, DELETED

## 5. Security Implementation

### Authentication & Authorization
- All endpoints require ADMIN role
- Uses `@PreAuthorize("hasRole('ADMIN')")` annotation
- JWT token validation through Spring Security

### Data Protection
- Soft delete preserves audit trail
- Email/mobile modification prevents conflicts
- Password encryption using BCrypt

## 6. Error Handling

### Custom Exceptions
- `ResourceNotFoundException`: User not found
- `ResourceAlreadyExistsException`: Duplicate email/mobile/Aadhaar

### Validation Errors
- Field-level validation using Bean Validation
- Consistent error response format
- Proper HTTP status codes

## 7. Business Logic

### User Creation
1. Validate unique constraints
2. Set default password "User@123"
3. Encrypt password using BCrypt
4. Save user with provided details

### User Update
1. Find existing user (exclude deleted)
2. Validate unique constraints (exclude current user)
3. Update all fields using ModelMapper
4. Save updated user

### User Deletion
1. Find existing user (exclude already deleted)
2. Set status to DELETED
3. Modify email: "deleted_original@system.local"
4. Modify mobile: "XX" + original
5. Save modified user

## 8. Frontend Integration

### Form Fields for Create/Update User
```html
Full Name * (text input, required)
Email * (email input, required)
Mobile * (tel input, required, pattern validation)
Gender (select: Male/Female/Other, required)
Role (select: Customer/Admin/Staff, required)
Account Status (select: Active/Suspended, required)
Aadhaar No (text input, optional)
Address (textarea, optional)
```

### Default Password Notice
When creating users, inform admin that default password is "User@123" and user should change it on first login.

## 9. Performance Considerations

- Read operations use `@Transactional(readOnly = true)`
- Efficient queries with proper filtering
- ModelMapper for DTO conversions
- Proper indexing on unique fields (email, mobile, aadharNo)

## 10. Testing Recommendations

1. **Validation Testing**: Test all field validations
2. **Unique Constraint Testing**: Test duplicate email/mobile/Aadhaar
3. **Role-based Access**: Test ADMIN role requirement
4. **Soft Delete Testing**: Verify deleted users are excluded
5. **Update Testing**: Test unique constraint exclusion for current user

## Files Created/Modified

### New Files
- `AdminCreateUserReqDTO.java` - Create user request DTO
- `AdminUpdateUserReqDTO.java` - Update user request DTO  
- `AdminUserRespDTO.java` - User response DTO
- `AdminUserService.java` - Service interface
- `AdminUserServiceImpl.java` - Service implementation
- `AdminUserController.java` - REST controller

### Modified Files
- `AdminDashboardStatsRespDTO.java` - Added totalTrains and totalStations
- `AdminDashboardServiceImpl.java` - Updated stats calculation
- `StationRepository.java` - Added countTotalStations() method

## Summary

✅ **Admin Dashboard Enhanced**: Added total trains and total stations count
✅ **User Management CRUD**: Complete CRUD operations for user management
✅ **Security**: Proper role-based access control
✅ **Validation**: Comprehensive field and business rule validation
✅ **Error Handling**: Consistent error responses
✅ **Data Integrity**: Soft delete and unique constraint handling