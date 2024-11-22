import React from 'react';

function DarkModeToggle({ toggleDarkMode, darkMode }) {
  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;
