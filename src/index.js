import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce')

const countryList = document.querySelector(".country-list");

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(event ){
    const inputValue = event.target.value.trim();

    if(inputValue !== ""){
        fetchCountries(inputValue).then(data =>{
            data;
            if(data.length > 10){
                Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.")
            }
            else if(data.length > 2 && data.length < 10){
                countryList.innerHTML = createMarkupCountries(data);
            }
            else if(data.length === 1){
                countryList.innerHTML = createMarkupAllAboutCountries(data);
            }
        }).catch(error => {
            Notiflix.Notify.warning("Oops, there is no country with that name")
        });
    }else{
        countryList.innerHTML = "";
    };
};

function createMarkupAllAboutCountries (countries){
    return countries.map(({ name,capital,population,flags,languages }) => 
    ` 
    <li><img src="${flags.svg}"  alt="${name.official}" width="25"/> "${name.official}"</li>
    <li>capital:"${capital}"</li>
    <li>population:"${population}"</li>
    <li>languages:"${languages}"</li>
    `
    )
    .join('');
};

function createMarkupCountries (countries){
    return countries.map(({ name,flags }) => 
    `
    <li><img src="${flags.svg}"  alt="${name.official}" width="25"/> "${name.official}" </li>
    `
    )
    .join('');
};
