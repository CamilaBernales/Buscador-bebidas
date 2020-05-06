import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        ingrediente: '', 
        categoria: ''
    });

    const [consultar, guardarConsultar] = useState(false);
    const {ingrediente, categoria} = busqueda;

    useEffect(() => {

        if(consultar){
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;

                const resultado = await axios.get(url);
                // console.log(url)
                // console.log(resultado.data.drinks);
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busqueda])

    return(
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
        
    )

}

export default RecetasProvider;