# Railway Reservation System - Developer Documentation

## Component Reference Guide

This document provides technical details for each component in the booking flow.

---

## 📦 Core Components

### BookingContext.jsx

**Location**: `src/contexts/BookingContext.jsx`

**Purpose**: Global state management for the entire booking flow

**State Structure**:

```javascript
{
  searchData: { from: "", to: "", date: "" },
  selectedTrain: { id, number, coaches[], ... },
  selectedSeats: [],
  passengers: [{ name, age, gender, country }],
  fareData: { baseFare, taxes, totalFare }
}
```

**Exposed Functions**:

- `setSearchData(data)` - Update search parameters
- `setSelectedTrain(train)` - Store selected train
- `setSelectedSeats(seats)` - Update seat selection
- `setPassengers(passengers)` - Update passenger list
- `setFareData(fare)` - Update fare details
- `resetBooking()` - Clear all state (called on logout)

**Usage**:

```javascript
import { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";

function MyComponent() {
  const { searchData, setSearchData, passengers } = useContext(BookingContext);
  // Use context values and setters
}
```

---

## 🎨 Layout Components

### HeaderLayout.jsx

**Location**: `src/layouts/HeaderLayout.jsx`

**Purpose**: Main layout wrapper with global navigation, search, and step indicator

**Key Features**:

- Wraps all routes except login/register
- Conditionally renders SearchBar and JourneySteps
- Manages search submission and navigation
- Outlet renders current page content

**Props**: None (uses hooks instead)

**Conditionally Hidden**:

- SearchBar: Hidden on `/`, `/login`, `/register`, `/confirmation`
- JourneySteps: Hidden on `/`, `/login`, `/register`, `/confirmation`

**Search Flow**:

```javascript
handleSearch(newSearchData) {
  // 1. Updates BookingContext.searchData
  setSearchData(newSearchData);
  // 2. Navigates to train search results
  navigate("/trains");
}
```

---

## 🏠 Home & Search Components

### HomePage.jsx

**Location**: `src/components/HomePage.jsx`

**Purpose**: Landing page with hero text and main search form

**Structure**:

- Left side (60%): HeroText + SearchTrain component
- Right side (40%): GPS navigation image

**Props**: None

**Children**:

- `HeroText` - Heading and subheading
- `SearchTrain` - Main search form

### SearchTrain.jsx

**Location**: `src/components/SearchTrain.jsx`

**Purpose**: Home page search form with calendar picker

**Features**:

- From/To station inputs (text)
- Swap stations button
- Calendar date picker with min-date validation
- Validation for empty fields and duplicate stations
- Integrates with BookingContext
- Error display below form

**State**:

```javascript
from: "",                      // Departure station
to: "",                        // Destination station
date: "",                      // Selected date (YYYY-MM-DD)
showCalendar: false,           // Calendar visibility
currentMonth/Year: Date,       // Calendar navigation
errors: { from, to, same, date } // Validation errors
```

**On Submit**:

1. Validates all fields
2. Checks from ≠ to
3. Calls `setSearchData()` with { from, to, date }
4. Navigates to `/trains`

---

## 🚂 Booking Flow Pages

### 1. TrainSearchResults.jsx

**Location**: `src/pages/booking/TrainSearchResults.jsx`

**Purpose**: Display available trains and allow selection

**Route**: `/trains`

**Entry Validation**:

```javascript
useEffect(() => {
  if (!searchData.from || !searchData.to || !searchData.date) {
    navigate("/"); // Redirect if missing search data
  }
}, [searchData]);
```

**Key Sections**:

- **Train List** (2/3 width): Cards showing trains with coaches and fares
- **Filters** (sidebar): Train type, class, price range
- **Journey Summary** (sidebar): Display search criteria and selected train

**Mock Data Structure**:

```javascript
{
  id, number, name,
  departure, arrival, duration,
  departureStation, arrivalStation,
  coaches: [
    { type: "AC 1st Tire", available: 20, fare: 2500 },
    { type: "Sleeper Class", available: 123, fare: 550 },
    { type: "AC Chair Car", available: 180, fare: 1250 }
  ]
}
```

