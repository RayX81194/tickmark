import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const tasksRef = useRef([]);

  useEffect(() => {
    // Initialize tasks from useRef
    setTasks(tasksRef.current);
  }, []);

  useEffect(() => {
    // Update useRef when tasks state changes
    tasksRef.current = tasks;
  }, [tasks]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleAdd = () => {
    if (task.trim()) {
      const newTasks = [...tasks, { text: task, isCompleted: false }];
      setTasks(newTasks);
      setTask('');
    }
  };

  const handleEdit = (index) => {
    const newTask = prompt('Edit task:', tasks[index].text);
    if (newTask !== null) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleCheckbox = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="flex flex-col gap-y-5 items-center justify-center pt-10">
        <div className="border border-yellow-300 mx-auto px-10 py-10 gap-y-3 flex flex-col items-start justify-start">
          <h1 className="text-yellow-300 font-bold text-3xl">
            <span className='transition-all duration-75 relative top-1 hover:top-0'>T</span>
            <span className='transition-all duration-75 relative top-1 hover:top-0'>i</span>
            <span className='transition-all duration-75 relative top-1 hover:top-0'>c</span>
            <span className='transition-all duration-75 relative top-1 hover:top-0'>k</span>
            <span className='transition-all duration-75 relative top-1 hover:top-0'>M</span>
            <span className='transition-all duration-75 relative top-1 hover:top-0'>a</span>
            <span className='transition-all duration-75 relative top-1 hover:top-0'>r</span>
            <span className='transition-all duration-75 relative top-1 hover:top-0'>k</span>
          </h1>
          <div className="flex gap-x-2">
            <input
              type="text"
              className='placeholder-yellow-300 w-[33rem] rounded-sm h-[3rem] px-2 border border-yellow-300 text-yellow-300'
              name="task"
              placeholder='Enter your task...'
              value={task}
              onChange={handleChange}
            />
            <button onClick={handleAdd} className='border border-yellow-300 font-bold text-yellow-300 rounded-sm px-4'>
              Add
            </button>
          </div>
          <h1 className='text-yellow-300 font-bold text-2xl'>Your List</h1>
          {tasks.map((taskItem, index) => (
            <div key={index} className='flex items-center justify-between w-full'>
              <div className='flex gap-x-3 items-center'>
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={taskItem.isCompleted}
                    onChange={() => handleCheckbox(index)}
                  />
                  <span className="checkbox-custom"></span>
                </label>
                <p className={`${taskItem.isCompleted ? "line-through" : ""} text-yellow-300 text-2xl max-w-[300px] ml-2`}>
                  {taskItem.text}
                </p>
              </div>
              <div className='flex gap-x-2'>
                <button onClick={() => handleEdit(index)} className='border border-yellow-300 text-yellow-300 rounded-sm px-2'>
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} className='border border-yellow-300 text-yellow-300 rounded-sm px-2'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <h1 className='font-normal text-xl text-yellow-300'>Made by <a href="https://github.com/RayX81194/"><span className='underline font-bold transition-all relative top-0 hover:-top-1'>Ray </span></a></h1>
      </div>
    </>
  );
}

export default App;
