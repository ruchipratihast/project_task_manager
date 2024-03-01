import React, { useState } from 'react'
import styles from '../../ReactModals/More/More.module.css'
import { useAuth } from '../../../providers/authProvider';
import { useTasks } from '../../../providers/taskProvider';
import Modal from 'react-modal';
import { Popover } from 'react-tiny-popover'
import ConfirmDelete from '../../ReactModals/ConfirmDelete/ConfirmDelete';
import UpdateTask from '../../ReactModals/UpdateTask/UpdateTask';
import { TfiMoreAlt } from 'react-icons/tfi';
import { toast } from 'react-toastify';


export default function MorePopup({ id, title, priority, section, date, todos }) {


    const [isPopoverOpen, setIsPopoverOpen] = useState(false);


    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { user } = useAuth();
    const { deleteTask } = useTasks();
    const [modalIsOpen, setIsOpen] = useState(false);

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


    function copyTextToCB(id) {
        let texttocopy = "http://promanage.sunderjobs.com/tasks/" + id;

        navigator.clipboard.writeText(texttocopy);

        // Alert the copied text
        toast.success("Link Copied to Clipboard");
    }

    return (
        <>
            <Popover
                isOpen={isPopoverOpen}
                positions={['bottom']}
                onClickOutside={() => setIsPopoverOpen(false)}
                content={
                    <>

                        <div className={styles.modalBackground}>
                            <div className={styles.modalContainer}>
                                <div className={styles.rowContainer}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => {
                                            setIsOpen(true);
                                            setIsPopoverOpen(false);
                                        }}
                                    >
                                        <p className={styles.actionName}>Edit</p>
                                    </button>
                                </div>
                                <button onClick={() => {
                                    copyTextToCB(id)
                                    setIsPopoverOpen(false);

                                }} className={styles.actionButton}><p className={styles.actionName}>Share</p></button>

                                <button className={styles.actionButton}
                                    onClick={() => {
                                        setIsDelete(true)
                                    }}
                                >
                                    <p className={styles.delete}>Delete</p>
                                </button>
                            </div>
                        </div>

                        {isDelete ? <ConfirmDelete closeMore={setIsOpen} closeDelete={setIsDelete} id={id} /> : <></>}

                    </>
                }
            >
                <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                    <TfiMoreAlt className={styles.moreButton} />
                </div>
            </Popover>

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <UpdateTask
                    closeUpdate={setIsOpen}
                    taskId={id}
                    oldTitle={title}
                    OldPriority={priority}
                    oldSection={section}
                    oldDate={date}
                    oldTodos={todos}
                />
            </Modal>

        </>
    )
}
