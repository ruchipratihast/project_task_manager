import React from 'react'
import styles from '../Logout/Logout.module.css'
import { useTasks } from '../../../providers/taskProvider';

export default function ConfirmDelete({ closeMore, closeDelete, id }) {
    const { deleteTask } = useTasks();

    const handleSubmit = async () => {
        await deleteTask(id);
        closeDelete(false);
        closeMore(false);
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <p className={styles.confirm}>Are you sure you want to Delete?</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <button onClick={handleSubmit} className={styles.saveButton}>Yes, Delete</button>
                    <button className={styles.cancelButton} onClick={() => closeDelete(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}



