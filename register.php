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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve values from the form
    $email = $conn->real_escape_string($_POST["email"]);  // Sanitize input
    $password = $_POST["password"];

    // Validate and sanitize email
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Check if the email is already registered
    $checkQuery = "SELECT * FROM userdata WHERE username = '$email'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
        // Email already exists
        echo "Email is already registered. Please choose a different email.";
    } else {
        // Insert new user into the database with hashed password
        $insertQuery = "INSERT INTO userdata (username, password) VALUES ('$email', '$hashed_password')";

        if ($conn->query($insertQuery) === TRUE) {
            // Registration successful
            echo "Registration successful! You can now login.";
            header('location:index.html');
        } else {
            // Error in registration
            echo "Error: " . $insertQuery . "<br>" . $conn->error;
        }
    }
}
?>
