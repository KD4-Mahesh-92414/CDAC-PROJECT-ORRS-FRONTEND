# Project Structure - Railway Reservation System

## New Organized Folder Structure

```
src/
├── components/                 # Reusable UI components
│   ├── common/                # Common/shared components
│   │   ├── HeroText.jsx       # Hero section text component
│   │   ├── Modal.jsx          # Reusable modal component
│   │   ├── SearchSummary.jsx  # Search results summary
│   │   └── TrainCard.jsx      # Train display card
│   ├── forms/                 # Form-related components
│   │   ├── AuthModal.jsx      # Authentication modal
│   │   ├── FloatingInput.jsx  # Floating label input
│   │   ├── PassengerCard.jsx  # Passenger details form
│   │   └── SearchTrain.jsx    # Train search form
│   └── layout/                # Layout components
│       ├── HeaderLayout.jsx   # Main header layout
│       ├── JourneySteps.jsx   # Booking progress steps
│       └── Navbar.jsx         # Navigation bar
├── pages/                     # Page components
│   ├── auth/                  # Authentication pages
│   │   ├── Login.jsx          # Login page
│   │   └── Register.jsx       # Registration page
│   ├── booking/               # Booking flow pages
│   │   ├── Confirmation.jsx   # Booking confirmation
│   │   ├── NewSeatSelection.jsx # Seat selection page
│   │   ├── PassengerDetails.jsx # Passenger info form
│   │   ├── Payment.jsx        # Payment processing
│   │   ├── ReservationReview.jsx # Booking review
│   │   └── TrainSearchResults.jsx # Train search results
│   ├── account/               # User account pages
│   │   ├── Bookings.jsx       # User bookings history
│   │   ├── ChangePassword.jsx # Password change
│   │   ├── EditProfile.jsx    # Profile editing
│   │   ├── PaymentHistory.jsx # Payment history
│   │   ├── Profile.jsx        # User profile
│   │   └── SavedPassengers.jsx # Saved passenger info
│   ├── trains/                # Train-related pages
│   │   ├── CancelledTrains.jsx # Cancelled trains info
│   │   ├── GroupBooking.jsx   # Group booking
│   │   ├── LiveTrainStatus.jsx # Live train tracking
│   │   └── PNRStatus.jsx      # PNR status check
│   ├── help/                  # Help & support pages
│   │   ├── CancellationRefund.jsx # Cancellation policy
│   │   ├── FAQs.jsx           # Frequently asked questions
│   │   ├── HowToBook.jsx      # Booking guide
│   │   ├── TatkalRules.jsx    # Tatkal booking rules
│   │   └── TravelGuidelines.jsx # Travel guidelines
│   ├── contact/               # Contact pages
│   │   ├── CustomerSupport.jsx # Customer support
│   │   ├── EmergencyHelpline.jsx # Emergency contacts
│   │   └── Feedback.jsx       # Feedback form
│   └── HomePage.jsx           # Main landing page
├── contexts/                  # React contexts
│   ├── AuthContext.jsx        # Authentication context
│   └── BookingContext.jsx     # Booking state management
├── assets/                    # Static assets
│   ├── gpsnavigation.gif      # Navigation animation
│   ├── Indian Map.jpg         # India map image
│   ├── login.jpg              # Login background
│   ├── login1.jpg             # Alternative login bg
│   ├── react.svg              # React logo
│   └── train.png              # Train icon
├── App.jsx                    # Main app component
├── App.css                    # Global app styles
├── index.css                  # Global CSS
└── main.jsx                   # App entry point
```

## Removed/Cleaned Up

### Deleted Folders:
- `Abhishekh/` - Unused components
- `AfterSearch/` - Redundant components
- `Vineet/` - Integrated into main structure
- `layouts/` - Moved to components/layout/
- `services/` - Empty folder
- `store/` - Empty folder

### Deleted Files:
- `pages/TrainSearchResults.jsx` - Duplicate file
- `pages/booking/SeatSelection.jsx` - Replaced by NewSeatSelection.jsx

## Updated Import Statements

All import statements have been updated to reflect the new structure:

### App.jsx Updates:
- `./components/HomePage` → `./pages/HomePage`
- `./components/Login` → `./pages/auth/Login`
- `./components/Register` → `./pages/auth/Register`
- `./layouts/HeaderLayout` → `./components/layout/HeaderLayout`

### Component Updates:
- HeaderLayout: Updated to use new component paths
- HomePage: Updated to use components from proper folders
- SearchTrain: Updated context and component imports
- PassengerDetails: Updated PassengerCard import path

## Benefits of New Structure

1. **Clear Separation**: Components are logically grouped by function
2. **Maintainability**: Easier to find and modify specific components
3. **Scalability**: New components can be easily added to appropriate folders
4. **Consistency**: Similar components are grouped together
5. **Clean Codebase**: Removed unused and duplicate files

## Usage Guidelines

- **components/common/**: Reusable components used across multiple pages
- **components/forms/**: Form-specific components and inputs
- **components/layout/**: Layout and navigation components
- **pages/**: Full page components organized by feature area
- **contexts/**: React context providers for state management
- **assets/**: Static files like images and icons

This structure follows React best practices and makes the codebase more maintainable and scalable.