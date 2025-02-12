<?php
session_start();

if (isset($_COOKIE['role']) && $_COOKIE['role'] === 'admin') {
    include('admin_dashboard.html');
} else {
    echo "You are not admin!!";
}
?>
