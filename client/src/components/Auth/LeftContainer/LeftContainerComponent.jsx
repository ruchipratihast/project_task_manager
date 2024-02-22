import React from 'react';
import styles from './LeftContainer.module.css';
import loginImage from '../../../assets/images/login.png'

export default function LeftContainerComponent() {
  return (
    <div className={styles.container}>
    <img
      className= {styles.imageContainer}
      src={loginImage} 
      alt='login image'
     /> 
     <h1 className= {styles.welcomeHeading}>Welcome aboard my friend</h1>
     <p className={styles.welcomeParagraph}>just a couple of clicks and we start</p>
    </div>
  )
}

