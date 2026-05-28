<?php
// Copyright (C) 2025-2026 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Site: https://www.bluice.com.br

$sText = php_sapi_name() == 'cli' ? '' : json_decode(file_get_contents(dirname(__FILE__, 3) . '/langs/' . $_ENV['MIPHANT_LANG'] . '.json'), true);
function translate(string $text, string ...$values): string
{
    global $sText;

    if (empty($sText)) {
        $a = sprintf($text, ...$values);
    } else {
        $value = empty($sText[$text]) ? $text : $sText[$text];
        $a = sprintf($value, ...$values);
    }
    return $a;
}
