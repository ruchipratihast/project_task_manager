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

    const [lowPriority, setlowPriority] = useState(0);
    const [moderatePriority, setModeratePriority] = useState(0);
    const [highPriority, sethighPriority] = useState(0);
    const [dueDateTasks, setdueDateTasks] = useState(0);

    function filterAndSetTasks(tasks) {
        setTasks(tasks);
        setBacklog(tasks.filter(task => task.section === "Backlog"));
        setTodo(tasks.filter(task => task.section === "Todo"));
        setInProgress(tasks.filter(task => task.section === "In Progress"));
        setDone(tasks.filter(task => task.section === "Done"));
    }



    async function getAllTasks() {
        setLoading(true);
        try {
            var { data } = await axios.get(`${url}/tasks`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                });
            console.log(data);
            filterAndSetTasks(data);
            setLoading(false);
        } catch (error) {
            return "err";
        }
    }


    async function addTask(title, dueDate, selectedPriority, todos) {
        setLoading(true);
        try {
            var { data } = await axios.post(`${url}/tasks`, {
                title,
                dueDate,
                selectedPriority,
                todos,
                headers: {
                        Authorization: 'Bearer ' + token
                         },
                
            });

            // setLoading(false);
        } catch (error) {
            return "err";
        }
    }

    async function deleteTask(id) {
        setLoading(true);
        try {
            var { data } = await axios.post(`${url}/tasks/${id}`, {
                headers: {
                        Authorization: 'Bearer ' + token
                         },
                
            });
            console.log(data);
            setLoading(false);
            toast.success("Task Deleted successfully !");
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
            getAllTasks,
            addTask,
            deleteTask,
        }),
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};

export default TaskProvider;