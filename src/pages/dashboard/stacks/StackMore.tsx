import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { StackType } from "../../../@types/SatckType"
import { API, instance } from "../../../hooks"
import { toast } from "react-toastify"
import type { GroupType } from "../../../@types/Group"
import { Button, Modal } from "antd"
import { ArrowLeftOutlined, DeleteFilled, EditOutlined, MoreOutlined } from "@ant-design/icons"
import CustomTable from "../../../components/CustomTable"


const StackMore = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [stackData, setStackData] = useState<StackType>()
  const [delteModal, setDeleteModal] = useState<boolean>(false)

  // Delete Part 
  const [deleteId, setDeleteId] = useState<string | null | undefined>(null)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  function handleDelete(){
    setDeleteModal(true)
    setDeleteId(id)
  }

  function handleDleteStack(){
    setDeleteLoading(true)
    instance().delete(`/stacks/${deleteId}`).then(() => {
      toast.success("O'chirildi!", {
        onClose: () => {
          setDeleteLoading(false)
          setDeleteModal(false)
          navigate(-1)
        },
        autoClose: 2000,
      })
    }).catch(() => {
      toast.error("Bu yo'nalish ichida guruh bor o'chirish mumkin emas!!!", {
          onClose: () => {
          setDeleteLoading(false)
          setDeleteModal(false)
        },
        autoClose: 2000,
      })
    })
  }

  useEffect(() => {
    instance().get(`/stacks/${id}`).then(res => {
      setStackData(res.data)
    })
  }, [])

  //shu stackdagi guruhlar
  const [stackGroups, setStackGroups] = useState([])
  const column = [
    {title:"ID", dataIndex:"id"},
    {title:"Guruh nomi", dataIndex:"name"},
    {title:"Xona", dataIndex:"roomName"},
    {title:"Yo'nalish", dataIndex:"stackName"},
    {title:"Batafsil", dataIndex:"action"},
  ]

  useEffect(() => {
    instance().get(`/groups`, {params:{stackId:id}}).then(res => {
      setStackGroups(res.data.data.map((item:GroupType, index:number) => {
        item.key = index + 1
        item.roomName = item.room.name
        item.stackName = item.stack.name

        item.action = <Button size="middle" icon={<MoreOutlined className="!text-[18px]"/>} type="primary" className="!bg-[#bc8e5b] !p-0" ></Button>
        return item
      }))
    })
  }, [])
  console.log(stackGroups)

  return (
    <div className="p-5 h-[100vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <button onClick={() => navigate(-1)}> <ArrowLeftOutlined className="!text-[22px] cursor-pointer hover:scale-[1.1] duration-300 "/></button>
          <h2 className="font-bold text-[20px]">{stackData?.name}</h2>
        </div>
        <div className="flex items-center gap-5">
        <Button onClick={() => handleDelete()} className="!bg-red-500" size="large" type="primary" icon={<DeleteFilled className="!text-[20px]"/>}></Button>
        <Button onClick={() => navigate(`update`)} className="!bg-green-600" size="large" type="primary" icon={<EditOutlined className="!text-[20px]"/>}> O'zgartirish</Button>
        </div>
      </div>

      <div className="mt-[40px] flex gap-10 ">
      <ul className="p-5 rounded-md border-[2px] space-y-5 border-slate-400 w-[40%] ">
        <li>
          <span className="text-slate-500">#</span>
          <p className="text-[22px]">{id}</p>
        </li>
        <li>
          <span className="text-slate-500">Yo'nalish nomi</span>
          <p className="text-[22px]">{stackData?.name}</p>
        </li>
        <li>
          <span className="text-slate-500">Yaratilgan sana</span>
          <p className="text-[22px]">{stackData?.createdAl?.split('T')[0]} || {stackData?.createdAl?.split('T')[1].split(".")[0]}</p>
        </li>
      </ul>
      <img className="object-cover rounded-md" src={`${API}/file/${stackData?.image}`} alt="stack img" width={400} />
      </div>
      <div className="mt-[40px]">
        <CustomTable columns={column} data={stackGroups}/>
      </div>
      <Modal confirmLoading={deleteLoading} okText="O'chirish" cancelText="Bekor qilish" okButtonProps={{type:"primary", className:"!bg-[#bc8e5b]"}} open={delteModal} onCancel={() => setDeleteModal(false)} onOk={handleDleteStack} title={"O'ylab ko'r!"}>  </Modal>
    </div>
  )
}

export default StackMore