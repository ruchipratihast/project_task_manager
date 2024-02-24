import React, { useState } from 'react'
import styles from './TaskCard.module.css'
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

export default function TaskCard({ title, priority, section, date, todos }) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.card}>
            <h3>{title}</h3>

            <div className={styles.checkListHeader}>
                <p>Checklist {todos.filter((t) => t.checked == true).length}/{todos.length}</p>
                <div onClick={() => setIsExpanded(!isExpanded)} className={styles.caretButton}>
                    {isExpanded ? <RxCaretUp /> : <RxCaretDown />}
                </div>
            </div>
            {isExpanded && todos.map((todo, idx) => {
                return <div key={idx} className={styles.todoItem}>
                    <input type="checkbox" checked={todo.checked} />
                    <p>{todo.todo}</p>
                </div>
            })}

            <div className={styles.dateAndSection}>
                <div>deb 10</div>
                <div className={styles.sectionContainer}>
                    <div className={styles.sectionButton}>PROGRESS</div>
                    <div className={styles.sectionButton}>TODO</div>
                </div>
            </div>

        </div>
    )
}
