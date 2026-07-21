import {app, BrowserWindow, ipcMain} from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'   
import {
    searchTemplates,
    getAllTemplates,
    addTemplate,
    deleteTemplate,
    updateTemplate
} from './db.js'
  
// Recreate CommonJS __dirname for ESM compatibility
// Classic ESM vs CommonJS
const __filename = fileURLToPath(import.meta.url)  
const __dirname = path.dirname(__filename)   

// IPC Handlers 
// Handle search-templates channel
ipcMain.handle('search-templates', (_event, query: string) => {
    return searchTemplates(query)
})

ipcMain.handle('get-all-templates', () => {
    return getAllTemplates()
})

ipcMain.handle('add-template', (_event, title: string, body: string, category: string, tags: string) => {
    return addTemplate(title, body, category, tags)
})

ipcMain.handle('delete-template', (_event, id: number) => {
    return deleteTemplate(id)
})

ipcMain.handle('update-template', (_event, id: number, title: string, body: string, category: string, tags: string) => {
    return updateTemplate(id, title, body, category, tags)
})

// Window parameters function
function createWindow() {
    const win = new BrowserWindow({
        width: 1100,
        height: 700,
        minWidth: 768,
        minHeight: 500,
        // Security preferences 
        // Distincting the main process from renderer 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            sandbox: false,
        }
    })

    // Choose Vite dev server for npm run dev and actual renderer for .exe 
    if (process.env['VITE_DEV_SERVER_URL']) {
        win.loadURL(process.env['VITE_DEV_SERVER_URL'])
    } else {
        win.loadFile(path.join(__dirname, '../renderer/index.html'))
    }
}

app.whenReady().then(createWindow)

// Stop the app when all windows closed 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})