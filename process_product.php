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
    $productName = isset($_POST["product-name"]) ? $_POST["product-name"] : null;
    $imageURL = isset($_POST["url"]) ? $_POST["url"] : null;
    $price = isset($_POST["price"]) ? $_POST["price"] : null;
    $category = isset($_POST["category"]) ? $_POST["category"] : null;

    if (isset($_POST["add"])) {
        
        $sql = "INSERT INTO product (name, url, price, category) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        // Check if the statement is prepared successfully
        if ($stmt) {
            $stmt->bind_param("ssds", $productName, $imageURL, $price, $category);
            $stmt->execute();
            $stmt->close();

            // Optionally, you can redirect to a success page or display a success message
            header("Location: admin.html");
            exit();
        } else {
            // Handle the error, e.g., display an error message or redirect to an error page
            echo "Error: " . $conn->error;
        }
    } 



// Close connection
$conn->close();
?>
