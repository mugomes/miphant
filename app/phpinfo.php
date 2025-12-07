<?php
header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:");
include_once(__DIR__ . '/functions.php');
miphantSecurity();

phpinfo();
