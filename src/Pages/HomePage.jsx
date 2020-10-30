import React from 'react';
import { Link } from 'react-router-dom';
import userService from '../Services/userService';
import axios from 'axios';

class HomePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        
        let u = JSON.parse(localStorage.getItem('user'));
        
        this.setState({
            user: {firstName: u.firstName}
        });   
        
        let usuarios=
        userService.getAll();
            console.log(
            usuarios); 
        this.setState({users: [{usuarios}]});
        
    }

    render() {
        const { user, users } = this.state;
        return (
            <div className="col-10">
                <h1>Hola {user.firstName}!</h1>
                <p>You're logged in with React & Basic HTTP Authentication!!</p>
                <h3>Users from secure api end point:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.length &&
                    <ul>
                        { this.state.users.map(person => <li>{person.email}</li>)}
                    </ul>
                }
                <p>
                    <h4><Link to="/productos">Productos</Link></h4>
                    <h4><Link to="/producto">Nuevo Producto</Link></h4>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

export default HomePage;