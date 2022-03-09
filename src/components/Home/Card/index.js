import { useState, useEffect } from "react";
import {
    Modal, Input, Button,
    InputNumber, Empty
} from "antd";
import { observer } from "mobx-react-lite";
import myStore from "../../../store";
import {
    PlusCircleOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';
import "./index.css";

const { confirm } = Modal;
let stop = false;

function Card() {
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [label, setLabel] = useState("");
    const [comment, setComment] = useState("");
    const [minute, setMinute] = useState(30);
    const [second, setSecond] = useState("00:00");
    const [commentVisible, setCommentVisible] = useState(false);

    useEffect(() => {
        myStore.getTomatosRequest();
    }, [])

    const handleCreate = () => {
        setVisible(true);
    }

    const handleOk = () => {
        setVisible(false);
        setStatus(true);
        calcTime();
    }

    const handleCancel = () => {
        setVisible(false);
        setLabel("");
        setMinute(30);
    }

    const handlePause = async() => {
        confirm({
            title: "番茄学习法",
            content: "是否确认中止任务",
            okText: "确认",
            cancelText: "取消",
            onOk() {
                setCommentVisible(true);
                stop = true;
            },
        });
    }

    const handleComment = () => {
        setCommentVisible(false);
    }

    const handleComplie = () => {
        myStore.addReportRequest({
            expected_time: minute,
            actual_time: parseInt((count + 1) / 60),
            tip: label,
            comment 
        });

        stop = false;
        setCommentVisible(false);
        setStatus(false);
        myStore.getTomatosRequest();
    }

    const calcTime = () => {
        let seconds = minute * 60;

        let timer = setInterval(() => {
            seconds--;
            setCount(minute * 60 - seconds);

            if (seconds <= 0) {
                setSecond("00:00");
                setCommentVisible(true);
                clearInterval(timer);
            } else if (stop) {
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
            <Modal
                title="心得体会"
                visible={commentVisible}
                onOk={handleComment}
                okText="确认"
                footer={[
                    <Button key="btn" onClick={handleComplie}>
                        确认
                    </Button>
                ]}
            >
                <Input
                    value={comment}
                    onChange={({target: { value }}) => setComment(value)}
                    placeholder="写下自己的心得体会"
                />
            </Modal>
            <div className="card">
                {status
                    ? (<div className="ca-task">
                        <div className="ca-la">{label}</div>
                        <div className="ca-title">倒计时</div>
                        <div className="ca-time">{second}</div>
                        <PauseCircleOutlined
                            className="ca-pause"
                            onClick={handlePause}
                        /> 
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
