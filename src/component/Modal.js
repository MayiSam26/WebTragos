import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";

function Modal(props){
    const [respuesta, setRespuesta] = useState({})
    const {idDrink}=props
    const urlBase ='https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + idDrink


    const getApi = (url) =>{
        axios.get(url)
            .then(response => {
                setRespuesta(response.data.drinks || [])
                console.log(response.data.drinks || [])
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getApi(urlBase)
    }, [idDrink]);

    return (
        <Fragment>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{respuesta.length > 0 ? respuesta[0].strDrink:''}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body " >
                            <img className="img-fluid" src={respuesta.length > 0 ? respuesta[0].strDrinkThumb
                                :''}/>
                            <span className="badge rounded-pill bg-danger ">{respuesta.length > 0 ? respuesta[0].strAlcoholic : ""}</span>
                            <hr />
                            <h3 className="fs-5">Ingredients</h3>
                            <ul style={{listStyle:'none'}}>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure1 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient1 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure2 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient2 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure3 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient3 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure4 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient4 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure5 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient5 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure6 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient6 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure7 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient7 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure8 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient8 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure9 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient9 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure10 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient10 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure11 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient11 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure12 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient12 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure13 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient13 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure14 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient14 : ''}
                                </li>
                                <li>
                                    {respuesta.length > 0 ? respuesta[0].strMeasure15 : ''} {respuesta.length > 0 ? respuesta[0].strIngredient15 : ''}
                                </li>
                            </ul>
                            <hr />
                            <h3 className="fs-5">Instructions</h3>
                            <p>
                                {respuesta.length > 0 ? respuesta[0].strInstructions
                                    : ''}
                            </p>
                        </div>

                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary " data-bs-dismiss="modal">Close c:</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Modal;