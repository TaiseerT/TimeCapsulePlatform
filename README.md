# Misraj Full-Stack Developer Assignment

# Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Features](#features)
   - [User Features](#user-features)
4. [Tech Stack](#tech-stack)
5. [Error Handling](#error-handling)

# Overview:

This is a Time Capsule Platform built as a full-stack application using Next.js 15 (App Router) for the front end and Node.js for the backend. The platform allows users to create, view, and share time capsules that become accessible only after a specified release date. This project fulfills the requirements for a full-stack developer assessment.

# Installation

To set up the project locally, follow these steps:

1. Clone the repository using SSH:
   ```bash
   git clone git@github.com:YourUsername/TimeCapsulePlatform.git
   ```
2. Navigate to the project directory:
   - cd TimeCapsulePlatform
3. Install dependencies in each folder (frontend and backend):
   - npm install
4. Create a .env file in the backend root and add these variables to it:
   - JWT_SECRET
   - DB_URL
   - EXPIRES_IN
   - NODE_ENV
   - PORT
   - URL

# Features:

## User Features:

1. Authentication
   - User registration and login with secure session management using JWT.
2. Time Capsule Management
   - Create time capsules with:
     - A title (always visible)
     - Content (text; visible after release date)
     - Release date (when the capsule becomes accessible)
   - Update or delete existing capsules.
   - View all created capsules and their statuses (released or pending).
3. Capsule Sharing
   - Generate a sharable link for each capsule.
   - If the release date has not been reached, the link shows a countdown timer.
   - Countdown page auto-refreshes to display the capsule content upon release.
4. Responsive Design
   - Optimized for both desktop and mobile devices.

# Tech Stack

- **Frontend Framework**: Next.js 15 (App Router).
- **Backend Framework**: Node.js with Express.js.
- **Database**: MongoDB.
- **State Management**: Redux & Redux Toolkit.
- **Authentication**: JWT (JSON Web Tokens).
- **Styling**: Bootstrap 5.
- **Backend Simulation**: Fake payment process and admin account seeding.

# Error Handling

- Robust error handling for all API endpoints.
- Validation messages for incorrect or missing input fields.
- User-friendly alerts to guide users through the platform.
