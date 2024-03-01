import React from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";
import { useTasks } from '../../providers/taskProvider';
import TaskCard from '../Dashboard/TaskCard/TaskCard';

export default function InProgress() {
  const { inProgress } = useTasks();

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.sectionName} >In Progress</h1>
        <VscCollapseAll className={styles.collapseIcon} />
      </div>

      <div style={{ overflowY: 'auto', maxHeight: '72vh' }}>
        {inProgress.map((task, idx) => {
          return <TaskCard
            key={idx}
            id={task._id}
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



