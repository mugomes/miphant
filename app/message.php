<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <button type="button" onclick="message()">Display message</button>
    <button type="button" onclick="confirm()">Confirm message</button>
    <div id="info"></div>
    <script>
        async function message() {
            miphant.alert('Information message', 'This is an example of a message!', 'info', 'Continue');
        }

        async function confirm() {
            miphant.confirm('Confirmation message', 'This is an example of a message!', 'error', 'Continue', 'Cancel', 'Button1', 'Button2').then((result) => {
                if (result == 1) {
                    document.getElementById('info').innerHTML = 'Not confirmed';
                } else if (result == 2) {
                    document.getElementById('info').innerHTML = 'Button 1';
                } else if (result == 3) {
                    document.getElementById('info').innerHTML = 'Button 2';
                } else {
                    document.getElementById('info').innerHTML = 'Confirmed';
                }
            });
        }
    </script>
</body>

</html>