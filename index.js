"use strict";

const apiID = "1d539d19";
const apiKEY = "af737d215d16f93d0e44e346edf7e628";
const searchURL = "https://api.edamam.com/search";
const maxCookingTime = "45";

function displayResults(responseJson) {
  $("#spinner").addClass("hidden");
  console.log(responseJson);

  $("#results-list").empty();
  for (let i = 0; i < responseJson.hits.length; i++) {
    $("#results-list").append(
      `<li><h3><a target="_blank" href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.label}</a></h3>
            <img src='${responseJson.hits[i].recipe.image}'>
            </li>`
    );
  }
  $("#results").removeClass("hidden");
}

function getRecipes(query) {
  $("#spinner").removeClass("hidden");

  var url =
    searchURL +
    "?q=" +
    query +
    "&app_id=" +
    apiID +
    "&app_key=" +
    apiKEY +
    "&time=" +
    maxCookingTime;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    // SHOW THE SPINNER ICON HERE

    event.preventDefault();
    const searchTerm = $("#js-search-term").val();

    getRecipes(searchTerm);
  });
}

$(watchForm);
