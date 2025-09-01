import type {Task} from "../types";

self.onmessage = (e: Record<any, any>) => {
  const tasks = e.data.tasks;
  const {type, searchTerm} = e.data;

  if (type === "search") {
    if (!searchTerm || !searchTerm.trim()) {
      self.postMessage({type: "search", data: tasks});
      return;
    }

    const query = searchTerm.toLowerCase();
    const filtered = tasks.filter((task: Task) =>
      task.title.toLowerCase().includes(query)
    );
    self.postMessage({type: "search", data: filtered});
    return;
  }

  if (type === "group") {
    self.postMessage({
      type: "group",
      data: {
        todo: tasks.filter((task: Task) => task.status === "todo"),
        inProgress: tasks.filter((task: Task) => task.status === "inProgress"),
        done: tasks.filter((task: Task) => task.status === "done")
      }
    });
    return;
  }

  self.postMessage({error: "Unknown operation type"});
};
  
