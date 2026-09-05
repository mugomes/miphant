<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form POST</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (!empty($_POST['txtName'])) {
            $txtName = filter_input(INPUT_POST, 'txtName');

            echo 'My name is ' . $txtName . '<hr>';
        }
    }
    ?>
    <form name="frmPost" method="post" action="formpost.php">
        <div>
            <label for="txtName">Type your name</label>
            <input id="txtName" name="txtName" type="text" placeholder="Type your name" required>
        </div>
        <button type="submit">Send</button>
    </form>
</body>

</html>