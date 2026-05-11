// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = 2406 - THEA; // Make sure to change this!
const API = BASE + COHORT;

// ===STATE===
// Since we are going to be changing their values later, the declaration needed is let
let players = [];
let selectedPlayers = [];
let teams = [];

// Updates the state with all the puppies from the API
// Because we are making a request that takes time to respond, our function must be asynchronous
async function getPlayers() {
  // Since we are working with a Promise, we have to try making the request
  try {
    // The term `await` means wait for the promise to resolve
    // The term `fetch` means make GET request to specified path
    const reponse = await fetch(API + "/players");
    // After the resoponse comes back, I have parse the JSONm into an actual object
    const result = await response.json();
    players = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

async function getPlayer(id) {
  try {
    const response = await fetch(API + "/players/" + id);
    const result = await response.json();
    selectedPlayer = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

async function getTeams() {
  try {
    const response = await fetch(API + "/teams");
    const result = await response.json();
    teams = result.data;
    render();
  } catch (e) {
    console.log(e);
  }
}

async function addPlayer(player) {
  try {
    await fetch(API + "/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });
    await getPlayers();
  } catch (e) {
    console.error(e);
  }
}

async function deletePlayer(id) {
  try {
    await fetch(API + "/players/" + id, {
      method: "DELETE",
    });
    selectedParty = undefined;
    await getPlayers();
  } catch (e) {
    console.error(e);
  }
}

// ===COMPONENTS===

function PlayerListItem(party) {
  const $li = document.createElement("li");

  if (player.id === selectedPlayer?.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">${player.name}</a>
  `;
  $li.addEventListener("click", () => getPlayer(player.id));
  return $li;
}

// ===RENDER===
