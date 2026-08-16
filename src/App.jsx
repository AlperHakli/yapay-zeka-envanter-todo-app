import React, { useEffect, useState } from "react";
import Home from "./pages/Home";

const LOCAL_KEY = "todos_v1";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) setTodos(JSON.parse(raw));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error(e);
    }
  }, [todos]);

  const addTodo = (data) => {
    const t = { id: Date.now(), title: data.title, description: data.description || "", priority: data.priority || 'Medium', dueDate: data.dueDate || null, tags: data.tags || [], completed: false, createdAt: Date.now() };
    setTodos((s) => [t, ...s]);
  };

  const updateTodo = (id, patch) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((s) => s.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-100 py-12">
      <div className="max-w-3xl mx-auto px-4 w-full">
        <Home todos={todos} onAdd={addTodo} onUpdate={updateTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}

