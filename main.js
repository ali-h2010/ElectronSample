const {app, BrowserWindow, Menu, Tray} = require('electron')
const url = require('url')
const path = require('path')

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`)
});

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('Views/index.html')
  
 

  // let tray = null

  // tray = new Tray('Assets/Images/icon.png')
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1', type: 'radio' },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' }
  // ])
  // tray.setToolTip('This is my application.')
  // tray.setContextMenu(contextMenu)
  let appIcon = null;
  const iconPath  = 'Assets/Images/BatteryIcons/UnknownBattery.png';
  appIcon = new Tray(iconPath);
  // type: ('normal' | 'separator' | 'submenu' | 'checkbox' | 'radio');
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Item1',
      type: 'radio',
      icon: iconPath
    },
    {
      label: 'Item2',
      submenu: [
        { label: 'submenu1' },
        { label: 'submenu2' }
      ]
    },
    {
      type: 'separator',
    },
    {
      label: 'Radio Buttons',
      type: 'normal',
      enabled: false
    },
    {
      label: 'Item3',
      type: 'radio',
      checked: true
    },
    {
      label: 'Item4',
      type: 'radio',
      checked: false
    },
    {
      type: 'separator',
    },
    {
      label: 'Checkboxes',
      type: 'normal',
      enabled: false
    },
    {
      label: 'Item5',
      type: 'checkbox',
      checked: false
    },
    {
      label: 'Item6',
      type: 'checkbox',
      checked: false
    },
    {
      type: 'separator',
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function() {
        win.show();
        win.toggleDevTools();
      }
    },
    { label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);


  // Open the DevTools.
  //win.webContents.openDevTools()

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
