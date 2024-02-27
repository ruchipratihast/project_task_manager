import React from 'react'
import styles from './More.module.css'
import { useAuth } from '../../../providers/authProvider';
import { useTasks } from '../../../providers/taskProvider';
import { toast } from 'react-toastify';

export default function More({ closeMore }) {
    const { user } = useAuth();
    const { deleteTask } = useTasks();

    const handleDelete = () => {
        
    };

    return (
        <div className= {styles.modalBackground}>
            <div className= {styles.modalContainer}>
                <button><p className= {styles.confirm}>Edit</p></button>
                <button><p className= {styles.confirm}>Share</p></button>
                <button onClick={handleDelete}><p className= {styles.confirm}>Delete</p></button>
            </div>
        </div>
    )
}


