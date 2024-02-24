import React from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";
import { useTasks } from '../../providers/taskProvider';
import TaskCard from '../Dashboard/TaskCard/TaskCard';

export default function Backlog() {

  const { backlog } = useTasks();

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.sectionName} >Backlog</h1>
        <VscCollapseAll className={styles.collapseIcon} />
      </div>

      {backlog.map((task, idx) => {
        return <TaskCard key={idx} title={task.title} priority={task.priority} section={task.section} date={task.date} todos={task.todos} />
      })}
    </div>
  )
}
