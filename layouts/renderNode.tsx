import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import HeroBanner from "@/components/herobanner"
import CategoriesSection from "@/components/categoriesSection"
import FlashSaleSection from "@/components/flashsale"
import JustForYouSection from "@/components/justforyou"
import Footer from "@/components/footer"
import CategoryMenu from "@/components/categoryMenu"
import StaticBanner from "@/components/staticBanner"
import BrandSection from "@/components/brandSection"
import ProductDetail from "@/components/productDetail"
import Cart from "@/components/cart"

const componentMap: any = {
  Navbar,
  Sidebar,
  HeroBanner,
  CategoriesSection,
  FlashSaleSection,
  JustForYouSection,
  Footer,
  CategoryMenu,
  StaticBanner,
  BrandSection,
  ProductDetail,
  Cart
}

export  function renderNode(node: any, context?: any, index = 0): React.ReactNode {
  if (!node) return null

  // Handle layout types (row/column)
  if (node.type) {
    const isRow = node.type === "row"
    
    return (
      <div
        key={index}
        className={`${isRow ? "flex flex-row" : "flex flex-col"} ${node.className || ""}`}
        style={node.containerStyles}
      >
        {node.children?.map((child: any, childIndex: number) =>
          renderNode(child, context, childIndex)
        )}
      </div>
    )
  }

  // Handle components
  if (node.component) {
    const Component = componentMap[node.component]
    if (!Component) {
      console.warn(`Component ${node.component} not found`)
      return null
    }

    // Pass width as className if provided
    const widthClass = node.width ? `w-[${node.width}]` : ""
    
    return (
      <div
        key={index}
        className={`${node.className || ""} ${widthClass}`}
        style={node.containerStyles}
      >
        <Component {...node.props} context={context} />
      </div>
    )
  }

  return null
}