<?php
$sText = json_decode(file_get_contents(dirname(__FILE__, 3) . '/langs/' . $_ENV['MIPHANT_LANG'] . '.json'), true);
function translate($text, ...$values): string
{
    global $sText;

    $value = empty($sText[$text]) ? $text : $sText[$text];
    $a = sprintf($value, ...$values);

    return $a;
}
