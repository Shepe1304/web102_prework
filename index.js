/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// REMEMBER TO DELETE LATER
// GAMES_JSON[2].pledged = -1;

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  games.forEach((game) => {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameCard.innerHTML = `<h3>${game.name}</h3>
                          <p>${game.description}</p>
                          <img src="${game.img}" class="game-img"/>
                          <p>Funded: ${game.pledged}/${game.goal}</p>`;

    // append the game to the games-container
    gamesContainer.append(gameCard);
  });
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`; //US English code

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const amountRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${amountRaised.toLocaleString("en-US")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // Small Customization: changing the style of the buttons to indicate that the "Show Unfunded Only" filter is in effect
  if (fundedBtn.classList.contains("button-selected"))
    fundedBtn.classList.remove("button-selected");
  if (allBtn.classList.contains("button-selected"))
    allBtn.classList.remove("button-selected");
  if (!unfundedBtn.classList.contains("button-selected"))
    unfundedBtn.classList.add("button-selected");

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);

  // scroll to the beginning of games section
  scrollToGamesSection();
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // Small Customization: changing the style of the buttons to indicate that the "Show Unfunded Only" filter is in effect
  if (unfundedBtn.classList.contains("button-selected"))
    unfundedBtn.classList.remove("button-selected");
  if (allBtn.classList.contains("button-selected"))
    allBtn.classList.remove("button-selected");
  if (!fundedBtn.classList.contains("button-selected"))
    fundedBtn.classList.add("button-selected");

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);

  // scroll to the beginning of games section
  scrollToGamesSection();
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // Small Customization: changing the style of the buttons to indicate that the "Show Unfunded Only" filter is in effect
  if (fundedBtn.classList.contains("button-selected"))
    fundedBtn.classList.remove("button-selected");
  if (unfundedBtn.classList.contains("button-selected"))
    unfundedBtn.classList.remove("button-selected");
  if (!allBtn.classList.contains("button-selected"))
    allBtn.classList.add("button-selected");

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);

  // scroll to the beginning of games section
  scrollToGamesSection();
}

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => {
  return game.goal > game.pledged;
});

const totalUnfundedGames = unfundedGames.length;

// use filter to count the number of funded games
const fundedGames = GAMES_JSON.filter((game) => {
  return game.goal > game.pledged;
});

const totalFundedGames = fundedGames.length;

// use reduce to count the total funding received
const totalFunding = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalFunding.toLocaleString(
  "en-US"
)} has been raised for ${totalFundedGames} games. Currently, ${
  totalUnfundedGames === 1
    ? `${totalUnfundedGames} game`
    : `${totalUnfundedGames} games`
} remains unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const description = document.createElement("p");
description.innerHTML = displayStr;
descriptionContainer.append(description);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...remainingGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameName = document.createElement("div");
firstGameName.innerHTML = `${firstGame.name}`;
firstGameContainer.append(firstGameName);

// do the same for the runner up item
const secondGameName = document.createElement("div");
secondGameName.innerHTML = `${secondGame.name}`;
secondGameContainer.append(secondGameName);

/************************************************************************************
 * Big Customization 1: "Our Games" section scrolling to view upon navigation
 */

function scrollToGamesSection() {
  const gameSection = document.getElementById("games-section");
  gameSection.scrollIntoView({ behavior: "smooth" });
}

const scrollToOurGamesBtn = document.getElementById("header-our_games_nav");

// making the games section scroll into view when navigation button is clicked
scrollToOurGamesBtn.addEventListener("click", scrollToGamesSection);

/************************************************************************************
 * Big Customization 2: Filter buttons sticking in place when the user scrolls down
 */

// function to check if the top of the element is above the top of the viewport
function hasReachedTopOfPage(element) {
  const border = element.getBoundingClientRect();

  // Check if the top of the element is above the top of the viewport
  return border.top <= 0;
}

const buttonContainer = document.getElementById("button-container");

// constantly checking if the user has scrolled past the button container
window.addEventListener("scroll", () => {
  if (hasReachedTopOfPage(buttonContainer)) {
    if (!buttonContainer.classList.contains("shadow"))
      buttonContainer.classList.add("shadow");
  } else {
    if (buttonContainer.classList.contains("shadow"))
      buttonContainer.classList.remove("shadow");
  }
});

/************************************************************************************
 * Big Customization 3: Search bar for games
 */

const searchInput = document.getElementById("header-search_input");
const searchBtn = document.getElementById("header-search_button");

function searchGameName() {
  const searchInputText = searchInput.value
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  console.log(searchInputText);

  const searchInputTextArray = searchInputText.split(" ");
  const matchingGames = GAMES_JSON.filter((game) => {
    let check = false;
    searchInputTextArray.forEach((word) => {
      if (game.name.trim().toLowerCase().includes(word)) {
        check = true;
        return;
      }
    });
    return check;
  });

  deleteChildElements(gamesContainer);
  addGamesToPage(matchingGames);

  if (matchingGames.length === 0) {
    const message = document.createElement("div");
    message.innerHTML = `<p>We can't find games that match "${searchInput.value}" in their names. Would you like to try again?</p>`;
    gamesContainer.append(message);
  }

  gamesContainer.scrollIntoView({ behavior: "smooth" });
}

// Making Search button execute the Search function
searchBtn.addEventListener("click", () => {
  searchGameName();
});

// Making "Enter" also execute the Search function
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchGameName();
});

/************************************************************************************
 * Big Customization 4: Funding Display, Donation Form, and Display after Donation
 */
