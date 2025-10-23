import { useEffect, useMemo, useState } from 'react';
import RetroHero from './components/RetroHero';
import TaskComposer from './components/TaskComposer';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('retro_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filters, setFilters] = useState({
    query: '',
    status: 'all',
    priority: 'all',
  });

  useEffect(() => {
    localStorage.setItem('retro_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks((prev) => [{ id: crypto.randomUUID(), createdAt: Date.now(), ...task }, ...prev]);
  };

  const handleToggle = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTasks = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesQuery = q
        ? t.title.toLowerCase().includes(q) || (t.notes || '').toLowerCase().includes(q)
        : true;
      const matchesStatus =
        filters.status === 'all' ? true : filters.status === 'active' ? !t.completed : t.completed;
      const matchesPriority = filters.priority === 'all' ? true : t.priority === filters.priority;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1024] via-[#1b1024] to-[#10091a] text-zinc-100">
      <RetroHero />

      <main className="mx-auto max-w-5xl px-4 -mt-24 relative z-10">
        <section className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Retro Task Desk</h2>
              <p className="text-sm text-zinc-300/80">Stay cozy and ship tasks. {activeCount} active</p>
            </div>
          </div>

          <TaskComposer onAdd={handleAddTask} />

          <TaskFilters filters={filters} onChange={setFilters} onClearCompleted={handleClearCompleted} />

          <TaskList tasks={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} />
        </section>

        <footer className="py-10 text-center text-zinc-400">
          <p className="text-xs">Made with a love for cozy CRT glow</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
