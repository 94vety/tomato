import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Popover } from "antd";
import imgUrl from "../../../images/tomato.png";
import { PoweroffOutlined, ProfileOutlined } from "@ant-design/icons";
import "./index.css";

function Header() {
    const navigate = useNavigate();
    const admin = (localStorage.getItem("admin") === "true");
    const vip = (localStorage.getItem("vip") === "true");

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

    return (
        <div className="he-con">
            <div className="he-icon">
                <img className="he-icon-img" src={imgUrl} />
                番茄学习法
            </div>
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
        </div>
    )
}

export default observer(Header);
