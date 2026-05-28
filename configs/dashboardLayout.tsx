const dashboardLayout = {
  type: "column",
  children: [
    {
      component: "Navbar",
        props: {
    showSearch: true,
    showCart: true,
    showProfile: true
  }
    },

    {
     component: "HeroBanner"
    },
    
     {
     component: "FlashSaleSection"
    },
     {
     component: "CategoriesSection"
    },
     {
     component: "JustForYouSection"
    },
     {
     component: "Footer"
    },
  ]
}

export default dashboardLayout