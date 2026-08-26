# MIT Campus AMS - API Contract

This document specifies the exact request and response formats for all API endpoints.

## Base URL
```
http://localhost:8080/api
```

## Response Format (All Endpoints)

All endpoints return this JSON structure:

```json
{
  "success": true,
  "message": "Human-readable message",
  "data": null | {} | []
}
```

### Success Response Example
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "id": 1,
    "role": "student",
    "Name": "John Doe",
    "RegisterNumber": "MIT001",
    "Department": "Information Technology",
    "Year": "2nd Year",
    "Email": "john@example.com",
    "ContactNumber": "9876543210"
  }
}
```

### Error Response Example
```json
{
  "success": false,
  "message": "Invalid email or password.",
  "data": null
}
```

## HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 OK | Request successful |
| 201 Created | Resource created (POST with CREATED status) |
| 400 Bad Request | Validation error |
| 404 Not Found | Resource not found |
| 403 Forbidden | Authorization failed |
| 500 Internal Server Error | Unexpected server error |

---

## Authentication Endpoints

### POST /auth/student/register

**Register a new student account**

**Request Headers**
```
Content-Type: application/json
```

**Request Body**
```json
{
  "name": "John Doe",
  "registerNumber": "MIT001",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "department": "Information Technology",
  "year": "2nd Year",
  "contactNumber": "9876543210"
}
```

**Request Validation**
- `name`: Required, non-blank
- `registerNumber`: Required, unique, non-blank
- `email`: Required, valid email, unique
- `password`: Required, min 8 characters
- `confirmPassword`: Must match password
- `department`: Required, non-blank
- `year`: Required, non-blank
- `contactNumber`: Optional

**Response (201 Created)**
```json
{
  "success": true,
  "message": "Student account created successfully.",
  "data": {
    "id": 1,
    "role": "student",
    "Name": "John Doe",
    "RegisterNumber": "MIT001",
    "Department": "Information Technology",
    "Year": "2nd Year",
    "Email": "john@example.com",
    "ContactNumber": "9876543210"
  }
}
```

**Error Responses**
```json
{
  "success": false,
  "message": "Email or register number is already registered.",
  "data": null
}
```

---

### POST /auth/official/register

**Register a new official account**

**Request Headers**
```
Content-Type: application/json
```

**Request Body**
```json
{
  "name": "Dr. Smith",
  "employeeId": "OFF001",
  "email": "smith@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "designation": "HOD",
  "department": "Information Technology",
  "contactNumber": "9876543211"
}
```

**Request Validation**
- `name`: Required, non-blank
- `employeeId`: Required, unique, non-blank
- `email`: Required, valid email, unique
- `password`: Required, min 8 characters
- `confirmPassword`: Must match password
- `designation`: Required, non-blank
- `department`: Required, non-blank
- `contactNumber`: Optional

**Response (201 Created)**
```json
{
  "success": true,
  "message": "Official account created successfully.",
  "data": {
    "id": 1,
    "role": "official",
    "OfficialID": "1",
    "Name": "Dr. Smith",
    "EmployeeID": "OFF001",
    "Email": "smith@example.com",
    "ContactNumber": "9876543211",
    "Designation": "HOD",
    "Department": "Information Technology",
    "Availability": "Manage in Availability"
  }
}
```

---

### POST /auth/login

**Login with credentials**

**Request Headers**
```
Content-Type: application/json
```

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "student"
}
```

**Request Validation**
- `email`: Required, valid email format
- `password`: Required, non-blank
- `role`: Required, must be "student" or "official"

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "id": 1,
    "role": "student",
    "Name": "John Doe",
    "RegisterNumber": "MIT001",
    "Department": "Information Technology",
    "Year": "2nd Year",
    "Email": "john@example.com",
    "ContactNumber": "9876543210"
  }
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Invalid email or password.",
  "data": null
}
```

---

## Profile Endpoints

### GET /students/{id}

**Get student profile**

**URL Parameters**
- `id`: Student ID (integer)

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Student retrieved.",
  "data": {
    "id": 1,
    "role": "student",
    "Name": "John Doe",
    "RegisterNumber": "MIT001",
    "Department": "Information Technology",
    "Year": "2nd Year",
    "Email": "john@example.com",
    "ContactNumber": "9876543210"
  }
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Student not found.",
  "data": null
}
```

