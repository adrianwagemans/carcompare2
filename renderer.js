// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron');

            // Some data that will be sent to the main process
            

        let languages = ["espanol",'english','french', 'nl'];
        
        
        
        for (let i = 0; i < languages.length; i++) {
          


            const btn = document.getElementById(languages[i]);

            btn.addEventListener('click', () => {

                let Data = languages[i]
                ipcRenderer.send('click' );
                ipcRenderer.send('request-mainprocess-action', Data)
              });


            }

            // Send information to the main process
            // if a listener has been set, then the main process
            // will react to the request !
            