**On Train Selection**:

1. `setSelectedTrain(train)`
2. Navigate to `/seats`

---

### 2. SeatSelection.jsx

**Location**: `src/pages/booking/SeatSelection.jsx`

**Purpose**: Select seats manually or automatically

**Route**: `/seats`

**Entry Validation**:

```javascript
if (!selectedTrain || selectedSeats.length === 0) {
  navigate("/"); // Redirect if invalid
}
```

**Two Modes**:

#### Manual Mode

- **Coach Selector**: Buttons H1, H2, H3, H4
- **Seat Grid**: 6 columns × multiple rows
- **Seat States**:
  - Available: Gray background, clickable
  - Booked: Dark gray, disabled
  - Selected: Violet background, white text

#### Automatic Mode

- **Adult Seats**: Spinner (0-6)
- **Child with Seat**: Spinner (0-6)
- **Child without Seat**: Spinner (0-6)
- **Berth Type**: Radio (Any/Lower/Middle/Upper)

**Fare Calculation**:

```javascript
baseFare = selectedSeats.length * 2500;
taxes = baseFare * 0.05; // 5% tax
totalFare = baseFare + taxes;
```

**On Continue**:

1. Validate seats selected
2. Calculate and `setFareData()`
3. Navigate to `/passengers`

---

### 3. PassengerDetails.jsx

**Location**: `src/pages/booking/PassengerDetails.jsx`

**Purpose**: Collect passenger information

**Route**: `/passengers`

**Entry Validation**:

```javascript
if (!selectedTrain || selectedSeats.length === 0) {
  navigate("/");
}
```

**Auto-Initialization**:

```javascript
useEffect(() => {
  const initPassengers = selectedSeats.map((seat, idx) => ({
    name: "",
    age: "",
    gender: "",
    country: "",
    seatNumber: seat,
  }));
  setPassengers(initPassengers);
}, [selectedSeats]);
```

**Per-Passenger Form**:

- **Gender**: Radio buttons (M/F/Other) - required
- **Name**: Text input - required, alphanumeric + spaces
- **Age**: Number input - required, 1-200 range
- **Country**: Text input - required

**Contact Information Section**:

