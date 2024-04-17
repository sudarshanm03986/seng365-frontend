import axios from "axios";



const userLogin = (email: string, password: string) => {

    axios.post(process.env.REACT_APP_DOMAIN + '/users/login', {"email": email, "password": password})
    .then ((res) => {

        
        axios.defaults.headers.common = {
            'x-authorization': res.data.token
        }

        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('token', res.data.token)

        return res.data;
        

    }, (err) => {

        throw err
    })
    
    

}
 
export {userLogin};