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

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve values from the form
    $email = $conn->real_escape_string($_POST["email"]);  // Sanitize input
    $password = $_POST["password"];
    if($email=='admin@gmail.com'&&$password=='admin')
    {
        header('location:admin.html');
        $conn->close();
        exit();
    }
    // Validate user credentials using hashed password
    $sql = "SELECT * FROM userdata WHERE username = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verify password using password_verify
        if (password_verify($password, $row['password'])) {
            // User is authenticated
            echo "Login successful!";
            header('location:index.html');
        } else {
            // Invalid password
            echo "Invalid email or password";
        }
    } else {
        // User not found
        echo "Invalid email or password";
    }
}
?>
