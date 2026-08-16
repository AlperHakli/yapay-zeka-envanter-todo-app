import React, { useState } from "react";

export default function TodoItem({ todo, onEdit, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  const priorityColor = () => {
    if (todo.priority === 'High') return 'bg-red-100 text-red-700';
    if (todo.priority === 'Low') return 'bg-green-100 text-green-700';
    return 'bg-yellow-100 text-yellow-800';
  }

  return (
    <div className="todo-card flex gap-4 items-start">
      <div className="flex-shrink-0">
        <input type="checkbox" checked={!!todo.completed} onChange={(e) => onUpdate({ completed: e.target.checked })} className="mt-1 w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}>{todo.title}</h3>
              {todo.priority && <span className={`text-xs font-semibold px-2 py-0.5 rounded ${priorityColor()}`}>{todo.priority}</span>}
              {todo.dueDate && <span className={`text-xs px-2 py-0.5 rounded ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>{new Date(todo.dueDate).toLocaleDateString()}</span>}
            </div>
            <div className="text-xs text-gray-400 mt-1">{new Date(todo.createdAt).toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onEdit} className="text-sm bg-yellow-50 px-2 py-1 rounded">Düzenle</button>
            <button onClick={onDelete} className="text-sm bg-red-50 px-2 py-1 rounded">Sil</button>
          </div>
        </div>

        {todo.description && (
          <p className={`mt-3 text-sm text-gray-700 ${expanded ? '' : 'line-clamp-2'}`}>{todo.description}</p>
        )}

        {todo.tags && todo.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {todo.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-3">
          <button onClick={() => setExpanded((s) => !s)} className="text-sm text-indigo-600">{expanded ? 'Daralt' : 'Detay'}</button>
          {!todo.completed ? (
            <button onClick={() => onUpdate({ completed: true })} className="text-sm text-green-600">Tamamla</button>
          ) : (
            <button onClick={() => onUpdate({ completed: false })} className="text-sm text-gray-600">Tamamlandı kaldır</button>
          )}
        </div>
      </div>
    </div>
  );
}
