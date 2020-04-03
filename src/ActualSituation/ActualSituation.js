import React, {
  useState,
  useEffect
} from 'react';
import { Spinner } from 'reactstrap';
import './ActualSituation.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ActualSituation = (props) => {

  const searchIcon = <FontAwesomeIcon icon={faSearch} style={{ color: "#f50057" }} />

  const [isLoading, setStateIsLoading] = useState(true);
  const [Countries, setCountries] = useState([]);
  const [PalabraBuscada, setPalabraBuscada] = useState('');

  // Llamamos a la api
  let url = "https://api.covid19api.com/summary";
  useEffect(() => {
    fetch(url)
      .then(urlInfo => {
        return urlInfo.json();
      })
      .then(jsonInfo => {
        setCountries(jsonInfo.Countries);
        setStateIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  let PalabraBuscadaLowerCase = PalabraBuscada.trim().toLowerCase();
  let CountryFilter = Countries.map(countryObject => {
    if (countryObject.Country.trim().toLowerCase().indexOf(PalabraBuscadaLowerCase) !== -1) {
      return (countryObject);
    }
  }).filter(e=>e);
  console.log(CountryFilter)

  return (
    <div className="container-fluid ActualSituation">
      {isLoading
        ? <Spinner color="info" />
        : <div>
          <div className="row inputSearch">
            {searchIcon}<input className="form-control" id="inputCountrySearch" value={PalabraBuscada} onChange={(event) => setPalabraBuscada(event.target.value)} placeholder="¿Qué país quieres buscar? (En inglés)" />
          </div>
          {PalabraBuscada.trim() === ''
            ? <p>Busca algo</p>
            : <div className="row countryCardContainer">
              {CountryFilter.map((e, index) =>
                <div className="countryCard col-11 col-md-5" key={index}>
                  <div className="row countryCardText">
                    <h5>{e.Country.toUpperCase()}</h5>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <p>Nuevos casos: {e.NewConfirmed}</p>
                    </div>
                    <div className="col-6">
                      <p>Casos confirmados totales: {e.TotalConfirmed}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <p>Nuevas muertes: {e.NewDeaths}</p>
                    </div>
                    <div className="col-6">
                      <p>Muertes totales: {e.TotalDeaths}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <p>Casos de recuperacion: {e.NewRecovered}</p>
                    </div>
                    <div className="col-6">
                      <p>Recuperaciones totales: {e.TotalRecovered}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          }
        </div>}
    </div>
  );
}

export default ActualSituation;