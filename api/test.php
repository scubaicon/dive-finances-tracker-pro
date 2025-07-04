<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "PHP is working!<br>";

// Test database connection
include_once 'config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if($db) {
        echo "Database connection successful!<br>";
        
        // Test if transactions table exists
        $query = "SELECT COUNT(*) as count FROM transactions";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo "Transactions table exists with " . $result['count'] . " records<br>";
    } else {
        echo "Database connection failed!<br>";
    }
} catch(Exception $e) {
    echo "Error: " . $e->getMessage() . "<br>";
}
?>