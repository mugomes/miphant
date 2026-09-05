<?php
$sDirLang = dirname(__FILE__) . '/langs/';

if (file_exists($sDirLang . $_ENV['MIPHANT_LANG'] . '.json')) {
    $sText = json_decode(file_get_contents($sDirLang . $_ENV['MIPHANT_LANG'] . '.json'), true);

    function translate($text, ...$values): string
    {
        global $sText;

        $value = empty($sText[$text]) ? $text : $sText[$text];
        $a = sprintf($value, ...$values);

        return $a;
    }

    echo '<h3>PHP</h3>';
    echo translate('Continue') . '<br>';
    echo translate('Unable to find file %s', 'example.txt');
}
?>
<h3>JavaScript</h3>
<div id="example"></div>
<script>
    getTranslate();
    async function getTranslate() {
        document.getElementById('example').innerHTML = await miphant.translate('Cancel') + '<br>';
        document.getElementById('example').innerHTML += await miphant.translate('Unable to find file %s', 'example.js');
    }
</script>