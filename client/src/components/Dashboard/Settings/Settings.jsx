import { React, useState } from 'react'
import styles from './Settings.module.css'
import { FaRegUser } from "react-icons/fa6";
import { BiHide, BiShow } from "react-icons/bi";
import { MdLockOutline } from "react-icons/md";

export default function Settings() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [data, setData] = useState({
        name: "",
        oldPassword: "",
        newPassword: "",
    })

    const toggleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(data)
    };

    return (
        <div className={styles.container}>

            <div className={styles.childContainer}>
                <h3 className={styles.heading}>Settings</h3>

                <div className={styles.inputContainer}>
                    <FaRegUser className={styles.prefixicon} />
                    <input
                        className={styles.inputField}
                        type="text"
                        name='name'
                        value={data.name}
                        placeholder="Name"
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <MdLockOutline className={styles.prefixicon} />
                    <input
                        className={styles.inputField}
                        type={showOldPassword ? 'text' : 'password'}
                        name='oldPassword'
                        value={data.oldPassword}
                        placeholder="Old Password"
                        onChange={handleChange}
                    />
                    <button onClick={toggleShowOldPassword} className={styles.passwordToggle}>
                        {showOldPassword ? <BiShow className={styles.postfixicon} /> : <BiHide className={styles.postfixicon} />}
                    </button>
                </div>

                <div className={styles.inputContainer}>
                    <MdLockOutline className={styles.prefixicon} />
                    <input
                        className={styles.inputField}
                        type={showNewPassword ? 'text' : 'password'}
                        name='newPassword'
                        value={data.newPassword}
                        placeholder="New Password"
                        onChange={handleChange}
                    />
                    <button onClick={toggleShowNewPassword} className={styles.passwordToggle}>
                        {showNewPassword ? <BiShow className={styles.postfixicon} /> : <BiHide className={styles.postfixicon} />}
                    </button>
                </div>

                <button className={styles.fillbutton} onClick={handleSubmit}>
                    Update
                </button>
            </div>

        </div>
    )
}


