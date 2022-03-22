import React, { useEffect } from "react";
import { Empty, message, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import myStore from "../../store";
import imgUrl from "../../images/tomato.png";
import "./index.css";
import { LeftCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const vip = localStorage.getItem("vip");

function Onchard() {
    const navigate = useNavigate();

    useEffect(() => {
        myStore.getGoodListRequest()
    }, [])

    const handleBuy = (id, price) => {
        confirm({
            title: "番茄果园",
            content: "是否确认购买",
            okText: "确认",
            cancelText: "取消",
            onOk() {
                if (!vip) {
                    message.warn("你不是 VIP, 无法购买");
                } 
                myStore.buyGoodRequest({
                    goods: id
                }, price);
            }
        })
    }

    const handleReturn = () => {
        navigate("/home");
    }

    return (
        <div className="on-content">
            <LeftCircleOutlined
                className="on-return"
                onClick={handleReturn}
            />
            <div className="on-header">
                番茄果园
            </div>
            <div className="on-tomato">
                <img className="on-icon-img" src={imgUrl} />
                {myStore.tomato}
            </div>
            <div className="on-good">
                {
                    myStore.goodList.length === 0
                        ? <Empty
                            className="on-empty"
                            description="没有数据"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                        : myStore.goodList.map(({ id, name, price, number, img }) => {
                            return (
                                <div className="on-item" key={id}>
                                    <div className="on-left">
                                        <img className="on-item-img" src={img} />
                                    </div>
                                    <div className="on-right">
                                        <div className="on-item-name">{name}</div>
                                        <div className="on-item-number">{number === 0 ? "已售空" : `存量: ${number}`}</div>
                                        <div className="on-item-price">花费: {price}</div>
                                        <div
                                            className="on-btn"
                                            onClick={() => handleBuy(id, price)}
                                        >购买</div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default observer(Onchard);