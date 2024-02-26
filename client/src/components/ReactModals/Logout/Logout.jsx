import React from 'react'
import styles from './Logout.module.css'
import { useAuth } from '../../../providers/authProvider';

export default function Logout({ closeLogout }) {
    const { logout } = useAuth();

    const handleSubmit = () => {
        logout();
    };

    return (
        <div className= {styles.modalBackground}>
            <div className= {styles.modalContainer}>
                <p className= {styles.confirm}>Are you sure you want to Logout?</p>
                <div className={styles.actionButton}>
                    <button onClick= {handleSubmit} className={styles.saveButton}>Yes, Logout</button>
                    <button className= {styles.cancelButton} onClick={() => closeLogout(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


