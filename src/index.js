import "./style.css";

function changeLocation() {
    let newLocation = prompt("Enter a new location: ");

    // When the prompt is cancelled
    if (newLocation === null) {
        return;
    }

    // Capitalize
    newLocation = String(newLocation).charAt(0).toUpperCase() + String(newLocation).slice(1);
    changeWeather(newLocation);
}

function changeWebpageValues(temp, condition, location) {
    const tempHeader = document.querySelector("h1");
    const conditionHeader = document.querySelector(".conditions");
    const locationHeader = document.querySelector("h3");

    tempHeader.textContent = temp;
    conditionHeader.textContent = condition.toLowerCase();
    locationHeader.textContent = location;

    // Change styles based on weather


}

async function changeWeather(location) {
    const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.toLowerCase()}?key=QNFJFT2XA2Y3W6L7VYYA2899S&unitGroup=uk&include=current`, {mode: 'cors'});

    weatherData.json().then(function(weatherData) {
        console.log(weatherData)
        changeWebpageValues(weatherData.currentConditions.temp, weatherData.currentConditions.conditions, location);
    }).catch(function() {
        alert("Location not found!");
    })
}

function changeDayTime() {

}

function changeNightTime() {
    
}


// Base location
changeWeather("London");

// Event Listener for change location
const changeLocationButton = document.querySelector(".edit");
changeLocationButton.addEventListener("click", changeLocation);