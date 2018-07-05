import { app, BrowserWindow ,ipcMain} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let childWindow
var numWindow = 1
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minHeight: 760,
    width: 1324,
    useContentSize: true,
    minWidth: 1324,
    height:760,
    frame: false,
    thickFrame :true,
    autoHideMenuBar:true, 
    opcity:0,
    titleBarStyle:'hiddenInset',
    
          
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
  	
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('window-minSize',function(){
	mainWindow.minimize()	
})

ipcMain.on('window-close',function(){
	console.log(childWindow)
	if(numWindow==2){
		mainWindow.webContents.send('closeChild')
	}else{
		mainWindow.close()
	}
	
	
})

ipcMain.on('window-maxSize',function(){
	mainWindow.maximize()	
})

ipcMain.on('window-restore',function(){
	mainWindow.restore()	
})
ipcMain.on('childWindow',function(){
	console.log(numWindow)
	if(numWindow==1){
			childWindow = new BrowserWindow({
			minHeight: 600,
		    width: 800,
		    useContentSize: true,
		    minWidth: 800,
		    height:600,
		    frame: false,
		    thickFrame :true,
		    autoHideMenuBar:true, 
		    opcity:0,
		    titleBarStyle:'hiddenInset'
	})
 const childURL = process.env.NODE_ENV === 'development'
     ? `http://localhost:9080/index.html#/backGround`
     : `file://${__dirname}/index.html#/backGround`
    childWindow.loadURL(childURL)
    childWindow.on('closed', () => {
    	console.log('childWindowclosed')
    	numWindow--
       childWindow = null
  })
       
    	 
        numWindow++
	}else{
  
	childWindow.webContents.send('song')
	
    
		
	}

    	  	
  
	
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
