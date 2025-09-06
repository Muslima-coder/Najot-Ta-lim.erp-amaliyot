import { useEffect, useState } from "react"
import { API, instance } from "../../../hooks"
import {  Card } from "antd"
import type { StackType } from "../../../@types/SatckType"
import { PageCaption, StackSkeleton } from "../../../components"
import { useNavigate } from "react-router-dom"

const Stacks = () => {
  const navigate = useNavigate()
  const [stack, setStack] = useState<Array<StackType>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    instance().get("/stacks").then(res => {
      setStack(res.data.data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-5 overflow-y-auto h-[100vh] ">
      <PageCaption title="Yo'nalishlar" count={stack.length}/>
      <div className="flex flex-wrap justify-between gap-5 mb-20 mt-5">
      {loading ? <StackSkeleton/> : stack.map(item => (
        <Card onClick={() => navigate(`${item.id}`)} key={item.id} hoverable
        style={{width:300 }}  cover={ <img className="h-[270px] object-cover rounded-md " src={`${API}/file/${item.image}`} alt="Stack Img" />}>
          <Card.Meta title={item.name}  description={`Yaratilgan sana: ${item.createdAl?.split('T')[0]}`} />
        </Card>
      ))}
      </div>
    </div>
  )
}

export default Stacks

