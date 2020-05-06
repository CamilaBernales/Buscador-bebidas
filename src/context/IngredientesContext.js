import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context
export const IngredientesContext = createContext();

// Provider es donde se encuentran las funciones y state
const IngredientesProvider = (props) => {

    // crear el state del Context
    const [ingredientes, guardaringredientes] = useState([]);

    // ejecutar el llamado a la api
    useEffect(() => {
        const obteneringredientes = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
            const ingredientes = await axios.get(url);
            guardaringredientes(ingredientes.data.drinks);
        }
        obteneringredientes();
    }, []);

    return (
        <IngredientesContext.Provider
            value={{
                ingredientes
            }}
        >
            {props.children}
        </IngredientesContext.Provider>
    )
}
export default IngredientesProvider;