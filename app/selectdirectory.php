<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Select Directory</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php
    if (!empty($_GET['directory'])) {
        $selectDirectory = filter_input(INPUT_GET, 'directory');

        echo $selectDirectory;
        exit;
    }
    ?>
    <script>
        async function open() {
            let sSelect = await miphant.selectDirectory();
            window.location.assign(`?directory=${sSelect.toString()}`);
        }
        open();
    </script>
</body>

</html>