<?php
header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'");
include_once(__DIR__ . '/security.php');

miphantSecurity();

phpinfo();
