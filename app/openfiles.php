<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Open Files</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="txtFiles"></div>
    <script>
        const txtFiles = document.getElementById('txtFiles')
        async function open() {
            let sOpen = await miphant.openFile(true);
            sOpen.forEach((value) => {
                txtFiles.innerHTML += `${value}<br>`;
            });
        }
        open();
    </script>
</body>

</html>
