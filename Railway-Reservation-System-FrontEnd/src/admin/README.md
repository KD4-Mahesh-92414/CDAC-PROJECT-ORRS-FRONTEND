# Railway Admin Frontend Module

This module contains the complete admin interface for the Railway Reservation System, built with React and Tailwind CSS following the same patterns as the user frontend.

## 📁 Structure

```
src/admin/
├── components/
│   ├── AdminLayout.jsx          # Main layout wrapper
│   ├── Sidebar.jsx              # Navigation sidebar
│   ├── TopNavbar.jsx            # Top navigation bar
│   ├── StatsCard.jsx            # Reusable stats card
│   ├── DataTable.jsx            # Reusable data table
│   ├── FormModal.jsx            # Reusable form modal
│   ├── ConfirmDialog.jsx        # Reusable confirm dialog
│   ├── PrimaryButton.jsx        # Reusable button component
│   ├── Dashboard.jsx            # Admin dashboard
│   ├── StationManagement.jsx    # Station CRUD operations
│   ├── TrainManagement.jsx      # Train CRUD operations
│   ├── UserManagement.jsx       # User CRUD operations
│   ├── FareStructure.jsx        # Fare management
│   ├── RefundTransaction.jsx    # Refund approvals
│   ├── CreateAnnouncement.jsx   # Announcement creation
│   └── index.js                 # Component exports
├── routes.jsx                   # Route configuration
└── README.md                    # This file
```

## 🗄️ Database Integration

All components are built based on the database schema:

- **Dashboard**: Aggregated stats from multiple tables
- **StationManagement**: `stations` table
- **TrainManagement**: `trains` table with `stations` FK
- **UserManagement**: `users` table
- **FareStructure**: `train_fare` table with `trains` FK
- **RefundTransaction**: `refund_logs` table with `booking` and `users` FK
- **CreateAnnouncement**: `announcements` table

## 🧩 Reusable Components

### AdminLayout
Main layout component that wraps all admin pages with sidebar and top navigation.

```jsx
import { AdminLayout } from '../admin/components';

function MyAdminPage() {
  return (
    <AdminLayout>
      <div>Your page content</div>
    </AdminLayout>
  );
}
```

### DataTable
Reusable table component with edit/delete actions.

```jsx
import { DataTable } from '../admin/components';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => <span className="badge">{value}</span>
  }
];

<DataTable
  columns={columns}
  data={users}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### FormModal
Reusable modal for add/edit forms.

```jsx
import { FormModal } from '../admin/components';

<FormModal
  open={showModal}
  onClose={() => setShowModal(false)}
  title="Add User"
  onSubmit={handleSubmit}
>
  <div>Your form fields</div>
</FormModal>
```

## 🎨 Styling

- Uses Tailwind CSS classes
- Violet color theme (`violet-600`, `violet-700`)
- Responsive design (mobile-first)
- Clean admin dashboard UI

## 📊 Features

### Dashboard
- Active trains count
- Total passengers
- Revenue today
- Occupancy rate
- Monthly revenue chart placeholder
- Weekly bookings chart placeholder
- Train status overview

### Management Pages
- **CRUD Operations**: Add, Edit, Delete for all entities
- **Form Validation**: Required fields, data types
- **Status Management**: Active/Inactive states
- **Search & Filter**: Status-based filtering
- **Confirmation Dialogs**: Safe delete operations

### Refund Management
- **Status Filtering**: View by refund status
- **Approve/Reject**: Actions for pending refunds
- **Stats Overview**: Refund counts by status
- **Transaction Details**: Complete refund information

### Announcements
- **Rich Form**: Title, message, audience, priority
- **Date Range**: Valid from/to dates
- **Live Preview**: See announcement as users will
- **Audience Targeting**: All, Users, Admins, etc.

## 🔌 API Integration

Replace mock data with actual API calls:

```jsx
// Example: Station Management
useEffect(() => {
  const fetchStations = async () => {
    const response = await fetch('/api/admin/stations');
    const stations = await response.json();
    setStations(stations);
  };
  fetchStations();
}, []);

const handleSubmit = async (formData) => {
  const response = await fetch('/api/admin/stations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  // Handle response
};
```

## 🚀 Usage

1. **Import Components**:
```jsx
import { 
  Dashboard, 
  StationManagement, 
  TrainManagement 
} from './admin/components';
```

2. **Add Routes**:
```jsx
import { Routes, Route } from 'react-router';

<Routes>
  <Route path="/admin" element={<Dashboard />} />
  <Route path="/admin/stations" element={<StationManagement />} />
  <Route path="/admin/trains" element={<TrainManagement />} />
  {/* ... other routes */}
</Routes>
```

3. **Navigation**: Use the sidebar to navigate between admin pages

## 🔐 Security Considerations

- Add authentication checks before rendering admin components
- Implement role-based access control
- Validate user permissions for each action
- Sanitize form inputs
- Use HTTPS for API calls

## 📱 Responsive Design

All components are fully responsive:
- Mobile: Collapsible sidebar, stacked layouts
- Tablet: Optimized spacing and grid layouts  
- Desktop: Full sidebar, multi-column layouts

## 🎯 Next Steps

1. **API Integration**: Replace mock data with real API calls
2. **Authentication**: Add admin login/logout functionality
3. **Permissions**: Implement role-based access control
4. **Charts**: Integrate chart library for dashboard visualizations
5. **Export**: Add data export functionality
6. **Notifications**: Add real-time notifications for admin actions

## 📝 Database Fields Reference

### Stations Table
- `station_code`, `station_name`, `city`, `state`, `zone`, `platforms`, `status`

### Trains Table  
- `train_number`, `train_name`, `train_type`, `source_station_id`, `destination_station_id`, `total_distance_km`, `avg_speed`, `days_of_run`, `train_active_status`, `status`

### Users Table
- `full_name`, `email`, `mobile`, `gender`, `dob`, `address`, `id_type`, `id_number`, `role`, `account_status`, `preferred_class`, `is_verified_email`

### Train Fare Table
- `train_id`, `coach_type`, `rate_per_km`, `min_fare`, `is_active`

### Refund Logs Table
- `booking_id`, `user_id`, `refund_amount`, `refund_status`, `refund_mode`, `transaction_id`, `initiated_on`, `completed_on`, `remarks`

### Announcements Table
- `title`, `message`, `audience_type`, `priority`, `valid_from`, `valid_to`, `is_active`