import {type FC} from "react";
import {useTaskContext} from "../../context/TaskContext";
import {Column, SearchBar} from "../components";
import type {Task} from "../../types";

const JiraBoard: FC = () => {
  const {
    groupedTasks,
    groupedFilteredTasks,
    searchTerm,
    updateTaskStatus,
    deleteTask,
    editTask,
    tasks
  } = useTaskContext();

  const todoTasks = searchTerm.trim() ? groupedFilteredTasks.todo : groupedTasks.todo;
  const inProgressTasks = searchTerm.trim() ? groupedFilteredTasks.inProgress : groupedTasks.inProgress;
  const doneTasks = searchTerm.trim() ? groupedFilteredTasks.done : groupedTasks.done;

  const handleDrop = (taskId: string, newStatus: Task["status"]) => {
    updateTaskStatus(taskId, newStatus);
  };

  const isLoading = tasks.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Jira Board</h1>
        </div>
        <SearchBar/>
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-xl text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Column
              title="Todo"
              status="todo"
              tasks={todoTasks}
              onDrop={handleDrop}
              onDelete={deleteTask}
              onEdit={editTask}
            />
            <Column
              title="In Progress"
              status="inProgress"
              tasks={inProgressTasks}
              onDrop={handleDrop}
              onDelete={deleteTask}
              onEdit={editTask}
            />
            <Column
              title="Done"
              status="done"
              tasks={doneTasks}
              onDrop={handleDrop}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JiraBoard;
