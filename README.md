# MiPhant

> [!NOTE]
> This repository has been migrated to Codeberg
> Please see: https://codeberg.org/bluice/miphant

MiPhant is a **desktop runtime for PHP applications**, allowing you to build and distribute software for **Linux and Windows** using **PHP, HTML, CSS, and JavaScript**, running inside native desktop windows powered by Electron.

Unlike a traditional browser, MiPhant executes PHP applications locally using an **integrated local web server with randomly assigned ports**, ensuring application isolation, security, and the ability to run multiple apps simultaneously without conflicts.

---

## ✨ Key Features

* Run PHP applications as native desktop software
* Integrated local web server with **random ports**
* Multiple applications running simultaneously without interference
* Self-contained PHP runtime (no external dependencies required)
* Electron + Chromium-based rendering engine
* Native menus and submenus
* Multi-window support
* Integrated PHP ↔ JavaScript communication
* Dialogs for messages, confirmations, file open/save, and directory selection
* System tray icon support
* PDF export
* DevTools integration
* Application-wide close control

The PHP runtime included with MiPhant is built as a **static binary**, thanks to the excellent open source project:
👉 [FrankenPHP](https://github.com/php/frankenphp)

---

## 🌍 Internationalization

MiPhant provides native support for multi-language applications.

To add translations, create JSON language files inside the `app/langs/` directory:

```text
app/langs/en.json
app/langs/pt.json
app/langs/es.json
```

The system language is detected automatically and exposed to PHP through the environment variable:

```text
MIPHANT_LANG
```

Even if your application supports only one language, the `en.json` file is required (it may be empty, but must contain valid JSON `{}`).

---

## 🧩 Application Structure

A MiPhant application must follow this minimum structure:

```text
app/
 ├── config/
 │   └── config.json
 ├── langs/
 │   └── en.json
 └── index.php
```

---

## ⚙️ Configuration (`config.json`)

Each application must define its metadata and behavior in `app/config/config.json`:

```json
{
  "app": {
    "id": "miphantexample",
    "name": "MiPhant Example",
    "version": "1.0.0",
    "width": 800,
    "height": 600,
    "resizable": true,
    "frame": true,
    "icon": "example.png",
    "disableAccelerationHardware": true,
    "author": {
      "name": "",
      "email": "",
      "url": ""
    },
    "homepage": "",
    "license": "SEE LICENSE IN LICENSE.md",
    "copyright": "Copyright (C) 2026 Your Name. All rights reserved."
  },
  "server": {
    "perm": true
  },
  "dev": {
    "menu": true,
    "tools": false
  }
}
```

---

## 🧠 Environment Variables

MiPhant exposes system and runtime information to PHP through environment variables:

* `MIPHANT_LANG` – System language (en, pt, es, ...)
* `MIPHANT_ARGV` – Application arguments
* `MIPHANT_USERNAME` – Current user name
* `MIPHANT_HOMEDIR` – User home directory
* `MIPHANT_PLATFORM` – `linux` or `win32`

---

## 🪟 Menus and Submenus

MiPhant supports native menus via JSON definitions.

Create menu files inside:

```text
app/menus/menu.json
```

Menus can open pages, run JavaScript, open URLs, define shortcuts, separators, and even open new windows with custom dimensions.

---

## 🔔 Dialogs and System Integration

MiPhant provides enhanced dialog APIs (recommended instead of `window.alert`):

* Alert dialogs
* Confirmation dialogs
* File open/save dialogs
* Directory selection
* System notifications (Linux only)
* System tray icon

---

## 🗂 Database Support

MiPhant includes native support for **SQLite3**, allowing local databases without external dependencies.

This makes it ideal for desktop tools, offline systems, and lightweight business applications.

---

## 📦 Distribution

You can distribute your MiPhant-based software by:

* Compressing your project (`zip` or `tar.gz`)
* Creating a custom installer using **NSIS**
* Packaging as a **DEB** package (Linux)

Always include a license with your software. If unsure, consult a legal professional.

---

## 🖥 System Requirements

### Architecture

* x64 (64-bit)

### Linux

* Ubuntu 24.04 or newer

### Windows

* Windows 10 or newer
* Visual C++ Redistributable 14.42

---

## Support

* GitHub Sponsors: [https://github.com/sponsors/bluiceoficial/](https://github.com/sponsors/bluiceoficial/)
* More options: [https://www.bluice.com.br/apoie/](https://www.bluice.com.br/apoie/)

---

## 📄 License

Copyright (c) 2025-2026 Murilo Gomes Julio

Licensed under the [MIT](https://github.com/bluiceoficial/miphant/blob/main/LICENSE) license.

All contributions to the MiPhant are subject to this license.
