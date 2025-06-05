import React, { useState } from 'react';
import { Check, Trash2 } from 'lucide-react'; 

const initialTasks = [
    { id: 1, title: 'Internship', description: 'I will work on intern projects at 10 PM', completed: false },
  { id: 2, title: 'Reading Book', description: 'I have to do reading at 6 PM', completed: false },
  { id: 3, title: 'Watching Movie', description: 'I will watch movie at 10 PM', completed: false },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (!newTitle.trim() || !newDesc.trim()) {
      alert("Please enter both title and description");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTitle,
      description: newDesc,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewDesc('');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Simple Task Manager App</h1>

      <div className="flex gap-4 w-full max-w-3xl mb-4">
        <input
          type="text"
          placeholder="What's the title of your To Do?"
          className="flex-1 p-2 rounded bg-zinc-800 border border-zinc-600"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="What's the description of your To Do?"
          className="flex-1 p-2 rounded bg-zinc-800 border border-zinc-600"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-semibold"
        >
          Add
        </button>
      </div>

      <div className="mb-4 space-x-3">
        {['all', 'completed', 'pending'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded font-medium transition ${
              filter === f
                ? 'bg-green-600 text-white'
                : 'bg-zinc-700 text-white hover:bg-zinc-600'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="w-full max-w-3xl space-y-4">
        {filteredTasks.length === 0 ? (
          <li className="text-center text-gray-400">No tasks available.</li>
        ) : (
          filteredTasks.map(task => (
            <li
              key={task.id}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center transition ${
                task.completed ? 'bg-green-700' : 'bg-red-700'
              }`}
            >
              <div>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-sm text-gray-200">{task.description}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  title="Mark as completed"
                  className="text-white hover:text-green-300 transition"
                >
                  <Check />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  title="Delete"
                  className="text-white hover:text-red-300 transition"
                >
                  <Trash2 />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
