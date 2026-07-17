import { BrowserWindow, app, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
//#region src/main/db.ts
var db = new (createRequire(import.meta.url)("better-sqlite3"))(path.join(app.getPath("userData"), "templator.db"));
db.exec(`
    CREATE TABLE IF NOT EXISTS templates(
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT NOT NULL,
        body        TEXT NOT NULL,
        category    TEXT DEFAULT '',
        tags        TEXT DEFAULT '',
        created_at  DATETIME DEFAULT CURRENT_TIMESTAMPr
    )
`);
if (db.prepare("SELECT COUNT(*) as count FROM templates").get().count === 0) {
	const insert = db.prepare("INSERT INTO templates (title, body, category) VALUES (?, ?, ?)");
	insert.run("Dodanie worka do systemu", "Thank for contacting us. As for our refund policy...", "Refunds");
	insert.run("Partial Refund", "We understand your concern. We can issue a partial refund...", "Refunds");
	insert.run("Delivery Delay", "We sincerely apologise for the delay in your delivery...", "Shipping");
}
function searchTemplates(query) {
	return db.prepare("SELECT * FROM templates WHERE title LIKE ? OR body LIKE ? OR tags LIKE ?").all(`%${query}%`, `%${query}%`, `%${query}%`);
}
function getAllTemplates() {
	return db.prepare("SELECT * FROM templates ORDER BY created_at DESC").all();
}
function addTemplate(title, body, category, tags) {
	return db.prepare("INSERT INTO templates (title, body, category, tags) VALUES (?, ?, ?, ?)").run(title, body, category, tags).lastInsertRowid;
}
function deleteTemplate(id) {
	return db.prepare("DELETE FROM templates WHERE id = ?").run(id);
}
function updateTemplate(id, title, body, category, tags) {
	return db.prepare("UPDATE templates SET title = ?, body = ?, category = ?, tags = ? WHERE id = ?").run(title, body, category, tags, id);
}
//#endregion
//#region src/main/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
ipcMain.handle("search-templates", (_event, query) => {
	return searchTemplates(query);
});
ipcMain.handle("get-all-templates", () => {
	return getAllTemplates();
});
ipcMain.handle("add-template", (_event, title, body, category, tags) => {
	return addTemplate(title, body, category, tags);
});
ipcMain.handle("delete-template", (_event, id) => {
	return deleteTemplate(id);
});
ipcMain.handle("update-template", (_event, id, title, body, category, tags) => {
	return updateTemplate(id, title, body, category, tags);
});
function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 600,
		minHeight: 400,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			sandbox: false
		}
	});
	if (process.env["VITE_DEV_SERVER_URL"]) win.loadURL(process.env["VITE_DEV_SERVER_URL"]);
	else win.loadFile(path.join(__dirname, "../renderer/index.html"));
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
//#endregion
export {};
