import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import axios from 'axios';
import { useState, type FC } from 'react';
import { useCookies } from 'react-cookie';
import { API } from '../hooks';
import { toast } from 'react-toastify';
import { LogoIcon } from '../assets/icons';

const LoginForm: FC = () => {
  const [,setCookies] = useCookies(['accessToken'])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onFinish = (values: any) => {
    setIsLoading(true)

    axios.post(`${API}/user/login`, values).then(res => {
      toast.success("Muvaffaqiyatli kirdingiz", {
        onClose: () => {
          setIsLoading(false)
          setCookies("accessToken", res.data.accessToken)
          location.pathname = "/"
        },
        autoClose: 2000
      })
    }
  )
   .catch(() => {
      toast.error("Noto'g'ri parol yoki login")
      setIsLoading(false)
    })
  };

  return (
    <div className='w-full'>
      <div className='flex items-center gap-[10px] text-[#bc8e5b] mb-[20px] justify-center '>
        <LogoIcon/>
        <span className='font-medium text-black text-[20px]'>Admin paneli</span>
      </div>

    <Form
      autoComplete='off'
      className='!w-full'
      name="login"
      style={{ maxWidth:"100%"}}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Iltimos username kiriting' }]}
      >
        <Input size='large' allowClear prefix={<UserOutlined />} placeholder="Kirish" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Iltimos maxfiy so'zni kiriting" }]}
      >
        <Input.Password size='large' allowClear prefix={<LockOutlined />} type="password" placeholder="Maxfiy so'z" />
      </Form.Item>
        <Button loading={isLoading} className='!bg-[#bc8e5b]  muslima' size='middle' block type="primary" htmlType="submit">
          Kirish
        </Button>
    </Form>
    </div>
  );
};

export default LoginForm;