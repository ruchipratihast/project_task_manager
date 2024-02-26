import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import logoImage from '../../assets/icons/logo.png'
import logoutImage from '../../assets/icons/Logout.png'
import { SidebarData } from './SidebarData'
import { useNavigate } from 'react-router-dom'
import Logout from '../ReactModals/Logout/Logout'

export default function Sidebar() {
  const [closeLogout, setcloseLogout] = useState(false);
  let Navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <img src={logoImage} className={styles.logoImage} />
        <p className={styles.appName}>Pro Manage</p>
      </div>

      <div className={styles.sidebar}>
        <ul className={styles.sidebarList}>
          {
            SidebarData.map((val, key) => {
              return (
                <li
                  key={key}
                  className={styles.row}
                  id={window.location.pathname == val.link ? styles.active : ""}
                  onClick={() => {
                    Navigate(val.link);
                  }}
                >
                  <img className={styles.sidebarListImage} src={val.icon} />
                  <div className={styles.sidebarListTitle}>{val.title}</div>
                </li>
              );
            })
          }
        </ul>
      </div>

      <button 
      onClick={() => {
              setcloseLogout(true);
            }} 
      className={styles.logouButton}
      >
        <div className={styles.logoutContainer}>
          <img src={logoutImage} className={styles.logoutImage} />
          <p className={styles.logoutName}>Log out</p>
        </div>
      </button>

      {closeLogout ? <Logout closeLogout={setcloseLogout} /> : <></>}

    </div>
  )
}

