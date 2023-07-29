import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import the ThemeContext

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use the context here

  return (
    <>
      <header className={`header ${theme}`}>
        <div>
          <h1>Where in the world?</h1>
        </div>

        <div>
          <i className="fas fa-moon" onClick={toggleTheme}>
            {theme === 'light-theme' ? 'Dark Mode' : 'Light Mode'}
          </i>
        </div>
      </header>
    </>
  );
};

export default Header;
