import { useNavigate } from "react-router-dom";
import "./index.css";

function Header() {
    const navigate = useNavigate();

    const handleOnchard = () => {
        navigate("/onchard");
    }

    const handleSelfStudent = () => {
        navigate("/selfstudent");
    }

    return (
        <div className="he-con">
            <div className="he-icon">番茄</div>
            <div className="he-right">
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
