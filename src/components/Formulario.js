
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
    <fieldset className="text-center mt-4 font-weight-bold">
    <legend >Busca bebidas por Categoría o Ingrediente</legend>
    </fieldset>

    <div className="row mt-5">
        <div className="col-md-4">
        <select 
                className="form-control"
                name="ingrediente"
                onChange={obtenerDatosReceta}
            >
                <option value="">-- Selecciona Ingrediente --</option>
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
                <option value="">-- Selecciona Categoría --</option>
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
                value="Buscar Bebidas"
            />
        </div>
    </div>
    {error ? <Error mensaje="Debe elegir una categoria y un ingrediente." /> :null  }
</form>
)
}

export default Formulario;