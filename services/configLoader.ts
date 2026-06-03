export async function getDashboardLayout(customerId: string): Promise<any> {
  try {
    // Attempt to fetch the dynamically updated customer configuration
    const res = await fetch(`http://localhost:8000/api/config/${customerId}/dashboardLayout`, {
      cache: 'no-store' // Critical: Forces Next.js to skip caching so you see updates instantly
    });
    
    if (!res.ok) {
      throw new Error("Customer config not found, falling back to base.");
    }
    
    const data = await res.json();
    return data.layout;
  } catch (error) {
    // Fallback: If your FastAPI endpoints aren't serve-mapped yet, 
    // fetch the local static fallback fallback config asset folder
    const baseRes = await fetch('http://localhost:8000/api/config/base/dashboardLayout', {
      cache: 'no-store'
    });
    const baseData = await baseRes.json();
    return baseData.layout;
  }
}