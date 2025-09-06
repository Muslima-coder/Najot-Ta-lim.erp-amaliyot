import {  ArrowLeftOutlined, PlusCircleFilled } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const CreateCaption = ({title}:{title:string}) => {
    const navigate = useNavigate()
  return (
     <div className="flex items-center justify-between">
      <div className="flex items-center gap-[20px]">
        <button onClick={() => navigate(-1)} className="text-[22px] cursor-pointer" type="button"><ArrowLeftOutlined/></button>
        <h2 className="font-bold text-[25px]">{title} qo'shish</h2>
      </div>
      <Button className="!bg-[#bc8e5b]" htmlType="submit" type="primary" size="large" icon={<PlusCircleFilled/>}>Saqlash</Button>
    </div>
  )
}

export default CreateCaption