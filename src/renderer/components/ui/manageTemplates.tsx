import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { AddTemplateForm } from "@/components/ui/addTemplateForm"
import type { Template } from "@/electron"



export function ManageTemplates() {
    const [templates, setTemplates] = useState<Template[]>([])
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)

    async function fetchTemplates() {
        const data = await window.api.getAllTemplates()
        setTemplates(data)
    }

    // Runs exactly once when the component mounts 
    useEffect(() => {
        fetchTemplates()
    }, [])

    async function handleDelete(id: number, title: string) {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            await window.api.deleteTemplate(id)
            toast.success("Template Deleted")
            
            fetchTemplates()
        }
    }

    if (editingTemplate) {
        return (
            <AddTemplateForm
                template={editingTemplate}
                onSaved={() => {
                    setEditingTemplate(null)
                    fetchTemplates()
                }}
                onCancel={() => setEditingTemplate(null)}
            />
        )
    }

    return (
        <div className="space-y-4 flex-1 min-h-0 flex flex-col">
            <p>You have {templates.length} templates saved.</p>
            <ScrollArea className="flex-1 min-h-0">                
                {templates.length === 0 && (
                    <p>No templates found. Go add some!</p>
                )}
                {templates.map((template) => (
                    <Card className="my-3 mx-1" key={template.id}>
                        <CardHeader>
                            <CardTitle>{template.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row gap-2">
                            <Button 
                                variant="secondary"
                                className="w-1/2"
                                onClick={() => setEditingTemplate(template)}
                            >
                                Edit   
                            </Button>
                            <Button
                                variant="destructive"
                                className="w-1/2"
                                onClick={() => handleDelete(template.id, template.title)}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </ScrollArea>
        </div>    
    )
}