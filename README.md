# SubDub - Subscription Tracker API

SubDub is a production-ready subscription management API built with Node.js, Express, and MongoDB. It allows users to manage subscriptions, track renewal dates, and receive automated email reminders. This project is designed with security, scalability, and maintainability in mind, making it a solid addition to a software engineering portfolio.

---

## Features

- **User Authentication & Authorization**
  - JWT-based auth for secure access
  - Sign up, sign in, and sign out endpoints
- **Subscription Management**
  - CRUD operations for subscriptions
  - Automatic renewal date calculation
  - Subscription status tracking (`active`, `canceled`, `expired`)
  - User-specific subscription retrieval
- **Email Reminders**
  - Automated email notifications using Nodemailer
  - Customizable templates for subscription renewals
- **Middleware**
  - Authorization middleware to protect routes
  - Error handling and request validation
- **Workflow Integration**
  - Upstash workflow client triggers (event-driven features)

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (jsonwebtoken), bcryptjs
- **Email:** Nodemailer
- **Workflow & Event Triggers:** Upstash QStash
- **Middleware:** Custom authorization, error handling, and request parsing
- **Deployment Ready:** Environment-based configuration using `.env` variables

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lakshay2013/subdub.git
   cd subdub
