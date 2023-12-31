let body = document.body;

// Date and time control
let date = new Date();
let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let dayTemp = document.querySelectorAll('.day-temp');

// Change Light and Dark Theme
let light = document.getElementById('light');
let dark = document.getElementById('dark');

// Change to Light Mode
light.addEventListener('click', () => {
    body.setAttribute("data-bs-theme", "light");
});

// Change to Dark Mode
dark.addEventListener('click', () => {
    body.setAttribute("data-bs-theme", "dark");
});

// Get City
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
let description = document.getElementById('des');
let weathericon = document.querySelectorAll('.weather-icon');


searchCity.addEventListener('click', () => {

    // Get City Value
    let cityVal = city.value;
    console.log(cityVal);

    // API
    let getWeather = async () => {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.value}?unitGroup=metric&key=FRFZE2FK7T29PWU4MTEKB3UC2`;

        try {
            const response = await fetch(url);
            const result = await response.json();


            // Display Data
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
            des.innerHTML = "(" + result.description + ")";

            // Display Weather Icon according to the conditions and timing
            if (result.currentConditions.conditions == "Clear") {
                if (date.getHours() >= 6 && date.getHours() <= 18) {
                    weatherImg.innerHTML = '<img src="assets/sun.png" alt="">'
                }
                else {
                    weatherImg.innerHTML = '<img src="assets/moon.png" alt="">'
                }
            }
            if (result.currentConditions.conditions == "Partially cloudy") {
                if (date.getHours() >= 6 && date.getHours() <= 18) {
                    weatherImg.innerHTML = '<img src="assets/sunBehindCloud.png" alt="">'
                }
                else {
                    weatherImg.innerHTML = '<img src="assets/moonBehindCloud.png" alt="">'
                }
            }
            if (result.currentConditions.conditions == "Rain, Overcast" || result.currentConditions.conditions == "Rain") {
                weatherImg.innerHTML = '<img src="assets/LightRain.png" alt="">'
            }
            if (result.currentConditions.conditions == "Overcast") {
                weatherImg.innerHTML = '<img src="assets/DarkCloud.png" alt="">'
            }
            if (result.currentConditions.conditions == "Cloudy") {
                weatherImg.innerHTML = '<img src="assets/DarkCloud.png" alt="">'
            }

            // console.log(result);

            // Display Day

            // Issue: The days are not displaying in the correct order
            const currentDay = date.getDay()
            weekDays.forEach((day, index) => {
                // console.log(currentDay)
                if (index < currentDay) {
                   let shift = weekDays.shift();
                    weekDays.push(shift);
                }
            });
            console.log(currentDay);
            Array.from(document.getElementsByClassName('day')).forEach((day, index) => {
                // console.log(day);
                day.innerHTML = weekDays[index];
            });
             
            // Display Day Temp
            Array.from(dayTemp).forEach((day, index) => {
                day.innerHTML = result.days[index].temp;
            });

            // Display Day weather icon
            Array.from(weathericon).forEach((icon, index) => {
                if (result.days[index].conditions == "Clear") {
                    icon.innerHTML = '<i class="fa-solid fa-sun fa-2xl" style="color: #c2c2c2;"></i>'
                }
                else if (result.days[index].conditions == "Partially cloudy") {
                    icon.innerHTML = '<i class="fa-solid fa-cloud-sun fa-2xl" style="color: #c2c2c2;"></i>'
                }
                else if (result.days[index].conditions == "Rain, Overcast" || result.days[index].conditions == "Rain") {
                    icon.innerHTML = '<i class="fa-solid fa-cloud-rain fa-2xl" style="color: #c2c2c2;"></i>'
                }
                else if (result.days[index].conditions == "Overcast") {
                    icon.innerHTML = '<i class="fa-solid fa-cloud-rain fa-2xl" style="color: #c2c2c2;"></i>'
                }
                else if (result.days[index].conditions == "Cloudy") {
                    icon.innerHTML = '<i class="fa-solid fa-cloud fa-2xl" style="color: #c2c2c2;"></i>'
                }
                else if (result.days[index].conditions == "Rain, Partially cloudy") {
                    icon.innerHTML = '<i class="fa-solid fa-cloud-sun-rain fa-2xl" style="color: #c2c2c2;"></i>'
                }
            });


        }
        // Error Handling 
        catch (error) {
            alert('City not found');
        }
    }
    getWeather();
});
