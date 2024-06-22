"use strict"
const daily = document.querySelector("row")
const countrySearchInput = document.getElementById("country-search")
const btn = document.getElementById("btn")
const degreeC = document.getElementById("degreeC")
const degreeF = document.getElementById("degreeF")
getLocation()
btn.addEventListener("click", function () {

    countrySearch = countrySearchInput.value
    getWeather(countrySearch)
})
let countrySearch
try {

} catch (error) {

}
getWeather("london")
if (countrySearch == "") {
    countrySearch = 'london'
    getWeather(countrySearch)
}

countrySearchInput.addEventListener("input", function () {
    try {
        if (validationInput() == true) {
            countrySearch = countrySearchInput.value
            try {
                getWeather(countrySearch)
            } catch (error) {
                console.log("erororoorr")
            }

        }
        else {
            console.log("not yet")
        }
    }
    catch (error) {
        console.log("error")
    }


})
let weatherList = []
let locationName
let countryName
let regionName
async function getWeather(countrySearch) {
    try {
        let url = `https://api.weatherapi.com/v1/forecast.json?key=efe3449119b24cc2b27103018241306&q=${countrySearch}&days=4`
        let apiCountry = await fetch(url)
        let response = await apiCountry.json()

        weatherList = response.forecast.forecastday
        locationName = response.location.name
        countryName = response.location.country
        regionName = response.location.region
        console.log(locationName)
        displayWeather(locationName);

        console.log(weatherList);
    }
    catch (error) {
        console.log("error22")
    }



}
function degreeInC() {
    let today = ``
    today = `    
                    <div class="today ">
                  
                        <h1>${locationName}</h1>
                          <div class="location  mx-auto ">
                         <h2>${regionName}</h2>
                        <h2>${countryName}</h2>
                       
                         </div>
                        <div
                            class="today-content d-flex justify-content-evenly  align-items-center text-center mx-auto">
                            <img src="https://${weatherList[0].day.condition.icon}" class="img-fluid" alt="...">

                            <h3>${weatherList[0].day.avgtemp_c}°C</h3>
                    
                        </div>
                        <span>${weatherList[0].day.condition.text}</span>
                     
                    </div>
                `
    console.log(document.getElementById("today"))
    console.log(countrySearch)
    return today;
}


function getWeatherText(weather) {


    if (weather == 'sunny') {
        weatherText = `<i class="fa-regular fa-sun"></i>`
    }
    else if (weather == 'Moderate rain') {
        weatherText = `<i class="fa-solid fa-cloud-rain mb-3 mt-1"></i>`

    }
    else if (weather == 'Partly Cloudy') {
        weatherText = `<i class="fa-solid fa-cloud-sun"></i>`

    }
    else if (weather == 'Patchy rain nearby') {
        weatherText = `<i class="fa-solid fa-cloud-rain"></i>`

    }
    console.log(document.getElementById("sticker"))
    document.getElementById("sticker").innerHTML += weatherText
}

function validationInput() {
    let Regex = /^[a-z]{3,}$/;
    try {
        if (Regex.test(countrySearchInput.value) == true) {
            console.log("true")
            return true
        }
        else {
            console.log(countrySearchInput.value)
            return false
        }
    } catch (error) {
        console.log("sssss")
    }

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
let responseCity
async function showPosition(position) {
    const bdcAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
    let loc = await fetch(bdcAPI)
    let response = await loc.json()

    responseCity = response.city
    displayWeather(responseCity)
    getWeather(responseCity)
    console.log(responseCity)


}
/* function getAPI(bdcAPI) */


let date
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month
function displayWeather(locationName) {
    let container = ``

    for (let i = 0; i < weatherList.length; i++) {
        console.log(weatherList.length);

        date = new Date(weatherList[i].date)

        if (i == 0) {
            container += `<div class="col-md-3 ">

            <div class="daily  text-start">
                <div class="daily-day container  d-flex justify-content-between ">
                    <h4>Today</h4>
                    <h4>${date.getDate()}</h4>

                </div>
                <div class="daily-details container ">
                    <div class="country  ">
                        <h2>${locationName}</h2>
                    </div>
                    <div id="sticker" class="mt-2 ">    <img src="https://${weatherList[i].day.condition.icon}" class="img-fluid" alt="..."></div>
                    <div class="degree">

                        <h2 class="major fw-bold ">${weatherList[i].day.maxtemp_c}°C</h2>
                        <h3 class="minor ">${weatherList[i].day.mintemp_c}°C</h3>

                    </div>
                    <span>${weatherList[i].day.condition.text}</span>
                    <div class="weatherDetails d-flex justify-content-between">
                        <div class="wind  d-flex justify-content-between ">
                            <i class="fa-solid fa-wind"></i>
                            <p>${weatherList[i].day.maxwind_kph}</p>
                        </div>
                        <div class="sun  d-flex  justify-content-between ">
                            <i class="fa-solid fa-umbrella"></i>
                            <p>${weatherList[i].day.maxwind_kph}</p>
                        </div>
                        <div class="compass  d-flex  justify-content-between ">
                            <i class="fa-solid fa-compass"></i>
                            <p>${weatherList[i].day.maxwind_kph}</p>
                        </div>
                    </div>


                </div>

            </div>
        </div>
      
       `
        }
        else {
            container += `<div class="col-md-3 ">

                    <div class="daily  text-start">
                        <div class="daily-day container  d-flex justify-content-between  ">
                            <h4>${days[date.getDay()]}</h4>
                            <h4>${date.getDate()}</h4>

                        </div>
                        <div class="daily-details container ">
                            <div class="country  ">
                                <h2>${locationName}</h2>
                            </div>
                            <div id="sticker" class="mt-2 ">  <img src="https://${weatherList[i].day.condition.icon}" class="img-fluid" alt="..."></div>
                            <div class="degree">

                                <h2 class="major fw-bold ">${weatherList[i].day.maxtemp_c}°C</h2>
                                <h3 class="minor ">${weatherList[i].day.mintemp_c}°C</h3>

                            </div>
                            <span>${weatherList[i].day.condition.text}</span>
                            <div class="weatherDetails d-flex justify-content-between">
                                <div class="wind  d-flex justify-content-between ">
                                    <i class="fa-solid fa-wind"></i>
                                    <p>${weatherList[i].day.maxwind_kph}</p>
                                </div>
                                <div class="sun  d-flex  justify-content-between ">
                                    <i class="fa-solid fa-umbrella"></i>
                                    <p>${weatherList[i].day.maxwind_kph}</p>
                                </div>
                                <div class="compass  d-flex  justify-content-between ">
                                    <i class="fa-solid fa-compass"></i>
                                    <p>${weatherList[i].day.maxwind_kph}</p>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
              
               `

        }
    }

    document.getElementById("rowData").innerHTML = degreeInC() + container
}