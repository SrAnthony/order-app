import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://gpbares.herokuapp.com/',
})
