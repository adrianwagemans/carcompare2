// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const { url } = require('inspector')
const path = require('path')
const { title } = require('process')


// In some file from the main process
// like main.js
const { ipcMain } = require('electron')
ipcMain.on('click', () => {  
  createWindow()
  
} );

ipcMain.on('request-mainprocess-action', (event, arg) => {

  console.log(arg);
})






function createWindow1 () {

    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
  
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
      console.log('dasdasdasd')
  

  
}
    


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

  
  let countrySearch = ['D','F','I','E','NL','A','']
  let countrySearchChoice = countrySearch[0]
  let countryCompareChoice = countrySearch[3]

 let win1Message = ['Navegar en esta pagina', 'Diese Seite durchsuchen', 'Browse this page', 'Parcourir cette page','Browse this page',  ]
 let win2Message = ['Pagina espejo (no navegar)',  'Seite spiegeln (nicht durchsuchen)', 'Mirror page (dont browse)', 'Page miroir (ne pas parcourir)', 'Mirror page (dont browse)' ]
 let  menuBack = ['Atras', 'Zurück', 'Go Back', 'Retour', 'Terug']


 let menuCountry1 = [['Alemania', 'Francia', 'Italia', 'Espana', 'Holanda','austria','Europa'], 
                     ['Deutschland', 'Frankreich', 'Italien', 'Spanien', 'Holland', 'Österreich', 'Europa'],
                     ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Austria', 'Europe'],
                     ["Allemagne", "France", "Italie", "Espagne", "Hollande", "Autriche", "Europe"],
                     ['Duitsland', 'Frankrijk', 'Italië', 'Spanje', 'Holland', 'Oostenrijk', 'Europa']]


 let menuCountry2 = [['Alemania', 'Francia', 'Italia', 'Espana', 'Holanda','austria','Europa'],
                     ['Deutschland', 'Frankreich', 'Italien', 'Spanien', 'Holland', 'Österreich', 'Europa'],
                     ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Austria', 'Europe'], 
                     ["Allemagne", "France", "Italie", "Espagne", "Hollande", "Autriche", "Europe"],
                     ['Duitsland', 'Frankrijk', 'Italië', 'Spanje', 'Holland', 'Oostenrijk', 'Europa']]

  let helpLabel = ['ayuda', 'Hilfe', 'help', 'aider', 'helpen' ]

  let help = [['Esta app le permitira buscar coches en un pais y realizar la misma busqueda en otro pais. esta pensada para comparar' + 
  ' precios de autos similares en distintos paises de Europa, solo utilice la interfaz de autoscout 24 para filtrar su busqueda y vera '+ 
  ' instantaneamente la comparacion con el pais elegido'],

  ['Mit dieser App können Sie nach Autos in einem Land suchen und dieselbe Suche in einem anderen Land durchführen.' + 
  'Es wurde entwickelt, um die Preise ähnlicher Autos in verschiedenen europäischen Ländern zu vergleichen. Verwenden Sie einfach die ' + 
  'autoscout 24-Oberfläche, um Ihre Suche zu filtern, und Sie sehen sofort den Vergleich mit dem ausgewählten Land.'],

  ['help', 'This app will allow you to search for cars in one country and carry out the same search in another country. It is designed to compare '+
  'Similar car prices in different European countries, just use the autoscout 24 interface to filter your search and you will see' +
  'instantly the comparison with the chosen country'],

  [`Cette application vous permettra de rechercher des voitures dans un pays et d'effectuer la même recherche dans un autre pays. Il est conçu pour comparer '+
  'Prix de voitures similaires dans différents pays européens, utilisez simplement l'interface autoscout 24 pour filtrer votre recherche et vous verrez' +
  'instantanément la comparaison avec le pays choisi`],
  
  [`Met deze app kun je naar auto's in het ene land zoeken en dezelfde zoekopdracht in een ander land uitvoeren. Het is ontworpen om '+
  'Vergelijkbare autoprijzen in verschillende Europese landen, gebruik gewoon de autoscout 24-interface om je zoekopdracht te filteren en je ziet' +
  'direct de vergelijking met het gekozen land`]]

  let chosenCountryMenu = menuCountry1[1]




  // and load the index.html of the app.
  const reload = () => { mainWindow1.loadURL(`https://www.autoscout24.${language}/lst/bmw/118?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=${countrySearchChoice}&kmto=150000&fregto=2016&fregfrom=2009&atype=C&`)
  
  
                         mainWindow2.loadURL(`https://www.autoscout24.${language}/lst/bmw/118?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=${countryCompareChoice}&kmto=150000&fregto=2016&fregfrom=2009&atype=C&`)
}
  reload();
  
  const contents = mainWindow1.webContents

  contents.on('did-navigate-in-page', event =>{
    mainWindow2.loadURL((contents.getURL()).replace('cy=D', 'cy=E'))
    mainWindow2.setTitle('sasa')
    mainWindow1.setTitle("sssd")
  })


  mainWindow1.webContents.on('did-start-loading', ()=>{
    mainWindow1.setTitle("aass")
  })

  mainWindow2.webContents.on('did-start-loading', ()=>{
    mainWindow2.setTitle("ss")
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
        { 
          label: 'Español',
          click: () => {
             language = 'es'
             chosenCountryMenu = menuCountry1[0]
              menu = Menu.buildFromTemplate(template)

              Menu.setApplicationMenu(menu)
             


            reload();
      
         }
        },
       
        {label: 'Deutsche',
        click: () => {
          language = 'de'
          chosenCountryMenu = menuCountry1[1]
          

          reload();


        }},
        {
          label: 'English',
        click: () => {
          language = 'com'
          chosenCountryMenu = menuCountry1[2]
          
            reload();
        }
      },

        {label: 'Frace',
        click: () => {
          language = 'fr'
          chosenCountryMenu = menuCountry1[3]
          reload();


        }},
        
        {label: 'Nederlands',
        click: () => {
          language = 'nl'
          chosenCountryMenu = menuCountry1[4]
          reload();


        }}
      ]
    },
    {
      label: 'look for cars in',
      submenu: [
        {label: chosenCountryMenu[0],
          click: ()=> {
            countrySearchChoice = countrySearch[0]
            reload();
            
          }
        },
        {label: chosenCountryMenu[1],
          click: ()=> {
            countrySearchChoice = countrySearch[1]
            reload();
            
          }
        },
        {label:chosenCountryMenu[2],
          click: ()=> {
            countrySearchChoice = countrySearch[2]
            reload();
            
          }
        },
        {label: chosenCountryMenu[3],
          click: ()=> {
            countrySearchChoice = countrySearch[3]
            reload();
            
          }
        },
        {label: chosenCountryMenu[4],
          click: ()=> {
            countrySearchChoice = countrySearch[4]
            reload();
            
          }
        },
        {label: chosenCountryMenu[5],
          click: ()=> {
            countrySearchChoice = countrySearch[5]
            reload();
            
          }
        },
        {label: chosenCountryMenu[6],
          click: ()=> {
            countrySearchChoice = countrySearch[6]
            reload();
            
          }
        }
      ]
    },
    {
      label: 'Compare in',
      submenu: [
        {label: chosenCountryMenu[0],
          click: ()=> {
            countryCompareChoice = countrySearch[0]
            reload();
            
          }
        },
        {label: chosenCountryMenu[1],
          click: ()=> {
            countryCompareChoice = countrySearch[1]
            reload();
            
          }
        },
        {label: chosenCountryMenu[2],
          click: ()=> {
            countryCompareChoice = countrySearch[2]
            reload();
            
          }
        },
        {label: chosenCountryMenu[3],
          click: ()=> {
            countryCompareChoice = countrySearch[3]
            reload();
            
          }
        },
        {label: chosenCountryMenu[4],
          click: ()=> {
            countryCompareChoice = countrySearch[4]
            reload();
            
          }
        },
        {label: chosenCountryMenu[5],
          click: ()=> {
            countryCompareChoice = countrySearch[5]
            reload();
            
          }
        },
        {label:chosenCountryMenu[6],
          click: ()=> {
            countryCompareChoice = countrySearch[6]
            reload();
            
          }
        }
      ]
    }


    
  ]
    let menu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(menu)
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow1()


  
  
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
