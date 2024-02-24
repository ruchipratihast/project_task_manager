import { React, useState } from 'react';
import styles from './AddTodo.module.css';
import deleteicon from "../../assets/icons/Delete.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTodo({ closeModel }) {
    const [title, setTitle] = useState("");
    const [selectedPriority, setSelectedPriority] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [checklist, setChecklist] = useState([]);
    const [checkedChecklist, setCheckedChecklist] = useState([]);

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleAddChecklistItem = () => {
        setChecklist([...checklist, ""]);
    };

    const handleDeleteChecklistItem = (index) => {
        const updatedChecklist = [...checklist];
        updatedChecklist.splice(index, 1);
        setChecklist(updatedChecklist);
    };

    const handleCheckItem = (index) => {
        const updatedCheckedChecklist = [...checkedChecklist];
        updatedCheckedChecklist[index] = !updatedCheckedChecklist[index];
        setCheckedChecklist(updatedCheckedChecklist);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create task object with input values
        const taskData = {
            title,
            selectedPriority,
            dueDate,
            checklist,
        };

        console.log(taskData)
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.body}>
                    <label>Title <span style={{ color: '#FF0000' }}>*</span></label>
                    <input
                        className={styles.inputField}
                        type="text"
                        name='title'
                        value={title}
                        placeholder="Enter Task Title"
                        onChange={handleChange}
                        required={true}
                    />
                    
                    <div className={styles.formGroupPriority}>
                    <label>Select Priority <span style={{ color: '#FF0000' }}>*</span></label>
                        <div className={styles.priorityContainer}>
                            <div
                                className={`${styles.priorityOption} ${selectedPriority === "HIGH PRIORITY" ? styles.selected : ""
                                    }`}
                                onClick={() => setSelectedPriority("HIGH PRIORITY")}
                            >
                                <span
                                    className={styles.priorityDot}
                                    style={{ backgroundColor: "#FF2473" }}
                                ></span>{" "}
                                HIGH PRIORITY
                            </div>
                            <div
                                className={`${styles.priorityOption} ${selectedPriority === "MODERATE PRIORITY" ? styles.selected : ""
                                    }`}
                                onClick={() => setSelectedPriority("MODERATE PRIORITY")}
                            >
                                <span
                                    className={styles.priorityDot}
                                    style={{ backgroundColor: "#18B0FF" }}
                                ></span>{" "}
                                MODERATE PRIORITY
                            </div>
                            <div
                                className={`${styles.priorityOption} ${selectedPriority === "LOW PRIORITY" ? styles.selected : ""
                                    }`}
                                onClick={() => setSelectedPriority("LOW PRIORITY")}
                            >
                                <span
                                    className={styles.priorityDot}
                                    style={{ backgroundColor: "#63C05B" }}
                                ></span>{" "}
                                LOW PRIORITY
                            </div>
                        </div>
                    </div>

                    {/* checklist */}
                    <div className={styles.formGroupChecklist}>
                        <label>
                            Checklist ({checkedChecklist.filter(Boolean).length}/
                            {checklist.length})<span style={{ color: '#FF0000' }}> *</span>
                        </label>
                        <div>
                            {checklist.map((item, index) => (
                                <li key={index} className={styles.checklistitems}>
                                    <input
                                        type="checkbox"
                                        checked={checkedChecklist[index]}
                                        id={checkedChecklist[index] ? styles.checked : ''}
                                        onChange={() => handleCheckItem(index)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Add a task"
                                        value={item}
                                        onChange={(e) => {
                                            const newList = [...checklist];
                                            newList[index] = e.target.value;
                                            setChecklist(newList);
                                        }}
                                    />
                                    <span
                                        className={styles.deleteIcon}
                                        onClick={() => handleDeleteChecklistItem(index)}
                                    >
                                        <img src={deleteicon} alt="delete" />
                                    </span>
                                </li>
                            ))}

                            <button onClick={handleAddChecklistItem} className={styles.addTodoButton}>
                                <p className={styles.addNew}>
                                    <span style={{ fontSize: "18px" }}>+</span> Add New
                                </p>
                            </button>
                        </div>

                    </div>
                </div>

                <div className={styles.footer}>
                    {/* <input
                        className={styles.dueDateButton}
                        type="date"
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select Due Date"
                    /> */}

                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select Due Date"
                        className={styles.datePicker}
                    // customInput={<input type="date" />}
                    />
                    <div className={styles.actionButton}>
                        <button className={styles.cancelButton} onClick={() => closeModel(false)}>Cancel</button>
                        <button onClick={handleSubmit} className={styles.saveButton}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
