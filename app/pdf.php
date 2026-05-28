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
    <title>PDF</title>

    <style>
    @media print {
        .no-print {
            display: none !important;
        }
    }
    </style>
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
                const sFilename = '<?php echo dirname(__FILE__) . '/pdf/example.pdf'; ?>';
            <?php } else { ?>
                const sFilename = '<?php echo str_replace('\\','\\\\', dirname(__FILE__)) . '\\\\pdf\\\\example.pdf'; ?>';
            <?php } ?>

            await miphant.exportPDF(sFilename);

            while (!(await miphant.fileExists(sFilename))) {
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            miphant.newWindow('pdf/example.pdf');
        });
    </script>
</body>

</html>
