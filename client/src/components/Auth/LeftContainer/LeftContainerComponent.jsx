import React from 'react';
import styles from './LeftContainer.module.css';
import loginImage from '../../../assets/images/login.png'

export default function LeftContainerComponent() {
  return (
    <div className={styles.container}>
    <img
      src={loginImage} 
      alt='login image'
     /> 
     <h1>Welcome aboard my friend</h1>
     <p>just a couple of clicks and we start</p>
    </div>
  )
}

