import React, { useState } from 'react'
import styles from './More.module.css'
import { useAuth } from '../../../providers/authProvider';
import { useTasks } from '../../../providers/taskProvider';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';

export default function More({ closeMore, id }) {
    const [isDelete, setIsDelete] = useState(false);
    const { user } = useAuth();
    const { deleteTask } = useTasks();

    return (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    <div className={styles.rowContainer}>
                        <button className={styles.actionButton}><p className={styles.actionName}>Edit</p></button>
                        <button className={`${styles.actionButton} ${styles.crossButton}`} onClick={() => closeMore(false)}><p className={styles.actionName}>☓</p></button>
                    </div>
                    <button className={styles.actionButton}><p className={styles.actionName}>Share</p></button>
                    <button className={styles.actionButton}
                        onClick={() => setIsDelete(true)}
                    >
                        <p className={styles.delete}>Delete</p>
                    </button>
                </div>
            </div>
            {isDelete ? <ConfirmDelete closeMore={closeMore} closeDelete={setIsDelete} id={id} /> : <></>}
        </>
    )
}


