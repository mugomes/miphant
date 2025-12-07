<?php
// Copyright (C) 2025 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Site: https://www.mugomes.com.br

function miphantSecurity(): bool {
    $sPublicKey = $_ENV['MIPHANT_SECURITY_PUBLIC_KEY'];
    $sData = $_ENV['MIPHANT_SECURITY_MESSAGE'];
    $sSignature = $_ENV['MIPHANT_SECURITY_SIGNATURE'];

    $signature = base64_decode($sSignature);

    $pubKey = openssl_pkey_get_public($sPublicKey);

    if (openssl_verify($sData, $signature, $pubKey, OPENSSL_ALGO_SHA256) === 1) {
        return true;
    } else {
        return false;
    }
}
