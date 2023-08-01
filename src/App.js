import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Countries />
            </>
          }
        />
        <Route path="/countries/:name" element={<Country />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return <></>;
}

export default App;
