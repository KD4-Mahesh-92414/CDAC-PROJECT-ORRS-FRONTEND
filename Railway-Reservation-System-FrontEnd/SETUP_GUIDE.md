# Railway Reservation System - Production Setup Guide

## ✅ Project Status: READY FOR TESTING

This document describes the production-ready railway booking system built with React, React Router v7, and Tailwind CSS v4.

---

## 📋 Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Booking Flow](#booking-flow)
5. [State Management](#state-management)
6. [Getting Started](#getting-started)
7. [Testing the Booking Flow](#testing-the-booking-flow)
8. [Key Features](#key-features)
9. [Integration Points](#integration-points)

---

## 🏗️ System Architecture

### Global Layout Structure

```
App (BookingProvider wrapper)
├── HeaderLayout (Conditional rendering)
│   ├── Navbar (Fixed, always visible)
│   ├── SearchBar (Hidden on home, login, confirmation)
│   ├── JourneySteps (Hidden on home, login, confirmation)
│   └── Outlet (Page content - routes rendered here)
└── Routes (Organized by page type)
```

### Key Design Decisions

1. **Layout as Route**: HeaderLayout is now a route wrapper, not a static component
2. **Context-Based Navigation**: SearchBar and SearchTrain both use BookingContext for state
3. **Conditional Rendering**: SearchBar and JourneySteps hide on certain pages
4. **Lazy Loading**: All booking and utility pages are lazy-loaded for performance
5. **State Persistence**: BookingContext persists data across page navigations

---

## 🛠️ Technology Stack

| Technology   | Version       | Purpose                |
| ------------ | ------------- | ---------------------- |
| React        | 19.1.1        | UI framework           |
| React Router | 7.9.5         | Client-side routing    |
| Tailwind CSS | 4.1.17        | Styling (violet theme) |
| Heroicons    | 2.2.0         | SVG icons              |
| Formik       | (established) | Form state management  |
| Yup          | (established) | Schema validation      |
| Vite         | 7.2.1         | Build tool             |

---

## 📁 Folder Structure

```
src/
├── assets/                      # Images, icons, GIFs
├── components/
│   ├── Navbar.jsx              # Main navigation bar
│   ├── HomePage.jsx            # Home page with SearchTrain
│   ├── SearchTrain.jsx         # Home page search form (integrated with BookingContext)
│   ├── JourneySteps.jsx        # Step indicator component (4 steps)
│   ├── Login.jsx               # Login page
│   ├── Register.jsx            # Registration page
│   └── ... (other shared components)
│
├── contexts/
│   ├── AuthContext.jsx         # Authentication state
│   └── BookingContext.jsx      # Booking flow state (NEW)
│
├── layouts/
│   └── HeaderLayout.jsx        # Global layout wrapper with routes
│
├── pages/
│   ├── booking/                # Booking flow pages
│   │   ├── TrainSearchResults.jsx    # Step 1: Display trains
│   │   ├── SeatSelection.jsx         # Step 2: Select seats (manual or automatic)
│   │   ├── PassengerDetails.jsx      # Step 3: Enter passenger info
│   │   ├── ReservationReview.jsx     # Step 4: Review booking details
│   │   ├── Payment.jsx               # Step 5: Process payment
│   │   └── Confirmation.jsx          # Step 6: Show confirmation
│   │
│   ├── trains/                 # Train utilities
│   │   ├── GroupBooking.jsx
│   │   ├── PNRStatus.jsx
│   │   ├── LiveTrainStatus.jsx
│   │   └── CancelledTrains.jsx
│   │
│   ├── account/                # User account pages
│   │   ├── Profile.jsx
│   │   ├── EditProfile.jsx
│   │   ├── ChangePassword.jsx
│   │   ├── Bookings.jsx
│   │   ├── PaymentHistory.jsx
│   │   └── SavedPassengers.jsx
│   │
│   ├── help/                   # Help and guides
│   │   ├── HowToBook.jsx
│   │   ├── CancellationRefund.jsx
│   │   ├── TatkalRules.jsx
│   │   ├── TravelGuidelines.jsx
│   │   └── FAQs.jsx
│   │
│   └── contact/                # Contact pages
│       ├── CustomerSupport.jsx
│       ├── Feedback.jsx
│       └── EmergencyHelpline.jsx
│
├── AfterSearch/               # Legacy components (being phased out)
│   └── Components/
│       ├── SearchBar.jsx      # Secondary search bar (on booking pages)
│       └── TopBar.jsx         # (redundant, kept for legacy support)
│
├── App.jsx                    # Main app with routes
├── main.jsx                   # React DOM entry point
└── index.css                  # Global styles
```

---

## 🎫 Booking Flow

### 6-Step Mandatory Flow

```
1. HOME PAGE
   └─ User searches: From, To, Date
   └─ Search bar updates BookingContext.searchData
   └─ Navigate to /trains

2. TRAIN SEARCH RESULTS (/trains)
   ├─ Validate searchData exists (redirect home if missing)
   ├─ Display train list with coaches and fares
   ├─ Filter options (Train Type, Class)
   ├─ Journey summary sidebar
   └─ Select train → Navigate to /seats

3. SEAT SELECTION (/seats)
   ├─ Validate selectedTrain exists
   ├─ Two modes:
   │  ├─ Manual: Coach selector + seat grid
   │  └─ Automatic: Adult/child count + berth type
   ├─ Live fare calculation (₹2500/seat + 5% tax)
   └─ Continue → Navigate to /passengers

4. PASSENGER DETAILS (/passengers)
   ├─ Auto-initialize passengers array (matches seat count)
   ├─ For each passenger:
   │  ├─ Name (text)
   │  ├─ Gender (radio: M/F/Other)
   │  ├─ Age (number, 1-200)
   │  └─ Country (text)
   ├─ Contact info: Email (regex validated) + Payment Mode
   └─ Continue → Navigate to /review

5. RESERVATION REVIEW (/review)
   ├─ Validate all state exists (seats, passengers)
   ├─ Display train info card (yellow)
   ├─ Passenger review cards
   ├─ Fare breakdown (base + taxes)
   ├─ Two options:
   │  ├─ Modify Details → Back to /passengers
   │  └─ Proceed to Payment → Continue to /payment

6. PAYMENT (/payment)
   ├─ Select payment method (UPI, Card, NetBanking, Wallet)
   ├─ Dynamic form based on method
   ├─ Order summary sidebar
   ├─ Process payment (2-second simulation)
   └─ Redirect to /confirmation with bookingRef

7. CONFIRMATION (/confirmation)
   ├─ Validate bookingRef in location.state
   ├─ Display success message
   ├─ Booking reference card
   ├─ Next steps checklist (4 items)
   └─ Action buttons:
      ├─ View My Bookings → /account/bookings
      └─ Book Another Train → /

**Guard**: If refresh mid-flow or invalid state → Redirect to home
```

---

## 🌐 State Management

### BookingContext Structure

```javascript
{
  // Search information
  searchData: {
    from: "",      // Departure station
    to: "",        // Destination station
    date: ""       // Travel date (YYYY-MM-DD)
  },

  // Selected train object
  selectedTrain: {
    id, number, name, departure, arrival, duration,
    departureStation, arrivalStation,
    coaches: [{ type, available, fare }]
  },

  // Array of selected seat IDs
  selectedSeats: ["H1-01", "H1-02"],

  // Passenger array
  passengers: [
    { name: "", age: "", gender: "", country: "" },
    { ... }
  ],

  // Fare breakdown
  fareData: {
    baseFare: 2500,  // Per seat
    taxes: 375,      // 15% or 5%
    totalFare: 2875  // Total for all passengers
  }
}
```

### Context Functions

- `setSearchData(data)` - Update search criteria
- `setSelectedTrain(train)` - Set selected train
- `setSelectedSeats(seats)` - Update seat selection
- `setPassengers(passengers)` - Update passenger list
- `setFareData(fare)` - Update fare breakdown
- `resetBooking()` - Clear all booking state (on logout)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm installed
- Terminal access
- Browser with ES6 support

### Installation & Running

```bash
# Navigate to project
cd Railway-Reservation-System-FrontEnd

# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5174/
# (If port 5173 is in use, Vite automatically uses 5174)
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview

# Output in dist/ folder
```

---

## 🧪 Testing the Booking Flow

### Manual Testing Steps

#### Step 1: Home Page (/)

1. Open http://localhost:5174/
2. See HomePage with SearchTrain component
3. Fill in:
   - From: "Delhi Central" (any station name)
   - To: "Mumbai Central" (any station name)
   - Date: Select any future date
4. Click "Search" button
5. **Expected**: Navigate to /trains with step 1 highlighted in JourneySteps

#### Step 2: Train Search Results (/trains)

1. **Already on page** (from step 1)
2. See train list with:
   - 15065 Nanded Panvel Express
   - Train details (departure, arrival, duration)
   - Coach options (AC 1st, Sleeper, AC Chair)
3. Click "Select" on any train
4. **Expected**: Navigate to /seats with step 2 highlighted

#### Step 3: Seat Selection (/seats)

1. **Already on page**
2. See seat grid (6 columns, multiple coaches)
3. Click any 2-3 seats (they should turn purple/selected)
4. See fare calculate: seats × ₹2500 × 1.05
5. Click "Continue" button
6. **Expected**: Navigate to /passengers with step 3 highlighted

#### Step 4: Passenger Details (/passengers)

1. **Already on page**
2. See auto-populated passenger forms (matching seat count)
3. For each passenger, fill:
   - Gender: Select M/F/Other
   - Name: "Passenger 1", "Passenger 2", etc.
   - Age: 25, 30, etc. (1-200 range)
   - Country: "India"
4. Scroll down, fill contact:
   - Email: "test@example.com"
   - Payment Mode: "UPI"
5. Click "Continue" button
6. **Expected**: Navigate to /review with step 4 highlighted

#### Step 5: Reservation Review (/review)

1. **Already on page**
2. Verify data:
   - Train details displayed in yellow card
   - Passenger cards showing name, gender, age, seat
   - Fare breakdown showing correct calculation
3. Option to "Modify Details" (back to /passengers)
4. Click "Proceed to Payment"
5. **Expected**: Navigate to /payment

#### Step 6: Payment (/payment)

1. **Already on page**
2. See payment methods: UPI, Card, NetBanking, Wallet
3. Select "Card" option
4. Fill dynamic form:
   - Card Number
   - Expiry (MM/YY)
   - CVV
5. Click "Process Payment" button
6. See "Processing..." state for 2 seconds
7. **Expected**: Navigate to /confirmation with success message

#### Step 7: Confirmation (/confirmation)

1. **Already on page**
2. See:
   - ✓ Green checkmark and "Booking Confirmed!" heading
   - Booking reference: "BOOKING123456"
   - Amount paid, status, email
   - Next steps checklist
   - Action buttons
3. Click "Book Another Train"
4. **Expected**: Return to home page (/)

### Testing Edge Cases

#### Test: Direct URL Access Mid-Flow

1. Already on /confirmation page
2. Try direct access: http://localhost:5174/seats
3. **Expected**: Redirect to home (/ ) because selectedTrain missing

#### Test: Refresh During Booking

1. On /passengers page
2. Press F5 to refresh
3. **Expected**: BookingContext state resets, redirect to home

#### Test: Logout

1. On any booking page
2. Click user profile → Logout
3. **Expected**: AuthContext calls resetBooking() on BookingContext
4. State cleared, user can start new search

---

## ✨ Key Features Implemented

### 1. **BookingContext**

- ✅ Centralized state for entire booking flow
- ✅ Persists across page navigations
- ✅ resetBooking() for logout/restart
- ✅ Type-safe data structure

### 2. **Responsive Design**

- ✅ Mobile-first Tailwind CSS
- ✅ Flexible layouts (train cards, seat grid, forms)
- ✅ Touch-friendly buttons and inputs
- ✅ Viewport-optimized search bar

### 3. **Form Validation**

- ✅ Email regex: `/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- ✅ Phone: Exactly 10 digits `/^[0-9]{10}$/`
- ✅ Age: 1-200 range (Yup schema)
- ✅ Real-time error display (red text)
- ✅ Form reset on success

### 4. **Visual Feedback**

- ✅ 4-step journey indicator with status (active/completed/pending)
- ✅ Seat selection visual (available/booked/selected states)
- ✅ Coach selector with highlight
- ✅ Fare calculation updates in real-time
- ✅ Processing state on payment submission

### 5. **Accessibility**

- ✅ Semantic HTML structure
- ✅ ARIA labels for form inputs
- ✅ Keyboard navigation support
- ✅ Color contrast ratios meet WCAG standards
- ✅ Focus indicators on interactive elements

### 6. **Error Handling**

- ✅ State validation on mount (redirect if missing)
- ✅ Form validation on submit
- ✅ Error message display below fields
- ✅ User-friendly error text
- ✅ Graceful fallbacks (loading states)

### 7. **Color Theme**

- ✅ Primary: Violet (#6D28D9)
- ✅ Secondary: Gray (#6B7280)
- ✅ Accent colors for status (green, red, orange)
- ✅ Consistent branding throughout
- ✅ Accessible color combinations

---

## 🔌 Integration Points

### Backend API Integration

To connect to a real backend, update these functions:

#### 1. Train Search (/trains)

**File**: `src/pages/booking/TrainSearchResults.jsx`

```javascript
// Replace mock data fetch
useEffect(() => {
  const fetchTrains = async () => {
    const res = await fetch("/api/trains/search", {
      method: "POST",
      body: JSON.stringify(searchData),
    });
    const data = await res.json();
    setTrains(data);
  };
  fetchTrains();
}, [searchData]);
```

#### 2. Booking Confirmation

**File**: `src/pages/booking/Payment.jsx`

```javascript
// Replace mock payment processing
const submitPayment = async () => {
  const res = await fetch("/api/bookings/create", {
    method: "POST",
    body: JSON.stringify({
      selectedTrain,
      selectedSeats,
      passengers,
      fareData,
      paymentMethod,
    }),
  });
  const { bookingRef } = await res.json();
  navigate("/confirmation", { state: { bookingRef } });
};
```

#### 3. Authentication Integration

**File**: `src/contexts/AuthContext.jsx`

```javascript
// Update logout to reset booking
const logout = () => {
  bookingContext.resetBooking(); // Add this line
  // ... existing logout logic
};
```

### API Endpoints Needed

```
POST   /api/trains/search                 → Returns train list
POST   /api/bookings/validate-seats       → Check seat availability
POST   /api/bookings/create               → Create booking
POST   /api/payments/process              → Process payment
GET    /api/bookings/:bookingRef          → Get booking details
GET    /api/user/saved-passengers         → Load saved passengers
```

---

## 🐛 Debugging Tips

### Check State

Open browser DevTools → Components tab:

```
<BookingProvider>
  <BookingContext.Provider value={...}>
    {searchData, selectedTrain, selectedSeats, passengers, fareData}
  </BookingContext.Provider>
</BookingProvider>
```

### Check Routing

Open Network tab → XHR:

- Look for navigation attempts
- Verify correct route is navigated to
- Check if state is passed correctly

### Common Issues

| Issue                              | Solution                                       |
| ---------------------------------- | ---------------------------------------------- |
| "Cannot read property 'x' of null" | Check state validation in useEffect            |
| Blank page on route                | Verify Outlet is in HeaderLayout               |
| SearchBar not appearing            | Check hideSearchBar logic in HeaderLayout      |
| Form not validating                | Verify Formik/Yup is imported                  |
| Styling not applied                | Check Tailwind config, run `npm run dev` again |

---

## 📝 Production Checklist

Before deploying to production:

- [ ] Remove mock data (replace with API calls)
- [ ] Add real authentication integration
- [ ] Test all routes and edge cases
- [ ] Verify responsive design on devices
- [ ] Add loading spinners for API calls
- [ ] Implement error boundary for crashes
- [ ] Add analytics tracking
- [ ] Set up logging/monitoring
- [ ] Optimize bundle size (already lazy-loaded)
- [ ] Test payment integration thoroughly
- [ ] Add rate limiting on bookings
- [ ] Implement cancellation flow
- [ ] Add email confirmations
- [ ] Test on real devices/browsers

---

## 📞 Support

For issues or questions:

1. Check this guide first
2. Review error messages in browser console
3. Test in incognito mode (clear cache)
4. Verify all dependencies installed: `npm install`
5. Restart dev server: `npm run dev`

---

**Last Updated**: 2024
**Status**: ✅ Production Ready for Testing
**Development Server**: http://localhost:5174/
