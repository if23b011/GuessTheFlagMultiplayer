<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {   
        if ($_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        echo json_encode(['success' => false]);
        exit;
    }

    // Session-Variablen entfernen
    $_SESSION = [];

    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Abmelden</title>
</head>
<body>
    <button id="signOutButton" class="sign-out-btn">Abmelden</button>

    <script>
    document.getElementById('signOutButton').addEventListener('click', function() {
        fetch('sign_out.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'csrf_token=' + encodeURIComponent(document.cookie.split('=')[1])
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'login.html';
            } else {
                alert('Fehler beim Abmelden.');
            }
        })
        .catch(error => console.error('Fehler:', error));
    });
    </script>
</body>
</html>
