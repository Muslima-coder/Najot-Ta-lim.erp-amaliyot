import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { Logo } from '../assets/images';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Guruhlarim' },
  {
    key: 'sub1',
    label: 'Foydalanuvchilar',
    icon: <AppstoreOutlined />,
    children: [
      { key: '2', label: 'Option 9' },
      { key: '3', label: 'Option 10' },
      {
        key: '4',
        label: 'Submenu',
        children: [
          { key: '5', label: 'Option 11' },
          { key: '6', label: 'Option 12' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: "O'quv bo'limi",
    icon: <AppstoreOutlined />,
    children: [
      { key: '7', label: 'Option 9' },
      { key: '8', label: 'Option 10' },
      {
        key: '9',
        label: 'Submenu',
        children: [
          { key: '10', label: 'Option 11' },
          { key: '11', label: 'Option 12' },
        ],
      },
    ],
  },
  {
    key: 'sub3',
    label: 'Gamifikatsiya',
    icon: <AppstoreOutlined />,
    children: [
      { key: '12', label: 'Option 9' },
      { key: '13', label: 'Option 10' },
      {
        key: '14',
        label: 'Submenu',
        children: [
          { key: '15', label: 'Option 11' },
          { key: '16', label: 'Option 12' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: "Do'kon",
    icon: <AppstoreOutlined />,
    children: [
      { key: '17', label: 'Option 9' },
      { key: '18', label: 'Option 10' },
      {
        key: '19',
        label: 'Submenu',
        children: [
          { key: '20', label: 'Option 11' },
          { key: '21', label: 'Option 12' },
        ],
      },
    ],
  },
  { key: '22', icon: <PieChartOutlined />, label: 'Profil' },
];

const MenuModal: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div className="!bg-[#001429] pl-4 py-5 border-b-white border-b-[1px] flex items-center gap-2">
        <img src={Logo} alt="logo" width={50} height={50} />
        <strong className="text-white font-bold text-[20px]">Teacher</strong>
        <Button
          className="!absolute left-100 top-3 !bg-transparent"
          size="large"
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        className="h-full"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default MenuModal;
