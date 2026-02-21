import clsx from 'clsx';

export function Card({ children, className = '' }) {
  return <div className={clsx('rounded-2xl bg-white p-5 shadow-soft', className)}>{children}</div>;
}

export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={clsx(
        'rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={clsx(
        'w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-primary/20 focus:ring',
        className
      )}
      {...props}
    />
  );
}
