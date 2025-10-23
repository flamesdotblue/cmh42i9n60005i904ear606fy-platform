import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

function priorityColor(p) {
  switch (p) {
    case 'high':
      return 'text-pink-300 bg-pink-500/10 border-pink-500/30';
    case 'low':
      return 'text-violet-300 bg-violet-500/10 border-violet-500/30';
    default:
      return 'text-blue-300 bg-blue-500/10 border-blue-500/30';
  }
}

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-zinc-300">
        Your list is serene. Add something to do.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-white/10 rounded-xl overflow-hidden border border-white/10 bg-white/5">
      {tasks.map((t) => (
        <li key={t.id} className="group p-4 sm:p-5 flex items-start gap-3">
          <button
            onClick={() => onToggle(t.id)}
            className="mt-0.5 text-zinc-200 hover:scale-105 transition-transform"
            aria-label={t.completed ? 'Mark as active' : 'Mark as completed'}
          >
            {t.completed ? <CheckCircle2 className="text-pink-400" /> : <Circle className="text-zinc-300" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={`font-medium ${t.completed ? 'line-through text-zinc-400' : ''}`}>{t.title}</p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border ${priorityColor(
                  t.priority
                )}`}
              >
                {t.priority}
              </span>
              {t.dueDate && (
                <span className="text-xs text-zinc-300/80">Due {new Date(t.dueDate).toLocaleDateString()}</span>
              )}
            </div>
            {t.notes && (
              <p className={`mt-1 text-sm text-zinc-300/90 ${t.completed ? 'line-through opacity-70' : ''}`}>{t.notes}</p>
            )}
          </div>

          <button
            onClick={() => onDelete(t.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-red-300"
            aria-label="Delete task"
          >
            <Trash2 />
          </button>
        </li>
      ))}
    </ul>
  );
}
