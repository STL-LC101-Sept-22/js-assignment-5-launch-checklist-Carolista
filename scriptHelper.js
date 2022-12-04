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
  let pilotValidation = validateInput(pilot);
  let copilotValidation = validateInput(copilot);
  let fuelLevelValidation = validateInput(fuelLevel);
  let cargoMassValidation = validateInput(cargoMass);

  if (pilotValidation === "Empty" || copilotValidation === "Empty" || fuelLevelValidation === "Empty" || cargoMassValidation === "Empty") {
    window.alert('\nAll fields are required.\n');
  } else if (pilotValidation === "Is a Number" || copilotValidation === "Is a Number") {
    window.alert('\nPlease enter valid pilot and copilot names.\n');
  } else if (fuelLevelValidation === "Not a Number" || cargoMassValidation === "Not a Number") {
    window.alert('\nFuel level and cargo mass must be valid numbers.\n')
  } else {

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

    // Change color of heading depending on fuelStatus and cargoStatus
    if (fuelLevel < 10000 || cargoMass > 10000) {
      launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
      launchStatus.style.color = 'red';
    } else {
      launchStatus.innerHTML = 'Shuttle is Ready for Launch';
      launchStatus.style.color = 'green';
    }

    // Make list visible
    list.style.visibility = 'visible';
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
