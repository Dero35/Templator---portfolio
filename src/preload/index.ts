// Preload script - runs before renderers process loads 
import { contextBridge, ipcRenderer } from "electron";

// Expose safe api to the renderer 
// window.api is available in React 
contextBridge.exposeInMainWorld('api', {

    searchTemplates: (query: string) => 
        ipcRenderer.invoke('search-templates', query),        
    
    getAllTemplates: () =>
        ipcRenderer.invoke('get-all-templates'),

    addTemplate: (title: string, body: string, category: string, tags: string) =>
        ipcRenderer.invoke('add-template', title, body, category, tags),

    deleteTemplate: (id: number) =>
        ipcRenderer.invoke('delete-template', id),

    updateTemplate: (id: number, title: string, body: string, category: string, tags: string) =>
        ipcRenderer.invoke('update-template', id, title, body, category, tags),
})