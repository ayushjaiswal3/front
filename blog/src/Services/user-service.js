import { myAxios } from "./Const";


export const signUp = (user) => {
    return myAxios
        .post('/auth/signup', user)   
        .then((response) => response.data);
}

export const loginUser = (loginDetail) => {
    return myAxios
        .post('/auth/login', loginDetail) 
        .then((response) => response.data);
}
