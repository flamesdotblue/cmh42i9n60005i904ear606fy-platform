import { useState } from 'react';
import { Plus, Calendar, Star } from 'lucide-react';

export default function TaskComposer({ onAdd }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [due, setDue] = useState('');
  const [priority, setPriority] = useState('normal');

  const submit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd({ title: trimmed, notes: notes.trim(), dueDate: due || null, priority, completed: false });
    setTitle('');
    setNotes('');
    setDue('');
    setPriority('normal');
  };

  return (
    <form onSubmit={submit} className="space-y-3 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task: e.g., Beat the high score"
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/50"
        />
        <div className="flex gap-2">
          <div className="relative">
            <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-zinc-300">
              <Calendar size={16} />
            </div>
            <input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="rounded-lg bg-white/5 border border-white/10 pl-8 pr-3 py-2 outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/50"
            />
          </div>
          <div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/50"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 px-4 py-2 font-medium shadow-lg shadow-pink-900/20"
            aria-label="Add task"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>
      <div>
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-2.5 text-zinc-300">
            <Star size={16} />
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            rows={2}
            className="w-full rounded-lg bg-white/5 border border-white/10 pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/50"
          />
        </div>
      </div>
    </form>
  );
}
