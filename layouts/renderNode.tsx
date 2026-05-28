import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import HeroBanner from "@/components/herobanner"
import CategoriesSection from "@/components/categoriesSection"
import FlashSaleSection from "@/components/flashsale"
import JustForYouSection from "@/components/justforyou"
import Footer from "@/components/footer"

const componentMap: any = {
  Navbar,
  Sidebar,
  HeroBanner,
  CategoriesSection,
  FlashSaleSection,
  JustForYouSection,
  Footer,


}

export function renderNode(node: any, index = 0): React.ReactNode {

  if (node.type) {

    const isRow = node.type === "row"

    return (
      <div
        key={index}
        className={`flex gap-4 w-full ${
          isRow ? "flex-row" : "flex-col"
        }`}
        style={{
          width: node.width || "100%"
        }}
      >
        {node.children?.map((child: any, childIndex: number) =>
          renderNode(child, childIndex)
        )}
      </div>
    )
  }

  if (node.component) {

    const Component = componentMap[node.component]

    return (
      <div
        key={index}
        style={{
          width: node.width || "100%"
        }}
      >
        <Component {...node.props} />
      </div>
    )
  }

  return null
}