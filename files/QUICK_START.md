# MIT Campus AMS - Quick Start Guide

## What You Have

- **index.html** - Complete frontend application (single file)
- **api.js** - API helper module (supports all backend endpoints)
- **Backend** - Existing Spring Boot application (untouched)
- **Database** - Oracle with AMS schema (untouched)

## 5-Minute Setup

### Step 1: Start Oracle Database
Ensure Oracle Database is running with your AMS schema.

### Step 2: Start Spring Boot Backend

```bash
cd backend
mvn spring-boot:run
```

Wait for:
```
Tomcat started on port(s): 8080
Started MitCampusAmsApplication
```

### Step 3: Start Frontend (Pick One Method)

**Method A: VS Code Live Server (Easiest)**
1. Open `index.html` and `api.js` in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically

**Method B: Python**
```bash
cd frontend
python -m http.server 5500
# Open: http://localhost:5500/index.html
```

**Method C: Node http-server**
```bash
npm install -g http-server
cd frontend
http-server -p 5500
# Open: http://localhost:5500
```

### Step 4: Test Login
1. Click "Sign up" under Student
2. Fill registration form
3. Click "Create Account"
4. Login with created credentials
5. See Dashboard

## Complete Test Scenario

### 1. Create Student Account
- **Tab:** Student
- **Mode:** Sign up
- **Fill:**
  - Name: John Student
  - Register Number: MIT001
  - Department: Information Technology
  - Year: 2nd Year
  - Email: john@example.com
  - Password: TestPass123
  - Contact: 9876543210
- **Click:** Create Account
- **See:** Success message, form switches to login

### 2. Create Official Account
- **Tab:** Official
- **Mode:** Sign up
- **Fill:**
  - Name: Dr. Smith
  - Employee ID: OFF001
  - Department: Information Technology
  - Designation: HOD
  - Email: smith@example.com
  - Password: SecurePass123
  - Contact: 9876543211
- **Click:** Create Account

### 3. Login as Official
- **Tab:** Official
- **Mode:** (stays on login)
- **Email:** smith@example.com
- **Password:** SecurePass123
- **Click:** Sign In

### 4. Set Availability (Official)
- **Click:** "Manage Availability" (sidebar)
- **For each day:**
  - Status: Available
  - Hours: 09:00 - 17:00
- **Click:** Save Availability

### 5. Logout & Login as Student
- **Click:** Sign out (bottom sidebar)
- **Tab:** Student
- **Email:** john@example.com
- **Password:** TestPass123
- **Click:** Sign In

### 6. Request Appointment
- **Click:** "Request Appointment" (sidebar)
- **Search:** Type "Smith" or "IT"
- **Click:** Select on Dr. Smith's card
- **Fill:**
  - Purpose: Academic Discussion
  - Preferred Date: Pick any future date
  - Preferred Time: 14:30
  - Description: Need help with assignment
- **Click:** Review & Submit Request
- **See:** Success, redirected to Appointments
- **Check:** Appointment shows PENDING

### 7. Approve as Official
- **Click:** Sign out
- **Login as:** Official (smith@example.com / SecurePass123)
- **Click:** Appointments (sidebar)
- **See:** Student's request with PENDING status
- **Click:** Approve button
- **Fill Modal:**
  - Allocated Date: Same date as requested
  - Allocated Time: 14:30
  - Remarks: All set, see you then!
- **Click:** Confirm & Approve

### 8. See Notification as Student
- **Click:** Sign out
- **Login as:** Student (john@example.com / TestPass123)
- **Click:** Notifications (sidebar)
- **See:** "Appointment Approved" notification
- **Go to:** Appointments
- **See:** Status changed to APPROVED, date/time filled

## API Communication Verify

### Check Backend is Running
```bash
curl http://localhost:8080/api/officials
```

Should return:
```json
{
  "success": true,
  "message": "Officials retrieved.",
  "data": [...]
}
```

### Check Frontend Loads
Open browser → http://localhost:5500/index.html

Should show:
- MIT Campus branding
- Student/Official tabs
- Login/Sign up form

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Unable to connect" | Backend not running | `mvn spring-boot:run` in backend directory |
| Page doesn't load | Frontend not served | Start HTTP server (see Step 3) |
| CORS error in console | Wrong origin | Verify `http://localhost:5500` is in CorsConfig |
| "Invalid credentials" | Wrong email/password | Register new account or use demo data |
| Fields highlighted red | Validation failed | Check password (8+ chars), email format, all fields |
| API requests fail | Check console Network tab | Look at response body for error message |

## File Structure

