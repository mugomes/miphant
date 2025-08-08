<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");

session_name('miphant');
session_start();
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Session | MiPhant</title>
</head>

<body>
    <?php
    if (empty($_SESSION['info'])) {
        $count = 1;
        $_SESSION['info'] = $count;

        echo 'Session: ' . $count;
    } else {
        $count = $_SESSION['info'] + 1;
        $_SESSION['info'] = $count;

        echo 'Session: ' . $count;
    }

    echo '<p><a href="javascript:window.location.reload();">Update Page</a></p>';
    ?>
</body>

</html>