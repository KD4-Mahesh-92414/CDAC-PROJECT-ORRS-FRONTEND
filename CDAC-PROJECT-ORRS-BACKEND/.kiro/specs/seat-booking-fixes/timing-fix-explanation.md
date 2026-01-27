# Timing Fields Fix - Compilation Error Resolution

## Issue Description
The `getBookingDetails` method had compilation errors on these lines:
```java
booking.getSchedule().getDepartureTime().toString()
booking.getSchedule().getArrivalTime().toString()
```

## Root Cause Analysis

### Problem
The `TrainSchedule` entity does not have `departureTime` and `arrivalTime` fields. Looking at the entity structure:

```java
// TrainSchedule.java - What it actually contains:
@Entity
public class TrainSchedule extends BaseEntity {
    private Train train;
    private LocalDate departureDate;
    private ScheduleStatus status;
    private LocalDateTime actualDepartureTime;  // For tracking delays
    private LocalDateTime actualArrivalTime;   // For tracking delays
    // No base departureTime/arrivalTime fields!
}
```

### Where Timing Data Actually Lives
The timing information is stored in the `TrainRoute` entity:

```java
// TrainRoute.java - Contains the actual timing data:
@Entity
public class TrainRoute extends BaseEntity {
    private Train train;
    private Station station;
    private Integer sequenceNo;
    private LocalTime arrivalTime;    // ✅ This is what we need
    private LocalTime departureTime;  // ✅ This is what we need
    private Integer haltMinutes;
    // ... other fields
}
```

## Solution Implemented

### 1. Created TrainRouteRepository
```java
@Repository
public interface TrainRouteRepository extends JpaRepository<TrainRoute, Long> {
    
    @Query("SELECT tr.departureTime FROM TrainRoute tr WHERE tr.train.id = :trainId AND tr.station.id = :stationId")
    Optional<LocalTime> findDepartureTimeByTrainAndStation(@Param("trainId") Long trainId, @Param("stationId") Long stationId);

    @Query("SELECT tr.arrivalTime FROM TrainRoute tr WHERE tr.train.id = :trainId AND tr.station.id = :stationId")
    Optional<LocalTime> findArrivalTimeByTrainAndStation(@Param("trainId") Long trainId, @Param("stationId") Long stationId);
}
```

### 2. Updated UserBookingServiceImpl
```java
// Fixed getBookingDetails method:
Long trainId = booking.getSchedule().getTrain().getId();
Long sourceStationId = booking.getSourceStation().getId();
Long destinationStationId = booking.getDestinationStation().getId();

String departureTime = trainRouteRepository.findDepartureTimeByTrainAndStation(trainId, sourceStationId)
        .map(time -> time.toString())
        .orElse("N/A");

String arrivalTime = trainRouteRepository.findArrivalTimeByTrainAndStation(trainId, destinationStationId)
        .map(time -> time.toString())
        .orElse("N/A");
```

### 3. Fixed Booking Cancellation Logic
```java
// Fixed cancelBooking method:
LocalTime departureTime = trainRouteRepository.findDepartureTimeByTrainAndStation(trainId, sourceStationId)
        .orElse(LocalTime.of(23, 59)); // Default to end of day if not found

LocalDateTime journeyDateTime = LocalDateTime.of(booking.getJourneyDate(), departureTime);

if (currentDateTime.isAfter(journeyDateTime)) {
    throw new BusinessLogicException("Cannot cancel booking after train departure");
}
```

## Data Flow Explanation

### How Train Timing Works in ORRS:

1. **Train Entity**: Contains basic train info (number, name, source/destination stations)
2. **TrainRoute Entity**: Contains detailed route with timing for each station
3. **TrainSchedule Entity**: Contains daily instances of train runs (specific dates)

### Example Data Structure:
```
Train: 12951 "Mumbai Rajdhani Express"
├── TrainRoute[1]: Mumbai Central (Dep: 16:55, Seq: 1)
├── TrainRoute[2]: Vadodara (Arr: 20:30, Dep: 20:35, Seq: 2)  
├── TrainRoute[3]: Kota (Arr: 01:15, Dep: 01:25, Seq: 3)
└── TrainRoute[4]: New Delhi (Arr: 08:35, Seq: 4)

TrainSchedule: 2025-02-15 (Specific date instance)
├── Train: 12951
├── DepartureDate: 2025-02-15
└── Status: RUNNING
```

### Booking Details Query Logic:
1. Get `trainId` from `booking.schedule.train.id`
2. Get `sourceStationId` from `booking.sourceStation.id`
3. Get `destinationStationId` from `booking.destinationStation.id`
4. Query `TrainRoute` for departure time at source station
5. Query `TrainRoute` for arrival time at destination station

## Benefits of This Approach

### ✅ Accurate Timing
- Gets actual scheduled times from route data
- Handles different departure times for different stations
- Supports complex multi-stop routes

### ✅ Flexible Route Management
- Can handle route changes without affecting bookings
- Supports trains with different timings on different days
- Allows for station-specific timing updates

### ✅ Proper Data Separation
- Schedule = "When does this train run?" (dates)
- Route = "What is the train's path and timing?" (stations + times)
- Booking = "Who booked what seats for which journey?" (passengers + seats)

## Testing the Fix

### Sample API Response (Before Fix - Error):
```
Compilation Error: Cannot resolve method getDepartureTime()
```

### Sample API Response (After Fix - Working):
```json
{
  "routeDetails": {
    "sourceStation": "Mumbai Central",
    "destinationStation": "New Delhi", 
    "departureTime": "16:55",
    "arrivalTime": "08:35"
  }
}
```

## Alternative Approaches Considered

### Option 1: Add timing fields to TrainSchedule ❌
- Would duplicate data from TrainRoute
- Harder to maintain consistency
- Doesn't handle multi-station routes well

### Option 2: Use actualDepartureTime/actualArrivalTime ❌  
- These are for tracking delays, not scheduled times
- May be null for future schedules
- Not the correct business logic

### Option 3: Current solution ✅
- Uses proper data source (TrainRoute)
- Maintains data integrity
- Supports complex routing scenarios

## Files Modified

```
New Files:
└── TrainRouteRepository.java

Modified Files:
├── UserBookingServiceImpl.java
│   ├── Added TrainRouteRepository dependency
│   ├── Fixed getBookingDetails() method
│   └── Fixed cancelBooking() method timing logic
```

The compilation errors are now resolved and the timing data is correctly retrieved from the appropriate source! 🚀