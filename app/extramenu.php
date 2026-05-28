<?php
header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'");
include_once(__DIR__ . '/security.php');

miphantSecurity();
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Extra Menu</title>
</head>

<body>
Create menus for each window by creating a menu.json in the config folder.
</body>

</html>
