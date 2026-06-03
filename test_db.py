import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

try:
    print("Testing Banners...")
    banners = supabase.table("banners").select("*").execute()
    print(f"Banners count: {len(banners.data)}")
    print(f"Banners data: {banners.data}")

    print("\nTesting Products...")
    products = supabase.table("products").select("*").execute()
    print(f"Products count: {len(products.data)}")
except Exception as e:
    print(f"Error: {e}")
