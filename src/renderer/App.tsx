import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Toaster } from "@/components/ui/sonner"
import { LayoutTemplate, MessagesSquare, Route } from "lucide-react"
import TemplatesTab from "@/components/TemplatesTab"
import RoadmapTab from "@/components/RoadmapTab"

import { useState } from "react"

function App() {
  const [activeTab, setActiveTab] = useState<"templates" | "roadmap">("templates")

  return (
    <>
      <SidebarProvider>
        <Sidebar variant="floating" collapsible="icon">
          <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Templator">
                <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <MessagesSquare className="size-4" />
                </div>
                <span className="truncate font-semibold group-data-[collapsible=icon]:hidden">
                  Templator
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeTab === "templates"}
                      onClick={() => setActiveTab("templates")}
                      tooltip="Templates"
                    >
                      <LayoutTemplate />
                      <span>Templates</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeTab === "roadmap"}
                      onClick={() => setActiveTab("roadmap")}
                      tooltip="Roadmap"
                    >
                      <Route />
                      <span>Roadmap</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger />
          </header>
          {activeTab === "templates" ? <TemplatesTab /> : <RoadmapTab />}
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="top-center" theme="dark" />
    </>
  )
}
export default App
