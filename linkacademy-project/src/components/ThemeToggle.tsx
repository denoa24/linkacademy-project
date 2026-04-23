import { useEffect, useState } from 'react';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDark(theme === 'dark');
    document.body.setAttribute('data-theme', theme || 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isDark}
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};