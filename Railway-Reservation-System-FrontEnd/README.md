# 🚆 Railway Reservation System - Frontend

A production-ready railway booking application built with React 19, React Router v7, and Tailwind CSS v4. This system provides a complete end-to-end booking experience similar to IRCTC and Russian Railways portals.

## ✨ Key Features

- **6-Step Booking Flow**: Home → Train Search → Seat Selection → Passenger Details → Review → Payment → Confirmation
- **Real-Time Validation**: Form validation with helpful error messages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Centralized BookingContext for entire flow
- **Hot Reload Development**: Vite HMR for instant updates
- **Production Ready**: Lazy-loaded pages, optimized bundle, error handling

## 🚀 Quick Start

```bash
# Clone/Navigate to project
cd Railway-Reservation-System-FrontEnd

# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5174/
```

## 📦 Technology Stack

- **React** 19.1.1 - UI framework
- **React Router** 7.9.5 - Client-side routing
- **Tailwind CSS** 4.1.17 - Styling
- **Heroicons** 2.2.0 - Icons
- **Vite** 7.2.1 - Build tool & dev server
- **Formik** (established) - Form management
- **Yup** (established) - Schema validation

## 📁 Project Structure

```
src/
├── components/           # Shared components
│   ├── Navbar.jsx       # Main navigation
│   ├── HomePage.jsx     # Home page
│   ├── SearchTrain.jsx  # Search form (integrated with BookingContext)
│   └── JourneySteps.jsx # Step indicator
│
├── contexts/
│   ├── AuthContext.jsx  # Authentication
│   └── BookingContext.jsx # Booking flow state
│
├── layouts/
│   └── HeaderLayout.jsx # Main layout wrapper
│
├── pages/
│   ├── booking/         # 6-step booking flow
│   │   ├── TrainSearchResults.jsx
│   │   ├── SeatSelection.jsx
│   │   ├── PassengerDetails.jsx
│   │   ├── ReservationReview.jsx
│   │   ├── Payment.jsx
│   │   └── Confirmation.jsx
│   │
│   ├── trains/          # Train utilities
│   ├── account/         # User account
│   ├── help/            # Help guides
│   └── contact/         # Contact pages
│
└── App.jsx             # Main app with routes
```

## 🎫 Booking Flow

### Step-by-Step Journey

1. **Home (/)**

   - User enters: From, To, Date
   - SearchTrain component validates input
   - Navigates to train search results

2. **Train Search Results (/trains)**

   - Displays available trains with coaches and fares
   - Filter options available
   - User selects a train and proceeds to seat selection

3. **Seat Selection (/seats)**

   - Two modes: Manual (seat grid) or Automatic (count-based)
   - Live fare calculation (₹2500 per seat + 5% tax)
   - User selects seats and proceeds

4. **Passenger Details (/passengers)**

   - Form for each selected seat
   - Fields: Name, Age, Gender, Country
   - Contact info: Email (validated) + Payment Mode
   - Auto-populated passenger array

5. **Reservation Review (/review)**

   - Review train details
   - Review passenger information
   - View fare breakdown
   - Option to modify or proceed to payment

6. **Payment (/payment)**

   - Multiple payment methods: UPI, Card, NetBanking, Wallet
   - Dynamic form based on selected method
   - 2-second processing simulation
   - Generates booking reference

7. **Confirmation (/confirmation)**
   - Success page with booking details
   - Booking reference for future reference
   - Next steps checklist
   - Options to view bookings or book another train

## 🌐 State Management (BookingContext)

```javascript
// Booking state structure
{
  // Search criteria
  searchData: {
    from: "",      // Departure station
    to: "",        // Destination station
    date: ""       // Travel date (YYYY-MM-DD)
  },

  // Selected train
  selectedTrain: {
    id, number, name, departure, arrival,
    coaches: [{ type, available, fare }]
  },

  // Selected seats
  selectedSeats: ["H1-01", "H1-02", "H1-03"],

  // Passenger information
  passengers: [
    { name: "John", age: 30, gender: "M", country: "India" },
    { ... }
  ],

  // Fare details
  fareData: {
    baseFare: 7500,
    taxes: 375,
    totalFare: 7875
  }
}
```

**Key Methods:**

- `setSearchData()` - Update search parameters
- `setSelectedTrain()` - Store selected train
- `setSelectedSeats()` - Update seat selection
- `setPassengers()` - Update passenger list
- `setFareData()` - Update fare information
- `resetBooking()` - Clear all state (on logout)

## ✅ Validation Rules

| Field        | Rule             | Error Message               |
| ------------ | ---------------- | --------------------------- |
| Email        | Regex validation | "Invalid email format"      |
| Phone        | 10 digits        | "Must be 10 digits"         |
| Age          | 1-200 range      | "Age must be 1-200"         |
| Name         | Required         | "Name is required"          |
| From Station | Required         | "Please select departure"   |
| To Station   | Required         | "Please select destination" |
| From ≠ To    | Must differ      | "Cannot be same station"    |

