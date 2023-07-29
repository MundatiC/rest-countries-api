import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Countries from './components/Countries';
import Country from './components/Country';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <Router>
       <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/countries/:name" element={<Country />} />
        </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <Countries />
    </>
  );
}

export default App;
