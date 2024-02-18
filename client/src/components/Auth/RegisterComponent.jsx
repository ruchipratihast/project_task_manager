import { React, useState } from 'react'
import styles from './Common.module.css'
import { FaRegUser } from "react-icons/fa6";
import { BiHide, BiShow } from "react-icons/bi";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { useAuth } from '../../providers/authProvider';
import { useNavigate } from "react-router-dom";

export default function RegisterComponent() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { register } = useAuth();

  const navigate = useNavigate();

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showconfirmPassword);
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data)
    var res = await register(data.name, data.email, data.password);
    if (res === "err") {
      alert("Invalid Credentials !");
  } else {
      navigate('/customer');
  }
  };

  return (
    <div className={styles.container}>

      <h1 className={styles.heading}>Register</h1>

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
        <MdOutlineEmail className={styles.prefixicon} />
        <input
          className={styles.inputField}
          type="email"
          name='email'
          value={data.email}
          placeholder="Email"
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
        <MdLockOutline className={styles.prefixicon} />
        <input
          className={styles.inputField}
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={data.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button onClick={toggleShowPassword} className={styles.passwordToggle}>
          {showPassword ? <BiShow className={styles.postfixicon} /> : <BiHide className={styles.postfixicon} />}
        </button>
      </div>

      <div className={styles.inputContainer}>
        <MdLockOutline className={styles.prefixicon} />
        <input
          className={styles.inputField}
          type={showconfirmPassword ? 'text' : 'password'}
          name='confirmPassword'
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={handleConfirmPasswordChange}
        />
        <button onClick={toggleShowConfirmPassword} >
          {showconfirmPassword ? <BiShow className={styles.postfixicon} /> : <BiHide className={styles.postfixicon} />}
        </button>
      </div>

      <button className={styles.fillbutton} onClick={handleSubmit}>
        Register
      </button>

      <p className={styles.paragraph}>Have an account ?</p>
      <button className={styles.blankbutton}>
        Log in
      </button>

    </div>
  )
}
