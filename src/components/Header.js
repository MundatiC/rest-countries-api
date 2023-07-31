import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); 
  const navigate = useNavigate()

  return (
    <>
      <header className={`header ${theme}`}>
        <div>
          <h1 onClick={ () => navigate('/')}>Where in the world?</h1>
        </div>

        <div className="theme-toggle" onClick={toggleTheme}>
          {theme === "light-theme" ? (
            <>
              <FontAwesomeIcon icon={faMoon} className="theme-icon" />
              Dark Mode
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSun} className="theme-icon" />
              Light Mode
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
