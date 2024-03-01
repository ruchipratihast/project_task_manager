import React, { useEffect, useState } from 'react'
import styles from './TaskCard.module.css'
import { PiCaretDown, PiCaretUp } from "react-icons/pi";
import { TfiMoreAlt } from "react-icons/tfi";
import More from '../../ReactModals/More/More';
import { useTasks } from '../../../providers/taskProvider';

export default function TaskCard({ id, title, priority, section, date, todos }) {

    const [isPastDue, setIsPastDue] = useState(false);
    const [isMore, setIsMore] = useState(false);

    const { changeSection } = useTasks();

    const priorityColor = {
        'LOW PRIORITY': '#63C05B',
        'MODERATE PRIORITY': '#18B0FF',
        'HIGH PRIORITY': '#FF2473',
    };

    useEffect(() => {
        const now = new Date();
        const dueDateObj = new Date(date);

        setIsPastDue(dueDateObj < now);
    }, []);

    const handleChangeSection = async (section) => {
        await changeSection(id, section);
    }

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
                <TfiMoreAlt onClick={() => setIsMore(true)} className={styles.moreButton} />
                {isMore ? <More
                    closeMore={setIsMore}
                    id={id}
                    title={title}
                    priority={priority}
                    section={section}
                    date={date}
                    todos={todos}
                /> : <></>}
            </div>

            <p className={styles.titleName}>{title}</p>

            <div className={styles.checkListHeader}>
                <p className={styles.checklistName}>Checklist {todos.filter((t) => t.completed == true).length}/{todos.length}</p>
                <div onClick={() => setIsExpanded(!isExpanded)} className={styles.collapseButton}>
                    {isExpanded ? <PiCaretDown className={styles.collapseIcon} /> : <PiCaretUp className={styles.collapseIcon} />}
                </div>
            </div>
            {isExpanded && todos.map((todo, idx) => {
                return <div key={idx} className={styles.todoItem}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        // style={{ 
                        //     backgroundColor: todo.completed? '#17A2B8' : 'transparent' 
                        //   }}
                        disabled />
                    <p>{todo.todo}</p>
                </div>
            })}

            <div className={styles.dateAndSection}>
                {date ? <div
                    className={`${styles.dueDateContainer} ${isPastDue ? styles.isPastDue : ""
                        } ${section == "Done" ? styles.isDone : ""
                        }`}
                >
                    {formatDueDate(date)}
                </div> : <p></p>}
                {section == "Done" ?
                    <div className={styles.sectionContainer}>
                        <button onClick={() => handleChangeSection("Backlog")} className={styles.sectionButton}>
                            <p className={styles.sectionName}>BACKLOG</p>
                        </button>
                        <button onClick={() => handleChangeSection("Todo")} className={styles.sectionButton}>
                            <p className={styles.sectionName}>TO-DO</p>
                        </button>
                        <button onClick={() => handleChangeSection("In Progress")} className={styles.sectionButton}>
                            <p className={styles.sectionName}>PROGRESS</p>
                        </button>
                    </div>
                    : section == "In Progress" ?
                        <div className={styles.sectionContainer}>
                            <button onClick={() => handleChangeSection("Backlog")} className={styles.sectionButton}>
                                <p className={styles.sectionName}>BACKLOG</p>
                            </button>
                            <button onClick={() => handleChangeSection("Todo")} className={styles.sectionButton}>
                                <p className={styles.sectionName}>TO-DO</p>
                            </button>
                            <button onClick={() => handleChangeSection("Done")} className={styles.sectionButton}>
                                <p className={styles.sectionName}>DONE</p>
                            </button>
                        </div>
                        : section == "Todo" ?
                            <bu className={styles.sectionContainer}>
                                <button onClick={() => handleChangeSection("Backlog")} className={styles.sectionButton}>
                                    <p className={styles.sectionName}>BACKLOG</p>
                                </button>
                                <button onClick={() => handleChangeSection("In Progress")} className={styles.sectionButton}>
                                    <p className={styles.sectionName}>PROGRESS</p>
                                </button>
                                <button onClick={() => handleChangeSection("Done")} className={styles.sectionButton}>
                                    <p className={styles.sectionName}>DONE</p>
                                </button>
                            </bu>
                            :
                            <div className={styles.sectionContainer}>
                                <button onClick={() => handleChangeSection("In Progress")} className={styles.sectionButton}>
                                    <p className={styles.sectionName}>PROGRESS</p>
                                </button>
                                <button onClick={() => handleChangeSection("Todo")} className={styles.sectionButton}>
                                    <p className={styles.sectionName}>TO-DO</p>
                                </button>
                                <button onClick={() => handleChangeSection("Done")} className={styles.sectionButton}>
                                    <p className={styles.sectionName}>DONE</p>
                                </button>
                            </div>
                }
            </div>

        </div>
    )
}


