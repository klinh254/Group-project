<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === 'username' && $password === 'password') {
        // Đặt role mặc định là user
        $_SESSION['role'] = 'user';
        setcookie('role', 'user', time() + 3600, '/');

        header("Location: dashboard.php");
        exit();
    } else {
        echo "Wrong username or password!";
    }
} else {
    header("Location: login.html");
    exit();
}
?>