## 🎨 Color Theme

Primary violet theme throughout:

- **Primary**: `#6D28D9` (violet-600)
- **Dark**: `#7C3AED` (violet-700)
- **Light**: `#F5F3FF` (violet-50)
- **Success**: `#16A34A` (green-600)
- **Error**: `#DC2626` (red-600)

## 📱 Features

### Responsive Design

- Mobile-first approach
- Tablets and desktop optimized
- Touch-friendly buttons
- Flexible layouts

### Form Validation

- Real-time validation on blur
- Helpful error messages
- Required field indicators
- Format validation (email, phone)

### User Experience

- Step indicator showing progress
- Conditional rendering of navigation
- Loading states
- Error handling with redirects
- Smooth transitions

### Performance

- Lazy-loaded pages
- Code splitting with Suspense
- Optimized bundle size
- HMR (Hot Module Reload) in dev

## 🔌 Integration with Backend

To connect to a real backend API:

### 1. Train Search

**File**: `src/pages/booking/TrainSearchResults.jsx`

```javascript
// Replace mock data with API call
const fetchTrains = async () => {
  const res = await fetch("/api/trains/search", {
    method: "POST",
    body: JSON.stringify(searchData),
  });
  const trains = await res.json();
  setTrains(trains);
};
```

### 2. Booking Confirmation

**File**: `src/pages/booking/Payment.jsx`

```javascript
// Replace mock payment with real API
const submitPayment = async () => {
  const res = await fetch("/api/bookings/create", {
    method: "POST",
    body: JSON.stringify({ selectedTrain, selectedSeats, passengers }),
  });
  const { bookingRef } = await res.json();
  navigate("/confirmation", { state: { bookingRef } });
};
```

### 3. Authentication

**File**: `src/contexts/AuthContext.jsx`

```javascript
// Clear booking state on logout
const logout = () => {
  bookingContext.resetBooking();
  // ... logout logic
};
```

## 🐛 Testing

### Test the Complete Booking Flow

1. Open http://localhost:5174/
2. Fill search form: From=Delhi, To=Mumbai, Date=Future
3. Select a train from the results
4. Select 2-3 seats (manual or automatic mode)
5. Fill passenger details for each seat
6. Review booking information
7. Select payment method and process
8. See confirmation page with booking reference

### Test Edge Cases

```
✓ Refresh mid-booking → Redirects to home
✓ Direct URL to /seats → Redirects to home if no train selected
✓ Invalid email → Shows error
✓ Missing fields → Shows validation errors
✓ Same from/to → Shows error
```

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup and testing guide
- **[DEVELOPER_DOCS.md](DEVELOPER_DOCS.md)** - Technical component reference
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference card

## 🚀 Building for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview

# Output in dist/ folder ready for deployment
```

## 📊 Fare Calculation

Base fare structure:

- **Per Seat**: ₹2500
- **Tax**: 5% of base fare

Example (3 passengers):

```
Base Fare: 3 × 2500 = ₹7500
Tax (5%): 375
Total: ₹7875
```

## 🔐 Security Considerations

- Email validation prevents invalid addresses
- Phone number format validation
- Age range validation (1-200)
- XSS protection with React
- CSRF tokens can be added for API calls
- Sensitive data not stored in localStorage

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Troubleshooting

### Port Already in Use

Vite automatically uses the next available port. Default: 5173, Falls back to 5174.

### Page Refresh Clears Booking

This is expected behavior - context state is lost on refresh. To persist, add localStorage integration.

### Styling Not Applied

Run `npm run dev` again to ensure Tailwind watch is active.

### Component Not Rendering

Check browser console for errors and verify component imports.

## 🎯 Development Workflow

1. **Feature Development**: Make changes, Vite hot-reloads automatically
2. **Testing**: Open http://localhost:5174/ and test manually
3. **Production Build**: Run `npm run build` when ready
4. **Deployment**: Upload `dist/` folder to web server

## 📝 Future Enhancements

- [ ] Real API integration
- [ ] Persistent booking state (localStorage)
- [ ] User authentication integration
- [ ] Payment gateway integration
- [ ] Email confirmations
- [ ] SMS notifications
- [ ] Booking cancellation
- [ ] Refund management
- [ ] Advanced filters
- [ ] Saved passengers list

## 📜 License

This project is part of the CDAC ORRS (Online Railway Reservation System) initiative.

## 👥 Contributors

- Abhishek - Passenger Details & Journey Review
- Vineet - Seat Selection Components
- Frontend Team - Core Architecture & Integration

## 📧 Support

For issues or questions, review the documentation files:

1. Check SETUP_GUIDE.md for setup issues
2. Check DEVELOPER_DOCS.md for technical questions
3. Check browser console (F12) for errors

---

**Status**: ✅ **Production Ready for Testing**
**Development Server**: http://localhost:5174/
**Last Updated**: 2024
