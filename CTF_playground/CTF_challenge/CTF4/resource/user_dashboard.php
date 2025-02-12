<?php
session_start();

if (isset($_COOKIE['role'])) {
    if ($_COOKIE['role'] === 'admin') {
        header("Location: admin_dashboard.php");
        exit();
    } elseif ($_COOKIE['role'] === 'user') {
        include('user_dashboard.html');
    } else {
        echo "Unknown role!";
    }
} else {
    header("Location: login.html");
    exit();
}
?>
