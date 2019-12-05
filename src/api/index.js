import Axios from 'axios'

import Router from '../router'

const baseURL = 'http://localhost:5000/'

export function httpRequest (endpoint, method, data, headers = {}, callback = null) {
  var token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }
  headers['Content-Type'] = 'application/json'
  return Axios({
    method: method,
    url: baseURL + endpoint,
    data: data,
    headers: headers
  })
    .then(response => {
      if (callback) {
        callback(response.data)
      }
      return response.data
    })
    .catch(error => {
      let response = error.response
      if (response && response.status === 401 && response.data.message === 'access permission has expired') {
        Router.push('login')
        localStorage.clear()
      }
    })
}
