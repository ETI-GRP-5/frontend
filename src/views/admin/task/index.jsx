import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskView = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showFormPopup, setShowFormPopup] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3028/api/tasks'); // Use port 3028
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3028/api/tasks', { // Use port 3028
        task_title: taskTitle,
        task_details: taskDetails
      });
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDetails('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3028/api/tasks/${id}`); // Use port 3028
      const updatedTasks = tasks.filter(task => task.task_id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <button
        onClick={() => setShowFormPopup(true)}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Create New Task
      </button>

      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Task</h2>
            <form onSubmit={createTask} className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <input
                  type="text"
                  id="taskTitle"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="p-3 w-96 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Task Title"
                  required
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <textarea
                  id="taskDetails"
                  value={taskDetails}
                  onChange={(e) => setTaskDetails(e.target.value)}
                  className="p-3 w-96 h-32 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Task Details"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Create Task
                </button>
                <button
                  onClick={() => setShowFormPopup(false)}
                  className="ml-4 bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task.task_id} className="m-4 p-4 bg-gray-100 rounded-md text-center">
            <h3 className="text-lg font-semibold">{task.task_title}</h3>
            <p>{task.task_details}</p>
            <button
              onClick={() => deleteTask(task.task_id)}
              className="mt-2 p-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskView;
