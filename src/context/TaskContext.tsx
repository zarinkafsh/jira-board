import {createContext, useContext, useState, useEffect} from "react";
import type {ReactNode} from "react";
import type {Task, TaskContextType, GroupedTasks} from "../types";
import mockData from "../data/mockData.json";
import TaskWorker from "../workers/taskWorker?worker";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const groupTasks = (tasks: Task[]): GroupedTasks => {
  return {
    todo: tasks.filter(item => item.status === "todo"),
    inProgress: tasks.filter(item => item.status === "inProgress"),
    done: tasks.filter(item => item.status === "done")
  };
}

export const TaskProvider = ({children}: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    setTasks(mockData as Task[]);
    setFilteredTasks(mockData as Task[]);
  }, []);

  useEffect(() => {
    if (typeof Worker === "undefined") return;
    const w = new TaskWorker();
    w.onmessage = (e) => {
      if (e.data.type === "search") {
        setFilteredTasks(e.data.data);
      }
    };
    setWorker(w);
    return () => w.terminate();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTasks(tasks);
      return;
    }
    console.log(searchTerm)
    if (worker) {
      worker.postMessage({type: "search", tasks, searchTerm});
    } else {
      const filtered = tasks.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredTasks(filtered);
    }
  }, [searchTerm, worker, tasks]);


  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(item => item.id === taskId ? {...item, status: newStatus} : item));
    
    if (searchTerm.trim()) {
      console.log(`Also updating filtered tasks for search mode`);
      setFilteredTasks(prev => prev.map(item => item.id === taskId ? {...item, status: newStatus} : item));
    }
  };
  const addTask = (title: string) => {
    const newTask = {id: Date.now().toString(), title: title.trim(), status: "todo" as const};
    setTasks(prev => [newTask, ...prev]);
    
    if (searchTerm.trim() && newTask.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      setFilteredTasks(prev => [newTask, ...prev]);
    }
  };
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(item => item.id !== taskId));
    
    setFilteredTasks(prev => prev.filter(item => item.id !== taskId));
  };
  const editTask = (taskId: string, newTitle: string) => {
    const newTitleTrimmed = newTitle.trim();
    setTasks(prev => prev.map(item => item.id === taskId ? {...item, title: newTitleTrimmed} : item));
    
    if (searchTerm.trim()) {
      setFilteredTasks(prev => {
        const updated = prev.map(item => item.id === taskId ? {...item, title: newTitleTrimmed} : item);
        if (!newTitleTrimmed.toLowerCase().includes(searchTerm.toLowerCase())) {
          return updated.filter(item => item.id !== taskId);
        }
        return updated;
      });
    }
  };

  const groupedTasks = groupTasks(tasks);
  const groupedFilteredTasks = groupTasks(filteredTasks);

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      groupedTasks,
      groupedFilteredTasks,
      searchTerm,
      updateTaskStatus,
      setSearchTerm,
      addTask,
      deleteTask,
      editTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};