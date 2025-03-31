import "./style.css";

import cloudIcon from "./assets/cloud.svg";
import sunIcon from "./assets/sunny.svg";
import rainIcon from "./assets/rainy.svg";
import overcastIcon from "./assets/overcast.svg";
import moonIcon from "./assets/moon.svg";

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

function changeWebpageValues(temp, condition, location, icon) {
    condition = condition.toLowerCase();
    const tempHeader = document.querySelector("h1");
    const conditionHeader = document.querySelector(".conditions");
    const locationHeader = document.querySelector("h3");

    tempHeader.textContent = temp;
    conditionHeader.textContent = condition;
    locationHeader.textContent = location;

    // Change styles based on time of day
    if (icon.endsWith("day")) {
        changeDayTime(condition);
    } else if (icon.endsWith("night")) {
        changeNightTime(condition);
    } else {
        changeDayTime(condition);
    }
}

async function changeWeather(location) {
    const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.toLowerCase()}?key=QNFJFT2XA2Y3W6L7VYYA2899S&unitGroup=uk&include=current`, {mode: 'cors'});

    weatherData.json().then(function(weatherData) {
        changeWebpageValues(weatherData.currentConditions.temp, weatherData.currentConditions.conditions, location, weatherData.currentConditions.icon);
    }).catch(function() {
        alert("Location not found!");
    })
}

function changeDayTime(condition) {
    const root = document.documentElement;
    const weatherIcon = document.querySelector(".weather-icon");
    root.style.setProperty("--bg", "linear-gradient(0deg, rgba(105,163,205,1) 0%, rgba(64,137,224,1) 100%)");

    // Change weather icon
    if (condition.startsWith("rain")) {
        weatherIcon.src = rainIcon;
    } else if (condition.startsWith("partially cloudy")) {
        weatherIcon.src = cloudIcon;
    } else if (condition === "overcast") {
        weatherIcon.src = overcastIcon;    
    } else {
        weatherIcon.src = sunIcon;
    }
}

function changeNightTime(condition) {
    const root = document.documentElement;
    const weatherIcon = document.querySelector(".weather-icon");
    root.style.setProperty("--bg", "linear-gradient(180deg, #1a202c 0%, #293140 33.33%, #4a5568 100%)");

    if (condition.startsWith("rain")) {
        weatherIcon.src = rainIcon;
    } else if (condition.startsWith("partially cloudy")) {
        weatherIcon.src = cloudIcon;
    } else if (condition === "overcast") {
        weatherIcon.src = overcastIcon;    
    } else {
        weatherIcon.src = moonIcon;
    }
}


// Base location
changeWeather("London");

// Event Listener for change location
const changeLocationButton = document.querySelector(".edit");
changeLocationButton.addEventListener("click", changeLocation);