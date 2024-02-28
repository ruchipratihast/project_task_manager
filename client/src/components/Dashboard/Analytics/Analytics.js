import React, { useEffect } from 'react'
import styles from './Analytics.module.css'
import { useTasks } from '../../../providers/taskProvider'

export default function Analytics() {
  const { backlog, todo, inProgress, done, lowPriority, highPriority, moderatePriority, allDueDate } = useTasks();

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Analytics</h3>
      <div className={styles.analyticsParentContainer}>
        <div className={styles.analyticsChildContainer}>
          <div className={styles.content}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '12px', marginTop: '5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
              <h3 className={styles.contentName}>Backlog Tasks</h3>
            </div>
            <h4>{backlog.length}</h4>
          </div>

          <div className={styles.content}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '12px', marginTop: '5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
              <h3 className={styles.contentName}>To-do Tasks</h3>
            </div>
            <h4>{todo.length}</h4>
          </div>

          <div className={styles.content}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '12px', marginTop: '5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
              <h3 className={styles.contentName}>In-Progress Tasks</h3>
            </div>
            <h4>{inProgress.length}</h4>
          </div>

          <div className={styles.content}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '12px', marginTop: '5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
              <h3 className={styles.contentName}>Completed Tasks</h3>
            </div>
            <h4>{done.length}</h4>
          </div>
        </div>

        <div className={styles.analyticsChildContainer}>
          <div className={styles.content}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '12px', marginTop: '5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
              <h3 className={styles.contentName}>Low Priority</h3>
            </div>
            <h4>{lowPriority}</h4>
          </div>

          <div className={styles.content}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '12px', marginTop: '5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
              <h3 className={styles.contentName}>Moderate Priority</h3>
            </div>
            <h4>{moderatePriority}</h4>
          </div>

          <div className={styles.content}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '12px', marginTop: '5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
              <h3 className={styles.contentName}>High Priority</h3>
            </div>
            <h4>{highPriority}</h4>
          </div>

          <div className={styles.content}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '12px', marginTop: '5px', width: '12px', height: '12px', backgroundColor: '#90C4CC', borderRadius: '50%' }}></div>
              <h3 className={styles.contentName}>Due Date Tasks</h3>
            </div>
            <h3>{allDueDate}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
