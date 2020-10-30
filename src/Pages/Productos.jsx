import React from 'react';

import { getAll } from  '../Services/productService';
import axios from 'axios';

class Productos extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            products: []
        }
    }

    //se ejecuta antes del render
    componentDidMount(){
        
        axios.get("https://localhost:5001/api/Product").then(res=>{
            console.log(res);
            this.setState({products: res.data }); 
        }).catch(error => {
            console.log("getAll error: "+error)
            return error
        });/*

        let _p = getAll().then(res=>{
            console.log("then: "+res);
        });
        this.setState({products: _p });
        console.log("producto: "+_p);
         
        console.log("estado: "+this.state.products);*/
    }

    componentWillUnmount(){

    }

    render() {
        return (
            <div className="col-1">
                <h2>Productos</h2>
                <ul>
                    { this.state.products.map(_p => <li key={_p.id}><img src={_p.image} alt="icon" width="200" /></li>)}
                </ul>
            </div>
        );
    }
}

export default Productos;