# Requirements Document

## Introduction

This specification addresses critical issues in the Online Railway Reservation System (ORRS) seat booking functionality. The current implementation has several gaps in validation, concurrency handling, fare calculation, and business rule enforcement that compromise system reliability and user experience. This document defines requirements to fix these issues and enhance the overall booking process.

## Glossary

- **ORRS**: Online Railway Reservation System
- **Booking_Service**: Service responsible for seat reservation and booking confirmation
- **Seat_Matrix_Service**: Service that displays seat availability in a grid format and performs lazy cleanup of expired reservations
- **PNR**: Passenger Name Record - unique booking identifier
- **Coach_Type**: Train car category (e.g., Sleeper, 3AC, 2AC)
- **Seat_Layout**: Template defining seat arrangement for a coach type
- **Train_Schedule**: Daily instance of a train route with specific departure date
- **Session_Manager**: Component managing user session validation
- **Fare_Calculator**: Component calculating ticket prices based on distance and class

## Requirements

### Requirement 1: Station-to-Station Booking Validation

**User Story:** As a passenger, I want my booking to be validated against the specific stations I selected, so that I receive accurate fare calculation and seat availability.

#### Acceptance Criteria

1. WHEN a user initiates seat reservation, THE Booking_Service SHALL validate that sourceStationId and destinationStationId exist in the train route
2. WHEN calculating seat availability, THE Seat_Matrix_Service SHALL consider only bookings that overlap with the requested journey segment
3. WHEN confirming a booking, THE Booking_Service SHALL ensure the booking stations match the original reservation request
4. IF invalid station combinations are provided, THEN THE Booking_Service SHALL return a descriptive error message
5. WHEN displaying available seats, THE Seat_Matrix_Service SHALL show seats available for the specific station-to-station segment

### Requirement 2: Comprehensive Seat Validation and Matrix Display

**User Story:** As a passenger, I want to see accurate seat availability and be prevented from selecting invalid seats, so that my booking process is smooth and error-free.

#### Acceptance Criteria

