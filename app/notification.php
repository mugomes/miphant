<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <button type="button" onclick="notification()">Notification</button>
    <div id="info"></div>
    <script>
        async function notification() {
            miphant.notification('Information message', 'This is an example of a message!');
        }
    </script>
</body>

</html>