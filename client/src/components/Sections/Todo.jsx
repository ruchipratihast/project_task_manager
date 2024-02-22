import React from 'react';
import styles from './CommonSection.module.css'
import { VscCollapseAll } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";

export default function Todo() {
  return (
    <div className= {styles.container}>
      <div className= {styles.headingContainer}>
        <h1 className= {styles.sectionName} >To do</h1>
        <div style={{display: "flex"}}>
        <IoMdAdd className= {styles.collapseIcon} style={{marginRight: '18px'}} />
        <VscCollapseAll className= {styles.collapseIcon} />
        </div>
      </div>
    </div>
  )
}

