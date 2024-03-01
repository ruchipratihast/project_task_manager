import React from 'react';
import styles from './PublicPage.module.css';
import logoImage from '../../assets/icons/logo.png'
import PublicPageTask from '../../components/PublicPageTask/PublicPageTask';

export default function PublicPage() {
    return (
        <div className={styles.container}>
            <div className={styles.leftConatiner}>
                <div className={styles.headingContainer}>
                    <img src={logoImage} className={styles.logoImage} />
                    <p className={styles.appName}>Pro Manage</p>
                </div>
            </div>
            <div className={styles.rightConatiner} ><PublicPageTask /></div>
        </div>
    )
}
