# Railway Reservation System - Quick Reference

## 🚀 Quick Start

```bash
cd Railway-Reservation-System-FrontEnd
npm install
npm run dev
# Opens on http://localhost:5174/
```

## 📋 Booking Flow (6 Steps)

```
HOME (/)
  ↓ User searches: From, To, Date
TRAIN SEARCH (/trains)
  ↓ User selects train
SEAT SELECTION (/seats)
  ↓ User selects 1+ seats
PASSENGER DETAILS (/passengers)
  ↓ User enters name, age, gender, country
RESERVATION REVIEW (/review)
  ↓ User confirms details
PAYMENT (/payment)
  ↓ User processes payment (2-sec simulation)
CONFIRMATION (/confirmation)
  ↓ Success! Booking reference shown
```

## 🔄 State Management

All state managed by **BookingContext**:

- `searchData` - {from, to, date}
- `selectedTrain` - Train object
- `selectedSeats` - Array of seat IDs
- `passengers` - Array of {name, age, gender, country}
- `fareData` - {baseFare, taxes, totalFare}

Access in any component:

```javascript
const { searchData, setSearchData } = useContext(BookingContext);
```

## 🌐 Routes

| Route           | Purpose        | SearchBar | Steps |
| --------------- | -------------- | --------- | ----- |
| `/`             | Home           | ✗         | ✗     |
| `/login`        | Login          | ✗         | ✗     |
| `/register`     | Register       | ✗         | ✗     |
| `/trains`       | Search results | ✓         | ✓     |
| `/seats`        | Seat selection | ✓         | ✓     |
| `/passengers`   | Passenger form | ✓         | ✓     |
| `/review`       | Review booking | ✓         | ✓     |
| `/payment`      | Payment        | ✓         | ✓     |
| `/confirmation` | Success        | ✗         | ✗     |

## 💾 Key Files

```
src/
├── contexts/BookingContext.jsx          ← State management
├── components/SearchTrain.jsx           ← Home search form
├── components/JourneySteps.jsx          ← Step indicator
├── layouts/HeaderLayout.jsx             ← Main layout
└── pages/booking/
    ├── TrainSearchResults.jsx           ← Step 1
    ├── SeatSelection.jsx                ← Step 2
    ├── PassengerDetails.jsx             ← Step 3
    ├── ReservationReview.jsx            ← Step 4
    ├── Payment.jsx                      ← Step 5
    └── Confirmation.jsx                 ← Step 6
```

## ✅ Validations

| Field     | Validation  | Error                  |
| --------- | ----------- | ---------------------- |
| Email     | Regex check | "Invalid email format" |
| Phone     | 10 digits   | "Must be 10 digits"    |
| Age       | 1-200       | "Must be 1-200"        |
| Name      | Required    | "Name required"        |
| From/To   | Not empty   | "Please select..."     |
| From ≠ To | Must differ | "Cannot be same"       |

## 🎨 Colors

```
Primary: violet-600 (#7C3AED)
Success: green-600 (#16A34A)
Error: red-600 (#DC2626)
Warning: orange-600 (#EA580C)
Background: gray-50 (#F9FAFB)
```

## 📱 Responsive

- Mobile-first design
- Tailwind CSS responsive classes
- Touch-friendly buttons (48px min)
- Viewport optimized

## 🔌 API Integration Points

To connect to backend, update:

1. **TrainSearchResults.jsx** (line ~25)

   - Replace mock train fetch with API call
   - `POST /api/trains/search` → Get trains

2. **Payment.jsx** (line ~85)

   - Replace mock payment with API call
   - `POST /api/bookings/create` → Get bookingRef

3. **Navbar.jsx** (login/logout)
   - Update auth endpoints
   - Call `resetBooking()` on logout

## 🧪 Testing

### Test Booking Flow

1. Go to `http://localhost:5174/`
2. Enter search: From=Delhi, To=Mumbai, Date=Future
3. Select a train
4. Select 2-3 seats
5. Fill passenger details
6. Review and proceed
7. Select payment method and pay
8. See confirmation

### Test Edge Cases

- Refresh mid-booking → Redirects to home ✓
- Direct URL to /seats → Redirects to home ✓
- Missing data validation → Shows errors ✓

## 🐛 Debug Tips

**Check state in DevTools:**

```
React DevTools → Components → BookingProvider
Look for BookingContext value object
```

**Check routes:**

```
React DevTools → Routes tab
See current route and params
```

**Check errors:**

```
Browser Console (F12)
Look for red error messages
```

## 📦 Dependencies

```json
{
  "react": "^19.1.1",
  "react-router": "^7.9.5",
  "tailwindcss": "^4.1.17",
  "@heroicons/react": "^2.2.0",
  "formik": "^2.x.x",
  "yup": "^1.x.x"
}
```

## 🚀 Build for Production

```bash
npm run build
npm run preview
# Creates optimized dist/ folder
```

## 📊 Fare Calculation

```
Per seat: ₹2500
Tax: 5% of base fare

Example (3 seats):
Base: 3 × 2500 = ₹7500
Tax: 7500 × 0.05 = ₹375
Total: ₹7875
```

## 🎯 Next Steps

1. **Test the flow** - Go through all 6 steps
2. **Connect API** - Replace mock data with real endpoints
3. **Add auth** - Integrate with login/logout
4. **Deploy** - Run `npm run build`, host on server

## 📞 Common Issues

| Problem             | Solution                                       |
| ------------------- | ---------------------------------------------- |
| Port in use         | Vite auto-uses next port (5174)                |
| Blank page          | Check console for errors, reload page          |
| State not updating  | Verify component is wrapped in BookingProvider |
| Form not validating | Check Formik/Yup syntax                        |
| Styling broken      | Run `npm run dev` again                        |

## 📚 Documentation Files

- **SETUP_GUIDE.md** - Complete setup & testing guide
- **DEVELOPER_DOCS.md** - Technical component reference
- **README.md** - Project overview

---

**Status**: ✅ Production Ready
**Dev Server**: http://localhost:5174
**Last Updated**: 2024
