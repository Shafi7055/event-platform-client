'use client';

import { useEffect } from 'react';

export default function ThemeToggle() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const dark = savedTheme === 'dark';
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
      aria-label="Toggle color theme"
      className="theme-toggle"
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
