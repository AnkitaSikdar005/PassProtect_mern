import React from "react";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full flex items-center gap-1 ${
        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-600 hover:bg-gray-500"
      } transition-colors`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <>
          <img className="w-5 h-5" src="/icons/sun.png" alt="Sun" />
          <span className="text-sm">Light</span>
        </>
      ) : (
        <>
          <img className="w-5 h-5" src="/icons/moon.png" alt="Moon" />
          <span className="text-sm">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;