```
frontend/
├── index.html           (Main application - DOWNLOAD THIS)
├── api.js              (API helper - DOWNLOAD THIS)
└── QUICK_START.md      (This file)

backend/
├── pom.xml
├── src/
│   └── main/
│       ├── java/com/mitcampus/ams/
│       │   ├── controller/ApiController.java
│       │   ├── service/AmsService.java
│       │   ├── entity/
│       │   ├── repository/
│       │   ├── dto/
│       │   └── config/CorsConfig.java
│       └── resources/
│           └── application.properties
└── (other Maven files)

oracle-database/
├── schema.sql
└── (your Oracle instance)
```

## URL Mapping

| What | URL |
|------|-----|
| **Frontend** | http://localhost:5500 |
| **Backend API** | http://localhost:8080/api |
| **Login** | http://localhost:5500#/login (automatic) |
| **Dashboard** | http://localhost:5500#/dashboard (after login) |
| **Appointments** | http://localhost:5500#/appointments |

## Key Concepts

### Single Page Application (SPA)
- One `index.html` file
- No page reloads
- Router implemented in JavaScript (not traditional URLs)
- All data from REST API

### State Machine
```
┌─────────────────────────────────────┐
│          Initial Load               │
│          (no user)                  │
│       Shows Login/Signup            │
└──────────────┬──────────────────────┘
               │
         User Logs In
               │
               ↓
┌─────────────────────────────────────┐
│       Authenticated State            │
│     (user object in state)          │
│       Shows App Layout              │
│   Sidebar + Main Content + Nav      │
└──────────────┬──────────────────────┘
               │
        User Navigates
               │
       ┌───────┴────────┬──────────────┬──────────────┐
       ↓                ↓              ↓              ↓
   Dashboard      Appointments    Request Appt.    Notifications
       │                │              │              │
       └────────────────┴──────────────┴──────────────┘
               │
          User Logs Out
               │
               ↓
┌─────────────────────────────────────┐
│      Back to Login/Signup           │
└─────────────────────────────────────┘
```

### Data Flow for Appointments

```
Student fills form:
  name, date, time, purpose
           ↓
api.createAppointment(...)
           ↓
POST /api/appointments
           ↓
Spring Boot validates
           ↓
Stores in APPOINTMENTS table
           ↓
Sends notification to official
           ↓
Returns { success: true, data: {...} }
           ↓
Frontend shows success
           ↓
Updates appointments list
           ↓
Official sees in Appointments view
           ↓
Official clicks "Approve"
           ↓
api.approveAppointment(...)
           ↓
PUT /api/appointments/{id}/approve
           ↓
Spring Boot updates record
           ↓
Sends notification to student
           ↓
Returns success
           ↓
Student sees updated status
           ↓
Can view allocated date/time
```

## Testing Checklist

- [ ] Backend running on localhost:8080
- [ ] Frontend served from localhost:5500
- [ ] Can open http://localhost:5500/index.html in browser
- [ ] Page loads without errors
- [ ] Browser console has no errors (F12)
- [ ] Can register as student
- [ ] Can register as official
- [ ] Can login as student
- [ ] Can login as official
- [ ] Can set official availability
- [ ] Can create appointment request
- [ ] Can see pending appointments
- [ ] Can approve/reject as official
- [ ] Can see notifications
- [ ] Can view profile
- [ ] Responsive layout works on mobile

## Need Help?

### Check Browser Console (F12)
1. Right-click page
2. Select "Inspect" or "Inspect Element"
3. Click "Console" tab
4. Look for red error messages

### Check Network Requests (F12)
1. Right-click page
2. Select "Inspect"
3. Click "Network" tab
4. Perform action (e.g., login)
5. Look for failed requests (red)
6. Click request to see response body

### Debug API Calls
1. Open Console (F12)
2. Type: `api.login("email@test.com", "password", "student")`
3. See the promise result
4. Check response.success, response.message, response.data

## What to Deploy

For production:
1. Copy **index.html** to your web server
2. Copy **api.js** to same directory
3. Point CorsConfig to your domain
4. Update API_BASE_URL in api.js to backend domain
5. Set up HTTPS/SSL certificates
6. Deploy Spring Boot to server
7. Configure Oracle connection on server

## Production Checklist

- [ ] HTTPS enabled
- [ ] API_BASE_URL points to production backend
- [ ] Database backups configured
- [ ] Error logging enabled
- [ ] CORS origins updated to production URL
- [ ] Password policies enforced
- [ ] Admin account created
- [ ] Test with real users
- [ ] Monitor for errors
- [ ] Set up email notifications (optional)

---

**You're all set! Enjoy the fully functional MIT Campus AMS system!**
