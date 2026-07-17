export interface IElectronAPI {
    searchTemplates: (query: string) => Promise<Template[]>
    getAllTemplates: () => Promise<Template[]>
    addTemplate: (title: string, body: string, category: string, tags: string) => Promise<number>
    deleteTemplate: (id: number) => Promise<void>
    updateTemplate: (id: number, title: string, body: string, category: string, tags: string) => Promise<void>
}

export interface Template {
    id: number
    title: string
    body: string
    category: string 
    tags: string
    created_at: string
}

declare global {
    interface Window {
        api: IElectronAPI
    }
}