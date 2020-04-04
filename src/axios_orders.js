import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-app-burger-builder-6284f.firebaseio.com/'
})

export default instance; 