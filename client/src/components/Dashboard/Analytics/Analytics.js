import React from 'react'
import styles from './Analytics.module.css'

export default function Analytics() {
  return (
    <div className= {styles.container}>
      <h3 className= {styles.heading}>Analytics</h3>
      <div className= {styles.analyticsParentContainer}>
        <div className= {styles.analyticsChildContainer}>
         <ul>
            <div className= {styles.listContainer}>
                <li>Backlog Tasks</li>
                <h3>16</h3>
            </div>
            <div className= {styles.listContainer}>
                <li>To-do Tasks</li>
                <h3>12</h3>
            </div>
            <div className= {styles.listContainer}>
                <li>In-Progress Tasks</li>
                <h3>16</h3>
            </div>
            <div className= {styles.listContainer}>
                <li>Completed Tasks</li>
                <h3>16</h3>
            </div>
         </ul>
        </div>

        <div className= {styles.analyticsChildContainer}>
         <ul>
            <div className= {styles.listContainer}>
                <li>Low Priority</li>
                <h3>16</h3>
            </div>
            <div className= {styles.listContainer}>
                <li>Moderate Priority</li>
                <h3>12</h3>
            </div>
            <div className= {styles.listContainer}>
                <li>High Priority</li>
                <h3>16</h3>
            </div>
            <div className= {styles.listContainer}>
                <li>Completed Tasks</li>
                <h3>16</h3>
            </div>
         </ul>
        </div>
      </div>
    </div>
  )
}
