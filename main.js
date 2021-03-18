// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const { url } = require('inspector')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow1 = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  const mainWindow2 = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow1.loadURL('https://www.autoscout24.es/lst/bmw/118?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=D&kmto=150000&fregto=2016&fregfrom=2009&atype=C&')
  mainWindow2.loadURL('https://www.autoscout24.es/lst/bmw/118?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=E&kmto=150000&fregto=2016&fregfrom=2009&atype=C&')
  // Open the DevTools.
  const contents = mainWindow1.webContents

  mainWindow1.webContents.on('did-navigate-in-page', event =>{
    mainWindow2.loadURL((contents.getURL()).replace('cy=D', 'cy=E'))
  })
 
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
