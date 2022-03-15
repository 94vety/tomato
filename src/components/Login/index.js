import React, { useState } from "react";
import {
    Form, Input,
    Button,
    message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import myStore from "../../store/index";
import "./index.css";

const FormItem = Form.Item;
const { Password: InputPassword } = Input;

function Login() {
    const formRef = React.createRef();
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    const handleRegister = () => {
        setStatus(!status);
        formRef.current.resetFields();
    }

    const handleClickLogin = async(value) => {
        const result = await myStore.loginRequest(value);
        formRef.current.resetFields();

        if (result) {
            navigate("/home");
        }
    }

    const handleClickRegister = async(value) => {
        const {
            password, password2
        } = value;

        if (password === password2) {
            const result = await myStore.registerRequest(value);
            
            if (result) {
                formRef.current.resetFields();
                navigate("/home");
            }
        } else {
            message.warn("密码与确认密码不一致");
        }
    }

    return (
        <div className="login">
            <div className="content">
                <div className="header">
                    <div>番茄学习法</div>
                </div>
                {status
                    ? (<Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 17 }}
                        ref={formRef}
                        onFinish={handleClickLogin}
                        autoComplete="off"
                        initialValues={{
                            "username": "",
                            "password": "",
                            "rePassword": "",
                            "email": ""
                        }}
                    >
                        <FormItem
                            label="用户名"
                            name="username"
                            className="login-username"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your username!'
                                    }
                                ]
                            }
                        >
                            <Input placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem
                            label="密&emsp;码"
                            name="password"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <InputPassword  placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem
                            wrapperCol={{ offset: 10, span: 14 }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                登陆
                            </Button>
                        </FormItem>
                    </Form>)
                    : (<Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 17 }}
                        ref={formRef}
                        onFinish={handleClickRegister}
                        autoComplete="off"
                    >
                        <FormItem
                            label="昵称"
                            name="name"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your username!'
                                    }
                                ]
                            }
                        >
                            <Input placeholder="请输入昵称" />
                        </FormItem>
                        <FormItem
                            label="账号"
                            name="username"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your username!'
                                    }
                                ]
                            }
                        >
                            <Input placeholder="请输入账号" />
                        </FormItem>
                        <FormItem
                            label="密码"
                            name="password"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <InputPassword placeholder="请输入密码" />
                        </FormItem>
                        <FormItem
                            label="确认密码"
                            name="password2"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <InputPassword placeholder="请输入密码" />
                        </FormItem>
                        <FormItem
                            label="邮箱"
                            name="email"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <Input placeholder="请输入邮箱" />
                        </FormItem>
                        <FormItem
                            wrapperCol={{ offset: 10, span: 14 }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                注册
                            </Button>
                        </FormItem>
                    </Form>)}
                <div className="footer">
                    <a
                        className="register"
                        onClick={handleRegister}
                    >{status ? '注册' : '登陆'}</a>
                </div>
                <a
                    href="http://82.156.102.187:8002/admin/login/?next=/admin/"
                    className="super-man"
                    target="_blank"
                >
                    超级管理员
                </a>
            </div>
        </div>
    )
}

export default observer(Login);
