// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const { url } = require('inspector')
const path = require('path')
const { title } = require('process')

function createWindow () {
  // Create the browser window.
  const mainWindow1 = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  const mainWindow2 = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })


  let language = 'es'

  // and load the index.html of the app.
  const reload = () => { mainWindow1.loadURL(`https://www.autoscout24.${language}/lst/bmw/118?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=D&kmto=150000&fregto=2016&fregfrom=2009&atype=C&`)
  
  
                         mainWindow2.loadURL(`https://www.autoscout24.${language}/lst/bmw/118?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=E&kmto=150000&fregto=2016&fregfrom=2009&atype=C&`)
}
  reload();
  // Open the DevTools.
  const contents = mainWindow1.webContents

  mainWindow1.webContents.on('did-navigate-in-page', event =>{
    mainWindow2.loadURL((contents.getURL()).replace('cy=D', 'cy=E'))
    mainWindow2.setTitle("This window is gonna render after changes of the other")
    mainWindow1.setTitle("Navigate this window")
  })


  mainWindow1.webContents.on('did-finish-load', ()=>{
    mainWindow1.setTitle("Navigate this window")
  })

  mainWindow2.webContents.on('did-finish-load', ()=>{
    mainWindow2.setTitle("This window is gonna render after changes of the other")
  })


  //menu

  const template = [
    { 
      label: 'Go back',
      click: ()=>{
        contents.goBack();
      }
     
    },
    {
      label: 'Language',
      submenu: [
        {label: 'Español',
        click: () => {
          language = 'es'
          reload();
          

        }},
        {label: 'English',
        click: () => {
          language = 'com'
          reload();



        }},
        {label: 'Deutsche',
        click: () => {
          language = 'de'
          reload();


        }},
        {label: 'Český',
        click: () => {
          language = 'cz'
          reload();


        }},
        {label: 'Polskie',
        click: () => {
          language = 'pl'
          reload();


        }}
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)

 Menu.setApplicationMenu(menu)
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
