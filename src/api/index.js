import Axios from 'axios';
const baseURL = 'http://localhost:5000/';

export function httpRequest (endpoint, method, data, headers={}, callback=null){
    var token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }
    headers['Content-Type'] = 'application/json';
    return Axios({
        method: method,
        url: baseURL + endpoint,
        data: data,
        headers: headers
    })
    .then(function (response) {
        if(callback){
          callback(response.data);
        }
        return response.data
    });
}
