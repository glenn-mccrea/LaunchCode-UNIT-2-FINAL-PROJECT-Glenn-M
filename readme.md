# 📚 Homeschool Day Tracker

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.3-green?style=flat-square)
![React](https://img.shields.io/badge/React-Vite-blue?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.4.8-lightblue?style=flat-square)

A full-stack web application designed for teachers to track student learning activities and maintain compliance with U.S. state monitoring requirements. Built with React for the frontend, Java and Spring Boot for backend logic, and MySQL for persistent data storage. The App enables teachers to log subjects, duration, materials, and notes for each activity, view and edit past logs, delete entries, and manage an annual school supply shopping list.

---

## 🛠️ Technologies Used

**Frontend**
- React (Vite)
- React Router
- CSS

**Backend**
- Java 21
- Spring Boot 4.0.3
- Spring Data JPA / Hibernate
- Maven
- dotenv-java 3.0.0

**Database**
- MySQL 8.4.8

---

## ⚙️ Installation & Setup

> These instructions are for running the app locally after forking and cloning the repository.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Java 21](https://adoptium.net/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [MySQL 8](https://dev.mysql.com/downloads/) with MySQL Workbench

---

### 1. Clone the Repository

```bash
git clone https://github.com/glenn-mccrea/LaunchCode-UNIT-2-FINAL-PROJECT-Glenn-M
```

---

### 2. Set Up MySQL

Install MySQL if not already installed, then create the database:

```sql
CREATE DATABASE hsdt_db;
```

---

### 3. Create the `.env` File

In the **root project folder** (not inside `JavaBackend/`), create a file named `.env` and add:

```
DB_PASSWORD=yourMySQLpassword
```

Replace `yourMySQLpassword` with your actual MySQL password.

---

### 4. Create `application.properties`

In `JavaBackend/src/main/resources/` create a file named `application.properties` and add:

```properties
spring.application.name=JavaBackend
spring.datasource.url=jdbc:mysql://localhost:3306/hsdt_db
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 5. Run the Backend

- Open `JavaBackend/` in IntelliJ IDEA
- Let Maven download dependencies automatically
- Run `JavaBackendApplication.java`
- Spring will auto-create all three database tables on first startup
- Confirm Spring is running at `http://localhost:8080`

---

### 6. Seed the Subjects Table

> ⚠️ These exact ID values are required. The frontend dropdowns are mapped to these specific IDs.

Open MySQL Workbench, connect to your local instance, select `hsdt_db`, and run:

```sql
INSERT INTO subjects (id, name) VALUES
  (3, 'English'),
  (4, 'Math'),
  (5, 'Science'),
  (6, 'Social-Studies'),
  (7, 'Foreign-Language'),
  (8, 'Art'),
  (9, 'Music'),
  (10, 'Computer-Science');
```

---

### 7. Run the Frontend

```bash
cd react-final-project
npm install
npm run dev
```

Open your browser to `http://localhost:5173`.

---

### 8. Verify Everything is Working

- The loading spinner should appear briefly then disappear (may not be visible due to local database speed)
- Navigate to **Log Activity** and confirm all subjects appear in the dropdown
- Submit a log and confirm it appears in **Log Viewer**
- Navigate to **Annual Shopping List** and confirm the table loads

> ⚠️ Both the backend and frontend must be running at the same time for the app to work.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/logs` | Returns all logs with nested subject object |
| `POST` | `/api/logs` | Creates a new log |
| `PUT` | `/api/logs/{id}` | Updates an existing log |
| `DELETE` | `/api/logs/{id}` | Deletes a log |
| `GET` | `/api/subjects` | Returns all subjects |
| `POST` | `/api/subjects` | Creates a new subject |
| `DELETE` | `/api/subjects/{id}` | Deletes a subject |
| `GET` | `/api/shopping` | Returns all shopping list items |
| `POST` | `/api/shopping` | Adds a new shopping list item |
| `DELETE` | `/api/shopping/{id}` | Deletes a shopping list item |

---

## 🗂️ Entity Relationship Diagram

> https://docs.google.com/presentation/d/1OWiPCSto8GxxzyrffBUMqHF-eCkJz5rboWMVITEk60o/edit?usp=sharing

The database has three tables:

- **subjects** — stores the list of school subjects
- **logs** — stores activity log entries, with a foreign key to `subjects`
- **shopping_list** — stores annual supply items, independent of logs

---

## 🖼️ Wireframes

> https://docs.google.com/presentation/d/16dxMJZI_fHYxBrNA93RjR6Qxwi0W7--bljBWYkvnEjs/edit?usp=sharing

<!-- Example:
![Wireframe](images/wireframe.png)
or link to Figma / Balsamiq
-->

---

## 🚀 Future Features

**Date filtering on the Log Viewer**

Right now all logs appear in one list with no way to narrow them down. A teacher using this app for a full school year could accumulate hundreds of entries. A future version would add:

- A `date` field on each log entry (stored as `LocalDate` in the Java model, `DATE` in MySQL)
- Filter controls on the viewer page — date range picker and subject dropdown
- A new filtered `GET` endpoint to filter by subject etc
- Query parameters passed from the frontend to the filtered endpoint

**Shopping list editing**

Currently shopping list items can be added and deleted but not edited. A future version would add inline PUT editing consistent with how log entries are edited.

---

## 📁 Project Structure

```
UNIT 2 FINAL Project/
├── .env                          ← DB_PASSWORD (root level)
├── JavaBackend/                  ← Spring Boot backend
│   ├── pom.xml
│   └── src/main/java/com/HDT/JavaBackend/
│       ├── config/               ← CORS configuration
│       ├── model/                ← Subject, Log, ShoppingItem
│       ├── repository/           ← JPA repositories
│       ├── service/              ← Business logic
│       └── controller/           ← REST controllers
└── react-final-project/
    └── src/
        └── components/
            ├── App.jsx           ← Root component, shared state
            ├── Header/
            ├── HomePage/
            ├── LogPage/          ← Create log form (POST)
            ├── ViewerPage/       ← View all logs (GET)
            ├── LogCard/          ← Edit / delete a log (PUT, DELETE)
            ├── ShoppingPage/     ← Shopping list (POST, DELETE)
            ├── LoadingPage/
            └── NoCardsPage/
```
