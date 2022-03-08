import { useState, useEffect } from "react";
import {
    Modal, Input,
    InputNumber, Empty
} from "antd";
import { observer } from "mobx-react-lite";
import myStore from "../../../store";
import { PlusCircleOutlined } from '@ant-design/icons';
import "./index.css";

function Card() {
    const [status, setStatus] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [label, setLabel] = useState("");
    const [comment, setComment] = useState("");
    const [minute, setMinute] = useState(30);
    const [second, setSecond] = useState("00:00");

    useEffect(() => {
        myStore.getTomatosRequest()
    }, [])

    const handleCreate = () => {
        setVisible(true);
    }

    const handleOk = () => {
        setVisible(false);
        setStatus(true)
        calcTime();
    }

    const handleCancel = () => {
        setVisible(false);
        setLabel("");
        setComment("");
        setMinute(30);
    }

    const calcTime = () => {
        let seconds = 60 * 2;

        let timer = setInterval(() => {
            seconds--;

            if (seconds <= 0) {
                setSecond("00:00");
                clearInterval(timer);
            } else {
                let m = parseInt((seconds / 60) % 60);
                let s = parseInt(seconds % 60);
                if (m < 10 && s < 10) {
                    setSecond(`0${m}:0${s}`);
                } else if (m > 10 && s < 10) {
                    setSecond(`${m}:0${s}`);
                } else if (m < 10 && s > 10) {
                    setSecond(`0${m}:${s}`);
                } else {
                    setSecond(`${m}:${s}`);
                }
            }
        }, 1000);
    }

    return (
        <div className="ca-ma">
            <div className="card">
                {status
                    ? (<div className="ca-task">
                        <div className="ca-la">{label}</div>
                        <div className="ca-co">{comment}</div>
                        <div className="ca-title">倒计时</div>
                        <div className="ca-time">{second}</div>
                    </div>)
                    :  (<div>
                        <div className="ca-header">番茄列表</div>
                        <PlusCircleOutlined
                            className="ca-plus"
                            onClick={handleCreate}
                        />
                        <Modal
                            title="番茄学习法"
                            visible={isVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            okText="确认"
                            cancelText="取消"
                        >
                            <div className="ca-modal">
                                <div className="ca-td">
                                    <div className="ca-label">标签：</div>
                                    <Input
                                        className="ca-input"
                                        placeholder="输入标签"
                                        value={label}
                                        onChange={({target: { value }}) => setLabel(value)}
                                    />
                                </div>
                                <div className="ca-td">
                                    <div className="ca-label">激励：</div>
                                    <Input
                                        className="ca-input"
                                        placeholder="来句鼓励自己"
                                        value={comment}
                                        onChange={({target: { value }}) => setComment(value)}
                                    />
                                </div>
                                <div className="ca-td">
                                    <div className="ca-label">时间（分钟）：</div>
                                    <InputNumber
                                        min={1}
                                        max={1440}
                                        value={minute}
                                        onChange={value => setMinute(value)}
                                    />
                                </div>
                            </div>
                        </Modal>
                        <div className="ca-list">
                            {
                                myStore.tomatoList.length === 0
                                    ? <Empty
                                        className="empty"
                                        description="没有数据"
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    />
                                    : myStore.tomatoList.map((item, index) => {
                                        const {
                                            tip, now, comment,
                                            expected_time, actual_time
                                        } = item;

                                        return <div className="ca-item" key={index}>
                                            <div className="ca-top">
                                                <div className="ca-tip">{tip}</div>
                                                <div className="ca-start-time">{now}</div>
                                            </div>
                                            <div className="ca-comment">{comment}</div>
                                            <div className="ca-bto">
                                                <div className="ca-left-time">预计：{expected_time} 分钟</div>
                                                <div className="ca-right-time">实际：{actual_time} 分钟</div>
                                            </div>
                                        </div>
                                    })
                            }
                        </div>
                    </div>)
                }
                
               
            </div>
        </div>
    )
}

export default observer(Card);
