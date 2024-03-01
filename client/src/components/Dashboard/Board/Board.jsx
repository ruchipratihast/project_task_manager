import { React, useEffect, useState } from 'react'
import styles from './Board.module.css'
import Backlog from '../../Sections/Backlog';
import Todo from '../../Sections/Todo';
import InProgress from '../../Sections/InProgress';
import Done from '../../Sections/Done';
import { useAuth } from "../../../providers/authProvider";
import { useTasks } from '../../../providers/taskProvider';
import moment from 'moment';

export default function Dashboard() {
  const { user } = useAuth();
  const { getFilteredTasks } = useTasks();

  const currentDate = moment().format('Do MMM, YYYY');

  const handleSelect = async (event) => {
    console.log(event.target.value)
    getFilteredTasks(event.target.value)
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerH1}> Welcome! {user.name}</h1>
        <p className={styles.headerP}>{currentDate}</p>
      </div>

      <div className={styles.childHeadContainer}>
        <h1 className={styles.boardName}>Board</h1>

        <select className={styles.dropdownContainer} onChange={handleSelect} >
          <option className={styles.dropdownContent} value="today">Today</option>
          <option className={styles.dropdownContent} value="thisWeek">This Week</option>
          <option className={styles.dropdownContent} value="thisMonth">This Month</option>
        </select>
      </div>

      <div className={styles.sectionContainer}>
        <Backlog />
        <Todo />
        <InProgress />
        <Done />
      </div>

    </div>
  )
}
