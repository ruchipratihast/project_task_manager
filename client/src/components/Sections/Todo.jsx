import { React, useEffect, useState } from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import AddTodo from '../ReactModals/AddTodo/AddTodo';
import { useTasks } from '../../providers/taskProvider';
import TaskCard from '../Dashboard/TaskCard/TaskCard';

export default function Todo() {
  const [openAddTodo, setOpenAddTodo] = useState(false);

  const { todo } = useTasks();

  const [globalCollapse, setGlobalCollapse] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.sectionName} >To do</h1>
        <div style={{ display: "flex" }}>
          <button
            className={styles.addButton}
            onClick={() => {
              setOpenAddTodo(true);
            }}
          >
            <IoMdAdd className={styles.collapseIcon} style={{ marginRight: '18px' }} />
          </button>
          <VscCollapseAll onClick={() => setGlobalCollapse(!globalCollapse)} className={styles.collapseIcon} />
        </div>
      </div>
      {openAddTodo ? <AddTodo closeModel={setOpenAddTodo} /> : <></>}

      <div style={{ overflowY: 'auto', maxHeight: '72vh' }}>
        {todo.map((task, i) => {
          return <TaskCard
            key={i}
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

