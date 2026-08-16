import React, { useEffect, useState } from "react";

export default function TodoForm({ initial = null, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setPriority(initial.priority || "Medium");
      setDueDate(initial.dueDate ? initial.dueDate.split('T')[0] : "");
      setTags((initial.tags && initial.tags.join && initial.tags.join(", ")) || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setTags("");
    }
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    const tagList = tags.split(',').map(s => s.trim()).filter(Boolean);
    onSave({ title: t, description: description.trim(), priority, dueDate: dueDate || null, tags: tagList });
    if (!initial) { setTitle(""); setDescription(""); }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yeni görev başlığı"
          className="form-input md:col-span-2"
        />

        <div className="flex gap-2 justify-end md:justify-start">
          <button type="submit" className="btn-primary">{initial? 'Güncelle' : 'Ekle'}</button>
          {initial && <button type="button" onClick={onCancel} className="bg-gray-100 px-3 py-2 rounded-lg">İptal</button>}
        </div>
      </div>

      <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Açıklama (opsiyonel)" className="form-input w-full resize-none" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="form-input">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="form-input" />

        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Etiketler (virgülle ayır)" className="form-input" />
      </div>
    </form>
  );
}
