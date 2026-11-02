'use client';

import { useEffect } from 'react';

export default function ThemeToggle() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const dark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextIsDark);
    window.localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded px-3 py-2 text-sm hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      Toggle theme
    </button>
  );
}
