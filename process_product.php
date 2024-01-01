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
    }  elseif (isset($_POST["update"])) {
        $productIDToUpdate = isset($_POST["product-id"]) ? $_POST["product-id"] : null;
        $sql = "UPDATE product SET name = ?, url = ?, price = ?, category = ? WHERE ID = ?";
        $stmt = $conn->prepare($sql);
    
        // Check if the statement is prepared successfully
        if ($stmt) {
            $stmt->bind_param("ssdii", $productName, $imageURL, $price, $category, $productIDToUpdate);
            $stmt->execute();
            $stmt->close();
    
            // Optionally, you can redirect to a success page or display a success message
            header("Location: products.html");
            exit();
        } else {
            // Handle the error, e.g., display an error message or redirect to an error page
            echo "Error: " . $conn->error;
        }
    } elseif (isset($_POST["delete"])) {
        $productNameToDelete = isset($_POST["product-name"]) ? $_POST["product-name"] : null;

        // Delete data from the Products table based on product name
        $sql = "DELETE FROM product WHERE name = ?";
        $stmt = $conn->prepare($sql);

        // Check if the statement is prepared successfully
        if ($stmt) {
            $stmt->bind_param("s", $productNameToDelete);
            $stmt->execute();
            $stmt->close();

            // Optionally, you can redirect to a success page or display a success message
            header("Location: index.html");
            exit();
        } else {
            // Handle the error, e.g., display an error message or redirect to an error page
            echo "Error: " . $conn->error;
        }
    }
}



// Close connection
$conn->close();
?>
