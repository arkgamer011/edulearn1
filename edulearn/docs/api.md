# EduLearn API Documentation

## Authentication
- `POST /api/auth/register`: Register a new user (Email/Password).
- `POST /api/auth/login`: Authenticate user and return JWT.
- `POST /api/auth/social`: Authenticate via Google/Apple.
- `POST /api/auth/mfa/verify`: Verify MFA token.

## Users
- `GET /api/users/me`: Get current user profile.
- `PUT /api/users/me`: Update user profile.
- `GET /api/users/:id/progress`: Get user's course progress.

## Courses (CMS)
- `GET /api/courses`: List published courses.
- `GET /api/courses/:id`: Get course details.
- `POST /api/courses`: Create a new course (Instructor only).
- `PUT /api/courses/:id`: Update course details.
- `POST /api/courses/:id/modules`: Add a module to a course.
- `POST /api/modules/:id/lessons`: Add a lesson to a module.

## Live Classes (WebRTC & Socket.io)
- `POST /api/live/create`: Create a new live session room.
- `GET /api/live/:id/token`: Get access token for WebRTC room.

## Payments (Stripe)
- `POST /api/payments/create-intent`: Create a Stripe PaymentIntent for a course.
- `POST /api/payments/webhook`: Stripe webhook handler.

## AI Tutor
- `POST /api/ai/chat`: Send a message to the AI tutor (context-aware based on course material).
