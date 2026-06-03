"use client"

import { useEffect, useState } from "react"
import { getDashboardLayout } from "@/services/configLoader"
import { renderNode as RenderNode } from "@/layouts/renderNode" // Using named import syntax based on the fix

// 1. HARDCODED LOCAL BACKUP CONFIGURATION (Prevents completely blank screens)
const LOCAL_FALLBACK_LAYOUT = {
  "type": "column",
  "className": "min-h-screen w-full",
  "children": [
    {
      "component": "Navbar",
      "props": {
        "logoText": "ModuShop",
        "showSearch": true,
        "showCart": true,
        "showProfile": true,
        "styles": {
          "backgroundColor": "bg-white",
          "logoColor": "text-orange-500",
          "buttonBackgroundColor": "bg-orange-500",
          "containerMaxWidth": "max-w-7xl"
        }
      }
    },
    {
      "type": "column",
      "className": "flex-1",
      "children": [
        {
          "type": "row",
          "className": "max-w-7xl mx-auto w-full px-6 pt-6 gap-6",
          "children": [
            {
              "component": "CategoryMenu",
              "width": "w-64",
              "props": {
                "styles": { "width": "w-64" }
              }
            },
            {
              "component": "HeroBanner",
              "className": "flex-1 min-w-0",
              "props": {
                "autoplay": true,
                "delay": 3000,
                "loop": true,
                "showPagination": true,
                "showBadge": true,
                "showSubtitle": true,
                "showButton": true,
                "imagePosition": "right",
                "rounded": true,
                "styles": {
                  "sectionBackground": "bg-transparent",
                  "cardBackground": "bg-white",
                  "containerMaxWidth": "w-full",
                  "paddingY": "py-0"
                }
              }
            }
          ]
        },
        {
          "component": "FlashSaleSection",
          "props": {
            "title": "Flash Sale",
            "styles": {
              "containerMaxWidth": "max-w-7xl",
              "titleColor": "text-red-500"
            }
          }
        },
        {
          "component": "BrandSection",
          "props": {
            "title": "Featured Brands",
            "styles": {
              "containerMaxWidth": "max-w-7xl",
              "gridCols": "grid-cols-3 md:grid-cols-6"
            }
          }
        }
      ]
    },
    {
      "component": "Footer",
      "props": {
        "logoText": "ModuShop",
        "styles": {
          "backgroundColor": "bg-slate-900",
          "containerMaxWidth": "max-w-7xl"
        }
      }
    }
  ]
};

export default function DashboardPage() {
  const [layout, setLayout] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState<File | null>(null);
  const currentCustomerId = "customer_001"
const loadFreshUI = async () => {
    try {
      // Add a random timestamp query parameter to the URL to explicitly trick the browser/Next.js cache layer
      const cacheBuster = `?t=${Date.now()}`;
      
      const res = await fetch(`http://localhost:8000/api/config/${currentCustomerId}/dashboardLayout${cacheBuster}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        }
      });

      if (!res.ok) throw new Error("No customer layout configuration written yet.");
      
      const body = await res.json();
      if (body && body.layout && body.layout.children) {
        setLayout(body.layout);
      } else {
        setLayout(LOCAL_FALLBACK_LAYOUT);
      }
    } catch (err) {
      console.warn("Backend configuration unreachable, loading local fallback matrix structure.");
      setLayout(LOCAL_FALLBACK_LAYOUT);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFreshUI()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 animate-pulse font-medium">Assembling interface matrix...</p>
      </div>
    )
  }

  // Fallback rendering safeguard
  const activeLayout = layout || LOCAL_FALLBACK_LAYOUT;

  return (
    <div className="relative">
      {/* Renders the verified component node configuration tree structure */}
      {RenderNode(activeLayout)}

      {/* Floating Live Redesign Controller Trigger Panel Control Bench */}
      <div className="fixed bottom-6 right-6 z-50 bg-white p-4 rounded-2xl shadow-2xl border flex flex-col gap-3 max-w-sm">
        <h4 className="font-bold text-sm text-slate-800">Layout Redesign Agent Controls</h4>
        <p className="text-xs text-slate-500">Type a design direction below to update layouts live:</p>

        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-xs text-slate-800"
        />
        
        <textarea 
          id="promptInput"
          rows={3} 
          placeholder="e.g., Move flash sale to the top..." 
          className="border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500 text-slate-800"
        />
        
        <button 
          onClick={async () => {
            const promptInput = document.getElementById("promptInput") as HTMLInputElement;
            const promptVal = promptInput?.value;
            if (!promptVal && !file) return;
            
            setLoading(true)
            const formData = new FormData();
            formData.append("customerId", currentCustomerId);
            formData.append("layoutType", "dashboardLayout");
            formData.append("prompt", promptVal);
            if (file) formData.append("image", file);
            try {
              await fetch("http://localhost:8000/api/redesign", {
                method: "POST",
                body:formData,
                //headers: { "Content-Type": "application/json" },
                //body: JSON.stringify({
                 // customerId: currentCustomerId,
                 // layoutType: "dashboardLayout",
                //  prompt: promptVal
                //})
              });
              promptInput.value = ""; // Clear input field on completion
              setFile(null);
            } catch(e) {
              console.error("Failed executing redesign request operation:", e);
            }
            finally {
        await loadFreshUI(); // Re-fetch fresh configurations to map modifications
        setLoading(false);
      }  
          }}
          className="bg-orange-500 text-white font-bold text-xs py-2 rounded-xl hover:bg-orange-600 transition"
        >
          Submit Redesign Instruction
        </button>
      </div>
    </div>
  )
}