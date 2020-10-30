import axios from 'axios';

const productUrl="https://localhost:5001/api/Product";

export const productService = {
    getAll,
    post
};



async function getAll() {
    //let user = JSON.parse(localStorage.getItem('user'));
    //const authHeader = {'Authorization': 'Basic ' + user.authdata};
    //console.log(authHeader);
    await axios.get(productUrl).then(res=>{
        //console.log(res.data);
        return res.data;
        
    }).catch(error => {return error});
}

async function post(data){
    await axios.post(productUrl,data).then(res=>{
        console.log(res.status);
        return res.status;
    })
}

export default productService;