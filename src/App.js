import React from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import IngredientesProvider from './context/IngredientesContext';
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';
import ListaRecetas from './components/ListaRecetas';
import ModalProvider from './context/ModalContext' ;

function App() {
  return (
    <CategoriasProvider>
      <IngredientesProvider>
        <RecetasProvider>
          <ModalProvider>
            <Header/>
            <div className="container">
              <div className="row">
                <Formulario/>
              </div>
              <ListaRecetas />
            </div>
          </ModalProvider>
        </RecetasProvider>
      </IngredientesProvider>
    </CategoriasProvider>
  );
}

export default App;
