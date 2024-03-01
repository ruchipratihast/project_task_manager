import React, { useState } from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";
import { useTasks } from '../../providers/taskProvider';
import TaskCard from '../Dashboard/TaskCard/TaskCard';

export default function InProgress() {
  const { inProgress } = useTasks();

  const [globalCollapse, setGlobalCollapse] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.sectionName} >In Progress</h1>
        <VscCollapseAll onClick={() => setGlobalCollapse(!globalCollapse)} className={styles.collapseIcon} />
      </div>

      <div style={{ overflowY: 'auto', maxHeight: '72vh' }}>
        {inProgress.map((task, idx) => {
          return <TaskCard
            key={idx}
            id={task._id}
            globalCollapse={globalCollapse}
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



