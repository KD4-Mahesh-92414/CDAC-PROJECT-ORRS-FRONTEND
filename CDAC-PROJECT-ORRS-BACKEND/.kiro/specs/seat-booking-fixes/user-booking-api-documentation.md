# User Booking API Documentation

## Overview
This document describes the new user booking management APIs that provide comprehensive booking and payment history, statistics, and saved passenger management.

## Base URL
```
/users/bookings
```

## Authentication
All endpoints require JWT authentication via `Authorization: Bearer <token>` header.

---

## Payment APIs

### 1. Get Payment History
**Endpoint:** `GET /users/bookings/payments/history`

**Description:** Retrieve complete payment history for the authenticated user.

**Response:**
```json
{
  "message": "Payment history fetched successfully",
  "status": "SUCCESS",
  "data": [
    {
      "paymentId": 1,
      "pnrNumber": "PNR12AB34CD",
      "trainName": "Mumbai Rajdhani Express",
      "trainNumber": "12951",
      "journeyDate": "2025-02-15",
      "amount": 2500.00,
      "paymentMethod": "UPI",
      "status": "SUCCESS",
      "paymentDate": "2025-01-27T10:30:00",
      "transactionId": "TXN1738012345ABCD",
      "refundAmount": 0.00,
      "refundDate": null
    }
  ]
}
```

### 2. Get Payment Summary
**Endpoint:** `GET /users/bookings/payments/summary`

**Description:** Get aggregated payment statistics for the user.

**Response:**
```json
{
  "message": "Payment summary fetched successfully",
  "status": "SUCCESS",
  "data": {
    "totalSpent": 15750.00,
    "totalPayments": 8,
    "totalRefunded": 2100.00
  }
}
```

---

## Booking APIs

### 3. Get Booking History
**Endpoint:** `GET /users/bookings/history`

**Description:** Retrieve all bookings made by the authenticated user.

**Response:**
```json
{
  "message": "Booking history fetched successfully",
  "status": "SUCCESS",
  "data": [
    {
      "bookingId": 123,
      "pnrNumber": "PNR12AB34CD",
      "trainName": "Mumbai Rajdhani Express",
      "trainNumber": "12951",
      "trainRoute": "Mumbai Central → New Delhi",
      "totalPassengers": 2,
      "journeyDate": "2025-02-15",
      "status": "CONFIRMED",
      "totalFare": 2500.00,
      "bookingDate": "2025-01-27T10:30:00"
    }
  ]
}
```

### 4. Get Booking Details
**Endpoint:** `GET /users/bookings/{bookingId}/details`

**Description:** Get comprehensive details of a specific booking.

**Path Parameters:**
- `bookingId` (Long): ID of the booking to retrieve

**Response:**
```json
{
  "message": "Booking details fetched successfully",
  "status": "SUCCESS",
  "data": {
    "bookingId": 123,
    "pnrNumber": "PNR12AB34CD",
    "status": "CONFIRMED",
    "bookingType": "INDIVIDUAL",
    "bookingDate": "2025-01-27T10:30:00",
    "journeyDate": "2025-02-15",
    "totalFare": 2500.00,
    "trainDetails": {
      "trainNumber": "12951",
      "trainName": "Mumbai Rajdhani Express",
      "coachType": "SLEEPER"
    },
    "routeDetails": {
      "sourceStation": "Mumbai Central",
      "destinationStation": "New Delhi",
      "departureTime": "16:55",
      "arrivalTime": "08:35"
    },
    "passengers": [
      {
        "name": "John Doe",
        "age": 30,
        "gender": "MALE",
        "seatNumber": "S1-10",
        "fare": 1250.00
      }
    ],
    "paymentDetails": {
      "transactionId": "TXN1738012345ABCD",
      "paymentMethod": "UPI",
      "paymentStatus": "SUCCESS",
      "paymentDate": "2025-01-27T10:30:00",
      "refundAmount": 0.00
    }
  }
}
```

### 5. Cancel Booking
**Endpoint:** `POST /users/bookings/cancel`

**Description:** Cancel a confirmed booking if the train has not yet departed.

**Request Body:**
```json
{
  "bookingId": 123,
  "reason": "Change of plans"
}
```

**Response:**
```json
{
  "message": "Booking cancelled successfully",
  "status": "SUCCESS",
  "data": "Your booking PNR12AB34CD has been cancelled. Refund will be processed within 5-7 business days."
}
```

**Business Rules:**
- Only CONFIRMED bookings can be cancelled
- Cannot cancel after train departure
- Refund processing is automatic

### 6. Get Booking Statistics
**Endpoint:** `GET /users/bookings/stats`

**Description:** Get booking statistics and counts for the user.

**Response:**
```json
{
  "message": "Booking statistics fetched successfully",
  "status": "SUCCESS",
  "data": {
    "totalBookings": 15,
    "confirmedBookings": 12,
    "completedBookings": 8,
    "cancelledBookings": 3
  }
}
```

---

## Saved Passengers APIs

### 7. Get Saved Passengers
**Endpoint:** `GET /users/bookings/saved-passengers`

**Description:** Retrieve all saved passengers for the authenticated user.

**Response:**
```json
{
  "message": "Saved passengers fetched successfully",
  "status": "SUCCESS",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "age": 30,
      "gender": "MALE",
      "preferredBerth": "LOWER"
    }
  ]
}
```

