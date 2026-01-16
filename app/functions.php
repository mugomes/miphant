<?php
// Copyright (C) 2025 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Site: https://www.mugomes.com.br

function miphantSecurity()
{
    echo getenv('http');
    if (
        !empty($_SERVER['HTTP_MIPHANT_SECURITY_PUBLIC_KEY']) &&
        !empty($_SERVER['HTTP_MIPHANT_SECURITY_MESSAGE']) &&
        !empty($_SERVER['HTTP_MIPHANT_SECURITY_SIGNATURE'])
    ) {
        $sPublicKey = base64_decode($_SERVER['HTTP_MIPHANT_SECURITY_PUBLIC_KEY']);
        $sData = base64_decode($_SERVER['HTTP_MIPHANT_SECURITY_MESSAGE']);
        $sSignature = base64_decode($_SERVER['HTTP_MIPHANT_SECURITY_SIGNATURE']);

        $signature = base64_decode($sSignature);

        $pubKey = openssl_pkey_get_public($sPublicKey);

        if (!openssl_verify($sData, $signature, $pubKey, OPENSSL_ALGO_SHA256)) {
            exit;
        }
    } else {
        exit;
    }
}
