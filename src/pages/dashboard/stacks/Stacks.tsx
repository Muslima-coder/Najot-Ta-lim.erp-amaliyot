import { useEffect, useState } from "react"
import { PageCaption, StackSkeleton } from "../../../components"
import { API, instance } from "../../../hooks"
import { Card } from "antd"
import type { StackType } from "../../../@types/StackType"
import { useNavigate } from "react-router-dom"

const Stacks = () => {
  const navigate = useNavigate()
  const [stacks, setStacks] = useState<Array<StackType>>([])
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    setLoading(true)
    instance().get("/stacks").then(res => {
      setStacks(res.data.data);
      setLoading(false)
    })
  }, [])
  return (
    <div className="p-5">
      <div className="bg-white overflow-y-auto h-[88vh] p-5 rounded-md">
        <PageCaption title="Yo'nalishlar" count={stacks.length} />
        <div className="flex justify-between flex-wrap gap-5 mt-[20px]">

          {loading ? <StackSkeleton /> : stacks.map(item => (
            <Card onClick={() => navigate(`${item.id}`)} key={item.id} hoverable style={{ width: 260 }} cover={<img className="h-[200px] object-cover" alt="Stack Img" src={`${API}/file/${item.image}`} />}>
              <Card.Meta title={item.name} description={`Yaratilgan sana: ${item.createdAt.split("T")[0]}`} />
            </Card>
          ))}
        </div>
      </div>
    
    </div>
  )
}

export default Stacks