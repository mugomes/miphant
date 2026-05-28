<?php
header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'");
include_once(__DIR__ . '/security.php');

miphantSecurity();

date_default_timezone_set("America/Sao_Paulo");
?>
<!DOCTYPE html>
<html lang="<?php echo $_ENV['MIPHANT_LANG']; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timezone | MiPhant</title>
</head>
<body>
    <?php echo date('d/m/Y') . ' ' . date('H:i:s'); ?>
</body>
</html>
