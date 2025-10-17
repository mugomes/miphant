<?php
// Copyright (C) 2025 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Site: https://github.com/mugomes

include_once(__DIR__ . '/includes/config.php');
include_once(__DIR__ . '/includes/functions.php');
include_once(__DIR__ . '/includes/translate.php');

$MIPHANT_APP_ID = getConfig('app', 'id');
$MIPHANT_APP_VERSION = getConfig('app', 'version');

$newLine = (php_sapi_name() == 'cli') ? PHP_EOL : '<br>';

echo translate('Generating packages...') . $newLine;

// Create folder Packages
if (!file_exists(dirname(__FILE__, 3) . '/packages/')) {
    mkdir(dirname(__FILE__, 3) . '/packages/');
}

// Create folder Linux in Packages
if (!file_exists($pathProjects['linux'])) {
    mkdir($pathProjects['linux']);
}

// Create folder Win in Packages
if (!file_exists($pathProjects['win'])) {
    mkdir($pathProjects['win']);
}


// Download MiPhant
echo translate('Downloading Files...') . $newLine;
if (!file_exists($pathProjects['linux'] . 'miphant.zip')) {
    downloadFile($urlDownload['linux'], $pathProjects['linux'] . 'miphant.zip');
}

// Download MiPhant
if (!file_exists($pathProjects['win'] . 'miphant.zip')) {
    downloadFile($urlDownload['win'], $pathProjects['win'] . 'miphant.zip');
}

// Remove project older
echo translate('Removing Project Older...') . $newLine;
if (file_exists($pathProjects['linux'] . $MIPHANT_APP_ID . '/')) {
    excluirRecursivamente($pathProjects['linux'] . $MIPHANT_APP_ID . '/');
}

if (file_exists($pathProjects['win'] . $MIPHANT_APP_ID . '/')) {
    excluirRecursivamente($pathProjects['win'] . $MIPHANT_APP_ID . '/');
}

// Extract MiPhant
echo translate('Extracting files...') . $newLine;
extractFile($pathProjects['linux']);
extractFile($pathProjects['win']);

// Remove App
echo translate('Deleting app folder...') . $newLine;
excluirRecursivamente($pathProjects['linux'] . $MIPHANT_APP_ID . '/resources/app/');
excluirRecursivamente($pathProjects['linux'] . $MIPHANT_APP_ID . '/resources/php/');
excluirRecursivamente($pathProjects['win'] . $MIPHANT_APP_ID . '/resources/app/');
excluirRecursivamente($pathProjects['win'] . $MIPHANT_APP_ID . '/resources/php/');

// Copy App
echo translate('Copying the project app folder') . $newLine;
copyFolder(dirname(__FILE__, 2), $pathProjects['linux'] . $MIPHANT_APP_ID . '/resources/app/');
copyFolder(dirname(__FILE__, 3) . '/php/', $pathProjects['linux'] . $MIPHANT_APP_ID . '/resources/php/');
copyFolder(dirname(__FILE__, 2), $pathProjects['win'] . $MIPHANT_APP_ID . '/resources/app/');
copyFolder(dirname(__FILE__, 3) . '/php/', $pathProjects['win'] . $MIPHANT_APP_ID . '/resources/php/');

// Remove Build
echo translate('Deleting build folder...') . $newLine;
excluirRecursivamente($pathProjects['linux'] . $MIPHANT_APP_ID . '/resources/app/build/');
excluirRecursivamente($pathProjects['win'] . $MIPHANT_APP_ID . '/resources/app/build/');

// Obfuscator
include_once(__DIR__ . '/obfuscator.php');

// Zip Projects
echo translate('Compacting project for Linux...') . $newLine;
if (zipFolder($pathProjects['linux'] . $MIPHANT_APP_ID, $pathProjects['linux']  . $MIPHANT_APP_ID . '-' . $MIPHANT_APP_VERSION . '-linux.zip')) {
    echo translate('Finish!') . $newLine;
}

echo translate('Compacting project for Win...') . $newLine;
if (zipFolder($pathProjects['win'] . $MIPHANT_APP_ID, $pathProjects['win']  . $MIPHANT_APP_ID . '-' . $MIPHANT_APP_VERSION . '-win.zip')) {
    echo translate('Finish!') . $newLine;
}
