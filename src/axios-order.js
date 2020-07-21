import axios from "axios";


const instance = axios.create({
    baseURL: 'https://burgerbuilder-cfd3e.firebaseio.com/'
});

const successHandler = (response) => {
    return response;
};

const errorHandler = (error) => {
    if(error){
        console.log(error.message);
    }
    return Promise.reject({ ...error });
};


/*instance.interceptors.request.use(
    request => successHandler(request),
    error => errorHandler(error)
);
instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
);*/



export default instance;
