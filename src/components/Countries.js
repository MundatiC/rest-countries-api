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

  const fetchCountriesData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const countriesData = await response.json();
        setCountries(countriesData);
        setFilteredCountries(countriesData);
      } else {
        throw new Error("API request failed");
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

  return (
    <>
      <Filter countries={countries} setFilteredCountries={setFilteredCountries} />

      <section className={`grid ${theme}`}>
        {filteredCountries.map((country, index) => {
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
    </>
  );
};

export default Countries;
