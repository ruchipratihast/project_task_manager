import React, { useEffect, useState } from 'react'
import styles from './PublicPage.module.css'
import { PiCheckBold } from 'react-icons/pi';

export default function PublicPageTask({ task }) {

    const [isPastDue, setIsPastDue] = useState(false);

    const priorityColor = {
        'LOW PRIORITY': '#63C05B',
        'MODERATE PRIORITY': '#18B0FF',
        'HIGH PRIORITY': '#FF2473',
    };

    useEffect(() => {
        try {
            const now = new Date();
            const dueDateObj = new Date(task.due_date);

            setIsPastDue(dueDateObj < now);
            console.log(isPastDue)
        } catch (error) {
            console.error(error)
        }

    }, [task]);

    const formatDueDate = (dueDate) => {
        // Create a new Date object from the ISO 8601 string
        const date = new Date(dueDate);

        // Get month name (lowercase) and date
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();

        // Format the day with ordinal suffix (st, nd, rd, th)
        const suffix = ['st', 'nd', 'rd'][Math.min(day % 10 - 1, 3)] || 'th';

        // Return the formatted string
        return `${month} ${day}${suffix}`;

    }

    return (
        <div className={styles.card}>

            <div style={{ display: 'flex' }}>
                <span
                    className={styles.priorityDot}
                    style={{ backgroundColor: 'red' }}
                ></span>
                <div className={styles.priorityName}>{task.priority}</div>
            </div>

            <p className={styles.titleName}>{task.title}</p>

            <div className={styles.checkListHeader}>
                <p className={styles.checklistName}>Checklist {task.todos.filter((t) => t.completed == true).length}/{task.todos.length}</p>
            </div>

            <div className={styles.todoContainer}>

                {task.todos.map((todo, idx) => {
                    return <div key={idx} className={styles.todoItem}>

                        <div style={{ display: 'flex' }}>
                            <div style={{
                                backgroundColor: todo.completed ? '#17A2B8' : 'white',
                                border: todo.completed ? 'none' : '1px solid black',
                            }} className={styles.customCheckBox}>
                                <PiCheckBold color='white' />
                            </div>
                            <p>{todo.todo}</p>
                        </div>
                    </div>
                })}
            </div>


            <div className={styles.dateAndSection}>

                {task.due_date ? <p className={styles.dueDate}>Due Date</p> : <p></p>}


                {task.due_date ? <div
                    className={`${styles.dueDateContainer} ${styles.isPastDue} `}
                    style={{ display: 'flex', }}
                >
                    <p>
                        {formatDueDate(task.due_date)}
                    </p>

                </div> : <p></p>}

            </div>
        </div>
    )
}


