# Namma-Services

A full-stack web application designed to connect service providers with job posters for household services. The platform uses a coin-based job selection system, enabling fair and limited job access to verified users.

# Tech Stack

Frontend
1.React
2.Redux Toolkit
3.Vite
4.TailwindCSS
5.toast
6.lucid icons

Backend
1.Node.js
2.Express
3.MongoDB
4.JWT Authentication
5.Cloudinary
6.Multer
7.Razorpay Integration

🔧 Key Features – Namma Services
🔐 Secure Authentication
JWT-based login & registration.
OTP verification for account activation.
Role-based access for Admin, Service Provider, and Work Provider.

👥 Role-Based Dashboards
Tailored dashboards with permission-based functionalities:

👷 Service Providers:
Browse and filter jobs within a 10–15 km radius (geospatial queries).
Apply to jobs using coins.
Track earnings, job statistics, and badge status.

🧑‍💼 Work Providers:
Post jobs and manage applicants.
Approve/reject applications and assign/cancel jobs.
Tip service providers and process salary payments.

🛠️ Admin:
Approve or deactivate user accounts.
Review and verify badge requests.

📍 Location-Based Job Matching
Jobs displayed based on proximity using MongoDB’s geospatial queries
Enhances relevancy and efficiency for service providers

🪙 Coin-Based Job Applications
Providers spend earned or purchased coins to apply for jobs
Integrated wallet system for coin deposits and balance tracking

💼 Job Lifecycle Management
Apply, assign, approve, reject, or cancel jobs
Real-time status tracking and updates

💰 Wallet & Earnings Dashboard
Transparent coin transaction history
Earnings summary per job and overall
Job activity log for both parties

💸 Razorpay Integration
Secure wallet top-ups.
Instant payments after job completion.
Tip functionality included for work providers.


☁️ Image Uploads with Cloudinary
Profile and job-related image uploads.
Built using Multer middleware + Cloudinary API.