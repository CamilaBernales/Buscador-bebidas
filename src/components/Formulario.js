
import React, {useContext, useState}  from 'react'
import { CategoriasContext } from '../context/CategoriasContext';
import { IngredientesContext } from '../context/IngredientesContext';
import { RecetasContext } from '../context/RecetasContext';
import Error from './Error';

const Formulario  = () => {
const {categorias} = useContext(CategoriasContext);
const {ingredientes} = useContext(IngredientesContext);
const [ busqueda, guardarBusqueda ] = useState({
    ingrediente: '',
    categoria: ''
});
const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);
const[error, guardarError]  = useState(false);
// función para leer los contenidos
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })

        
    }

    const buscarReceta = e => {
        e.preventDefault();
        if(busqueda.ingrediente === "" || busqueda.categoria ===""){
            guardarError(true)
            return;
        }
        buscarRecetas(busqueda);
        guardarConsultar(true);
    }
    
    return(
    <form
    className="col-md-12"
    onSubmit={buscarReceta}
    >
    <fieldset className="text-center mt-4 font-weight-bold text-trasform-uppercase">
    <legend >Search drinks by Category or Ingredient</legend>
    </fieldset>

    <div className="row mt-5">
        <div className="col-md-4">
        <select 
                className="form-control"
                name="ingrediente"
                onChange={obtenerDatosReceta}
            >
                <option value="">-- Choose an Ingredient --</option>
                {ingredientes.map(ingredientes => (
                    <option 
                        key={ingredientes.strIngredient1} 
                        value={ingredientes.strIngredient1} 
                    >{ingredientes.strIngredient1}</option>
                ))}
            </select> 
        </div>
        <div className="col-md-4">
             <select 
                className="form-control"
                name="categoria"
                onChange={obtenerDatosReceta}
            >
                <option value="">-- Choose an Category --</option>
                {categorias.map(categoria => (
                    <option 
                        key={categoria.strCategory} 
                        value={categoria.strCategory} 
                    >{categoria.strCategory}</option>
                ))}
            </select> 
        </div>

        <div className="col-md-4">
            <input
                type="submit"
                className="btn btn-block btn-primary"
                value="Search!"
            />
        </div>
    </div>
    {error ? <Error mensaje="Ingredient and Category is required." /> :null  }
</form>
)
}

export default Formulario;