import dashboardLayout from "@/configs/dashboardLayout"
import { renderNode } from "@/layouts/renderNode"

export default function Home() {

  return (
    <div className="min-h-screen bg-slate-100 p-4">

      {renderNode(dashboardLayout)}
    </div>
  )
}