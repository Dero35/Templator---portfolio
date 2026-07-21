import { Toaster } from "@/components/ui/sonner"
import TemplatesTab from "@/components/TemplatesTab"

function App() {
  return (
    <>
      <TemplatesTab />
      <Toaster position="top-center" theme="dark" />
    </>
  )
}

export default App
