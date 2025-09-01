export type Task = {
  id: string;
  title: string;
  status: "todo" | "inProgress" | "done";
};

export type GroupedTasks = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};

export type TaskContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  groupedTasks: GroupedTasks;
  groupedFilteredTasks: GroupedTasks;
  searchTerm: string;
  updateTaskStatus: (taskId: string, newStatus: Task["status"]) => void;
  setSearchTerm: (term: string) => void;
  addTask: (title: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newTitle: string) => void;
};

export type ColumnProps = {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onDrop: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string) => void;
};

export type TaskCardProps = {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newTitle: string) => void;
};
