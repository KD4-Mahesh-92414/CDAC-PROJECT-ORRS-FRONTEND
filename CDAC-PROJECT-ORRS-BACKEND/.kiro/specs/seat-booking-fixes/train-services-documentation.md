# Train Services Implementation Documentation

## Overview
This document describes the implementation of additional train services including PNR status checking, train status monitoring, admin dashboard statistics, and automated train scheduling.

## Services Implemented

### 1. PNR Status Service

**Purpose**: Allow users to check their booking status using PNR number

**Files Created**:
- `PNRStatusService.java` - Service interface
- `PNRStatusServiceImpl.java` - Service implementation
- `PNRStatusController.java` - REST controller

**Endpoint**:
```
POST /pnr/status
```

**Request**:
```json
{
    "pnrNumber": "2025012701"
}
```

**Response**:
```json
{
    "message": "PNR status retrieved successfully",
    "status": "SUCCESS",
    "data": {
        "pnrNumber": "2025012701",
        "bookingStatus": "CONFIRMED",
        "journeyDate": "2025-02-15",
        "bookingDate": "2025-01-27T10:30:00",
        "totalFare": 1500.00,
        "trainInfo": {
            "trainNumber": "12345",
            "trainName": "Rajdhani Express",
            "coachType": "AC 2-Tier"
        },
        "routeInfo": {
            "sourceStation": "New Delhi",
            "destinationStation": "Mumbai Central",
            "departureTime": "16:30:00",
            "arrivalTime": "08:45:00",
            "distance": "1384 km"
        },
        "passengers": [
            {
                "name": "John Doe",
                "age": 30,
                "gender": "MALE",
                "seatNumber": "A1-15",
                "status": "CONFIRMED"
            }
        ]
    }
}
```

**Features**:
- Validates 10-digit PNR format
- Retrieves complete booking details
- Shows train route information with timing
- Lists all passengers with seat assignments
- Public endpoint (no authentication required)

### 2. Train Status Service

**Purpose**: Show cancelled and rescheduled trains to users

**Files Created**:
- `TrainStatusService.java` - Service interface
- `TrainStatusServiceImpl.java` - Service implementation
- `TrainStatusController.java` - REST controller

**Endpoint**:
```
GET /trains/cancelled-rescheduled
```

**Response**:
```json
{
    "message": "Cancelled and rescheduled trains retrieved successfully",
    "status": "SUCCESS",
    "data": [
        {
            "scheduleId": 123,
            "trainNumber": "12345",
            "trainName": "Rajdhani Express",
            "route": "New Delhi → Mumbai Central",
            "scheduledDate": "2025-01-28",
            "status": "CANCELLED",
            "reason": "Technical issues",
            "remarks": "Passengers will be accommodated in next available train"
        }
    ]
}
```

**Features**:
- Shows trains with CANCELLED or RESCHEDULED status
- Includes reason and remarks for status change
- Filters from current date onwards
- Public endpoint (no authentication required)

### 3. Admin Dashboard Service

**Purpose**: Provide key statistics for admin dashboard

**Files Created**:
- `AdminDashboardService.java` - Service interface
- `AdminDashboardServiceImpl.java` - Service implementation
- `AdminDashboardController.java` - REST controller

**Endpoint**:
```
GET /admin/dashboard/stats
```

**Response**:
```json
{
    "message": "Dashboard statistics retrieved successfully",
    "status": "SUCCESS",
    "data": {
        "totalActiveTrains": 150,
        "totalActiveStations": 75,
        "totalScheduledTrains": 9000,
        "totalBookingsToday": 45,
        "totalUsersRegistered": 1250
    }
}
```

**Features**:
- Counts active trains and stations
- Shows scheduled trains from current date
- Displays today's booking count
- Shows total registered users
- Requires ADMIN role authentication

### 4. Train Scheduling Service

**Purpose**: Automatically schedule trains based on their running days

**Files Created**:
- `TrainSchedulingService.java` - Service interface
- `TrainSchedulingServiceImpl.java` - Service implementation with cron job

**Features**:
- **Initial Setup**: `scheduleTrainsForNext60Days()` - Schedules all active trains for next 60 days
- **Daily Cron Job**: Runs at 12:01 AM daily to schedule trains for 60 days ahead
- **Smart Parsing**: Parses `daysOfRun` string (e.g., "Mon,Wed,Fri", "Daily")
- **Duplicate Prevention**: Checks existing schedules before creating new ones
- **Optimized**: After initial setup, only schedules one additional day per night

**Days of Run Format Support**:
- Individual days: "Mon", "Tuesday", "WED"
- Multiple days: "Mon,Wed,Fri"
- Daily trains: "Daily"
- Full day names: "Monday,Wednesday,Friday"

**Cron Schedule**: `0 1 0 * * ?` (12:01 AM daily)

### Repository Updates

### BookingRepository
- Added `findByPnrNumberWithDetails()` for PNR status checking
- Added `countBookingsByDate()` for admin dashboard

### TrainScheduleRepository
- Added `findCancelledAndRescheduledTrains()` for train status
- Added `existsByTrainIdAndDate()` for duplicate prevention
- Added `countScheduledTrainsFromDate()` for admin dashboard

### TrainRepository
- Added `countByTrainStatus()` for admin dashboard
- Added `findAllActiveTrains()` for scheduling service

### TrainRouteRepository
- Added `findByTrainIdOrderBySequenceNo()` for PNR status timing details

### StationRepository
- Added `countActiveStations()` for admin dashboard

### UserRepository
- Added `countActiveUsers()` for admin dashboard

## PNR Generation Logic

The system uses a 10-digit PNR format: `YYYYMMDDXX`
- `YYYY`: Current year
- `MM`: Current month
- `DD`: Current day
- `XX`: Random 2-digit number (10-99)

Example: `2025012701` (Generated on January 27, 2025)

## Error Handling

All services follow the existing error handling patterns:
- `ResourceNotFoundException` for missing data
- `BusinessLogicException` for business rule violations
- Proper validation using `@Valid` annotations
- Consistent API response format

## Security

- PNR Status: Public endpoint (no authentication)
- Train Status: Public endpoint (no authentication)
- Admin Dashboard: Requires ADMIN role (`@PreAuthorize("hasRole('ADMIN')")`)

## Logging

The scheduling service includes comprehensive logging:
- Info logs for successful operations
- Warn logs for unknown day formats
- Detailed counts of scheduled trains

## Performance Considerations

- All read operations use `@Transactional(readOnly = true)`
- Efficient queries with proper joins and projections
- Batch operations for train scheduling
- Duplicate prevention to avoid unnecessary database operations

## Testing Recommendations

1. **PNR Status**: Test with valid/invalid PNR numbers
2. **Train Status**: Verify filtering by date and status
3. **Admin Dashboard**: Check all count queries
4. **Scheduling**: Test with different `daysOfRun` formats
5. **Cron Job**: Verify daily execution and duplicate prevention

## Future Enhancements

1. **PNR Status**: Add real-time train tracking
2. **Train Status**: Add email notifications for affected passengers
3. **Admin Dashboard**: Add more detailed analytics
4. **Scheduling**: Add holiday calendar integration
5. **Performance**: Add caching for frequently accessed data