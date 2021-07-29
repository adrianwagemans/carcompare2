// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, webContents} = require('electron')
const { url } = require('inspector')
const path = require('path')
const { title } = require('process')
const { dialog, remote} = require('electron')
const fs = require('fs')



//event click from welcome page

const { ipcMain } = require('electron')
ipcMain.on('click', () => {  

  
  setTimeout(function(){
    
   setTimeout(function() {
     win1.close()},200)
    createWindow()
   
  
  }, 200)



  
  
} );



//options language menu, and tittle

  let countrySearch = ['D','F','I','E','NL','A','']


  let countrySearchChoice = countrySearch[0]
  let countryCompareChoice = countrySearch[3]





 let win1Message = ['Navegar en esta pagina', 'Diese Seite durchsuchen', 'Browse this page', 'Parcourir cette page','Browse this page',  ]
 let win2Message = ['Pagina espejo (no navegar)',  'Seite spiegeln (nicht durchsuchen)', 'Mirror page (dont browse)', 'Page miroir (ne pas parcourir)', 'Mirror page (dont browse)' ]


 let  menu= [
             ['Atras', 'Zurück', 'Go Back', 'Retour', 'Terug'],
             ['Buscar autos en',"Autos finden in",'Find cars in','Trouver des voitures dans','Vind autos in'],
             ['Comparar con','Vergleichen mit','Compare with','Comparer avec','Vergelijken met'],
             ['Traducir descripción del coche','Fahrzeugbeschreibung übersetzen','Translate car description','Traduire la description de la voiture','Vertaal autobeschrijving']
            ]

console.log(menu[0][0])


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

  let help = ['Esta app le permitira buscar coches en un pais y realizar la misma busqueda en otro pais. esta pensada para comparar' + 
  ' precios de autos similares en distintos paises de Europa, solo utilice la interfaz de autoscout 24 para filtrar su busqueda y vera '+ 
  ' instantaneamente la comparacion con el pais elegido',

  'Mit dieser App können Sie nach Autos in einem Land suchen und dieselbe Suche in einem anderen Land durchführen.' + 
  'Es wurde entwickelt, um die Preise ähnlicher Autos in verschiedenen europäischen Ländern zu vergleichen. Verwenden Sie einfach die ' + 
  'autoscout 24-Oberfläche, um Ihre Suche zu filtern, und Sie sehen sofort den Vergleich mit dem ausgewählten Land.',

  'This app will allow you to search for cars in one country and carry out the same search in another country. It is designed to compare '+
  'Similar car prices in different European countries, just use the autoscout 24 interface to filter your search and you will see' +
  'instantly the comparison with the chosen country',

  `Cette application vous permettra de rechercher des voitures dans un pays et d'effectuer la même recherche dans un autre pays. Il est conçu pour comparer '+
  'Prix de voitures similaires dans différents pays européens, utilisez simplement l'interface autoscout 24 pour filtrer votre recherche et vous verrez' +
  'instantanément la comparaison avec le pays choisi`,
  
  `Met deze app kun je naar auto's in het ene land zoeken en dezelfde zoekopdracht in een ander land uitvoeren. Het is ontworpen om '+
  'Vergelijkbare autoprijzen in verschillende Europese landen, gebruik gewoon de autoscout 24-interface om je zoekopdracht te filteren en je ziet' +
  'direct de vergelijking met het gekozen land`]




  //language setting


let language = ""
let chosenCountryMenu = []
let win1mens = ''
let win2mens = ''
let helpTag= ''
let helpDescription = ''
let backTag = ''
let findCarsTag = ''
let compareCars = ''
let win1 = ''
let translateTag = ''


  ipcMain.on('request-mainprocess-action', (event, arg) => {


    language = arg[0]


    chosenCountryMenu = menuCountry1[arg[1]]
    
    win1mens = win1Message[arg[1]]

    win2mens = win2Message[arg[1]]

    helpTag = helpLabel[arg[1]]

    helpDescription =  help[arg[1]]

    backTag = menu[0][arg[1]]

    findCarsTag = menu[1][arg[1]]

    compareCars = menu[2][arg[1]]

    translateTag = menu[3][arg[1]]

  }
  )


let autoWin1 = ''


  

//help popUp


 const popUpShow = () => dialog.showMessageBox(null,  {message: helpDescription}, (response) => {
  console.log(response);
  console.log(compareCars)
});
  
   
function createWindow1 () {

    // Create the welcome window
    const mainWindow = new BrowserWindow({
      width: 1500,
      height: 1200,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
  
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    const template = []
    let menu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(menu)
    win1 = mainWindow
  
}
    




function createWindow () {


  // Create the principal windows
  const mainWindow1 = new BrowserWindow({
    width: 1050,
    height: 1200,
    x:0,
    y:0,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

 
  const mainWindow2 = new BrowserWindow({
    width: 800,
    height: 1200,
    x:1150,
    y:0,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  

  //translatePage

  const translatePage = () => {

    mainWindow1.webContents.savePage('./description', 'HTMLOnly')
    console.log('Page was saved successfully.')

    setTimeout(()=>{ const fileContents = fs.readFileSync('./description').toString()
    let start = fileContents.search('<div data-type="description">');
    let finish = fileContents.search('<div class="gradient"></div>');
  
    let  cont = fileContents.slice(start, finish)

    let str = cont.replaceAll(/<[^>]*>/g, "");
    


    // new window google translate 

    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
  
    mainWindow.loadURL(`https://translate.google.com/?hl=es&sl=auto&tl=${language === 'com' ? 'en': language }&text=${str}&op=translate`)

  }, 200)
}

  // load and reload  of the windows.


  const reload = () => { mainWindow1.loadURL(`https://www.autoscout24.${language}/lst/bmw/118?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=${countrySearchChoice}&kmto=150000&fregto=2016&fregfrom=2009&atype=C&`)
  
  
                         mainWindow2.loadURL(`https://www.autoscout24.${language}/lst/bmw/118?sort=price&desc=0&ustate=N%2CU&size=20&page=1&cy=${countryCompareChoice}&kmto=150000&fregto=2016&fregfrom=2009&atype=C&`)
                        }
       reload();
  


  //setting tittles


  const contents = mainWindow1.webContents


   contents.on('did-navigate-in-page', event =>{
   mainWindow2.loadURL((contents.getURL()).replace(`cy=${countrySearchChoice}`, `cy=${countryCompareChoice}`))
  
  })


  mainWindow1.webContents.on('did-finish-load', ()=>{
    mainWindow1.setTitle(win1mens)
  })

    mainWindow2.webContents.on('did-finish-load', ()=>{
    mainWindow2.setTitle(win2mens)
 })


  //menu

  const template = [
    { 
      label: backTag,
      click: ()=>{
        contents.goBack();
        
      }
     
    },
    {
      label: findCarsTag,
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
      label: compareCars,
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
    },
    {
      label: translateTag,
      click: ()=>{
        translatePage();

      } 
       },
    {
     label: helpTag,
     click : ()=>{
       popUpShow();
     } 
     
    }


    
  ]
    let menu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(menu)
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  -  createWindow1()


  
  
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
