import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { useState } from "react"
import type { Template } from "@/electron"

interface AddTemplateFormProps {
    template?: Template
    onSaved?: () => void 
    onCancel?: () => void 
}

export function AddTemplateForm({ template, onSaved, onCancel }: AddTemplateFormProps) {
    const [newTitle, setNewTitle] = useState(template?.title ?? '')
    const [newBody, setNewBody] = useState(template?.body ?? '')
    const [newCategory, setNewCategory] = useState(template?.category ?? '')
    const [newTags, setNewTags] = useState(template?.tags ?? '')

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()

                if (newTitle.trim() === '' || newBody.trim() === '') {
                    toast.error("Missing Information", {
                        description: "Please fill out both the Title and Template Body",                        
                    })
                    return
                }

                if (template) {
                    await window.api.updateTemplate(template.id, newTitle, newBody, newCategory, newTitle)
                    toast.success("Template Updated", {
                        description: `"${newTitle}" has been updated.`
                    })
                } else {
                    await window.api.addTemplate(newTitle, newBody, newCategory, newTags)

                    setNewTitle('')
                    setNewBody('')
                    setNewCategory('')
                    setNewTags('')

                    toast.success("Template Saved", {
                        description: `"${newTitle}" has been added to your database`
                    })
                }

                onSaved?.()                            
            }}
            className="space-y-4 h-full flex flex-col"
        >
            <div className="space-y2">
                <Label className="mb-2" htmlFor="title">Title</Label>
                <Input
                    id="title"
                    placeholder="e.g. Refund Policy"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}                    
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="mb-2" htmlFor="category">Category</Label>
                    <Input
                        id="category"
                        placeholder="e.g. Shipping"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="mb-2" htmlFor="tags">Tags</Label>
                    <Input
                        id="tags"
                        placeholder="e.g. delay, apology"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                    />
                </div>
            </div>
            <div className="space-y-2 flex-1 pb-4 min-h-0">
                <Label className="mb-2" htmlFor="body">Template Body</Label>
                    <Textarea
                        id="body"
                        placeholder="Type the full template here..."
                        className="h-full field-sizing-fixed resize-none"
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}                        
                    />
            </div>
            <div className="flex gap-4">
                {template &&  (
                    <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" className="flex-1">
                    {template ? "Save Changes" : "Save Template"}
                </Button>
            </div>            
        </form>
    )
}