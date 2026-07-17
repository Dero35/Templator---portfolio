import { contextBridge, ipcRenderer } from "electron";
//#region src/preload/index.ts
contextBridge.exposeInMainWorld("api", {
	searchTemplates: (query) => ipcRenderer.invoke("search-templates", query),
	getAllTemplates: () => ipcRenderer.invoke("get-all-templates"),
	addTemplate: (title, body, category, tags) => ipcRenderer.invoke("add-template", title, body, category, tags),
	deleteTemplate: (id) => ipcRenderer.invoke("delete-template", id),
	updateTemplate: (id, title, body, category, tags) => ipcRenderer.invoke("update-template", id, title, body, category, tags)
});
//#endregion
export {};
