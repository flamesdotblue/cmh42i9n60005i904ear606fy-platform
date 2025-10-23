import { Filter, Settings, Clock } from 'lucide-react';

export default function TaskFilters({ filters, onChange, onClearCompleted }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-zinc-300">
        <Filter size={18} className="text-pink-400" />
        <span className="text-sm">Filter tasks</span>
      </div>
      <div className="flex flex-1 md:flex-none gap-2">
        <input
          type="text"
          value={filters.query}
          onChange={(e) => set('query', e.target.value)}
          placeholder="Search"
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/50"
        />
        <select
          value={filters.status}
          onChange={(e) => set('status', e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="done">Completed</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => set('priority', e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"
        >
          <option value="all">Any priority</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button
          type="button"
          onClick={onClearCompleted}
          className="inline-flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 text-sm"
        >
          <Clock size={16} /> Clear completed
        </button>
        <div className="hidden md:inline-flex items-center gap-2 text-zinc-400">
          <Settings size={16} />
        </div>
      </div>
    </div>
  );
}
