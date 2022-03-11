import React, { useEffect, useState } from "react";
import {
    Empty, Modal, Upload,
    InputNumber, Input, Button
} from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import myStore from "../../store";
import "./index.css";
import {
    LeftCircleOutlined, UploadOutlined
} from '@ant-design/icons';

function Manage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [id, setId] = useState(0);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [number, setNumber] = useState(0);
    const [files, setFiles] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        myStore.getGoodListRequest()
    }, [])

    const handleModify = (id, img, name, price, number) => {
        setId(id);
        setName(name);
        setPrice(price);
        setNumber(number);
        setUrl(img);
        setStatus(false);
        setIsVisible(true);
    }

    const handleReturn = () => {
        navigate("/home");
    }

    const handleAdd = () => {
        setName("");
        setPrice(0);
        setNumber(0);
        setFiles([]);
        setStatus(true);
        setIsVisible(true);
    }

    const handleOk = () => {
        setName("");
        setPrice(0);
        setNumber(0);
        setFiles([]);
        setIsVisible(false);

        if (status) {
            myStore.addComRequest({
                name,
                price,
                number,
                img: url
            })
        } else {
            myStore.modifyComRequest({
                name,
                price,
                number,
                img: url
            }, id)
        }
    }

    const handleCancel = () => {
        setName("");
        setPrice(0);
        setNumber(0);
        setFiles([]);
        setIsVisible(false);
    }

    const handleDelete = (id) => {
        myStore.deleteCom(id);
    }

    const props = {
        name: "file",
        action: "http://82.156.102.187:8002/upload/",
        headers: {
            authorization: `JWT ${localStorage.getItem("token")}`
        },
        maxCount: 1,
        fileList: files,
        onChange(info) {
            const {
                file: {
                    status, response
                },
                fileList
            } = info;

            setFiles(fileList);
            if (status === "done") {
                const {
                    data: { url }
                } = response;

                setUrl(url);
            }
        }
    }

    return (
        <div className="on-content">
            <Modal
                title="番茄学习法"
                visible={isVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="取消"
                okText="提交"
            >
                <div className="man-input">
                    <div className="man-label">名字</div>
                    <Input
                        className="man-input-inner"
                        value={name}
                        onChange={({ target: { value } }) => setName(value)}
                    />
                </div>
                <div className="man-input">
                    <div className="man-label">花费</div>
                    <InputNumber
                        className="man-inputnumber-inner"
                        min={0}
                        value={price}
                        onChange={value => setPrice(value)}
                    />
                </div>
                <div className="man-input">
                    <div className="man-label">数量</div>
                    <InputNumber
                        className="man-inputnumber-inner"
                        min={0}
                        value={number}
                        onChange={value => setNumber(value)}
                    />
                </div>
                <Upload
                    {...props}
                    className="man-upload"
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Modal>
            <LeftCircleOutlined
                className="on-return"
                onClick={handleReturn}
            />
            <div className="on-header">
                番茄果园
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
                                        <div className="on-item-img"></div>
                                    </div>
                                    <div className="on-right">
                                        <div className="man-item-name">{name}</div>
                                        <div className="man-item-number">存量: {number}</div>
                                        <div className="man-item-price">花费: {price}</div>
                                        <div
                                            className="on-btn man-btn"
                                            onClick={() => handleModify(id, img, name, price, number)}
                                        >修改</div>
                                        <div
                                            className="on-btn man-btn"
                                            onClick={() => handleDelete(id)}
                                        >删除</div>
                                    </div>
                                </div>
                            )
                        })
                }
                <div
                    className="man-add"
                    onClick={handleAdd}
                >
                    <div className="add-column"></div>
                    <div className="add-row"></div>
                </div>
            </div>
        </div>
    )
}

export default observer(Manage);