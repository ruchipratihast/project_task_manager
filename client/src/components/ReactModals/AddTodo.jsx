import { React, useState } from 'react';
import styles from './AddTodo.module.css';
import deleteicon from "../../assets/icons/Delete.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTasks } from '../../providers/taskProvider';

export default function AddTodo({ closeModel }) {
    const [title, setTitle] = useState("");
    const [selectedPriority, setSelectedPriority] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [checklist, setChecklist] = useState([]);

    const [todos, setTodos] = useState([]);

    const { addTask } = useTasks();

    const updateTodo = (index, name, checked) => {
        if (index < 0 || index >= todos.length) {
            return 'Invalid index';
        }

        const newTodos = [...todos];
        newTodos[index] = { name, checked };
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
        setTodos([...todos, { name: '', checked: false }]);
    };

    // const handleDeleteChecklistItem = (index) => {
    //     const updatedChecklist = [...checklist];
    //     updatedChecklist.splice(index, 1);
    //     setChecklist(updatedChecklist);
    // };

    // const handleCheckItem = (index) => {
    //     const updatedCheckedChecklist = [...checkedChecklist];
    //     updatedCheckedChecklist[index] = !updatedCheckedChecklist[index];
    //     setCheckedChecklist(updatedCheckedChecklist);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(title, dueDate, selectedPriority, todos);
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
                    <div style={{ overflowY: 'auto', maxHeight: '26vh'}} className={styles.formGroupChecklist}>
                        <label>
                            Checklist ({todos.filter(todo => todo.checked).length}/
                            {todos.length})<span style={{ color: '#FF0000' }}> *</span>
                        </label>
                        <div>

                            {todos.map((todo, index) => (
                                <div key={index} className={styles.checklistitems}>
                                    <input
                                        type="checkbox"
                                        checked={todo.checked}
                                        onChange={(e) => updateTodo(index, todo.name, e.target.checked)}
                                    />
                                    <input
                                        type="text"
                                        placeholder= "Add a task"
                                        value={todo.name}
                                        onChange={(e) => updateTodo(index, e.target.value, todo.checked)}
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
                        <button className={styles.cancelButton} onClick={() => closeModel(false)}>Cancel</button>
                        <button onClick={handleSubmit} className={styles.saveButton}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
