<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arguments</title>
</head>

<body>
    <p>To get the arguments run the terminal or cmd, go to your folder and type:</p>
    <ul>
        <li>Linux: ./miphant test1 test2 test3</li>
        <li>Windows: miphant.exe test1 test2 test3</li>
    </ul>
    <?php
    if (empty($_ENV['MIPHANT_ARGV'])) {
        echo 'No argument has been found!';
    } else {
        echo $_ENV['MIPHANT_ARGV'];
    }
    ?>
</body>

</html>