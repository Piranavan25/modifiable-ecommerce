const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return null
  }
}

export const api = {
  getBanners: () => apiFetch("/banners"),
  getBrands: () => apiFetch("/brands"),
  getCategories: () => apiFetch("/categories"),
  getProducts: (category?: string) => apiFetch(category ? `/products?category=${category}` : "/products"),
  getProduct: (id: number | string) => apiFetch(`/products/${id}`),
}