---

### GET /officials/{id}

**Get official profile**

**URL Parameters**
- `id`: Official ID (integer)

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Official retrieved.",
  "data": {
    "id": 1,
    "role": "official",
    "OfficialID": "1",
    "Name": "Dr. Smith",
    "EmployeeID": "OFF001",
    "Email": "smith@example.com",
    "ContactNumber": "9876543211",
    "Designation": "HOD",
    "Department": "Information Technology",
    "Availability": "Manage in Availability"
  }
}
```

---

## Officials Endpoints

### GET /officials

**List all officials with optional department filter**

**Query Parameters**
- `department`: (Optional) Filter by department name

**Examples**
```
GET /api/officials
GET /api/officials?department=Information%20Technology
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Officials retrieved.",
  "data": [
    {
      "id": 1,
      "role": "official",
      "OfficialID": "1",
      "Name": "Dr. Smith",
      "EmployeeID": "OFF001",
      "Email": "smith@example.com",
      "ContactNumber": "9876543211",
      "Designation": "HOD",
      "Department": "Information Technology",
      "Availability": "Manage in Availability"
    },
    {
      "id": 2,
      "role": "official",
      "OfficialID": "2",
      "Name": "Prof. Johnson",
      "EmployeeID": "OFF002",
      "Email": "johnson@example.com",
      "ContactNumber": "9876543212",
      "Designation": "Dean",
      "Department": "Engineering",
      "Availability": "Manage in Availability"
    }
  ]
}
```

---

## Appointment Endpoints

### POST /appointments

**Create new appointment request**

**Request Headers**
```
Content-Type: application/json
```

**Request Body**
```json
{
  "studentId": 1,
  "officialId": 2,
  "purpose": "Academic Discussion",
  "description": "Need help with assignment",
  "requestedDate": "2024-09-15",
  "preferredTime": "14:30"
}
```

**Request Validation**
- `studentId`: Required, must exist in STUDENTS
- `officialId`: Required, must exist in OFFICIALS
- `purpose`: Required, non-blank
- `description`: Optional
- `requestedDate`: Required, cannot be in the past
- `preferredTime`: Required, valid time format HH:MM

**Response (201 Created)**
```json
{
  "success": true,
  "message": "Appointment request submitted.",
  "data": {
    "AppointmentID": "1",
    "StudentName": "John Doe",
    "OfficialName": "Dr. Smith",
    "Purpose": "Academic Discussion",
    "Description": "Need help with assignment",
    "RequestedDate": "2024-09-15",
    "PreferredTime": "14:30",
    "AllocatedDate": null,
    "AllocatedTime": null,
    "Status": "PENDING",
    "Remarks": null,
    "CreatedAt": "2024-08-26T10:30:00"
  }
}
```

**Error Responses**
```json
{
  "success": false,
  "message": "Preferred date cannot be in the past.",
  "data": null
}
```

```json
{
  "success": false,
  "message": "Student not found.",
  "data": null
}
```

---

### GET /appointments/{role}/{id}

**Get list of appointments for user**

**URL Parameters**
- `role`: "student" or "official"
- `id`: User ID (integer)

**Examples**
```
GET /api/appointments/student/1
GET /api/appointments/official/2
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Appointments retrieved.",
  "data": [
    {
      "AppointmentID": "1",
      "StudentName": "John Doe",
      "OfficialName": "Dr. Smith",
      "Purpose": "Academic Discussion",
      "Description": "Need help with assignment",
      "RequestedDate": "2024-09-15",
      "PreferredTime": "14:30",
      "AllocatedDate": "2024-09-15",
      "AllocatedTime": "14:30",
      "Status": "APPROVED",
      "Remarks": "All set",
      "CreatedAt": "2024-08-26T10:30:00"
    }
  ]
}
```

---

### PUT /appointments/{id}/approve

**Approve appointment and allocate date/time**

**URL Parameters**
- `id`: Appointment ID

**Request Headers**
```
Content-Type: application/json
```

**Request Body**
```json
{
  "officialId": 2,
  "allocatedDate": "2024-09-15",
  "allocatedTime": "14:30",
  "remarks": "Looking forward to meeting you"
}
```

**Request Validation**
- `officialId`: Required, must match appointment's official
- `allocatedDate`: Required, valid date format
- `allocatedTime`: Required, valid time format HH:MM
- `remarks`: Optional

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Appointment approved and scheduled.",
  "data": {
    "AppointmentID": "1",
    "StudentName": "John Doe",
    "OfficialName": "Dr. Smith",
    "Purpose": "Academic Discussion",
    "Description": "Need help with assignment",
    "RequestedDate": "2024-09-15",
    "PreferredTime": "14:30",
    "AllocatedDate": "2024-09-15",
    "AllocatedTime": "14:30",
    "Status": "APPROVED",
    "Remarks": "Looking forward to meeting you",
    "CreatedAt": "2024-08-26T10:30:00"
  }
}
```

