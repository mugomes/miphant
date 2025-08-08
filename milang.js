// Copyright (C) 2025 Murilo Gomes Julio
// SPDX-License-Identifier: MIT

// Support: https://www.mugomes.com.br/p/apoie.html

module.exports = class milang {
    constructor(platform, dirapp) {
        const fs = require('fs');
        const path = require('path');

        let aLang = '';

        if (platform == 'linux') {
            aLang = (process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES).split('.')[0].split('_')[0];
        } else {
            const { execFileSync } = require('child_process');
            aLang = String(execFileSync('powershell.exe', ['(Get-WinUserLanguageList)[0].LanguageTag'], { encoding: 'utf-8' })).trim().split('-')[0];
        }

        process.env.MIPHANT_LANG = aLang;

        // Idioma do App
        let sPath = path.join(dirapp, '/app/langs/', `${aLang}.json`);

        if (fs.existsSync(sPath)) {
            this.sLangApp = JSON.parse(fs.readFileSync(sPath), 'utf-8');
        } else {
            if (fs.existsSync(path.join(dirapp, '/app/langs/en.json'))) {
                this.sLangApp = JSON.parse(fs.readFileSync(path.join(dirapp, '/app/langs/en.json'), 'utf-8'));
            } else {
                this.sLangApp = [];
            }
        }
    }

    traduzir(texto, ...values) {
        return (this.sLangApp[texto]) ? require('util').format(this.sLangApp[texto], ...values) : require('util').format(texto, ...values);
    }
}