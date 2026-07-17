import {
      Command,
      CommandInput,
      CommandList,
      CommandEmpty,
      CommandGroup,
      CommandItem,
} from "@/components/ui/command"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { AddTemplateForm } from "@/components/ui/addTemplateForm"
import { ManageTemplates } from "./components/ui/manageTemplates"
import { Toaster } from "@/components/ui/sonner"

import { useState } from "react"
  
    // TypeScript type for template result
    interface Template {
      id: number
      title: string
      body: string
    }

    function App() {
      const [query, setQuery] = useState('')
      const [results, setResults] = useState<Template[]>([])
      const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

      // Called every time the search 1input changes 
      async function handleSearch(value: string) {
        setQuery(value)

        if (value.trim() === '') {
          setResults([])
          return
        }

        // IPC bridge to main process -> return data 
        const found = await window.api.searchTemplates(value)
        setResults(found)
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <Command shouldFilter={false} className="w-full max-w-xl lg:max-w-3xl xl:max-w-5xl">
            <CommandInput 
              placeholder="Search templates..." 
              value={query}
              onValueChange={handleSearch}
            />
            <CommandList className="max-h-[300px] lg:max-h-[500px]">
              <CommandEmpty>No templates found.</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="Results">
                  {results.map(template => (
                    <CommandItem 
                      key={template.id}
                      onSelect={() => setSelectedTemplate(template)}
                      className="cursor-pointer"
                    >
                      {template.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
          <Dialog open={selectedTemplate != null} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
            <DialogContent className="sm:max-w-[40rem] lg:max-w-[60rem]">
              <DialogHeader>
                <DialogTitle>{selectedTemplate?.title}</DialogTitle>
              </DialogHeader>            
              <div className="whitespace-pre-wrap overflow-y-auto max-h-[60vh] min-w-0 break-words">
                {selectedTemplate?.body}
              </div>
              <div className="flex justify-end mt-4">
                <Button className="w-24" onClick={() => setSelectedTemplate(null)}>
                  Close
                </Button>
                <Button 
                  className="w-24 ms-4"
                  onClick={() => {
                    if (selectedTemplate) {
                      navigator.clipboard.writeText(selectedTemplate.body)
                      setSelectedTemplate(null)
                    }
                  }}
                >
                  Copy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="fixed top-6 right-6">
            <Drawer swipeDirection="right">
              <DrawerTrigger render={<Button variant="outline">Manage Templates</Button>}></DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerClose render={<Button variant="outline" className="mb-5">Close</Button>}></DrawerClose>
                  <DrawerTitle>Template Manager</DrawerTitle>
                  <DrawerDescription>Add new templates or remove existing ones</DrawerDescription>
                </DrawerHeader>

                <div className="p-4 flex-1 min-h-0">
                  <Tabs defaultValue="add" className="w-full h-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 ">
                      <TabsTrigger value="add">Add Template</TabsTrigger>
                      <TabsTrigger value="manage">Manage</TabsTrigger>
                    </TabsList>
                    <TabsContent className="flex flex-col min-h-0" value="add">                      
                      <AddTemplateForm></AddTemplateForm>                      
                    </TabsContent>
                    <TabsContent className="flex flex-col min-h-0" value="manage">
                      <ManageTemplates></ManageTemplates>
                    </TabsContent>                    
                  </Tabs>
                </div>               
              </DrawerContent>
            </Drawer>
          </div>
          <Toaster position="top-center" theme="light" />
        </div>
      )
    }
  
    export default App
