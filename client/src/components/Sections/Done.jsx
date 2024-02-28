import React from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";
import { useTasks } from '../../providers/taskProvider';
import TaskCard from '../Dashboard/TaskCard/TaskCard';

export default function Done() {
  const { done } = useTasks();

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.sectionName} >Done</h1>
        <VscCollapseAll className={styles.collapseIcon} />
      </div>

      <div style={{ overflowY: 'auto', maxHeight: '72vh' }}>
        {done.map((task, idx) => {
          return <TaskCard
            key={idx}
            title={task.title}
            priority={task.priority}
            section={task.section}
            date={task.due_date}
            todos={task.todos}
          />
        })}
      </div>
    </div>
  )
}


