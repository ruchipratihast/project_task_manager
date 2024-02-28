import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { url } from "../config";
import { useAuth } from "./authProvider";
import { toast } from 'react-toastify';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const [backlog, setBacklog] = useState([]);
    const [todo, setTodo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);

    const [lowPriority, setLowPriority] = useState(0);
    const [highPriority, setHighPriority] = useState(0);
    const [moderatePriority, setModeratePriority] = useState(0);

    const [allDueDate, setAllDueDate] = useState(0);

    function filterAndSetTasks(tasks) {
        setTasks(tasks);
        setBacklog(tasks.filter(task => task.section === "Backlog"));
        setTodo(tasks.filter(task => task.section === "Todo"));
        setInProgress(tasks.filter(task => task.section === "In Progress"));
        setDone(tasks.filter(task => task.section === "Done"));

        setLowPriority(tasks.filter(task => task.priority === "LOW PRIORITY").length);
        setModeratePriority(tasks.filter(task => task.priority === "MODERATE PRIORITY").length);
        setHighPriority(tasks.filter(task => task.priority === "HIGH PRIORITY").length);

        setAllDueDate(tasks.filter(task => task.due_date !== null).length);
    }

    async function getAllTasks() {
        setLoading(true);
        try {
            var { data } = await axios.get(`${url}/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            filterAndSetTasks(data);
            setLoading(false);
        } catch (error) {
            return "err";
        }
    }

    async function addTask(title, dueDate, selectedPriority, todos) {
        setLoading(true);
        console.log(token)
        try {
            var { data } = await axios.post(`${url}/tasks`, {
                title,
                dueDate,
                selectedPriority,
                todos
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                }
            );
            console.log(data);
            setLoading(false);
        } catch (error) {
            return "err";
        }
    }

    async function deleteTask(taskId) {
        setLoading(true);
        console.log(token)
        try {
            var { data } = await axios.delete(`${url}/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                }
            );
            console.log(data);
            setLoading(false);
            return toast.success("Task deleted successfully !");
        } catch (error) {
            return "err";
        }
    }

    useEffect(() => {
        getAllTasks();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            loading,
            tasks,
            backlog,
            todo,
            inProgress,
            done,
            lowPriority,
            highPriority,
            moderatePriority,
            allDueDate,
            getAllTasks,
            addTask,
            deleteTask,
        }),
        [getAllTasks] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};

export default TaskProvider;