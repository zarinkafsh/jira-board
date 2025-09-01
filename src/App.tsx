import "./App.css"
import {TaskProvider} from "./context/TaskContext"
import JiraBoard from "./board/pages/JiraBoard"

function App() {
  return (
    <TaskProvider>
      <JiraBoard/>
    </TaskProvider>
  )
}

export default App