import { useEffect, useState, type FC } from "react"
import type { MeType } from "../@types/MeType"
import { OpenAIFilled, StarOutlined, UngroupOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { PATH } from "../components"
import { instance } from "../hooks"
import { LogoIcon } from "../assets/icons"
import { Menu } from "antd"




const Navbar:FC<{collapse:boolean}> = ({collapse}) => {
    const [me, setMe] = useState<MeType>({})
    const item = [
        {key:"1", icon:<StarOutlined className="!text-[22px]"/>, label:<Link className="text-[20px]" to={PATH.stack}>Yo'nalishlar</Link>},
        {key:"2", icon:<UngroupOutlined className="!text-[22px]"/>, label:<Link className="text-[20px]" to={PATH.groups}>Guruhlar</Link>},
        {key:"3", icon:<UserOutlined className="!text-[22px]"/>, label:<Link className="text-[20px]" to={PATH.teachers}>Ustozlar</Link>},
        {key:"4", icon:<OpenAIFilled className="!text-[22px]"/>, label:<Link className="text-[20px]" to={PATH.students}>O'quvchilar</Link>},
    ]

    useEffect(() => {
        instance().get("/user/me").then(res => setMe(res.data))
    }, [])
  return (
    <div className={`${collapse ? "w-[80px]" : "w-[18%]" } duration-300 h-[100vh] bg-[#001529] `}>
        <div className="p-3 border-b-[1px] mb-[10px] flex items-center text-[#bc8e5b] gap-[15px] border-white ">
            <LogoIcon classList="!w-[70px]"/>
            {collapse ? "" : <span className="text-white text-[22px] font-medium capitalize">{me.role?.toLowerCase()}</span> }
        </div>
        <Menu
        className={`${collapse ? "navbar-menu-active" : "navbar-menu"}`}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapse}
        items={item}
        />
    </div>
  )
}

export default Navbar