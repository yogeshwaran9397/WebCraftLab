export default function TaskList({tasks, toggleTask, deleteTask}) {
    return <ul className="task-list">
        {tasks.map((task, index) => <li
        key={index} >
             <span onClick={() => toggleTask(task['id'])} className={ task['completed']==true && 'completed' } >{task['text']}</span> 
             <span onClick={() => deleteTask(task['id'])} className="delete">X</span>
        </li>)}
    </ul>
}