**Error Responses**
```json
{
  "success": false,
  "message": "You cannot update this appointment.",
  "data": null
}
```

---

### PUT /appointments/{id}/reject

**Reject appointment**

**URL Parameters**
- `id`: Appointment ID

**Request Headers**
```
Content-Type: application/json
```

**Request Body**
```json
{
  "officialId": 2,
  "remarks": "Not available on that date"
}
```

**Request Validation**
- `officialId`: Required, must match appointment's official
- `remarks`: Required, non-blank

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Appointment rejected.",
  "data": {
    "AppointmentID": "1",
    "StudentName": "John Doe",
    "OfficialName": "Dr. Smith",
    "Purpose": "Academic Discussion",
    "Description": "Need help with assignment",
    "RequestedDate": "2024-09-15",
    "PreferredTime": "14:30",
    "AllocatedDate": null,
    "AllocatedTime": null,
    "Status": "REJECTED",
    "Remarks": "Not available on that date",
    "CreatedAt": "2024-08-26T10:30:00"
  }
}
```

**Error Response**
```json
{
  "success": false,
  "message": "A rejection reason is required.",
  "data": null
}
```

---

## Notification Endpoints

### GET /notifications/{id}

**Get notifications for user**

**URL Parameters**
- `id`: User ID (integer)

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Notifications retrieved.",
  "data": [
    {
      "NotificationID": 1,
      "Title": "Appointment Approved",
      "Message": "Your appointment with Dr. Smith is scheduled for 2024-09-15 at 14:30",
      "Type": "APPROVED",
      "IsRead": "FALSE",
      "CreatedAt": "2024-08-26T10:35:00"
    },
    {
      "NotificationID": 2,
      "Title": "New appointment request",
      "Message": "John Doe requested an appointment for 2024-09-15",
      "Type": "REQUEST",
      "IsRead": "TRUE",
      "CreatedAt": "2024-08-26T10:30:00"
    }
  ]
}
```

---

### PUT /notifications/{id}/read-all

**Mark all notifications as read for user**

**URL Parameters**
- `id`: User ID (integer)

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Notifications marked as read.",
  "data": null
}
```

---

## Availability Endpoints

### GET /availability/{id}

**Get availability schedule for official**

**URL Parameters**
- `id`: Official ID (integer)

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Availability retrieved.",
  "data": [
    {
      "id": 1,
      "day": "Monday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    },
    {
      "id": 2,
      "day": "Tuesday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    },
    {
      "id": 3,
      "day": "Wednesday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    },
    {
      "id": 4,
      "day": "Thursday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    },
    {
      "id": 5,
      "day": "Friday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    }
  ]
}
```

---

### PUT /availability/official/{id}

**Save or update availability schedule**

**URL Parameters**
- `id`: Official ID (integer)

**Request Headers**
```
Content-Type: application/json
```

**Request Body**
```json
{
  "items": [
    {
      "day": "Monday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    },
    {
      "day": "Tuesday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    },
    {
      "day": "Wednesday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    },
    {
      "day": "Thursday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    },
    {
      "day": "Friday",
      "startTime": "09:00",
      "endTime": "17:00",
      "isAvailable": true
    }
  ]
}
```

