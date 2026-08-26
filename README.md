# MIT CAMPUS AMS

Appointment Management System using the supplied frontend, Spring Boot 3 / Java 21, and Oracle Database.

## Architecture

`frontend/index.html` → JavaScript `fetch()` → Spring Boot REST API → Spring Data JPA/Hibernate → Oracle.

The frontend’s existing design is preserved. Its former generic action endpoint was replaced with a single `API_BASE_URL` and REST route mapping. The browser never receives Oracle credentials.

## Setup

1. Install Java 21, Maven, and Oracle Database (Oracle Free is suitable).
2. Create a dedicated Oracle user/schema, grant it normal table creation privileges, and connect as that user.
3. Run [schema.sql](database/schema.sql) in Oracle SQL Developer or SQLcl.
4. Edit `backend/src/main/resources/application.properties` and replace only `YOUR_ORACLE_USERNAME` and `YOUR_ORACLE_PASSWORD`. Adjust the JDBC URL if your service/PDB differs.
5. In the `backend` directory, run:

```powershell
mvn spring-boot:run
```

6. Serve the `frontend` directory using a small local static server (for example VS Code Live Server) and open `index.html`. It calls `http://localhost:8080/api`.

## Main API routes

| Operation | Route |
|---|---|
| Student / official registration | `POST /api/auth/student/register`, `POST /api/auth/official/register` |
| Login | `POST /api/auth/login` |
| Official list | `GET /api/officials` |
| Appointment creation | `POST /api/appointments` |
| Appointment list | `GET /api/appointments/{student\|official}/{id}` |
| Approve / reject | `PUT /api/appointments/{id}/approve`, `PUT /api/appointments/{id}/reject` |
| Notifications | `GET /api/notifications/{id}` |
| Availability | `PUT /api/availability/official/{id}` |

All responses use `{ "success", "message", "data" }`. Passwords are BCrypt hashes.

## Test flow

Use either a newly registered account or the demo records loaded by the schema. Register an official and confirm it appears automatically under the student appointment request view; then submit an appointment, sign in as that official, approve or reject it, and sign back in as the student to see the notification.

The demo data uses `password` (replace it after testing). The application always stores newly created passwords as BCrypt hashes.
