import axios from 'axios';

const MAIN_API = 'https://rickandmortyapi.com/api/character/';

function getData(page, name, status) {
  return axios.get(MAIN_API, {
    params: {
      page: page,
      name: name,
      status: status
    }
  });
}

export default getData;
