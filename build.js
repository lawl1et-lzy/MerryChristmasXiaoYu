const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')
function getInstallerConfig () {
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'builds')
    
    const config = { 
        appDirectory: path.join(outPath, 'base64-convertor-win32-x64'),
        authors: 'Allen Wu',
        noMsi: true,
        outputDirectory: path.join(rootPath, 'installers'),
        exe: 'base64-convertor.exe',
        setupExe: 'base64-convertor-installer.exe',
    }
    return Promise.resolve(config)
}
getInstallerConfig()
    .then(createWindowsInstaller)
    .catch(err => {
        console.error(err.message || err)
        process.exit(1)
    })