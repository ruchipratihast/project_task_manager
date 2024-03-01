import React, { useEffect, useState } from 'react';
import styles from './PublicPage.module.css';
import logoImage from '../../assets/icons/logo.png'
import PublicPageTask from '../../components/PublicPageTask/PublicPageTask';
import { useParams } from 'react-router';
import axios from 'axios';
import { url } from '../../config';
import { toast } from 'react-toastify';

export default function PublicPage() {

    const { id } = useParams();
    const [tasks, setTasks] = useState(null);

    async function getTaskData() {
        try {
            var { data } = await axios.get(`${url}/tasks/${id}`,
            );
            console.log(data)
            try {
                setTasks(data[0]);
            } catch (error) {

            }
        } catch (error) {
            toast.error("Not Found")
            return "err";
        }

    }

    useEffect(() => {
        getTaskData();
    }, [])

    return (
        <>
            <div style={{ display: 'flex', height: '10vh', alignItems: 'center', marginLeft: '12px' }}>
                <img src={logoImage} className={styles.logoImage} />
                <p className={styles.appName}>Pro Manage</p>
            </div>

            <div style={{ display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center' }}>
                {tasks !== null ? <PublicPageTask task={tasks} /> : <p>Loading</p>}
            </div>

        </>
    )
}
