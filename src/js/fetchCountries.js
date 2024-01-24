const BASE_URL = 'https://restcountries.com/v2';

function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
    return response.json();
  });
}

export default { fetchCountries };
