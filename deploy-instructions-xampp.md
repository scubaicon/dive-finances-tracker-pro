# XAMPP Deployment Instructions

## Prerequisites
1. Install XAMPP on your local machine
2. Make sure Apache and MySQL are running in XAMPP Control Panel

## Database Setup
1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Import the `database.sql` file to create the database and tables
3. Verify the database `dive_center` is created with `users` and `transactions` tables

## Backend Setup
1. Copy the entire `api` folder to your XAMPP `htdocs` directory
2. Final structure should be: `htdocs/dive_center/api/`
3. Test the API endpoints:
   - Login: POST http://localhost/dive_center/api/auth/login.php
   - Transactions: GET http://localhost/dive_center/api/transactions/

## Frontend Setup
1. Run `npm run build` to create the production build
2. Copy all contents of the `dist` folder to `htdocs/dive_center/`
3. Make sure the `.htaccess` file is included for React Router

## Final Directory Structure
```
htdocs/dive_center/
├── index.html (from dist)
├── .htaccess (from dist)
├── assets/ (from dist)
├── api/
│   ├── config/
│   │   ├── database.php
│   │   └── cors.php
│   ├── models/
│   │   ├── User.php
│   │   └── Transaction.php
│   ├── auth/
│   │   └── login.php
│   └── transactions/
│       └── index.php
└── database.sql
```

## Default Login Credentials
- Username: `admin` / Password: `admin123`
- Username: `office` / Password: `admin123`

## Testing
1. Access the app at: http://localhost/dive_center/
2. Login with the credentials above
3. Test adding, editing, and deleting transactions

## Important Notes
- The app now uses MySQL database instead of localStorage
- All data is persistent across browser sessions
- Make sure XAMPP's Apache and MySQL services are running
- The API base URL is set to `http://localhost/dive_center/api`