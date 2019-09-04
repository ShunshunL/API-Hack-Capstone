'use strict';

const apiID = "1d539d19";
const apiKEY = "af737d215d16f93d0e44e346edf7e628";
const searchURL = "https://api.edamam.com/search";
const maxCookingTime = '45';

// function formatQueryParams(params) {
//     const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     return queryItems.join('&');
// }

function displayResults(responseJson) {

    // HIDE THE SPINNER ICON HERE

    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.hits.length; i++){
        $('#results-list').append(
            `<li><h3><a href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.label}</a></h3>
            <img src='${responseJson.hits[i].recipe.image}'>
            </li>`
    )};
}

function getRecipes(query) {
    var url = searchURL + "?q=" + query + "&app_id=" + apiID + "&app_key=" + apiKEY + "&time=" + maxCookingTime;

    // if(diet !== null) {
    //     url = url + "&diet=" + diet;
    // }
    // if(calories !== null) {
    //     url = url + "&calories=" + calories;
    // }
    // if(mealType !== null) {
    //     url = url + "&mealType=" + mealType;
    // }
    
    // const params = {
    //     app_key: apiKEY,
    //     app_id: apiID,
    //     time: '45',
    //     q: query 
    // }

    // const queryString = formatQueryParams(params);
    // // const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url) 
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
}

function watchForm() {
    $('form').submit(event => {

        // SHOW THE SPINNER ICON HERE

        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        // const diet = $('#js-diet').val();
        // const calories = $('#js-max-calories').val();
        // const mealType = $('#js-meal-type').val();
        getRecipes(searchTerm);
    })
}

$(watchForm);