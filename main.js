// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, ipcMain, Menu, MenuItem, Notification } = require('electron')
const path = require('path')
require('./src/util/menu.js')

function createWindow () {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        width: 290,
        height: 250,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        resizable: false,
        frame: false,
        transparent: true,
        nodeIntegration: true,
        enableRemoteModule: true
    })

    // 加载 index.html
    mainWindow.loadFile('index.html')

    // mainWindow.on('closed',()=>{
    //     mainWindow=null
    // })

    // 打开开发工具
    // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
        // 打开的窗口，那么程序会重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('browser-window-created', function (event, win) {
    win.webContents.on('context-menu', function (e, params) {
        menu.popup(win, params.x, params.y)
    })
})

const menu = new Menu()
menu.append(new MenuItem({ 
    label: '点我一下鸭',
    click: async () => {
        new Notification({ title: 'Hello, Xiao Yu.', body: 'Merry Christmas!' }).show()
    }
}))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: '关闭', role: 'quit' }))

ipcMain.on('show-context-menu', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.popup(win)
})