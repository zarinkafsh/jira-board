import {type DragEvent} from "react";
import type {ColumnProps} from "../../types";
import {TaskCard} from "../components";

const Column = ({title, status, tasks, onDrop, onDelete, onEdit}: ColumnProps) => {
  const visibleTasks = tasks.filter(Boolean);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onDrop(taskId, status);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 border-gray-300";
      case "inProgress":
        return "bg-blue-100 border-blue-300";
      case "done":
        return "bg-green-100 border-green-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo":
        return (
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        );
      case "inProgress":
        return (
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      case "done":
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div className={`p-4 rounded-lg border-2 ${getStatusColor(status)}`}>
        <div className="flex items-center gap-2 mb-4">
          {getStatusIcon(status)}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
            {tasks?.length}
          </span>
        </div>
        <div
          className="space-y-3 min-h-[200px] max-h-[400px] overflow-y-auto"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {(visibleTasks || []).map((task) => (
            <div
              key={task?.id}
              draggable
              onDragStart={(e) => {
                console.log(`Starting drag for task ${task?.id}`);
                e.dataTransfer.setData("text/plain", task?.id);
              }}
            >
              <TaskCard task={task} onDelete={onDelete} onEdit={onEdit}/>
            </div>
          ))}
          {tasks?.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <p className="mt-2 text-sm">No tasks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Column;