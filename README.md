# MiPhant

MiPhant is a browser that allows you to create and run desktop applications using HTML, CSS, JavaScript and PHP.

The software is developed in Node, Electron and Chromium. To run PHP scripts, it runs the built-in PHP server integrated with random ports. This way, you can run multiple applications simultaneously without them interfering with each other.

We use a static version of PHP, thanks to the excellent [static-php-cli](https://github.com/crazywhalecc/static-php-cli) project.

## Languages

In MiPhant, you can develop applications in multiple languages. Simply create a language file in JSON format in the langs folder and add the translations. When you run the application on a computer with a different language, MiPhant will detect the language and fetch the translation from the translation file.

## MiPhant Functions

- MiPhant Version and Internal Features
- Support for working with routes in PHP
- Menu and Submenu
- Dialog Boxes for Message and Confirmation
- Dialog Boxes for Opening and Saving File and Selecting Directory
- New Window to open in the application itself
- Open URL in an external browser
- Display Notification
- Icon in the system tray
- Export to PDF
- Translation in JS
- DevTools
- Close Application
- Env: ARGV, Username, HomeDir, Platform and Lang

## System Requirement

- Architecture: x64

### Linux

- Debian 12 or higher
- Ubuntu 22.04 or higher

### Windows

- Windows 10 or higher
- Visual C++ Redistributable 14.42 (Windows)

## Support

- GitHub: https://github.com/sponsors/profmugomes/
- LivePix: https://livepix.gg/profmugomes

## License

Copyright (c) 2025-2026 Murilo Gomes <profmugomes.com.br>

Licensed under the [MIT](https://github.com/profmugomes/miphant/blob/main/LICENSE) license.

All contributions to the MiPhant are subject to this license.