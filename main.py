import os
import json
from fastapi import FastAPI, HTTPException,UploadFile, File, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

import base64
from agents.config_agent import ConfigAgent
from validators.layout_validator import LayoutValidator

# Load local environment variables (.env files)
load_dotenv()

app = FastAPI(title="ModuShop AI Unified Data & Layout Re-Architect Engine")

# =====================================================================
# 1. CORE SYSTEM CONFIGURATIONS (Supabase & Path Layouts)
# =====================================================================

# Supabase Initialization
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Warning: SUPABASE_URL or SUPABASE_KEY not found in environment variables.")
    supabase: Client = None
else:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# CORS Cross-Origin Resource Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this explicitly for production safety
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Core AI Storage path directory mappings
FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))
BASE_CONFIGS_DIR = os.path.join(FRONTEND_DIR, "configs", "base")
METADATA_DIR = os.path.join(FRONTEND_DIR, "configs", "metadata")
CUSTOMER_CONFIGS_DIR = os.path.join(FRONTEND_DIR, "customer_configs")
CUSTOMER_PROMPTS_DIR = os.path.join(os.path.dirname(__file__), "customer_prompts")

# Initialize the layout agent
agent = ConfigAgent()

# Define request parameters schema for AI endpoint requests
class RedesignRequest(BaseModel):
    customerId: str
    layoutType: str  # Must match: "dashboardLayout", "cartLayout", or "productDetailLayout"
    prompt: str


# =====================================================================
# 2. SEAMLESS INVENTORY & DATABASE ROUTES (Original Database Fetches)
# =====================================================================

@app.get("/")
async def root():
    return {"message": "Welcome to ModuShop Unified Data & Layout Redesign API"}

@app.get("/banners")
async def get_banners():
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase connection not initialized.")
    response = supabase.table("banners").select("*").execute()
    return response.data

@app.get("/brands")
async def get_brands():
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase connection not initialized.")
    response = supabase.table("brands").select("*").execute()
    return response.data

@app.get("/categories")
async def get_categories():
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase connection not initialized.")
    response = supabase.table("categories").select("*").execute()
    return response.data

@app.get("/products")
async def get_products(category: str = None):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase connection not initialized.")
    
    query = supabase.table("products").select("*")
    if category:
        query = query.eq("category", category)
    
    response = query.execute()
    return response.data

@app.get("/products/{product_id}")
async def get_product(product_id: int):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase connection not initialized.")
    
    response = supabase.table("products").select("*").eq("id", product_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return response.data

# Add these endpoints right above your `if __name__ == "__main__":` block inside backend/main.py

@app.get("/api/config/{customer_id}/dashboardLayout")
async def get_customer_layout(customer_id: str):
    target_path = os.path.join(CUSTOMER_CONFIGS_DIR, customer_id, "dashboardLayout.json")
    if not os.path.exists(target_path):
        raise HTTPException(status_code=404, detail="Customer config variant missing.")
    with open(target_path, "r", encoding="utf-8") as f:
        return {"status": "success", "layout": json.load(f)}

@app.get("/api/config/base/dashboardLayout")
async def get_base_layout():
    base_path = os.path.join(BASE_CONFIGS_DIR, "dashboardLayout.json")
    if not os.path.exists(base_path):
        raise HTTPException(status_code=404, detail="Base config template missing.")
    with open(base_path, "r", encoding="utf-8") as f:
        return {"status": "success", "layout": json.load(f)}
# =====================================================================
# 3. ADVANCED AI VISUAL REDESIGN INTERACTION AGENT ENDPOINT
# =====================================================================

@app.post("/api/redesign")
async def process_ui_redesign(
    customerId:str = Form(...),
    layoutType:str = Form(...),
    prompt:str = Form(...),
    image:UploadFile = File(None)
                              ):
    image_bytes = None
    if image:
        image_bytes=await image.read()
        



    # 1. Read strict UI system metadata definitions contract
    metadata_path = os.path.join(METADATA_DIR, "componentsMetadata.json")
    if not os.path.exists(metadata_path):
        raise HTTPException(status_code=500, detail="Core UI configuration metadata contract ruleset missing.")
        
    with open(metadata_path, "r", encoding="utf-8") as f:
        metadata = json.load(f)

    # 2. Track down customer folder sandbox configs. Fallback to default base if new.
    customer_target_dir = os.path.join(CUSTOMER_CONFIGS_DIR, customerId)
    os.makedirs(customer_target_dir, exist_ok=True)
    
    specific_layout_filename = f"{layoutType}.json"
    customer_layout_path = os.path.join(customer_target_dir, specific_layout_filename)
    base_layout_path = os.path.join(BASE_CONFIGS_DIR, specific_layout_filename)

    if os.path.exists(customer_layout_path):
        target_read_path = customer_layout_path
    elif os.path.exists(base_layout_path):
        target_read_path = base_layout_path
    else:
        raise HTTPException(status_code=404, detail=f"Target configuration pattern template '{layoutType}' missing from base repository.")

    with open(target_read_path, "r", encoding="utf-8") as f:
        current_layout = json.load(f)

    # 3. Log Prompt History file paths safely
    os.makedirs(CUSTOMER_PROMPTS_DIR, exist_ok=True)
    history_file_path = os.path.join(CUSTOMER_PROMPTS_DIR, f"{customerId}.json")
    
    history_data = {"customerId": customerId, "history": []}
    if os.path.exists(history_file_path):
        try:
            with open(history_file_path, "r", encoding="utf-8") as f:
                history_data = json.load(f)
        except Exception:
            pass
            
    history_data["history"].append(prompt)
    with open(history_file_path, "w", encoding="utf-8") as f:
        json.dump(history_data, f, indent=2)

    # 4. Trigger Layout Transformation via Groq/ConfigAgent Pipeline
    updated_layout = agent.generate_redesign(current_layout,
                                            metadata, 
                                            prompt, 
                                            image_bytes=image_bytes
                                            )

    # 5. Guardrails and Schema Compliance Verification
    validator = LayoutValidator(metadata)
    if not validator.validate(updated_layout):
        raise HTTPException(status_code=422, detail="Generated design configuration broken or violated layout metadata constraints.")

    # 6. Safe write tracking inside the separate customer destination
    with open(customer_layout_path, "w", encoding="utf-8") as f:
        json.dump(updated_layout, f, indent=2)

    return {
        "status": "success",
        "message": f"Successfully updated layout configuration for client profile: {customerId}",
        "layout": updated_layout
    }


# =====================================================================
# 4. SERVER RUNTIME ENTRYPOINT
# =====================================================================
if __name__ == "__main__":
    import uvicorn
    # Enabled hot reload flags so server restarts natively when saving workspace assets
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)