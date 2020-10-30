import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import './App.css';
import LoginPage from './Pages/LoginPage';
import HomePage from  './Pages/HomePage';
import Registro from './Pages/Registro';
import Producto from './Pages/Producto';
import Productos from './Pages/Productos';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="col-9">
          <Router>
            <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage}/>
              <Route path="/registro" component={Registro}/>
              <Route path="/productos" component={Productos}/>
              <Route path="/producto" component={Producto}/>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
