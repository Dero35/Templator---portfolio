import path from "path";
import { app } from "electron";
import { createRequire  } from "module";

// Open or create db file - stored in appdata folder so it wont get overwriten
const require = createRequire(import.meta.url)
const Database = require('better-sqlite3')

const dbPath = path.join(app.getPath('userData'), 'templator.db')
const db = new Database(dbPath)

// Create default table 
db.exec(`
    CREATE TABLE IF NOT EXISTS templates(
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT NOT NULL,
        body        TEXT NOT NULL,
        category    TEXT DEFAULT '',
        tags        TEXT DEFAULT '',
        created_at  DATETIME DEFAULT CURRENT_TIMESTAMPr
    )
`)

// Sample data 
// Check if the table is empty before insert
const count = (db.prepare('SELECT COUNT(*) as count FROM templates').get() as {count: number}).count

if (count === 0) {
    const insert = db.prepare(
        'INSERT INTO templates (title, body, category) VALUES (?, ?, ?)'
    )
    insert.run('Dodanie worka do systemu', 'Thank for contacting us. As for our refund policy...', 'Refunds')
    insert.run('Partial Refund', 'We understand your concern. We can issue a partial refund...', 'Refunds')
    insert.run('Delivery Delay', 'We sincerely apologise for the delay in your delivery...', 'Shipping')
}

// Query functions 
// LIKE + % = contains
export function searchTemplates(query: string) {
    return db.prepare(
        'SELECT * FROM templates WHERE title LIKE ? OR body LIKE ? OR tags LIKE ?'
    ).all(`%${query}%`, `%${query}%`, `%${query}%`)
}
// Get templates prepare and return
export function getAllTemplates() {
    return db.prepare('SELECT * FROM templates ORDER BY created_at DESC').all()
}

// Prepare the query and run without returning any rows 
export function addTemplate(title: string, body: string, category: string, tags: string) {
    const stmt = db.prepare(
        'INSERT INTO templates (title, body, category, tags) VALUES (?, ?, ?, ?)'
    )

    const result = stmt.run(title, body, category, tags)
    return result.lastInsertRowid
}

// Simply delete with a query 
export function deleteTemplate(id: number) {
    return db.prepare('DELETE FROM templates WHERE id = ?').run(id)
}


export function updateTemplate(id: number, title: string, body: string, category: string, tags: string) {
    const stmt = db.prepare(
        "UPDATE templates SET title = ?, body = ?, category = ?, tags = ? WHERE id = ?"
    )
    return stmt.run(title, body, category, tags, id)
}
