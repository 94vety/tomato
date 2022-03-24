import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import {
    Popover, Modal,
    Button, Input
} from "antd";
import imgUrl from "../../../images/tomato.png";
import {
    PoweroffOutlined,
    ProfileOutlined,
    FileSyncOutlined
} from "@ant-design/icons";
import myStore from "../../../store";
import "./index.css";

const { Password } = Input;

function Header() {
    const navigate = useNavigate();
    const admin = (localStorage.getItem("admin") === "true");
    const vip = (localStorage.getItem("vip") === "true");

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setName(localStorage.getItem("username"));
        setEmail(localStorage.getItem("email"));
    }, [])

    const handleOnchard = () => {
        navigate("/onchard");
    }

    const handleSelfStudent = () => {
        navigate("/selfstudent");
    }

    const handleManage = () => {
        navigate("/manage");
    }

    const handleSignout = () => {
        navigate("/");
        localStorage.clear();
    }

    const handleRecords = () => {
        navigate("/records");
    }

    const handleAccount = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
        setPassword("");
    }

    const handleComplie = () => {
        setVisible(false);
        setPassword("");
        myStore.modifyAccountRequest({
            email,
            password,
            name
        }, localStorage.getItem("userId"));
    }

    return (
        <div className="he-con">
            <div className="he-icon">
                <img className="he-icon-img" src={imgUrl} />
                番茄学习法
            </div>
            <Modal
                title="账户修改"
                visible={visible}
                onCancel={handleCancel}
                okText="确认"
                okCancel="取消"
                footer={[
                    <Button key="btn" onClick={handleComplie}>
                        确认
                    </Button>,
                    <Button key="cancel" onClick={handleCancel}>
                        取消
                    </Button>
                ]}
            >
                <div className="he-input">
                    <Input
                        className="he-top-input"
                        placeholder="昵称"
                        value={name}
                        onChange={({ target: { value } }) => setName(value)}
                    />
                    <Password
                        className="he-top-input"
                        placeholder="密码"
                        value={password}
                        onChange={({ target: { value } }) => setPassword(value)}
                    />
                    <Input
                        className="he-bto-input"
                        placeholder="邮箱"
                        value={email}
                        onChange={({ target: { value } }) => setEmail(value)}
                    />
                </div>
            </Modal>
            <div className="he-right">
                {admin}
                {admin && <div
                    className="he-manage"
                    onClick={handleManage}
                >管理中心</div>
                }
                <div
                    className="he-onchard"
                    onClick={handleOnchard}
                >番茄果园</div>
                <div 
                    className="he-self-student"
                    onClick={handleSelfStudent}
                >番茄自习室</div>
            </div>
            <Popover content="退出登录">
                <PoweroffOutlined
                    className="he-signout"
                    onClick={handleSignout}
                />
            </Popover>
            {vip && (
                <Popover content="兑换记录">
                    <ProfileOutlined
                        className="he-records"
                        onClick={handleRecords}
                    />
                </Popover>
            )}
            <Popover content="账户修改">
                <FileSyncOutlined
                    className="he-account"
                    onClick={handleAccount}
                />
            </Popover>
        </div>
    )
}

export default observer(Header);