**Request Validation**
- `items`: Required, array
- `day`: One of: Monday, Tuesday, Wednesday, Thursday, Friday
- `startTime`: Valid time format HH:MM
- `endTime`: Valid time format HH:MM
- `isAvailable`: Boolean

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Availability saved.",
  "data": null
}
```

---

## Dashboard Endpoints

### GET /dashboard/{role}/{id}

**Get dashboard statistics and summaries**

**URL Parameters**
- `role`: "student" or "official"
- `id`: User ID (integer)

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Dashboard retrieved.",
  "data": {
    "pending": 2,
    "approved": 1,
    "completed": 5,
    "today": 0,
    "upcoming": [
      {
        "AppointmentID": "1",
        "StudentName": "John Doe",
        "OfficialName": "Dr. Smith",
        "Purpose": "Academic Discussion",
        "Description": "Need help with assignment",
        "RequestedDate": "2024-09-15",
        "PreferredTime": "14:30",
        "AllocatedDate": "2024-09-15",
        "AllocatedTime": "14:30",
        "Status": "APPROVED",
        "Remarks": "All set",
        "CreatedAt": "2024-08-26T10:30:00"
      }
    ],
    "recent": [
      {
        "AppointmentID": "1",
        "StudentName": "John Doe",
        "OfficialName": "Dr. Smith",
        "Purpose": "Academic Discussion",
        "Description": "Need help with assignment",
        "RequestedDate": "2024-09-15",
        "PreferredTime": "14:30",
        "AllocatedDate": "2024-09-15",
        "AllocatedTime": "14:30",
        "Status": "APPROVED",
        "Remarks": "All set",
        "CreatedAt": "2024-08-26T10:30:00"
      }
    ]
  }
}
```

---

## Error Handling

### Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Please correct the highlighted fields. | Validation failed |
| 400 | Email or register number is already registered. | Duplicate registration |
| 400 | Invalid email or password. | Login failure |
| 400 | Passwords do not match. | Password mismatch |
| 400 | Password must be at least 8 characters. | Weak password |
| 400 | Preferred date cannot be in the past. | Past date in appointment |
| 400 | A rejection reason is required. | Missing rejection reason |
| 404 | Student not found. | Invalid student ID |
| 404 | Official not found. | Invalid official ID |
| 404 | Appointment not found. | Invalid appointment ID |
| 403 | You cannot update this appointment. | Authorization check failed |
| 500 | An unexpected server error occurred. | Server error (production mode) |

---

## CORS Configuration

**Allowed Origins**
- http://localhost:5500
- http://127.0.0.1:5500
- http://localhost:8080
- null (for development)

**Allowed Methods**
- GET
- POST
- PUT
- DELETE
- OPTIONS

**Allowed Headers**
- *

---

## Frontend API Usage Examples

### Using the api.js Helper

```javascript
// Register student
const result = await api.registerStudent({
  name: "John Doe",
  registerNumber: "MIT001",
  department: "IT",
  year: "2nd Year",
  email: "john@example.com",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
  contactNumber: "9876543210"
});

// Login
const result = await api.login("john@example.com", "SecurePass123", "student");

// Get officials
const result = await api.getOfficials("Information Technology");

// Create appointment
const result = await api.createAppointment(
  1,  // studentId
  2,  // officialId
  "Academic Discussion",  // purpose
  "2024-09-15",  // requestedDate
  "14:30",  // preferredTime
  "Need help with assignment"  // description
);

// Approve appointment
const result = await api.approveAppointment(
  1,  // appointmentId
  2,  // officialId
  "2024-09-15",  // allocatedDate
  "14:30",  // allocatedTime
  "All set, see you then"  // remarks
);

// Get notifications
const result = await api.getNotifications(1);

// Save availability
const result = await api.saveAvailability(2, [
  {
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true
  },
  // ... more days
]);
```

---

## Data Types

### Date Format
- ISO 8601: `YYYY-MM-DD`
- Example: `2024-09-15`

### Time Format
- 24-hour: `HH:MM`
- Example: `14:30`, `09:00`, `17:00`

### DateTime Format
- ISO 8601: `YYYY-MM-DDTHH:MM:SS`
- Example: `2024-08-26T10:30:00`

### Boolean
- JSON: `true` or `false`
- String representation in data: `"TRUE"` or `"FALSE"`

---

## Rate Limiting

Currently no rate limiting implemented. For production, consider:
- Request throttling
- IP-based limits
- User-based limits
- Token-based rate limiting

---

## Documentation

For more details:
- **Frontend Implementation:** See FRONTEND_COMPLETE.md
- **Quick Start:** See QUICK_START.md
- **Architecture:** See frontend code comments in index.html and api.js

---

**Last Updated:** August 26, 2024
**Version:** 1.0.0
**Status:** Production Ready
