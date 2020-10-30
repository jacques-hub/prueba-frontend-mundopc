import React from 'react';
import {post} from '../Services/productService';

class Producto extends React.Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);

        this.state = {
            code: '',
            description: '',
            saleprice:0,
            stock:0,
            selectedFile:null,
            imagePreviewUrl: null,
            image:'',
            submitted: false,
            loadind: false,
            error: ''
        }
    }

    handleChange(event) {
        const value = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        const name = event.target.name;

        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });

        // stop here if form is invalid
        if (!(this.state.code && this.state.description)) {
            return;
        }

        this.setState({ loading: true }); 

        const data = {
            code: this.state.code,
            description: this.state.description,
            saleprice: this.state.saleprice,
            stock: this.state.stock,
            image: this.state.image
        }  
        console.log(data.image);
        post(data).then(res=>
        {
            
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            this.props.history.push(from);
        });
    }

    onFileChange(e){
        e.preventDefault();

        let file = e.target.files[0];
        if (file){
            const reader = new FileReader();
            reader.onloadend = (e) => {
                let binaryString = e.target.result;
                this.setState({
                    selectedFile: file[0],
                    imagePreviewUrl: reader.result, 
                    image: btoa(binaryString)  
                });
            }
            reader.readAsDataURL(file);
        }                
    }

    render() {
        let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
        }

        const { code, description, saleprice, stock, submitted, loading, error } = this.state;
        
        return (
            <div className="col-1">
                <h2>Alta de Producto</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !code ? ' has-error' : '')}>
                        <label htmlFor="code">Code</label>
                        <input type="text" className="form-control" name="code" value={code} onChange={this.handleChange} />
                        {submitted && !code &&
                            <div className="help-block">Code is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name="description" value={description} onChange={this.handleChange} />
                        {submitted && !description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !saleprice ? ' has-error' : '')}>
                        <label htmlFor="saleprice">Saleprice</label>
                        <input type="number" className="form-control" name="saleprice" value={saleprice} onChange={this.handleChange} />
                        {submitted && !saleprice &&
                            <div className="help-block">Saleprice is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !stock ? ' has-error' : '')}>
                        <label htmlFor="stock">Stock</label>
                        <input type="number" className="form-control" name="stock" value={stock} onChange={this.handleChange} />
                        {submitted && !stock &&
                            <div className="help-block">Stock is required</div>
                        }
                    </div>

                    <div> 
                        <input type="file" name='image' accept=".jpeg, .png, .jpg" onChange={this.onFileChange} />                         
                    </div> 

                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Add Product</button>
                        {loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
                { $imagePreview }
            </div>
        );
    }
}

export default Producto;