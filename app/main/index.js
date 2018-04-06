import { app, BrowserWindow } from 'electron';
import { client as electronConnect } from 'electron-connect';
import { join } from 'path';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

require('electron-debug')({ showDevTools: true });

app.on('ready', () => {
	installExtension(VUEJS_DEVTOOLS)
		.then(name => console.log(`Added Extension:  ${name}`))
		.catch(err => console.log('An error occurred: ', err));
});

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({ width: 800, height: 600 });
	mainWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}`);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
	if (process.env.NODE_ENV !== 'production') electronConnect.create(mainWindow);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
