import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ThemeContext } from '../ThemeContext';
import data from "../data.json";
import "../country.css";

const Country = () => {
  const { name } = useParams();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [country, setCountry] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        if (response.ok) {
          const countryData = await response.json();
          setCountry(countryData);
          fetchBorderCountriesData(countryData[0]);
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error(error);
        // API is down, use data.json as an alternative
        setCountry(data.filter((item) => item.name.common === name));
      }
    };
    fetchCountryData();
  }, [name]);

  const getFirstNativeName = (nativeName) => {
    for (const lang in nativeName) {
      if (nativeName.hasOwnProperty(lang)) {
        return nativeName[lang].common;
      }
    }
    return "";
  };

  const fetchBorderCountriesData = async (countryData) => {
    if (countryData?.borders) {
      const borderCodes = countryData.borders;
      try {
        const borderCountriesData = await Promise.all(
          borderCodes.map(async (code) => {
            const response = await fetch(
              `https://restcountries.com/v3.1/alpha/${code}`
            );
            const borderCountryData = await response.json();
            return (
              borderCountryData?.[0]?.name?.common || ""
            );
          })
        );
        setBorderCountries(borderCountriesData);
      } catch (error) {
        console.error(error);
        // API is down, use data.json as an alternative
        const borderCountryNames = data
          .filter((item) => borderCodes.includes(item.cca3))
          .map((item) => item.name.common);
        setBorderCountries(borderCountryNames);
      }
    }
  };

  const renderBorderCountries = () => {
    return (
      <div className={`border-country ${theme}`}>
        <h3>Border Countries:</h3>
        <div className="borders">
          {borderCountries.map((borderCountry) => (
            <ul className={` ${theme}`} key={borderCountry}>
              <li onClick={() => navigate(`/countries/${borderCountry}`)}>
                {borderCountry}
              </li>
            </ul>
          ))}
        </div>
      </div>
    );
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <section className={`country ${theme}`}>
      <button onClick={handleGoBack} className={`btn btn-light ${theme}`}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        {country.map((countryData) => {
          const {
            name,
            population,
            region,
            subregion,
            capital,
            flags,
            tld,
            currencies,
            languages,
            borders,
          } = countryData;
          const countryName = name.common;
          const nativeName = getFirstNativeName(name.nativeName);
          const imageUrl = flags.svg;

          // Extract currency names
          const currencyNames = currencies
            ? Object.values(currencies).map((currency) => currency.name)
            : [];

          // Extract language names
          const languageNames = Object.values(languages);

          return (
            <article key={population}>
              <div className="country-inner">
                <div className="flag">
                  <img src={imageUrl} alt={countryName} />
                </div>

                <div className="country-details">
                  <h2>{countryName}</h2>
                  <div className="country-stuff">
                    <div className="country-left">
                      <h5>
                        Native Name: <span>{nativeName}</span>
                      </h5>
                      <h5>
                        Population:{" "}
                        <span>{population.toLocaleString()}</span>
                      </h5>
                      <h5>
                        Region: <span>{region}</span>
                      </h5>
                      <h5>
                        Sub Region: <span>{subregion}</span>
                      </h5>
                      <h5>
                        Capital: <span>{capital}</span>
                      </h5>
                    </div>
                    <div className="country-right">
                      <h5>
                        Top Level Domain: <span>{tld}</span>
                      </h5>
                      <h5>
                        Currencies:{" "}
                        <span>{currencyNames.join(", ")}</span>
                      </h5>
                      <h5>
                        Languages: <span>{languageNames.join(", ")}</span>
                      </h5>
                    </div>
                  </div>
                  {renderBorderCountries()}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Country;
