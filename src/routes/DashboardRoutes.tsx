import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboardHome, Groups, Stacks, Students, Teachers } from "../pages"
import { useState } from "react"
import { Header, Navbar } from "../modules"

const DashboardRoutes = () => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const routeList = [
    {id:1, path:PATH.stacks, element:<Stacks/>},
    {id:2, path:PATH.groups, element:<Groups/>},
    {id:3, path:PATH.teachers, element:<Teachers/>},
    {id:4, path:PATH.students, element:<Students/>},
    {id:5, path:PATH.home, element:<DashboardHome/>},
  ]

  return (
    <div className="flex">
      <Navbar collapse={collapse}/>
      <div className={`${collapse ? "w-full" : "w-[82%]" }`}>
      <Header setCollapse={setCollapse} collapse={collapse}/>
      <Routes>{routeList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
      </div>
    </div>
  )
}

export default DashboardRoutes
