import React from 'react';
import productService from '../Services/productService';

class Productos extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            products: []
        }
    }
    handleSubmit(e){
        e.preventDefault();

        let _p = productService.getAll();
        this.setState({products: [{_p}]});   
    }

    render() {
        return (
            <div className="col-1">
                <h2>Productos</h2>
                <ul>
                    { this.state.products.map(_p => <li>{_p.description}</li>)}
                </ul>
            </div>
        );
    }
}

export default Productos;