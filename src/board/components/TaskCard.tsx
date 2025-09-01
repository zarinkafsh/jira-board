import {useState, type KeyboardEvent, type MouseEvent} from "react";
import type {TaskCardProps} from "../../types";

const TaskCard = ({task, onDelete, onEdit}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task?.title);

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    onDelete(task?.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task?.title);
  };

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== task?.title) {
      onEdit(task?.id, editTitle);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task?.title);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleDoubleClick = () => {
    handleEdit();
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target?.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="flex-1 text-sm font-medium text-gray-900 border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        ) : (
          <h3
            className="text-sm font-medium text-gray-900 flex-1 pr-2 cursor-text"
            onDoubleClick={handleDoubleClick}
            title="Double-click to edit"
          >
            {task?.title}
          </h3>
        )}

        <div className="flex items-center gap-1">
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-blue-500 p-1 cursor-pointer"
              title="Edit task"
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
          )}

          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-700 p-1"
                title="Save changes"
                type="button"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 p-1"
                title="Cancel editing"
                type="button"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1 cursor-pointer"
              title="Delete task"
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
