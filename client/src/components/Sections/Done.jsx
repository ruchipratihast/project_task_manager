import React from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";

export default function Done() {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.sectionName} >Done</h1>
        <VscCollapseAll className={styles.collapseIcon} />
      </div>
    </div>
  )
}


