<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Open File</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php
    if (!empty($_GET['filename'])) {
        $filename = filter_input(INPUT_GET, 'filename');

        echo '<textarea>' . file_get_contents($filename) . '</textarea>';
        exit;
    }
    ?>
    <script>
        async function open() {
            let sOpen = await miphant.openFile();
            window.location.assign(`?filename=${sOpen.toString()}`);
        }
        open();
    </script>
</body>

</html>