# Student Management System

## Overview

This is a **Student Management System** developed using **Node.js** and **Express** with **MongoDB Atlas** as the database. The system allows students and admins to register, log in, and manage students. It features JWT authentication, 2FA email verification, image upload, rate-limited endpoints, and WebSocket notifications. 

This project is still in progress.

---

## Features Completed

### 1. **User Registration and Authentication**

- **Students** and **Admins** can register and log in.
- Authentication is handled using **JWT** (JSON Web Tokens).
- **Two-Factor Authentication** (2FA) via email for enhanced security.
  
### 2. **Real-Time Notifications via WebSocket**

- When a new student registers, **admins** are notified in real-time using WebSockets.

### 3. **Unique ID Generation for Students**

- Each student is assigned a **unique ID** every 5 minutes. The unique ID is notified to users via WebSockets.
  
### 4. **Image Upload**

- Students can upload profile pictures to their accounts.

### 5. **HTTPS Implementation**

- All endpoints are served securely over **HTTPS**.

### 6. **Rate Limiting**

- Rate limiting is applied to certain endpoints to prevent abuse (e.g., login endpoint).

---

