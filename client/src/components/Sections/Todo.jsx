import { React, useEffect, useState } from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import AddTodo from '../ReactModals/AddTodo/AddTodo';
import { useTasks } from '../../providers/taskProvider';
import TaskCard from '../Dashboard/TaskCard/TaskCard';

export default function Todo() {
  const [openAddTodo, setOpenAddTodo] = useState(false);

  const { tasks, todo } = useTasks();

  useEffect(() => {
    console.log(todo);
    console.log(tasks);
  }, [])

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
          <VscCollapseAll className={styles.collapseIcon} />
        </div>
      </div>
      {openAddTodo ? <AddTodo closeModel={setOpenAddTodo} /> : <></>}

      <div style={{ overflowY: 'auto', maxHeight: '72vh' }}>
        {todo.map((todo, i) => {
          return <TaskCard
            key={i}
            title={todo.title}
            priority={todo.priority}
            section={todo.section}
            date={todo.due_date}
            todos={todo.todos}
          />
        })}

      </div>
    </div>
  )
}

