<?php
session_start();

// Kiểm tra nếu không có cookie 'role', chuyển hướng về login
if (!isset($_COOKIE['role'])) {
    header("Location: login.html");
    exit();
}

// Lấy role từ cookie
$role = $_COOKIE['role'];

// Đọc nội dung của dashboard.html
$html = file_get_contents('dashboard.html');

// Thay thế placeholder bằng nội dung tương ứng với role
if ($role === 'admin') {
    $content = "<h1>Welcome, Admin!</h1><p>Here is your flag: <b>CTF{admin_flag}</b></p>";
} elseif ($role === 'user') {
    $content = "<h1>Welcome, User!</h1><p>You are not an admin!</p><p>You need to become an admin.</p>";
} else {
    $content = "<p>Unknown role!</p>";
}

// Chèn nội dung vào template HTML
$html = str_replace("{{content}}", $content, $html);

// Xuất ra trang đã được cập nhật
echo $html;
?>
