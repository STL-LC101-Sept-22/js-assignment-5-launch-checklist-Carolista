// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
  const missionTarget = document.getElementById('missionTarget');

  missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
  `;
}

function validateInput(testInput) {
  if (!testInput) {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {

  // Heading and list items
  const launchStatus = document.getElementById('launchStatus');
  const pilotStatus = document.getElementById('pilotStatus');
  const copilotStatus = document.getElementById('copilotStatus');
  const fuelStatus = document.getElementById('fuelStatus');
  const cargoStatus = document.getElementById('cargoStatus');

  // Update pilot and copilot names
  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

  // Update fuel status depending on range
  if (fuelLevel < 10000) {
    fuelStatus.innerHTML = 'Fuel level too low for launch';
  } else {
    fuelStatus.innerHTML = 'Fuel level high enough for launch';
  }

  // Update cargo status depending on range
  if (cargoMass > 10000) {
    cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
  } else {
    cargoStatus.innerHTML = 'Cargo mass low enough for launch';
  }

  // Change heading depending on fuelStatus and cargoStatus
  // Make list visible if not ready
  if (fuelLevel < 10000 || cargoMass > 10000) {
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = 'rgb(199, 37, 78)';
    list.style.visibility = 'visible';
  } else {
    launchStatus.innerHTML = 'Shuttle is Ready for Launch';
    launchStatus.style.color = 'rgb(65, 159, 106)';
    list.style.visibility = 'hidden';
  }
}

async function myFetch() {
  let response = await fetch('https://handlers.education.launchcode.org/static/planets.json');
  let allPlanets = await response.json();
  return allPlanets;
}

function pickPlanet(planets) {
  let index = Math.floor(Math.random() * planets.length);
  return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
