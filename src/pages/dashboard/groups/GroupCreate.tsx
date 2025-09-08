import { Input, Select } from "antd"
import { CreateCaption } from "../../../components"
import { useEffect, useState, type FormEvent } from "react"
import { instance } from "../../../hooks"
import type { StackType } from "../../../@types/StackType"
import type { RoomsType } from "../../../@types/RoomsType"
import type { TeacherType } from "../../../@types/TeacherType"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const GroupCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const [name, setName] = useState<string>("")
  const [stackId, setStackId] = useState<string | null>(null)
  const [roomId, setRoomId] = useState<string | null>(null)
  const [teacherId, setTeacherId] = useState<string>("")
  const [supportTeacherId, setSupportTeacherId] = useState<string>("")

  // Stacks get all
  const [stacks, setStacks] = useState<{ value: string, label: string }[]>([])
  useEffect(() => {
    instance().get("/stacks").then(res => {
      setStacks(res.data.data.map((item: StackType) => {
        item.label = item.name
        item.value = item.id
        return item
      }));
    })
  }, [])

  // Rooms get all
  const [rooms, setRooms] = useState<{ value: string, label: string }[]>([])
  useEffect(() => {
    instance().get("/rooms").then(res => {
      setRooms(res.data.data.map((item: RoomsType) => {
        item.label = item.name
        item.value = item.id
        return item
      }));
    })
  }, [])

  // Teachers get all
  const [teachers, setTeachers] = useState<{ label: string, value: string }[]>([])
  useEffect(() => {
    instance().get("/teachers", {
      params: { statusId: 1, stackId }
    }).then(res => {
      setTeachers(res.data.data.map((item: TeacherType) => {
        item.label = `${item.name} - ${item.surname}`
        item.value = item.id
        return item
      }));
    })
  }, [stackId])

  // Support get all
  const [supportTeacher, setSupportTeacher] = useState<{ label: string, value: string }[]>([])
  useEffect(() => {
    instance().get("/teachers", {
      params: { statusId: 2, stackId }
    }).then(res => {
      setSupportTeacher(res.data.data.map((item: TeacherType) => {
        item.label = `${item.name} - ${item.surname}`
        item.value = item.id
        return item
      }));
    })
  }, [stackId])

  function handleCreateGroup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = {
      name, stackId, roomId, status: true,
      mainTeacherIds: [teacherId],
      supportTeacherIds: [supportTeacherId]
    }
    instance().post("/groups", data).then(() => {
      toast.success("Muvaffaqiyatli qo'shildi!", {
        onClose: () => {
          setLoading(false);
          navigate(-1)
        },
        autoClose: 1000,
      })
    }).finally(() => {
      setLoading(false)
    })

  }
  return (
    <form onSubmit={handleCreateGroup} autoComplete="off" className="p-5">
      <CreateCaption title="Gurux" isLoading={loading} />
      <div className="flex justify-between w-[90%] mx-auto mt-10">
        <div className="w-[48%] flex flex-col gap-5">
          <Select
            onChange={e => setStackId(e)}
            className="!w-full"
            size="large"
            showSearch
            placeholder="Yo'nalish tanlang"
            optionFilterProp="label"
            allowClear
            options={stacks}
          />
          <Select
            onChange={e => setTeacherId(e)}
            className="!w-full"
            size="large"
            showSearch
            placeholder="Ustoz tanlang"
            optionFilterProp="label"
            allowClear
            options={teachers}
          />
          <Select
            onChange={e => setSupportTeacherId(e)}
            className="!w-full"
            size="large"
            showSearch
            placeholder="Yordamchi ustoz tanlang"
            optionFilterProp="label"
            allowClear
            options={supportTeacher}
          />
        </div>
        <div className="w-[48%] flex flex-col gap-5">
          <Input value={name} onChange={e => setName(e.target.value)} size="large" allowClear placeholder="Gurux nomini kiriting" />
          <Select
            onChange={e => setRoomId(e)}
            className="!w-full"
            size="large"
            showSearch
            placeholder="Xona tanlang"
            optionFilterProp="label"
            allowClear
            options={rooms}
          />
        </div>
      </div>
    </form>
  )
}

export default GroupCreate