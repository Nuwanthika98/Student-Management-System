# Student Management System

## Overview

The **Student Management System** is a web application built with **Node.js** and **Express**, utilizing **MongoDB Atlas** for data storage. This system allows both **students** and **admins** to register, log in, and efficiently manage student information. Key features include **JWT authentication**, **2FA email verification**, image uploads, **rate-limited endpoints**, and **real-time WebSocket notifications**.

In addition to the core functionality, this project integrates **Docker** for simplified containerization and deployment, as well as a **local database backup** system for data persistence and recovery, making it easier to handle database backups locally without relying on external cloud services.

The project is currently in progress and being actively developed.

---

## Features Completed

### 1. **User Registration and Authentication**
- **Students** and **Admins** can easily register and log in.
- Authentication is handled securely using **JWT** (JSON Web Tokens).
- **Two-Factor Authentication (2FA)** is enabled via email for enhanced security.

### 2. **Real-Time Notifications via WebSocket**
- **Admins** receive real-time notifications when a new student registers via **WebSocket** connections.

### 3. **Unique ID Generation for Students**
- A **unique student ID** is generated for each student every 5 minutes.
- The generated ID is then notified to users via **WebSockets**.

### 4. **Image Upload**
- Students can upload their **profile pictures** to their accounts, enabling a more personalized experience.

### 5. **HTTPS Implementation**
- All system endpoints are securely served over **HTTPS** to ensure data protection and privacy.

### 6. **Rate Limiting**
- Certain critical endpoints, like the **login endpoint**, are protected with **rate limiting** to prevent abuse and brute-force attacks.

### 7. **Docker Integration**
- **Docker** is used for containerization, making it easier to deploy and manage the system across different environments.

### 8. **Database Backup**
- The system supports **automatic local backups** of the MongoDB database to ensure data safety and allow for easy recovery.

---
