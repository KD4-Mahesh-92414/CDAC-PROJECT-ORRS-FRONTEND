# ORRS Frontend Folder Structure

This document outlines the organized folder structure for the ORRS (Online Railway Reservation System) frontend application.

## 📁 Component Organization

### `/src/components/`
All reusable UI components organized by functionality:

#### `/booking/` - Train Booking Related Components
- `ClassOptions.jsx` - Display available travel classes with selection
- `CoachImageDisplay.jsx` - Show coach images based on selected class
- `EmptyTrainsState.jsx` - Empty state when no trains found
- `FilterSection.jsx` - Reusable filter section component
- `JourneyTimeline.jsx` - Display journey timeline with stations
- `SearchResultsHeader.jsx` - Header for search results page
- `TrainCard.jsx` - Individual train card with selection options
- `TrainFilters.jsx` - Sidebar filters for train search
- `TrainHeader.jsx` - Train information header
- `TrainsList.jsx` - List container for train cards
- `index.js` - Barrel exports for all booking components

#### `/common/` - Shared/Reusable Components
- `HeroSection.jsx` - Homepage hero section
- `HeroText.jsx` - Hero text component
- `ImageSection.jsx` - Image display component
- `Modal.jsx` - Reusable modal component
- `SearchSection.jsx` - Search form section
- `SearchSummary.jsx` - Search results summary
- `index.js` - Barrel exports for common components

#### `/forms/` - Form Related Components
- `AuthModal.jsx` - Authentication modal
- `FloatingInput.jsx` - Floating label input component
- `PassengerCard.jsx` - Passenger information card
- `SearchTrain.jsx` - Train search form
- `index.js` - Barrel exports for form components

#### `/guards/` - Route Protection Components
- `ProtectedRoute.jsx` - Authentication route guard
- `index.js` - Barrel exports for guard components

#### `/layout/` - Layout and Navigation Components
- `BookingNavbar.jsx` - Navigation for booking flow
- `HeaderLayout.jsx` - Header layout wrapper
- `HeaderSearchBar.jsx` - Search bar in header
- `JourneySteps.jsx` - Booking journey steps indicator
- `Navbar.jsx` - Main navigation component
- `index.js` - Barrel exports for layout components

#### `/ui/` - Basic UI Components
- `Calendar.jsx` - Date picker calendar component
- `index.js` - Barrel exports for UI components

## 📁 Custom Hooks

### `/src/hooks/`
Reusable custom React hooks:
- `useTrainData.js` - Hook for managing train data
- `useTrainFilters.js` - Hook for train filtering logic
- `index.js` - Barrel exports for all hooks

## 📁 Services

### `/src/services/`
API service layer for backend communication:
- `api.js` - Base API configuration with axios
- `authService.js` - Authentication related API calls
- `bookingService.js` - Booking related API calls
- `trainService.js` - Train data API calls
- `index.js` - Barrel exports for all services

## 📁 State Management

### `/src/store/`
Redux store configuration and slices:
- `index.js` - Main store configuration
- `/slices/` - Redux slices
  - `authSlice.js` - Authentication state management
  - `bookingSlice.js` - Booking flow state management
  - `trainSlice.js` - Train data state management
  - `index.js` - Barrel exports for all slices
- `/__tests__/` - Store related tests

## 📁 Pages

### `/src/pages/`
Page components organized by feature:
- `/auth/` - Authentication pages (Login, Register)
- `/account/` - User account pages (Profile, Bookings, etc.)
- `/booking/` - Booking flow pages (Search Results, Seat Selection, etc.)
- `/contact/` - Contact pages (Support, Feedback)
- `/help/` - Help and information pages
- `/trains/` - Train related pages (PNR Status, Live Status)

## 🎯 Benefits of This Structure

1. **Single Responsibility Principle (SRP)**: Each component has a single, well-defined purpose
2. **Don't Repeat Yourself (DRY)**: Reusable components prevent code duplication
3. **Easy Navigation**: Logical folder structure makes finding components intuitive
4. **Barrel Exports**: Clean imports using index.js files
5. **Scalability**: Easy to add new components in appropriate folders
6. **Maintainability**: Clear separation of concerns makes maintenance easier

## 📦 Import Examples

```javascript
// Import multiple booking components
import { TrainCard, ClassOptions, CoachImageDisplay } from '../components/booking';

// Import layout components
import { Navbar, HeaderLayout } from '../components/layout';

// Import custom hooks
import { useTrainData, useTrainFilters } from '../hooks';

// Import services
import { authService, bookingService } from '../services';

// Import Redux actions
import { setSelectedTrain, setSearchData } from '../store/slices';
```

This structure follows React best practices and makes the codebase more maintainable and scalable.