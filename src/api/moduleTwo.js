import axios from './httpAxios';

function getData() {
  return axios.get('/yyy')
}

export default {
  getData
}
