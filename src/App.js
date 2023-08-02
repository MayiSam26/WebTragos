
import React, {fragment, useEffect, useState} from 'react';
import axios from "axios";
import Modal from "./component/Modal";

function App() {
    const [busqueda, setBusqueda] = useState({busqueda:''});
    const [respuesta, setRespuesta] = useState([])
    const urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + busqueda.busqueda
    const [id, setId] = useState(null)
    const entrada = (e) =>{
    setBusqueda({
    ...busqueda,[e.target.name]: e.target.value
    })
    }
    const traerId = (id) =>{
        setId(id)
    }
    const getApi = (url) =>{
    axios.get(url)
        .then(response => {
        setRespuesta(response.data.drinks)

        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
    getApi(urlBase)
    }, [busqueda]);
  return (
    <fragment>

      <div className='container-fluid'>

          <div className='col-4 bg-white p-3 m-auto mt-3 rounded m__100'>
              <h1 className='text-center fw-bold mt-2 mb-2'>Busca tu trago</h1>
              <form className='d-flex flex-column bg-secondary p-3 rounded'>
                  <input
                      type="text"
                      name="busqueda"
                      placeholder='busca tu trago favorito...!'
                      onChange={entrada}
                      className="form-control"
                  />

              </form>
          </div>

      <div className="p-3 d-flex justify-content-between align-items-center mt-5 flex-wrap" >
          {
              respuesta.map(item =>(
                  <div className="col-2 m__100 bg-white me-2 mb-3" key={item.idDrink}>
                      <img

                          src={item.strDrinkThumb}
                          alt=""
                          className="img-fluid"
                      />
                      <div className="p-2">
                          <div className="d-flex align-items-center flex-column">
                              <h5>Name: </h5>
                              <h6 className="mx-2">{item.strDrink}</h6>
                          </div>
                          <div className="d-flex align-items-center flex-column">
                              <h5>Category: </h5>
                              <h6 className="mx-2">{item.strCategory}</h6>
                          </div>
                          <button
                              type="button"
                              className="btn btn-danger btn-sm w-100"
                              data-bs-toggle="modal"
                              data-bs-target='#staticBackdrop'
                              onClick={() => traerId(item.idDrink)}
                          >Ver detalle</button>


                      </div>
                  </div>
              ))
          }

          <Modal  idDrink = {id} />

      </div>

      </div>
    </fragment>
  );
}
export default App;
