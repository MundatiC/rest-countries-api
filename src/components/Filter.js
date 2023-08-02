import React, { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const Filter = ({ countries, setFilteredCountries }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { theme } = useContext(ThemeContext);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    filterCountries(value, selectedRegion);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    filterCountries(searchValue, region);
  };

  const filterCountries = (searchValue, region) => {
    const filteredCountries = countries.filter((country) => {
      const name = country.name.common.toLowerCase();
      const regionFilter = region === '' || country.region === region;
      const searchFilter = name.includes(searchValue.toLowerCase());
      return regionFilter && searchFilter;
    });

    setFilteredCountries(filteredCountries);
  };

  return (
    <section className={`filter ${theme}`}>
      <form className={`form-control ${theme}`}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country"
          value={searchValue}
          onChange={handleSearchChange}
          className={theme} // Apply theme class to input
        />
      </form>

      <div className={`region-filter ${theme}`}>
        <select
          name="select"
          id="select"
          className={`select ${theme}`}
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
