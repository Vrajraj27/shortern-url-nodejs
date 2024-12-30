Overview
This project implements a scalable Custom URL Shortener API with features like Google Sign-In authentication, advanced analytics, rate limiting, and URL grouping. The solution enables users to shorten long URLs, track performance via detailed analytics, and organize URLs by topic (e.g., acquisition, activation, retention). The system is designed with scalability in mind.

Key Features:
User Authentication: Google Sign-In for user authentication.
Short URL Creation: Shorten URLs and group them under specific topics.
URL Redirection: Redirect users from short URLs to long URLs.
Analytics Tracking: Track analytics data such as clicks, OS, device types, and unique users.
Topic-based Analytics: Analyze URLs based on user-defined topics.
Caching: Use Redis to improve performance by caching short URLs and analytics.

Endpoints
1. User Authentication via Google Sign-In
Endpoint: /api/auth/google
Method: GET

2. Create Short URL
Endpoint: /api/shorten
Method: POST

3. Redirect Short URL
Endpoint: /api/shorten/:alias
Method: GET
Example: /api/shorten/my-alias → Redirects to https://example.com/very/long/url.

4.Get URL Analytics
Endpoint: /api/analytics/:alias
Method: GET

5. Get Topic-Based Analytics
Endpoint: /api/analytics/topic/:topic
Method: GET

6. Get Overall Analytics
Endpoint: /api/analytics/overall
Method: GET



Rate Limiting
Rate limiting has been implemented to prevent abuse of URL shortening. This limits how many URLs a user can shorten within a certain period.

Caching with Redis
Redis is used to cache short URLs to improve performance.


How to Run the Project

Prerequisites:
  Node.js (v14 or later)
  MongoDB (or MongoDB Atlas for cloud setup)
  Redis (for caching)

Steps to Run:
git clone https://github.com/Vrajraj27/shortern-url-nodejs.git
cd shortern-url-nodejs

npm install

create .env file with following details:
  PORT=port
  DB_URL=your-mongodb-url
  JWT_AUTH_TOKEN=your-jwt-secret
  REDIS_PASSWORD=your-redis-password
  REDIS_HOST=your-redis-host
  REDIS_PORT=your-redis-port
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
  GOOGLE_CLIENT_CALLBACK_URL=your-google-callback-url with path/api/auth/google
  GEOLOCATION_APIKEY=your-geolocation-api-key


API Documentation
`https://documenter.getpostman.com/view/37843665/2sAYJ7fJf7`
