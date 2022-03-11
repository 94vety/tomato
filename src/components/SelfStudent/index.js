import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
    Modal, Input,
    Badge, Popover, message
} from "antd";
import myStore from "../../store";
import "./index.css";
import {
    LeftCircleOutlined, EditOutlined,
    DeleteOutlined, UsergroupDeleteOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const vip = localStorage.getItem("vip");

function SelfStudent() {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [max, setMax] = useState(0);

    useEffect(() => {
        if (vip) {
            myStore.adminSelfRoomRequest();
        } else {
            myStore.placeSelfRoomRequest();
        }
    }, [])

    const handleEnter = (event) => {
        const { value } = event.target;

        if (event.keyCode === 13) {
            myStore.joinRoomRequest({
                group: value
            })
        } else {
            setValue(value);
        }
    }

    const handleReturn = () => {
        navigate("/home");
    }

    const handleOk = () => {
        setIsVisible(false);
        myStore.modifyRoomNameRequest({
            name: roomName
        }, myStore.room.id);
    }

    const handleCancel = () => {
        setIsVisible(false);
    }

    const handleNameEnter = (event) => {
        const { value } = event.target;

        if (event.keyCode === 13) {
            myStore.modifyRoomNameRequest({
                name: value
            }, myStore.room.id);
        } else {
            setRoomName(value);
        }
    }

    const handleDeleteUser = (id) => {
        myStore.deleteUserRequest({
            info: id
        });
    }

    const handleDeleteGroup = (id) => {
        console.log(id);
    }

    const handleQuitGroup = (id) => {
        console.log(id)
    }

    const handleCreateRoom = () => {
        if (max > 0) {
            myStore.createGroupRequest({
                name: groupName,
                max: parseInt(max)
            })
        } else {
            message.warn("人数小于 1");
        } 
    }

    return (
        <div className="self-content">
            <Modal
                title="番茄学习"
                visible={isVisible}
                okText="提交"
                cancelText="取消"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="self-modify">
                    <div className="self-modify-name">房间名</div>
                    <Input
                        value={roomName}
                        onKeyDown={event => handleNameEnter(event)}
                        onChange={event => handleNameEnter(event)}
                    />
                </div>
            </Modal>
            <div className="self-title">
                番茄自习室
            </div>
            <LeftCircleOutlined
                className="on-return"
                onClick={handleReturn}
            />
            <div className="self-header">
                <div className="self-join">
                    加入自习室
                </div>
                <div className="self-bar"></div>
                <div className="self-top">
                    <div className="self-label">
                        输入房间号
                    </div>
                    <div className="self-search">
                        <input
                            value={value}
                            className="self-search-input"
                            onKeyDown={e => handleEnter(e)}
                            onChange={e => handleEnter(e)}
                        />
                    </div>
                </div>
            </div>
            {vip
                ? myStore.listEmpty
                    ? (<div className="self-room">
                        <div className="self-vip-title">创建房间</div>
                        <div className="self-bar"></div>
                        <div className="self-vip-list">
                            <div className="self-vip-item">
                                <div className="self-vip-label">自习室名称</div>
                                <input onChange={({ target: { value } }) => { setGroupName(value) }} className="self-vip-empty" />
                            </div>
                            <div className="self-vip-item">
                                <div className="self-vip-label">最大人数</div>
                                <input onChange={({ target: { value } }) => { setMax(value) }} className="self-vip-empty" />
                            </div>
                            <div
                                className="self-vip-btn"
                                onClick={handleCreateRoom}
                            >创建</div>
                        </div>
                    </div>)
                    : (<div className="self-room">
                        <div className="self-room-header">
                            <Popover content="删除自习室">
                                <UsergroupDeleteOutlined
                                    className="delete-group"
                                    onClick={() => handleDeleteGroup(myStore.room.id)}
                                />
                            </Popover>
                            <Popover content="退出自习室">
                                <LogoutOutlined
                                    className="self-quit"
                                    onClick={() => handleQuitGroup(myStore.room.id)}
                                />
                            </Popover>
                            <Popover content="编辑自习室">
                                <EditOutlined
                                    className="self-name-edit"
                                    onClick={() => setIsVisible(true)}
                                />
                            </Popover>
                            <div className="self-room-name">
                                房间名: {myStore.room.name}
                            </div>
                            <div className="self-room-max">最大人数: {myStore.room.max}</div>
                        </div>
                        <div className="self-room-member">成员</div>
                        <div className="self-room-list">
                            {
                                myStore.member.map(({ id, activate, user: { name, tomato, vip } }) => {
                                    return <div className="self-member" key={id}>
                                        <div className="self-member-tomato">{tomato}</div>
                                        <div className="self-member-name">{name}</div>
                                        <div className="self-member-vip">{vip ? "会员" : "非会员"}</div>
                                        {!activate
                                            ? (
                                                <div className="self-badge">
                                                    <Badge color="cyan" />
                                                    <div className="self-badge-word">自习中</div>
                                                </div>
                                            )
                                            : (
                                                <div className="self-badge">
                                                    <Badge color="volcano" />
                                                    <div className="self-badge-word">申请</div>
                                                </div>
                                            )
                                        }
                                        <DeleteOutlined
                                            className="delete-user"
                                            onClick={() => handleDeleteUser(id)}
                                        />
                                    </div>
                                })
                            }
                        </div>
                    </div>)
                : myStore.listEmpty
                    ? (<div className="self-member-room">快加入自习室，学习吧！</div>)
                    : (<div className="self-room">
                        <div className="self-room-header">
                            <div className="self-room-name">
                                房间名: {myStore.room.name}
                            </div>
                            <div className="self-room-max">最大人数: {myStore.room.max}</div>
                        </div>
                        <div className="self-room-member">成员</div>
                        <div className="self-room-list">
                            {
                                myStore.member.map(({ id, activate, user: { name, tomato, vip } }) => {
                                    return <div className="self-member" key={id}>
                                        <div className="self-member-tomato">{tomato}</div>
                                        <div className="self-member-name">{name}</div>
                                        <div className="self-member-vip">{vip ? "会员" : "非会员"}</div>
                                        {!activate
                                            ? (
                                                <div className="self-badge">
                                                    <Badge color="cyan" />
                                                    <div className="self-badge-word">自习中</div>
                                                </div>
                                            )
                                            : (
                                                <div className="self-badge">
                                                    <Badge color="volcano" />
                                                    <div className="self-badge-word">申请</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>)
            }
        </div>
    )
}

export default observer(SelfStudent);
