import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; // Import the ThemeContext
import data from '../data.json';
import Filter from './Filter';


const url = `https://restcountries.com/v3.1/all`;

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const { theme } = useContext(ThemeContext); // Get the theme from the context


  const fetchCountriesData = async () => {
    try {
      const response = await fetch(url);
      const countries = await response.json();
      setCountries(countries);
      setFilteredCountries(countries);
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

    <section className={`grid ${theme}`}> {/* Apply theme class to section */}
      {filteredCountries.map((country, index) => {
        const { name, population, region, capital, flags, ccn3 } = country;
        const countryName = name.common;
        const imageUrl = flags.png;

        return (
          <Link to={`/countries/${countryName}`} className={`country-link ${theme}`} key={`${ccn3} - ${index}`}> {/* Apply theme class to Link */}
            <article>
              <div>
                <img src={imageUrl} alt={countryName} />
              </div>
              <div className={`details ${theme}`}> {/* Apply theme class to div */}
                <h3 className={`country-name`}>{countryName}</h3> {/* Apply theme class to h3 */}
                <h4>
                  Population: <span>{population}</span>
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