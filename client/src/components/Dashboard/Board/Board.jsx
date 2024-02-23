import { React, useState } from 'react'
import styles from './Board.module.css'
import Backlog from '../../Sections/Backlog';
import Todo from '../../Sections/Todo';
import InProgress from '../../Sections/InProgress';
import Done from '../../Sections/Done';

export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('Today');

  const options = [
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option.value);
    console.log(option.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerH1}>Welcome Kumar</h1>
        <p className={styles.headerP}>12th Jan 2024</p>
      </div>

      <div className={styles.childHeadContainer}>
        <h1 className={styles.boardName}>Board</h1>
        <select className={styles.dropdownContainer}>
          {options.map((option) => (
            <option key={option.value} className={styles.dropdownContent} onClick={() => handleSelect(option.value)}>
              {option.label}
            </option>
          ))}
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
