import React from 'react'

const Header = () => {

  const changeTheme = () => {
    const header = document.querySelector('.header');
    const details = document.querySelectorAll('.details');
    const uls = document.querySelectorAll('ul');
  
    document.body.classList.toggle('light-theme');
    header.classList.toggle('light-theme');
  
    details.forEach((detail) => {
      detail.classList.toggle('light-theme');
    });
  
    uls.forEach((ul) => {
      ul.classList.toggle('light-theme');
    });
  
    const input = document.querySelector('#search');
    if (input) {
      input.classList.toggle('light-theme');
    }
  
    const select = document.querySelector('select');
    if (select) {
      select.classList.toggle('light-theme');
    }

    const back = document.querySelector('.btn-light');
    if (back) {
      back.classList.toggle('light-theme');
    }
  };
  
  return (
    <>
    <header className='header'>
        <div>
            <h1>Where in the world?</h1>
        </div>

        <div>
        <i className="fas fa-moon" onClick={changeTheme}> Dark Mode
        </i>
        </div>
        
    </header>
    </>
  )
}

export default Header