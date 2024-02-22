import React from 'react'
import styles from './Sidebar.module.css'
import logoImage from '../../assets/icons/logo.png'
import logoutImage from '../../assets/icons/Logout.png'
import { SidebarData } from './SidebarData'

export default function Sidebar() {
  return (
    <div className= {styles.container}>
      <div className= {styles.headingContainer}>
      <img src={logoImage} className={styles.logoImage} />
      <p className={styles.appName}>Pro Manage</p>
      </div>
{/* 
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
      </div> */}

      <div className= {styles.sidebar}>
        <ul className= {styles.sidebarList}>
        {
        SidebarData.map((val,key) =>{
          return (
            <li
              key= {key}
              className= {styles.row}
              id = {window.location.pathname == val.link ? styles.active : ""}
              onClick={() => {
                window.location.pathname = val.link;
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

      <button className= {styles.logouButton}>
      <div className= {styles.logoutContainer}>
      <img src={logoutImage} className={styles.logoutImage} />
      <p className={styles.logoutName}>Log out</p>
      </div>
      </button>
      
    </div>
  )
}

