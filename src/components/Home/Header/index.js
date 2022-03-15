import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import myStore from "../../../store";
import imgUrl from "../../../images/tomato.png";
import "./index.css";

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
            <div className="he-icon">
                <img className="he-icon-img" src={imgUrl} />
                番茄学习法
            </div>
            <div className="he-right">
                {myStore.admin && <div
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

export default observer(Header);
