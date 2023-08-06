import React, {fragment, useEffect, useState} from 'react';
import axios from "axios";
import Modal from "./component/Modal";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [busqueda, setBusqueda] = useState({busqueda: ''});
    const [respuesta, setRespuesta] = useState([])
    const urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + busqueda.busqueda
    const [id, setId] = useState(null)
    const [megustas, setMegustas] = useState([])

    const entrada = (e) => {
        setBusqueda({
            ...busqueda, [e.target.name]: e.target.value
        })
    }
    const traerId = (id) => {
        setId(id)
    }
    const getApi = (url) => {
        axios.get(url)
            .then(response => {
                setRespuesta(response.data.drinks)

            })
            .catch(err => console.log(err))
    }

    const like = (item) => {
        let arrayFavoritos = []
        if (localStorage.getItem("like")) {
            arrayFavoritos = JSON.parse(localStorage.getItem("like"))
            let favorito = -1
            for (let i = 0; i < arrayFavoritos.length; i++) {
                let likes = arrayFavoritos[i]
                if (likes.idDrink === item.idDrink) {
                    favorito = 1
                }
            }
            if (favorito === -1) {
                arrayFavoritos.push(item)
                localStorage.setItem("like", JSON.stringify(arrayFavoritos))

                traerdata()
            }
        } else {
            arrayFavoritos.push(item)
            localStorage.setItem("like", JSON.stringify(arrayFavoritos))

            traerdata()
        }
    }
    const getMegustas = () => {
        const megustas = JSON.parse(localStorage.getItem("like"))
        setMegustas(megustas)
    }
    const traerdata = () => {
        getMegustas()
    }

    console.log(megustas)

    useEffect(() => {
        getApi(urlBase)
        getMegustas()
    }, [busqueda]);
    return (
        <fragment>

            <div className='container-fluid'>
                <div className="d-flex justify-content-end ">
                    <input id="heart" type="checkbox" onClick={traerdata}/>
                    <label for="heart" className="bg-white p-2 rounded-circle mt-2 mx-3 dropdown"
                           data-bs-toggle="dropdown"
                           aria-expanded="false"
                    >❤
                        <ul className="dropdown-menu">
                            {
                                megustas?
                                    megustas.map(item =>(
                                        <li>
                                            <div className="dropdown-item d-flex justify-content-between align-items-center">
                                                <img
                                                    src={item.strDrinkThumb}
                                                    className="img-fluid w-25"
                                                />
                                                <span style={{fontSize:'12px'}}>{item.strDrink}</span>
                                                <span><i className="fa-solid fa-trash"></i></span>
                                            </div>
                                        </li>
                                    ))
                                    :
                                    <li>
                                        <div className="dropdown-item d-flex justify-content-between align-items-center">
                                            <p>Aun no tienes favorito agrega..!</p>
                                        </div>
                                    </li>
                            }
                        </ul>
                    </label>
                </div>
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

                <div className="p-3 d-flex justify-content-between align-items-center mt-5 flex-wrap">
                    {
                        respuesta.map(item => (
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
                                    <div className="d-flex align-items-center flex-column">
                                        <h5>Like</h5>
                                        <span className="mx-2"
                                              style={{cursor: 'pointer'}}
                                              onClick={() => like(item)}
                                        >🥰</span>

                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target='#staticBackdrop'
                                        onClick={() => traerId(item.idDrink)}
                                    >Ver detalle
                                    </button>


                                </div>
                            </div>
                        ))
                    }

                    <Modal idDrink={id}/>

                </div>
                <div className="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            Agregaste correctamente a tus favoritos
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </fragment>
);
}
export default App;
