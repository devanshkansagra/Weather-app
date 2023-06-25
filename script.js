let body = document.body;

const date = new Date();

// Change Light and Dark Theme
let light = document.getElementById('light');
let dark = document.getElementById('dark');

// Change to Dark Mode
light.addEventListener('click', () => {
    body.setAttribute("data-bs-theme", "light");
});

// Change to light Mode
dark.addEventListener('click', () => {
    body.setAttribute("data-bs-theme", "dark");
});

let city = document.getElementById('city');
let searchCity = document.getElementById('searchCity');

// Data Sections
let temp = document.getElementById('temp');
let cityCont = document.getElementById('city-cont');
let windspeed = document.getElementById('winspeed');
let humidity = document.getElementById("humid");
let feelslike = document.getElementById('feelslike');
let conditions = document.getElementById('conditions');
let uvIndex = document.getElementById('uvIndx');
let weatherImg = document.getElementById('weatherImg');
let visiblity = document.getElementById('visiblity');
let pressure = document.getElementById('pressure');
let sunrise = document.getElementById('sunr');
let sunset = document.getElementById('suns');
let windDir = document.getElementById('windDir');


searchCity.addEventListener('click', () => {
    
    let cityVal = city.value;
    console.log(cityVal);

    // API
    let getWeather = async () => {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.value}?unitGroup=metric&key=FRFZE2FK7T29PWU4MTEKB3UC2`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            temp.innerHTML = result.currentConditions.temp;
            cityCont.innerHTML = result.resolvedAddress;
            windspeed.innerHTML = result.currentConditions.windspeed
            humidity.innerHTML = result.currentConditions.humidity;
            feelslike.innerHTML = result.currentConditions.feelslike;
            conditions.innerHTML = result.currentConditions.conditions
            pre.innerHTML = result.currentConditions.precip;
            uvIndex.innerHTML = result.currentConditions.uvindex;
            visiblity.innerHTML = result.currentConditions.visibility;
            pressure.innerHTML = result.currentConditions.pressure
            sunrise.innerHTML = result.currentConditions.sunrise;
            sunset.innerHTML = result.currentConditions.sunset;
            windDir.innerHTML = result.currentConditions.winddir;

            if(result.currentConditions.conditions == "Clear") {
                if(date.getHours() >= 6 && date.getHours() <= 18) {
                    weatherImg.innerHTML = '<img src="assets/sun.png" alt="">'
                }
                else {
                    weatherImg.innerHTML = '<img src="assets/moon.png" alt="">'
                }
            }
            if(result.currentConditions.conditions == "Partially cloudy") {
                if(date.getHours() >= 6 && date.getHours() <= 18) {
                    weatherImg.innerHTML = '<img src="assets/sunBehindCloud.png" alt="">'
                }
                else {
                    weatherImg.innerHTML = '<img src="assets/moonBehindCloud.png" alt="">'
                }
            }
            if(result.currentConditions.conditions == "Rain, Overcast" || result.currentConditions.conditions == "Rain") {
                weatherImg.innerHTML = '<img src="assets/LightRain.png" alt="">'
            }
            if(result.currentConditions.conditions == "Overcast") {
                weatherImg.innerHTML = '<img src="assets/DarkCloud.png" alt="">'
            }
            if(result.currentConditions.conditions == "Cloudy") {
                weatherImg.innerHTML = '<img src="assets/DarkCloud.png" alt="">'
            }

            console.log(result);
            
            
        } catch (error) {
            console.error(error);
        }
    }
    getWeather();
});
