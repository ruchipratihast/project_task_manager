import { React, useState } from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import AddTodo from '../ReactModals/AddTodo';

export default function Todo() {
  const [openAddTodo, setOpenAddTodo] = useState(false);

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
    </div>
  )
}

