import React, { useState } from 'react'
import styles from './TaskCard.module.css'
import { PiCaretDown, PiCaretUp } from "react-icons/pi";
import { TfiMoreAlt } from "react-icons/tfi";

export default function TaskCard({ title, priority, section, date, todos }) {

    const priorityColor = {
        'LOW PRIORITY': '#63C05B',
        'MODERATE PRIORITY': '#18B0FF',
        'HIGH PRIORITY': '#FF2473',
    };

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.card}>

            <div className={styles.priorityContainer}>
                <div style={{ display: 'flex' }}>
                    <span
                        className={styles.priorityDot}
                        style={{ backgroundColor: priorityColor[priority] || '#ccc' }}
                    ></span>
                    <div className={styles.priorityName}>{priority}</div>
                </div>
                <TfiMoreAlt className={styles.moreButton} />
            </div>

            <p className={styles.titleName}>{title}</p>

            <div className={styles.checkListHeader}>
                <p className={styles.checklistName}>Checklist {todos.filter((t) => t.checked == true).length}/{todos.length}</p>
                <div onClick={() => setIsExpanded(!isExpanded)} className={styles.collapseButton}>
                    {isExpanded ? <PiCaretDown className={styles.collapseIcon} /> : <PiCaretUp className={styles.collapseIcon} />}
                </div>
            </div>
            {isExpanded && todos.map((todo, idx) => {
                return <div key={idx} className={styles.todoItem}>
                    <input type="checkbox" checked={todo.checked} />
                    <p>{todo.todo}</p>
                </div>
            })}

            <div className={styles.dateAndSection}>
                {date ? <div>{date}</div> : <p></p>}
                <div className={styles.sectionContainer}>
                    <div className={styles.sectionButton}><p className={styles.sectionName}>PROGRESS</p></div>
                    <div className={styles.sectionButton}><p className={styles.sectionName}>TODO</p></div>
                </div>
            </div>

        </div>
    )
}
