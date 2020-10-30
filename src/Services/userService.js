import axios from 'axios';

const userUrl="https://localhost:5001/api/User";
const userAuthUrl="https://localhost:5001/api/User/authenticate";

export const userService = {
    login,
    logout,
    getAll,
    post
};

async function login(e, p) {    
    try{
        await axios.post(userAuthUrl, {
            email: e,
            password: p
        }).then(user =>{
            if (user.status === 401)
            {
                logout();
            }

            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.config = '';
                user.data.authdata = window.btoa(e+':'+p);
                localStorage.setItem('user', JSON.stringify(user.data));
            }            
            return user;   
        });        
    }catch (e){
        console.log(e);
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAll() {
    //let user = JSON.parse(localStorage.getItem('user'));
    //const authHeader = {'Authorization': 'Basic ' + user.authdata};
    //console.log(authHeader);
    await axios.get(userUrl).then(res=>{
        //console.log(res.data);
        return res.data;
        
    }).catch(error => {return error});
}

async function post(data){
    await axios.post(userUrl,data).then(res=>{
        console.log(res.status);
        return res.status;
    })
}

export default userService;