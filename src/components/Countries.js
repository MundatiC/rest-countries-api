import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import data from '../data.json';
import Filter from './Filter';

const url = `https://restcountries.com/v3.1/all`;

const Countries = () => {
  const { theme } = useContext(ThemeContext);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);
  const visiblePages = 5; // Number of visible page buttons

  const fetchCountriesData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const countriesData = await response.json();
        setCountries(countriesData);
        setFilteredCountries(countriesData);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error(error);
      setCountries(data);
      setFilteredCountries(data);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  // Handle filtering and search
  const handleFilterAndSearch = (filteredCountries) => {
    setFilteredCountries(filteredCountries);
    setCurrentPage(1); // Reset to first page when filter or search changes
  };

  // Get current countries for the current page
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  // Generate the range of visible page buttons
  const getPageRange = () => {
    const halfVisiblePages = Math.floor(visiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust startPage if there are not enough visible pages
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  // Handle changing the number of countries per page
  const handleCountriesPerPageChange = (e) => {
    const value = Number(e.target.value);
    setCountriesPerPage(value);
    setCurrentPage(1); // Reset to first page when number of countries per page changes
  };

  // Calculate the range of countries being displayed
  const firstCountryIndex = (currentPage - 1) * countriesPerPage + 1;
  const lastCountryIndex = Math.min(currentPage * countriesPerPage, filteredCountries.length);

  return (
    <>
      <Filter
        countries={countries}
        setFilteredCountries={handleFilterAndSearch}
      />

      <section className={`grid ${theme}`}>
        {currentCountries.map((country, index) => {
          const { name, population, region, capital, flags, ccn3 } = country;
          const countryName = name.common;
          const imageUrl = flags.png;

          return (
            <Link
              to={`/countries/${countryName}`}
              className={`country-link ${theme}`}
              key={`${ccn3} - ${index}`}
            >
              <article>
                <div>
                  <img src={imageUrl} alt={countryName} />
                </div>
                <div className={`details ${theme}`}>
                  <h3 className={`country-name`}>{countryName}</h3>
                  <h4>
                    Population: <span>{population.toLocaleString()}</span>
                  </h4>
                  <h4>
                    Region: <span>{region}</span>
                  </h4>
                  <h4>
                    Capital: <span>{capital}</span>
                  </h4>
                </div>
              </article>
            </Link>
          );
        })}
      </section>

      {/* Responsive Pagination */}
      <div className='bottom'>

      
      <div className={`pagination-results ${theme}`}>
      <div className={`pagination ${theme}`}>
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>&lt; Previous Page</button>
        )}
        {getPageRange().map((page) => (
          <button
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => paginate(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)}>Next Page &gt;</button>
        )}
      </div>

     {/* Results */}
     <div className={`results ${theme}`}>
          <div className={`result ${theme}`}>
            Results: {firstCountryIndex}-{lastCountryIndex} of {filteredCountries.length}
          </div>

          {/* Dropdown to select the number of countries per page */}
          <div className={`countries-per-page ${theme}`}>
            <label htmlFor="countriesPerPage"></label>
            <select
              name="countriesPerPage"
              id="countriesPerPage"
              value={countriesPerPage}
              onChange={handleCountriesPerPageChange}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
            </select>
          </div>
        </div>
      </div>
      </div>

   
    </>
  );
};

export default Countries;
