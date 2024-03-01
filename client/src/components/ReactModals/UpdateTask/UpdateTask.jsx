import { React, useEffect, useState } from 'react';
import styles from '../AddTodo/AddTodo.module.css';
import deleteicon from "../../../assets/icons/Delete.png";
import DatePicker from 'react-datepicker';
import { useTasks } from '../../../providers/taskProvider';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';

export default function UpdateTask({ closeUpdate, taskId, oldTitle, OldPriority, oldSection, oldDate, oldTodos }) {
    const [title, setTitle] = useState(oldTitle);
    const [selectedPriority, setSelectedPriority] = useState(OldPriority);
    const [dueDate, setDueDate] = useState(oldDate);
    const [checklist, setChecklist] = useState(oldTodos);

    const [todos, setTodos] = useState(oldTodos);

    const { updateTask } = useTasks();

    const updateTodo = (index, id, todo, completed) => {
        if (index < 0 || index >= todos.length) {
            return 'Invalid index';
        }

        const newTodos = [...todos];
        newTodos[index] = { id, todo, completed };
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        if (index < 0 || index >= todos.length) {
            return 'Invalid index';
        }

        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleAddChecklistItem = () => {
        setChecklist([...checklist, ""]);
        setTodos([...todos, { todo: '', completed: false }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title == "") {
            return toast.error("Please add title!");
        }

        if (selectedPriority == "") {
            return toast.error("Please select priority!");
        }

        if (todos.length == 0) {
            return toast.error("Please add atleast one todo!");
        }
        if (todos[0].todo == "") {
            return toast.error("Please add todo!");
        }
        await updateTask(taskId, title, selectedPriority, dueDate, oldSection, todos);
        closeUpdate(false);
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.body}>
                    <label>Title <span style={{ color: '#FF0000' }}>*</span></label>
                    <input
                        className={styles.inputField}
                        type="text"
                        name={title}
                        value={title}
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
                    <div style={{ overflowY: 'auto', maxHeight: '26vh' }} className={styles.formGroupChecklist}>
                        <label>
                            Checklist ({todos.filter(todo => todo.completed).length}/
                            {todos.length})<span style={{ color: '#FF0000' }}> *</span>
                        </label>
                        <div>

                            {todos.map((todo, index) => (
                                <div key={index} className={styles.checklistitems}>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={(e) => updateTodo(index, todo.id, todo.todo, e.target.checked)}
                                    />
                                    <input
                                        type="text"
                                        name={todo.todo}
                                        value={todo.todo}
                                        onChange={(e) => updateTodo(index, todo.id, e.target.value, todo.completed)}
                                    />
                                    <span
                                        className={styles.deleteIcon}
                                        onClick={() => deleteTodo(index)}
                                    >
                                        <img src={deleteicon} alt="delete" />
                                    </span>
                                </div>
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
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select Due Date"
                        className={styles.datePicker}
                    />
                    <div className={styles.actionButton}>
                        <button className={styles.cancelButton} onClick={() => closeUpdate(false)}>Cancel</button>
                        <button onClick={handleSubmit} className={styles.saveButton}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

