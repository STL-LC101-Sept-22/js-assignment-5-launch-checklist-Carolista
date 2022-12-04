window.addEventListener("load", function() {

  myFetch().then(function(planets) {
    let planet = pickPlanet(planets);
    addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
  });

  // Form elements
  const pilotInput = document.querySelector('[name=pilotName]');
  const copilotInput = document.querySelector('[name=copilotName]');
  const fuelLevelInput = document.querySelector('[name=fuelLevel]');
  const cargoMassInput = document.querySelector('[name=cargoMass]');
  const submitButton = document.getElementById('formSubmit');

  // List
  const faultyItems = document.getElementById('faultyItems');

  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    formSubmission(document, faultyItems, pilotInput.value, copilotInput.value, fuelLevelInput.value, cargoMassInput.value);
  });
   
});
