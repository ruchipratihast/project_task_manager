import React from 'react'
import styles from './Sidebar.module.css'
import logoImage from '../../assets/icons/logo.png'
import layoutImage from '../../assets/icons/layout.png'
import dbImage from '../../assets/icons/database.png'
import settingsImage from '../../assets/icons/settings.png'
import logoutImage from '../../assets/icons/Logout.png'

export default function Sidebar() {
  return (
    <div className= {styles.container}>
      <div className= {styles.headingContainer}>
      <img src={logoImage} className={styles.logoImage} />
      <p className={styles.appName}>Pro Manage</p>
      </div>

      <div className= {styles.headingContainer}>
      <img src={layoutImage} className={styles.logoImage} />
      <p className={styles.navbarName}>Board</p>
      </div>

      <div className= {styles.headingContainer}>
      <img src={dbImage} className={styles.logoImage} />
      <p className={styles.navbarName}>Analytics</p>
      </div>

      <div className= {styles.headingContainer}>
      <img src={settingsImage} className={styles.logoImage} />
      <p className={styles.navbarName}>Setting</p>
      </div>

      <div className= {styles.logoutContainer}>
      <img src={logoutImage} className={styles.logoutImage} />
      <p className={styles.logoutName}>Log out</p>
      </div>
      
    </div>
  )
}

