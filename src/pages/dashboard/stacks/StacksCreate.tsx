import { useEffect, useState, type FormEvent } from "react"
import { CreateCaption, UploadFiles } from "../../../components"
import { Input } from "antd"
import { API, instance } from "../../../hooks"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
const StacksCreate = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
 
 function handleCreateStack(e:FormEvent<HTMLFormElement>){
  setIsLoading(true)
  e.preventDefault()

  const data = {image, name}
  if(id){
    if(data.image.includes("http")){
      data.image = data.image.split(`${API}/file/`)[1]
    }
      instance().patch(`/stacks/${id}`, data).then(() => {
      toast.success("Muvaffaqiyatli o'zgartirildi!", {
        onClose: () => {
          setIsLoading(false)
          navigate(-1)
        },
        autoClose: 2000,
      })
    })
  }

  else{
    instance().post("/stacks", data).then(() => {
          toast.success("Muvaffaqiyatli saqladingiz!", {
            onClose: () => {
              setIsLoading(false)
              navigate(-1)
            },
            autoClose: 2000,
      })
    })
  }
 }

 useEffect(() => {
  if(id) {
    instance().get(`/stacks/${id}`).then(res => {
      setName(res.data.name)
      setImage(`${API}/file/${res.data.image}`)
    })
  }
 }, [])
 
  return (
    <form onSubmit={handleCreateStack} autoComplete="off" className="p-5">
      <CreateCaption title="Yo'nalish"/>
      <div className="mt-[20px] w-[350px]">
        <UploadFiles image={image} setImage={setImage} />
        <Input onChange={(e) => setName(e.target.value)} value={name} className="!mt-[20px]" size="large" name="names" placeholder="Yo'nalish nomini kiriting" />
      </div>
    </form>
  )
}

export default StacksCreate 