1. WHEN a user selects seats, THE Booking_Service SHALL validate that all requested seats exist in the seat layout for the specified coach type
2. WHEN processing seat selection, THE Booking_Service SHALL verify that the coach labels (e.g., "S1", "S2") are valid for the specific train
3. WHEN validating seat numbers, THE Booking_Service SHALL ensure they fall within the valid range for the coach type
4. IF invalid seat identifiers are provided, THEN THE Booking_Service SHALL return specific error messages indicating which seats are invalid
5. WHEN seat validation fails, THE Booking_Service SHALL suggest valid alternative seats from the same coach type
6. WHEN displaying seat matrix, THE Seat_Matrix_Service SHALL show three distinct states: AVAILABLE (can be selected), LOCKED (confirmed bookings + active reservations by others), and MY_RESERVATION (current user's reservations)
7. WHEN checking seat availability for matrix display, THE Seat_Matrix_Service SHALL include both confirmed bookings and active temporary reservations as unavailable
8. WHEN expired reservations are encountered during matrix generation, THE Seat_Matrix_Service SHALL perform lazy cleanup and mark those seats as available
9. IF a user attempts to select locked seats, THEN THE frontend SHALL prevent selection and show appropriate messaging
10. WHEN a user has existing reservations, THE Seat_Matrix_Service SHALL clearly distinguish them from other locked seats to allow modification

### Requirement 3: Accurate Fare Calculation

**User Story:** As a passenger, I want to pay the correct fare based on my journey distance and coach class, so that I am charged fairly.

#### Acceptance Criteria

1. WHEN calculating fare, THE Fare_Calculator SHALL determine the distance between source and destination stations
2. WHEN computing ticket price, THE Fare_Calculator SHALL apply the formula: Base Fare + (Distance × Rate Per Km)
3. WHEN multiple coach types are available, THE Fare_Calculator SHALL use the rate specific to the selected coach type
4. IF fare data is missing for a route, THEN THE Fare_Calculator SHALL return an error and prevent booking
5. WHEN displaying booking confirmation, THE Booking_Service SHALL show the fare breakdown including base fare and distance charges

### Requirement 4: Concurrency Protection

**User Story:** As a passenger, I want to be protected from booking conflicts when multiple users select the same seats simultaneously, so that my reservation is secure.

#### Acceptance Criteria

1. WHEN multiple users attempt to reserve the same seats simultaneously, THE Booking_Service SHALL allow only the first successful request
2. WHEN checking seat availability, THE Booking_Service SHALL use database-level locking to prevent race conditions
3. WHEN a seat reservation fails due to concurrency, THE Booking_Service SHALL immediately suggest alternative available seats
4. WHEN processing concurrent booking confirmations, THE Booking_Service SHALL ensure atomic transactions to prevent partial bookings
5. IF a concurrency conflict occurs, THEN THE Booking_Service SHALL provide clear error messages and retry options

### Requirement 5: Session Management and Security

**User Story:** As a system administrator, I want proper session validation during booking, so that unauthorized users cannot complete bookings.

#### Acceptance Criteria

1. WHEN a user initiates seat reservation, THE Session_Manager SHALL validate the provided session ID
2. WHEN confirming a booking, THE Booking_Service SHALL verify that the session ID matches the original reservation session
3. WHEN a session expires during booking, THE Booking_Service SHALL clear associated reservations and notify the user
4. IF an invalid session ID is provided, THEN THE Booking_Service SHALL reject the request with an authentication error
5. WHEN session validation fails, THE Session_Manager SHALL log the security event for audit purposes

### Requirement 6: Reservation Timeout Management

**User Story:** As a passenger, I want clear information about my reservation timeout, so that I can complete my booking within the allowed time.

#### Acceptance Criteria

1. WHEN seats are reserved, THE Booking_Service SHALL set a 5-minute expiration timeout
2. WHEN displaying reservation confirmation, THE Booking_Service SHALL show the exact expiration time
3. WHEN reservations expire, THE Seat_Matrix_Service SHALL automatically clean them up when accessed (lazy cleanup)
4. IF a user attempts to confirm an expired reservation, THEN THE Booking_Service SHALL reject the request and clear the expired data
5. WHEN checking reservation status, THE Booking_Service SHALL return accurate time remaining information

### Requirement 7: Alternative Seat Suggestions

**User Story:** As a passenger, I want to receive meaningful seat alternatives when my preferred seats are unavailable, so that I can quickly complete my booking.

#### Acceptance Criteria

1. WHEN requested seats are unavailable, THE Booking_Service SHALL generate alternative seat suggestions
2. WHEN suggesting alternatives, THE Booking_Service SHALL prioritize seats with similar characteristics (window/aisle, berth type)
3. WHEN multiple alternatives exist, THE Booking_Service SHALL return up to 10 suggestions sorted by preference match
4. IF no alternatives are available in the selected coach, THEN THE Booking_Service SHALL suggest seats from other coaches of the same type
5. WHEN displaying alternatives, THE Booking_Service SHALL include seat type and location information

### Requirement 8: Business Rule Validation

**User Story:** As a system administrator, I want comprehensive business rule validation, so that bookings comply with railway policies.

#### Acceptance Criteria

1. WHEN validating journey date, THE Booking_Service SHALL ensure the date is not in the past
2. WHEN checking advance booking limits, THE Booking_Service SHALL enforce maximum advance booking days (typically 120 days)
3. WHEN processing passenger information, THE Booking_Service SHALL validate age limits for different fare categories
4. IF business rules are violated, THEN THE Booking_Service SHALL provide specific error messages explaining the violation
5. WHEN rules change, THE Booking_Service SHALL apply the rules active at the time of booking

### Requirement 9: Data Consistency and Lazy Cleanup

**User Story:** As a system administrator, I want automatic lazy cleanup of expired reservations, so that the system maintains optimal performance without unnecessary background processing.

#### Acceptance Criteria

1. WHEN expired reservations are encountered during seat matrix generation, THE Seat_Matrix_Service SHALL mark them as expired and treat them as available
2. WHEN lazy cleanup occurs, THE Seat_Matrix_Service SHALL update reservation status to 'EXPIRED' in the database
3. WHEN lazy cleanup runs, THE system SHALL ensure no active bookings are affected
4. IF lazy cleanup encounters errors, THEN THE system SHALL log the error but continue processing other reservations
5. WHEN seat availability is checked, THE system SHALL automatically clean up expired reservations without manual intervention

### Requirement 10: Error Handling and User Feedback

**User Story:** As a passenger, I want clear and helpful error messages when booking issues occur, so that I understand what went wrong and how to fix it.

#### Acceptance Criteria

1. WHEN validation errors occur, THE Booking_Service SHALL return specific error messages identifying the problem
2. WHEN system errors happen, THE Booking_Service SHALL provide user-friendly messages without exposing technical details
3. WHEN multiple errors exist, THE Booking_Service SHALL return all validation errors in a single response
4. IF recoverable errors occur, THEN THE Booking_Service SHALL suggest corrective actions
5. WHEN logging errors, THE Booking_Service SHALL include sufficient context for debugging while protecting sensitive data