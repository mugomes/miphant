<?php
// Copyright (C) 2025-2026 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Site: https://www.bluice.com.br

$MIPHANT_VERSION = '5.0.0';
$urlDownload = [
    'linux' => sprintf('https://github.com/mugomes/miphant/releases/download/v%s/miphant-%s-linux.zip', $MIPHANT_VERSION, $MIPHANT_VERSION),
    'win' => sprintf('https://github.com/mugomes/miphant/releases/download/v%s/MiPhant-%s-win.zip', $MIPHANT_VERSION, $MIPHANT_VERSION)
];

$pathProjects = [
    'linux' => dirname(__FILE__, 4) . '/packages/linux/',
    'win' => dirname(__FILE__, 4) . '/packages/win/'
];