### 8. Add Saved Passenger
**Endpoint:** `POST /users/bookings/saved-passengers`

**Description:** Add a new passenger to saved list.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "age": 28,
  "gender": "FEMALE",
  "preferredBerth": "UPPER"
}
```

**Validation Rules:**
- `name`: Required, not blank
- `age`: Required, between 1-120
- `gender`: Required, valid enum (MALE/FEMALE)
- `preferredBerth`: Optional

**Response:**
```json
{
  "message": "Passenger saved successfully",
  "status": "SUCCESS",
  "data": {
    "id": 2,
    "name": "Jane Doe",
    "age": 28,
    "gender": "FEMALE",
    "preferredBerth": "UPPER"
  }
}
```

**Business Rules:**
- Maximum 6 saved passengers per user
- Duplicate names are allowed (family members)

### 9. Update Saved Passenger
**Endpoint:** `PUT /users/bookings/saved-passengers/{passengerId}`

**Description:** Update details of an existing saved passenger.

**Path Parameters:**
- `passengerId` (Long): ID of the passenger to update

**Request Body:**
```json
{
  "name": "Jane Smith",
  "age": 29,
  "gender": "FEMALE",
  "preferredBerth": "LOWER"
}
```

**Response:**
```json
{
  "message": "Passenger details updated successfully",
  "status": "SUCCESS",
  "data": {
    "id": 2,
    "name": "Jane Smith",
    "age": 29,
    "gender": "FEMALE",
    "preferredBerth": "LOWER"
  }
}
```

### 10. Delete Saved Passenger
**Endpoint:** `DELETE /users/bookings/saved-passengers/{passengerId}`

**Description:** Remove a saved passenger from the user's list.

**Path Parameters:**
- `passengerId` (Long): ID of the passenger to delete

**Response:**
```json
{
  "message": "Passenger deleted successfully",
  "status": "SUCCESS",
  "data": null
}
```

---

## Error Responses

### Common Error Scenarios

#### 1. Unauthorized Access
```json
{
  "message": "Access denied",
  "status": "ERROR",
  "errorCode": "UNAUTHORIZED",
  "timestamp": "2025-01-27T10:30:00"
}
```

#### 2. Resource Not Found
```json
{
  "message": "Booking not found",
  "status": "ERROR",
  "errorCode": "RESOURCE_NOT_FOUND",
  "timestamp": "2025-01-27T10:30:00"
}
```

#### 3. Business Logic Violation
```json
{
  "message": "Cannot cancel booking after train departure",
  "status": "ERROR",
  "errorCode": "BUSINESS_RULE_VIOLATION",
  "timestamp": "2025-01-27T10:30:00"
}
```

#### 4. Validation Error
```json
{
  "message": "Validation failed",
  "status": "ERROR",
  "errorCode": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "age",
      "message": "Age must be between 1 and 120"
    }
  ],
  "timestamp": "2025-01-27T10:30:00"
}
```

---

## Database Schema Changes

### New Tables Created

#### 1. payments
```sql
CREATE TABLE payments (
    payment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    booking_id BIGINT NOT NULL,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('CREDIT_CARD','DEBIT_CARD','NET_BANKING','UPI','WALLET','CASH') NOT NULL,
    payment_status ENUM('PENDING','SUCCESS','FAILED','REFUNDED','PARTIALLY_REFUNDED') NOT NULL,
    payment_date DATETIME NOT NULL,
    gateway_response VARCHAR(500),
    refund_amount DECIMAL(10,2) DEFAULT 0.00,
    refund_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);
```

#### 2. saved_passengers (Enhanced)
```sql
-- Table already exists, no changes needed
-- Just added proper repository methods and validation
```

### Indexes for Performance
```sql
-- Payment queries optimization
CREATE INDEX idx_payments_user_status ON payments(user_id, payment_status);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);

-- Booking queries optimization  
CREATE INDEX idx_bookings_user_date ON bookings(user_id, booking_date);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_bookings_journey_date ON bookings(journey_date);

-- Saved passengers optimization
CREATE INDEX idx_saved_passengers_user ON saved_passengers(user_id);
```

---

## Testing Endpoints

### Using cURL

#### Get Payment History
```bash
curl -X GET "http://localhost:8080/users/bookings/payments/history" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

#### Add Saved Passenger
```bash
curl -X POST "http://localhost:8080/users/bookings/saved-passengers" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 30,
    "gender": "MALE",
    "preferredBerth": "LOWER"
  }'
```

#### Cancel Booking
```bash
curl -X POST "http://localhost:8080/users/bookings/cancel" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": 123,
    "reason": "Change of plans"
  }'
```

---

## Implementation Notes

### Security Features
- All endpoints require JWT authentication
- Users can only access their own data
- Proper validation on all input parameters
- SQL injection prevention through JPA queries

### Performance Optimizations
- Database indexes on frequently queried columns
- Lazy loading for entity relationships
- Efficient JPQL queries with projections
- Pagination support (can be added if needed)

### Business Logic
- Booking cancellation only allowed before train departure
- Maximum 6 saved passengers per user
- Automatic payment record creation on booking confirmation
- Proper refund handling for cancelled bookings

This API provides a complete booking management system for users with comprehensive payment tracking, booking history, and passenger management capabilities.