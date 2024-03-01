import React from 'react'
import styles from './PublicPage.module.css'

export default function PublicPageTask() {

    const priorityColor = {
        'LOW PRIORITY': '#63C05B',
        'MODERATE PRIORITY': '#18B0FF',
        'HIGH PRIORITY': '#FF2473',
    };

    return (
        <div className={styles.card}>

            <div style={{ display: 'flex' }}>
                <span
                    className={styles.priorityDot}
                    style={{ backgroundColor: 'red' }}
                ></span>
                <div className={styles.priorityName}>priority</div>
            </div>

            <p className={styles.titleName}>HERO SECTION</p>
            <p className={styles.checklistName}>Checklist 4/7</p>

                <div style={{ overflowY: 'auto', maxHeight: '26vh' }}>
                    <div className={styles.todoItem}>
                        <input
                            type="checkbox"
                            checked='false'
                            // style={{ 
                            //     backgroundColor: todo.completed? '#17A2B8' : 'transparent' 
                            //   }}
                            disabled
                        />
                        <p>Some Todo3</p>
                    </div>
                    <div className={styles.todoItem}>
                        <input
                            type="checkbox"
                            checked='false'
                            // style={{ 
                            //     backgroundColor: todo.completed? '#17A2B8' : 'transparent' 
                            //   }}
                            disabled
                        />
                        <p>Some Todo3</p>
                    </div>
                    <div className={styles.todoItem}>
                        <input
                            type="checkbox"
                            checked='false'
                            // style={{ 
                            //     backgroundColor: todo.completed? '#17A2B8' : 'transparent' 
                            //   }}
                            disabled
                        />
                        <p>Some Todo3</p>
                    </div>

                    <div className={styles.todoItem}>
                        <input
                            type="checkbox"
                            checked='false'
                            // style={{ 
                            //     backgroundColor: todo.completed? '#17A2B8' : 'transparent' 
                            //   }}
                            disabled
                        />
                        <p>Some Todo3</p>
                    </div>
                </div>

                <div className={styles.dateAndSection}>
                    <p className={styles.dueDate}>Due Date</p>
                    <div className={styles.isPastDue}>
                        Feb 10th
                    </div>
                </div>
        </div>
    )
}


