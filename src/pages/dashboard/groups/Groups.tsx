import { useEffect, useState, type ChangeEvent } from "react";
import { CustomTable, PageCaption } from "../../../components"
import { debounce, instance } from "../../../hooks";
import { Button, Input, Select } from "antd";
import type { GroupsType } from "../../../@types/GroupsType";
import { MoreOutlined } from "@ant-design/icons";
import type { TeacherType } from "../../../@types/TeacherType";
import type { StackType } from "../../../@types/StackType";

const Groups = () => {
  const column = [
    { title: "ID", dataIndex: "key" },
    { title: "Gurux nomi", dataIndex: "name" },
    { title: "Xona", dataIndex: "roomName" },
    { title: "Yo'nalish", dataIndex: "stackName" },
    { title: "Batafsil", dataIndex: "action" },
  ]
  const [groups, setGroups] = useState<GroupsType[]>([])
  const [teachers, setTeachers] = useState<{ label: string, value: string }[]>([])
  const [stacks, setStacks] = useState<{ label: string, value: string }[]>([])

  // Search part
  const [loading, setLoading] = useState<boolean>(true)
  const [searchName, setSearchName] = useState<string | undefined>("")
  const name = debounce(searchName, 700)
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value)
    setLoading(true)
  }
  // Search part

  // Stack change
  const [stackId, setStackId] = useState<string | null>(null)
  function handleChooseStack(e: string) {
    setStackId(e)
    setLoading(true)
  }
  // Stack change

  // Teacher change part
  const [mainTeacherId, setMainTeacherId] = useState<string | null>(null)
  function handleChooseTeacher(e: string) {
    setMainTeacherId(e)
    setLoading(true)
  }
  // Teacher change part

  // Stacks get all
  useEffect(() => {
    instance().get("/stacks").then(res => {
      setStacks(res.data.data.map((item: StackType) => {
        item.label = item.name
        item.value = item.id
        return item
      }));
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  // Teachers get all
  useEffect(() => {
    instance().get("/teachers", {
      params: { statusId: 1, stackId }
    }).then(res => {
      setTeachers(res.data.data.map((item: TeacherType) => {
        item.label = `${item.name} - ${item.surname}`
        item.value = item.id
        return item
      }));
    }).finally(() => {
      setLoading(false)
    })
  }, [stackId])

  // Groups get all
  useEffect(() => {
    instance().get("/groups", {
      params: { name, mainTeacherId,stackId}
    }).then(res => {
      setGroups(res.data.data.map((item: GroupsType, index: number) => {
        item.key = index + 1
        item.roomName = item.room.name
        item.stackName = item.stack.name
        item.action = <Button size="middle" icon={<MoreOutlined className="!text-[18px] translate-y-[2px]" />} type="primary" className="!bg-[#bc8e5b] !p-0"></Button>
        return item
      }));
    }).finally(() => {
      setLoading(false)
    })
  }, [name, mainTeacherId, stackId])


  return (
    <div className="p-5">
      <PageCaption title="Guruxlar" count={groups.length} />
      <div className="flex items-center gap-[10px] mt-5">
        <Input onChange={handleSearch} className="!w-[300px]" placeholder="Qidirish" size="large" allowClear />
        <Select
          onChange={handleChooseStack}
          className="!w-[300px]"
          size="large"
          showSearch
          placeholder="Yo'nalish tanlang"
          optionFilterProp="label"
          allowClear
          options={stacks}
        />
        <Select
          onChange={handleChooseTeacher}
          className="!w-[300px]"
          size="large"
          showSearch
          placeholder="Ustoz tanlang"
          optionFilterProp="label"
          allowClear
          options={teachers}
        />
      </div>
      <div className="mt-5">
        <CustomTable loading={loading} columns={column} data={groups} />
      </div>
    </div>
  )
}

export default Groups