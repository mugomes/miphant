<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Save File</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php
    if (!empty($_GET['filename'])) {
        $filename = filter_input(INPUT_GET, 'filename');

        file_put_contents($filename, rand(10000, 99999));
        echo 'File ' . basename($filename) . ' saved successfully!';
        exit;
    }
    ?>
    <script>
        async function save() {
            let sSave = await miphant.saveFile();
            window.location.assign(`?filename=${sSave.toString()}`);
        }
        save();
    </script>
</body>

</html>