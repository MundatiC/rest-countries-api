import React, { useState } from 'react';

const Filter = ({ countries, setFilteredCountries }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log(value);

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
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
    <section className="filter">
      <form className="form-control">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </form>

      <div className="region-filter">
        <select name="select" id="select" className="select" value={selectedRegion} onChange={handleRegionChange}>
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
