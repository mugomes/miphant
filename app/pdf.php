<?php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'");

if (!file_exists(dirname(__FILE__) . '/pdf/')) {
    mkdir(dirname(__FILE__) . '/pdf/', 0777, true);
}
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>
    <button id="pdf" type="button" class="no-print">Export PDF</button>
    <div class="display-none print">
        <h3>Example PDF</h3>
        <table>
            <tr>
                <td><strong>Date/Time:</strong></td>
                <td><?php echo date('Y-m-d H:i:s'); ?></td>
            </tr>
        </table>
    </div>
    <p class="no-print">Print div</p>
    <script>
        const pdf = document.getElementById('pdf');

        pdf.addEventListener('click', async () => {
            <?php if ($_ENV['MIPHANT_PLATFORM'] == 'linux') { ?>
                await miphant.exportPDF('<?php echo dirname(__FILE__) . '/pdf/example.pdf'; ?>');
            <?php } else { ?>
                await miphant.exportPDF('<?php echo str_replace('\\','\\\\', dirname(__FILE__)) . '\\\\pdf\\\\example.pdf'; ?>');
            <?php } ?>
            miphant.newWindow('/pdf/example.pdf');
        });
    </script>
</body>

</html>