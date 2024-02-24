import React from 'react'
import styles from './Analytics.module.css'

export default function Analytics() {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Analytics</h3>
      <div className={styles.analyticsParentContainer}>
        <div className={styles.analyticsChildContainer}>
            <div className={styles.content}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '12px', marginTop:'5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
                <h3 className= {styles.contentName}>Backlog Tasks</h3>
              </div>
              <h4>16</h4>
            </div>

            <div className={styles.content}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '12px', marginTop:'5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
                <h3 className= {styles.contentName}>To-do Tasks</h3>
              </div>
              <h4>16</h4>
            </div>

            <div className={styles.content}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '12px', marginTop:'5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
                <h3 className= {styles.contentName}>In-Progress Tasks</h3>
              </div>
              <h4>16</h4>
            </div>

            <div className={styles.content}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '12px', marginTop:'5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
                <h3 className= {styles.contentName}>Completed Tasks</h3>
              </div>
              <h4>16</h4>
            </div>
        </div>

        <div className={styles.analyticsChildContainer}>
        <div className={styles.content}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '12px', marginTop:'5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
                <h3 className= {styles.contentName}>Low Priority</h3>
              </div>
              <h4>16</h4>
            </div>

            <div className={styles.content}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '12px', marginTop:'5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
                <h3 className= {styles.contentName}>Moderate Priority</h3>
              </div>
              <h4>16</h4>
            </div>

            <div className={styles.content}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '12px', marginTop:'5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
                <h3 className= {styles.contentName}>High Priority</h3>
              </div>
              <h4>16</h4>
            </div>

            <div className={styles.content}>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '12px', marginTop:'5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
                <h3 className= {styles.contentName}>Due Date Tasks</h3>
              </div>
              <h4>16</h4>
            </div>
        </div>
      </div>
    </div>
  )
}
