<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "web";

// Create a connection
$conn = new mysqli($host, $username, $password, $database, 3307);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}




// Close connection
$conn->close();
?>
