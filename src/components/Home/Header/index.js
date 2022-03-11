import { useNavigate } from "react-router-dom";
import "./index.css";

const admin = localStorage.getItem("admin");

function Header() {
    const navigate = useNavigate();

    const handleOnchard = () => {
        navigate("/onchard");
    }

    const handleSelfStudent = () => {
        navigate("/selfstudent");
    }

    const handleManage = () => {
        navigate("/manage");
    }

    return (
        <div className="he-con">
            <div className="he-icon">番茄</div>
            <div className="he-right">
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
        </div>
    )
}

export default Header;
