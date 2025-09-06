import { Table } from "antd";
import type React from "react";


const CustomTable: React.FC<{columns:any[], data:any[]}> = ({columns, data}) => {
   return <Table columns={columns} dataSource={data} />
};

export default CustomTable