- **Email**: Text input
  - Required
  - Validation: Regex `/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
  - Error: "Invalid email format"
- **Payment Mode**: Dropdown (UPI/Card/NetBanking) - required

**Fare Display**:

```javascript
Total = passengers.length * 2500 * 1.05
Displayed in blue summary box
```

**On Continue**:

1. Validate all fields populated
2. Validate email format
3. Navigate to `/review`

---

### 4. ReservationReview.jsx

**Location**: `src/pages/booking/ReservationReview.jsx`

**Purpose**: Review all booking details before payment

**Route**: `/review`

**Entry Validation**:

```javascript
if (!selectedTrain || !selectedSeats.length || !passengers.length) {
  navigate("/");
}
```

**Display Sections**:

**Train Card** (Yellow background):

```
[Train Number] [Train Name]
[Departure] → [Arrival]
[Duration] | [Date]
[From Station] → [To Station]
```

**Passenger Review Cards**:

```
For each passenger:
[Name] | [Gender] | [Age] | [Seat #]
₹[Fare per person]
```

**Fare Breakdown**:

```
Base Fare: ₹[baseFare]
Taxes (5%): ₹[taxes]
---
Total: ₹[totalFare]
```

**Action Buttons**:

- **Modify Details**: `navigate("/passengers")`
- **Proceed to Payment**: `navigate("/payment")`

---

### 5. Payment.jsx

**Location**: `src/pages/booking/Payment.jsx`

**Purpose**: Process payment with multiple methods

**Route**: `/payment`

**Entry Validation**:

```javascript
if (!selectedTrain) {
  navigate("/");
}
```

**Payment Methods**:

| Method     | Fields              | Icon |
| ---------- | ------------------- | ---- |
| UPI        | UPI ID              | 📱   |
| Card       | Card #, Expiry, CVV | 💳   |
| NetBanking | Bank dropdown       | 🏦   |
| Wallet     | Wallet dropdown     | 👛   |

**Dynamic Form Rendering**:

```javascript
{
  paymentMethod === "Card" && (
    <>
      <input name="cardNumber" />
      <input name="expiry" />
      <input name="cvv" />
    </>
  );
}
```

**Order Summary Sidebar**:

- Train info
- Passenger count
- Fare breakdown
- Total amount

**Processing Flow**:

1. Click "Process Payment"
2. Show loading state (2-second simulation)
3. Generate bookingRef: "BOOKING" + random 6 digits
4. Call `navigate("/confirmation", { state: { bookingRef } })`

---

### 6. Confirmation.jsx

**Location**: `src/pages/booking/Confirmation.jsx`

**Purpose**: Display booking confirmation

**Route**: `/confirmation`

**Entry Validation**:

```javascript
const { bookingRef } = location.state || {};
if (!bookingRef) {
  navigate("/"); // Redirect if no bookingRef
}
```

**Display Sections**:

**Success Message**:

```
✓ (Green checkmark)
Booking Confirmed!
```

**Booking Reference Card**:

```
[Large violet background]
[BOOKING123456]
Save this for cancellations
```

**Confirmation Details Grid**:
| Label | Value |
|-------|-------|
| Total Amount | ₹2850 |
| Booking Status | ✓ Confirmed (green) |
| Confirmation Email | test@example.com |

**Next Steps Checklist** (4 items):

1. ✓ Email sent to your registered email
2. Download your e-ticket
3. Keep the booking reference safe
4. Reach the station 30 minutes early

**Action Buttons**:

- **View My Bookings**: `/account/bookings`
- **Book Another Train**: `/`

**Info Sections**:

- Important Documents
- Help & Support

---

## 🎯 Component: JourneySteps.jsx

**Location**: `src/components/JourneySteps.jsx`

**Purpose**: Visual step indicator showing booking progress

**Features**:

- 4 steps: Select Train → Select Seat → Passengers → Reservation
- Status indicators: Active (violet) / Completed (green) / Pending (gray)
- Connector lines between steps (colored based on completion)
- Route-aware (automatically highlights based on current URL)
- Hidden on home, auth, and confirmation pages

**Step Mapping**:

```javascript
Step 1: /trains (Select Train)
Step 2: /seats (Select Seat)
Step 3: /passengers (Passenger Details)
Step 4: /review (Reservation Review)
```

**Visual Design**:

- **Active Step**: Violet circle with ring, bold text
- **Completed Step**: Green circle with checkmark
- **Pending Step**: Gray circle
- **Connectors**: Green line if completed, gray if pending

---

## 🔐 Validation Utilities

### Email Validation

```javascript
const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = emailRegex.test(email);
```

### Age Validation (Yup)

```javascript
Yup.number()
  .min(1, "Age must be at least 1")
  .max(200, "Age must not exceed 200")
  .required("Age is required");
```

### Phone Validation

```javascript
const phoneRegex = /^[0-9]{10}$/;
const isValidPhone = phoneRegex.test(phone);
```

---

## 🌐 Routing Reference

| Route           | Component          | Public | Layout                      |
| --------------- | ------------------ | ------ | --------------------------- |
| `/`             | HomePage           | ✓      | HeaderLayout (no SearchBar) |
| `/login`        | Login              | ✓      | None                        |
| `/register`     | Register           | ✓      | None                        |
| `/trains`       | TrainSearchResults | ✗      | HeaderLayout                |
| `/seats`        | SeatSelection      | ✗      | HeaderLayout                |
| `/passengers`   | PassengerDetails   | ✗      | HeaderLayout                |
| `/review`       | ReservationReview  | ✗      | HeaderLayout                |
| `/payment`      | Payment            | ✗      | HeaderLayout                |
| `/confirmation` | Confirmation       | ✓      | HeaderLayout (no SearchBar) |

---

## 🎨 Tailwind Theme

### Primary Colors

```
Primary: violet-600 (#7C3AED)
Dark: violet-700 (#6D28D9)
Light: violet-50 (#F5F3FF)
Border: violet-200 (#DDD6FE)
```

### Common Classes

```
Button: px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-700
Card: rounded-lg shadow-lg border border-violet-200 p-6
Input: rounded-md border border-gray-300 focus:ring-2 focus:ring-violet-500
Error: text-red-600 text-sm
Success: text-green-600
```

---

## 📡 Mock Data Reference

### Train Example

```javascript
{
  id: 1,
  number: "15065",
  name: "Nanded Panvel Express",
  departure: "17:45",
  arrival: "12:10",
  duration: "6.25 Hrs",
  departureStation: "Hujur Sahib Nanded Station",
  arrivalStation: "Pune Railway Station",
  coaches: [
    { type: "AC 1st Tire", available: 20, fare: 2500 },
    { type: "Sleeper Class", available: 123, fare: 550 },
    { type: "AC Chair Car", available: 180, fare: 1250 }
  ]
}
```

### Passenger Example

```javascript
{
  name: "John Doe",
  age: 30,
  gender: "M",
  country: "India",
  seatNumber: "H1-01"
}
```

### Fare Calculation Example

```javascript
// For 2 seats
baseFare = 2 * 2500 = 5000
taxes = 5000 * 0.05 = 250
totalFare = 5250

// For 3 seats
baseFare = 3 * 2500 = 7500
taxes = 7500 * 0.05 = 375
totalFare = 7875
```

---

## 🐛 Error Messages

### Common Errors & Fixes

| Error                              | Cause               | Solution                          |
| ---------------------------------- | ------------------- | --------------------------------- |
| "Cannot read 'searchData' of null" | Context not wrapped | Ensure BookingProvider in App.jsx |
| "searchData.from is undefined"     | Missing from state  | Check setSearchData called        |
| Blank seat grid                    | No selectedTrain    | Validate train selection          |
| Form not submitting                | Validation failing  | Check error state in console      |
| "bookingRef" is null               | No location.state   | Pass state from Payment page      |

---

## 🔄 Data Flow Diagram

```
HomePage (SearchTrain)
    ↓
setSearchData({from, to, date})
    ↓
navigate("/trains")
    ↓
TrainSearchResults
    ↓
setSelectedTrain(train)
    ↓
navigate("/seats")
    ↓
SeatSelection
    ↓
setSelectedSeats([...])
setFareData({...})
    ↓
navigate("/passengers")
    ↓
PassengerDetails
    ↓
setPassengers([...])
    ↓
navigate("/review")
    ↓
ReservationReview
    ↓
navigate("/payment")
    ↓
Payment
    ↓
navigate("/confirmation", { state: { bookingRef } })
    ↓
Confirmation
    ↓
navigate("/") [Book Another Train]
or
navigate("/account/bookings") [View Bookings]
```

---

## 💾 Local Storage (Optional)

To persist booking state on refresh, add:

```javascript
// In BookingContext.jsx
useEffect(() => {
  localStorage.setItem(
    "booking",
    JSON.stringify({
      searchData,
      selectedTrain,
      selectedSeats,
      passengers,
      fareData,
    })
  );
}, [searchData, selectedTrain, selectedSeats, passengers, fareData]);

// On mount
useEffect(() => {
  const saved = localStorage.getItem("booking");
  if (saved) {
    const data = JSON.parse(saved);
    setSearchData(data.searchData);
    // ... restore other state
  }
}, []);
```

---

## 🚀 Performance Tips

1. **Lazy Loading**: All booking pages lazy-loaded with Suspense
2. **Memoization**: Wrap expensive components with `useMemo`
3. **Debouncing**: Debounce search input if API integration added
4. **Image Optimization**: Use `webp` format for images
5. **Bundle Size**: Current size ~250KB, optimize if > 500KB

---

**Last Updated**: 2024
**Status**: ✅ Production Ready
