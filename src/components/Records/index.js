import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import myStore from "../../store";
import { LeftCircleOutlined } from '@ant-design/icons';
import imgUrl from "../../images/tomato.png";
import "./index.css";

function Records() {
    const navigate = useNavigate();

    useEffect(() => {
        myStore.getRecordsRequest();
    }, [])

    const handleReturn = () => {
        navigate("/home");
    }

    return (
        <div className="records">
            <LeftCircleOutlined
                className="on-return"
                onClick={handleReturn}
            />
            <div className="records-header">兑换记录</div>
            <div className="records-list">
                {
                    myStore.records.length === 0
                        ? <Empty
                            className="empty"
                            description="没有数据"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                        : myStore.records.map(({ id, time, goods }) => {
                            return <div className="records-item" key={id}>
                                <div className="records-name">{goods.name}</div>
                                <div className="records-price">
                                    <img className="records-icon-img" src={imgUrl} />
                                    {goods.price}
                                </div>
                                <div className="records-time">{time.slice(0, 19).replace("T", " ")}</div>
                            </div>
                        })
                }
            </div>
        </div>
    )
}

export default observer(Records);
