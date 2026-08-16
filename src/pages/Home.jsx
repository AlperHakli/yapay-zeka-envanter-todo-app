import React, { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

export default function Home({ todos = [], onAdd, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [q, setQ] = useState("");

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  }).filter((t) => {
    if (priorityFilter !== 'all' && (t.priority || 'Medium') !== priorityFilter) return false;
    if (overdueOnly) {
      if (!t.dueDate) return false;
      if (t.completed) return false;
      if (new Date(t.dueDate) >= new Date()) return false;
    }
    if (!q) return true;
    const s = q.toLowerCase();
    return t.title.toLowerCase().includes(s) || (t.description||"").toLowerCase().includes(s) || (t.tags || []).some(tag => tag.toLowerCase().includes(s));
  });

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="app-title">TODO-APP</div>
            <div className="app-subtitle">Modern, hızlı ve küçük yapılacaklar uygulamanız</div>
          </div>
        </div>
      </header>

      <section className="card">
        <TodoForm
          key={editing?.id ?? 'new'}
          initial={editing}
          onSave={(data) => {
            if (editing) {
              onUpdate(editing.id, data);
              setEditing(null);
            } else {
              onAdd(data);
            }
          }}
          onCancel={() => setEditing(null)}
        />

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <button className={`px-3 py-1 rounded ${filter==='all'? 'bg-indigo-600 text-white':'bg-gray-100'}`} onClick={() => setFilter('all')}>Tümü</button>
            <button className={`px-3 py-1 rounded ${filter==='active'? 'bg-indigo-600 text-white':'bg-gray-100'}`} onClick={() => setFilter('active')}>Aktif</button>
            <button className={`px-3 py-1 rounded ${filter==='completed'? 'bg-indigo-600 text-white':'bg-gray-100'}`} onClick={() => setFilter('completed')}>Tamamlanan</button>

            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="ml-2 border rounded px-2 py-1">
              <option value="all">Tümü</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <label className="ml-2 text-sm flex items-center gap-1"><input type="checkbox" checked={overdueOnly} onChange={(e) => setOverdueOnly(e.target.checked)} /> Sadece gecikenler</label>
          </div>

          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ara... (başlık, açıklama, etiket)" className="border rounded px-3 py-1 w-full sm:w-64" />
        </div>

        <div className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-gray-500">Görev yok.</div>
          ) : (
            filtered.map((t) => (
              <TodoItem key={t.id} todo={t} onEdit={() => setEditing(t)} onUpdate={(patch) => onUpdate(t.id, patch)} onDelete={() => onDelete(t.id)} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
