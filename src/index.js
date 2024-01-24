import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import getRefs from './js/getRefs';
import API from './js/fetchCountries';
import countriesListTpl from './templates/countries-list.hbs';
import countryCardTpl from './templates/country-card.hbs';
import './css/common.css';

const refs = getRefs();
const DEBOUNCE_DELAY = 500;
const ERROR_MESSAGE =
  'Too many matches found. Please enter a more specific query!';

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const searchQuery = e.target.value;

  if (searchQuery === '') {
    return;
  }

  API.fetchCountries(searchQuery).then(createMarkup);
}

function createMarkup(countries) {
  if (countries.length === 1) {
    refs.countriesContainer.classList.remove('countries-container');
    refs.countriesContainer.classList.add('country-card');
    refs.countriesContainer.innerHTML = countryCardTpl(countries[0]);
  } else if (countries.length > 1 && countries.length <= 10) {
    refs.countriesContainer.classList.remove('country-card');
    refs.countriesContainer.classList.add('countries-container');
    refs.countriesContainer.innerHTML = countriesListTpl(countries);
  } else {
    refs.countriesContainer.classList.remove('countries-container');
    refs.countriesContainer.innerHTML = '';
    error({
      text: ERROR_MESSAGE,
      delay: 2000,
    });
  }
}
