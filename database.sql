-- Create database
CREATE DATABASE IF NOT EXISTS dive_center;
USE dive_center;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'owner', 'office') NOT NULL DEFAULT 'office',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('income', 'expense') NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    currency ENUM('EGP', 'USD', 'EUR', 'GBP', 'VISA') NOT NULL DEFAULT 'EGP',
    payment_method ENUM('cash', 'credit_card', 'online', 'credit') NOT NULL DEFAULT 'cash',
    status ENUM('paid', 'credit') NOT NULL DEFAULT 'paid',
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    recurring BOOLEAN DEFAULT FALSE,
    recurring_period ENUM('daily', 'weekly', 'monthly', 'yearly'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, name, role) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin'),
('office', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Office Staff', 'office');

-- Insert sample transactions
INSERT INTO transactions (type, category, subcategory, amount, currency, payment_method, status, description, date, created_by) VALUES
('income', 'Dive Courses', 'Open Water', 2400.00, 'EGP', 'cash', 'paid', 'Open Water Certification - 2 students', NOW(), 'office'),
('expense', 'Equipment', 'Tank Filling', 150.00, 'EGP', 'cash', 'paid', 'Nitrox tank filling - 10 tanks', DATE_SUB(NOW(), INTERVAL 1 HOUR), 'office'),
('income', 'Equipment Rental', 'Full Gear', 85.00, 'USD', 'credit_card', 'paid', 'Full gear rental - 3 days', DATE_SUB(NOW(), INTERVAL 2 HOUR), 'office');