module.exports = {
    packagerConfig: {
        ignore: [
            /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)|(translate.php)/,
            /^\/node_modules\/.vite/,
            /^\/.git/,
            /^\/.github/,
            /^\/php/,
            /^\/app/
        ],
        icon: './icon/miphant.ico',
        asar: true,
        extraResource: [
            "./app/",
            "./php/",
            "./LICENSE",
            "./README.md"
        ]
    },
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {}
        }
    ],
    makers: [
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "win32",
                "linux"
            ]
        }
    ],
    publishers: []
}
