import React, {useState, useContext} from 'react';
import {ModalContext} from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {
 // Configuración del modal de material-ui
 const [ modalStyle ] = useState(getModalStyle);
 const [open, setOpen] = useState(false);

 const classes = useStyles();

 const handleOpen = () => {
     setOpen(true);
 }
 const handleClose = () => {
     setOpen(false);
 }

 const { informacion, guardarIdReceta, guardarReceta } = useContext(ModalContext);

 //muestra y formatea los ingredientes
 
    // Muestra y formatea los ingredientes
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++){
            if( informacion[`strIngredient${i}`] ) {
                ingredientes.push(
                    <li> { informacion[`strIngredient${i}`] }  { informacion[`strMeasure${i}`] }</li>
                )
            }
        }

        return ingredientes;
    }

return(
    <div className="col-md-4 mb-3">
        <div className="card">
            <div className="card-header">
                {receta.strDrink}
                <img className="card-img-top" src={receta.strDrinkThumb} alt="imagen de bebida"/>

            </div>
            <div className="card-body">
                <button
                    onClick={() =>{ 
                    guardarIdReceta(receta.idDrink);
                    handleOpen()}}
                    type="button"
                    className="btn btn-block btn-primary">
                    Ver Receta
                </button>
                <Modal
                    open={open}
                    onClose={()=> {
                    guardarIdReceta(null);   
                    guardarReceta({})
                    handleClose()}}
                >
                    <div style={modalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>

                            <img className="img-fluid my-4" src={informacion.strDrinkThumb} />

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(informacion)}
                            </ul>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
)
}

export default Receta;