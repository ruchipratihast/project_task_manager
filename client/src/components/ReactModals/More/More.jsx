// import React, { useState } from 'react'
// import styles from './More.module.css'
// import { useAuth } from '../../../providers/authProvider';
// import { useTasks } from '../../../providers/taskProvider';
// import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
// import UpdateTask from '../UpdateTask/UpdateTask';

// export default function More({ closeMore, id, title, priority, section, date, todos }) {
//     const [isDelete, setIsDelete] = useState(false);
//     const [isUpdate, setIsUpdate] = useState(false);
//     const { user } = useAuth();
//     const { deleteTask } = useTasks();

//     return (
//         <>
//             <div className={styles.modalBackground}>
//                 <div className={styles.modalContainer}>
//                     <div className={styles.rowContainer}>
//                         <button
//                             className={styles.actionButton}
//                             onClick={() => setIsUpdate(true)}
//                         >
//                             <p className={styles.actionName}>Edit</p>
//                         </button>
//                         <button
//                             className={`${styles.actionButton} ${styles.crossButton}`}
//                             onClick={() => closeMore(false)}
//                         >
//                             <p className={styles.actionName}>☓</p>
//                         </button>
//                     </div>
//                     <button className={styles.actionButton}><p className={styles.actionName}>Share</p></button>
//                     <button className={styles.actionButton}
//                         onClick={() => setIsDelete(true)}
//                     >
//                         <p className={styles.delete}>Delete</p>
//                     </button>
//                 </div>
//             </div>
//             {isDelete ? <ConfirmDelete closeMore={closeMore} closeDelete={setIsDelete} id={id} /> : <></>}
//             {isUpdate ?
//                 <UpdateTask
//                     closeUpdate={setIsUpdate}
//                     taskId={id}
//                     oldTitle={title}
//                     OldPriority={priority}
//                     oldSection={section}
//                     oldDate={date}
//                     oldTodos={todos}
//                 />
//                 : <></>}
//         </>
//     )
// }


import React, { useState } from 'react'
import styles from './More.module.css'
import { useAuth } from '../../../providers/authProvider';
import { useTasks } from '../../../providers/taskProvider';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import UpdateTask from '../UpdateTask/UpdateTask';
import Modal from 'react-modal';


export default function More({ closeMore, id, title, priority, section, date, todos }) {


    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { user } = useAuth();
    const { deleteTask } = useTasks();
    const [modalIsOpen, setIsOpen] = React.useState(false);


    const customStyles = {
        content: {
            top: '20%',
            left: '35%',
            right: '35%',
            bottom: '5%',
            border: 'none',
            overflow: 'hidden',
        },
    };


    return (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    <div className={styles.rowContainer}>
                        <button
                            className={styles.actionButton}
                            onClick={() => {
                                closeMore(true);
                                setIsOpen(true);
                            }}
                        >
                            <p className={styles.actionName}>Edit</p>
                        </button>
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


            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <UpdateTask
                    closeUpdate={setIsUpdate}
                    taskId={id}
                    oldTitle={title}
                    OldPriority={priority}
                    oldSection={section}
                    oldDate={date}
                    oldTodos={todos}
                />
            </Modal>

            {/* {isUpdate ?
                <UpdateTask
                    closeUpdate={setIsUpdate}
                    taskId={id}
                    oldTitle={title}
                    OldPriority={priority}
                    oldSection={section}
                    oldDate={date}
                    oldTodos={todos}
                />
                : <></>} */}
        </>
    )
}


