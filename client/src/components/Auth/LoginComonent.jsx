import { React, useState } from 'react'
import styles from './Common.module.css'
import { FaRegUser } from "react-icons/fa6";
import { BiHide, BiShow } from "react-icons/bi";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { useAuth } from '../../providers/authProvider';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function LoginComonent() {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const { login } = useAuth();

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
    var res = await login(data.email, data.password);
    if (res === "err") {
      alert("Invalid Credentials !");
    } else {
      navigate('/board');
    }
  };

  return (
    <div className={styles.container}>

      <h1 className={styles.heading}>Login</h1>

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

      <button className={styles.fillbutton} onClick={handleSubmit}>
        Log in
      </button>

      <p className={styles.paragraph}>Have an account ?</p>
      <Link style={{ display: 'block', width: '100%' }} to='/register'>
        <button className={styles.blankbutton}>
          Register
        </button>
      </Link>

    </div>
  )
}

