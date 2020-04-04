import React, {
  useState,
  useEffect
} from 'react';
import {
  Spinner, Progress, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import './ActualSituation.scss';
import imgPortada from '../img/img4ActualSituation.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ActualSituation = (props) => {

  const searchIcon = <FontAwesomeIcon icon={faSearch} style={{ color: "#f50057" }} />
  const infoIcon = <FontAwesomeIcon icon={faInfoCircle} style={{ color: "#f50057" }} />

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
  }).filter(e => e);
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
            ? <div>
              <Card>
                <div className="prueba" style={{backgroundImage:`url(${imgPortada})`}}>
                </div>
                <CardBody>
                  <CardTitle><strong>Contrasta información actualizada cada día.</strong></CardTitle>
                  <CardSubtitle></CardSubtitle>
                  <CardText>{infoIcon} Si quieres saber más, no dudes en consultar la api con todos los datos:</CardText>
                  <a href="https://covid19api.com/" target="_blank"><Button color="info" style={{margin:"20px 0"}}>Ver API</Button></a>
                </CardBody>
              </Card>
            </div>
            : <div className="row countryCardContainer">
              {CountryFilter.map((e, index) =>
                <div className="countryCard col-11 col-md-5" key={index}>
                  <div className="row countryCardText">
                    <h5>{e.Country.toUpperCase()}</h5>
                  </div>
                  <p>Casos confirmados totales: <strong>{e.TotalConfirmed}</strong></p>
                  <p>Nuevos casos: <strong>{e.NewConfirmed}</strong></p>
                  <Progress value={(100 * e.NewConfirmed) / e.TotalConfirmed} />
                  <p>Muertes totales: <strong>{e.TotalDeaths}</strong></p>
                  <Progress value={(100 * e.TotalDeaths) / e.TotalConfirmed} />
                  <p>Nuevas muertes: <strong>{e.NewDeaths}</strong></p>
                  <Progress value={(100 * e.NewDeaths) / e.TotalConfirmed} />
                  <p>Recuperaciones totales: <strong>{e.TotalRecovered}</strong></p>
                  <Progress value={(100 * e.TotalRecovered) / e.TotalConfirmed} />
                  <p>Nuevas recuperaciones: <strong>{e.NewRecovered}</strong></p>
                  <Progress value={(100 * e.NewRecovered) / e.TotalConfirmed} />
                </div>)}
            </div>
          }
        </div>}
    </div>
  );
}

export default ActualSituation;