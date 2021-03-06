API_KEY = `1c52265fbcb1b6630b1b484fdf314634`
API_TODAY = `https://api.openweathermap.org/data/2.5/weather?q=Nanaimo,CA&units=metric&APPID=${API_KEY}`
API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Nanaimo,CA&units=metric&appid=${API_KEY}`

// fetch weather info, current day
fetch(API_TODAY)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        // city, country, current temperature & weather description
        const cityCountry = document.getElementById('city-country');
        const currentTemp = document.getElementById('current-temp');
        const description = document.getElementById('description');

        cityCountry.innerHTML = `${json.name}, ${json.sys.country}`;
        currentTemp.innerHTML = `${json.main.temp.toFixed(1)}°c`;
        description.innerHTML = `${json.weather[0].description}`;

        // sunrise  
        const sunrise = document.getElementById('sunrise');
        const sunriseValue = json.sys.sunrise;
        const sRise = new Date(sunriseValue * 1000); // multiple with 1000 since the data is given in seconds and JS uses milliseconds
        const sunriseHour = sRise.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false, timeZone: 'America/Los_Angeles'});
            
        sunrise.innerHTML = `<img class ="sunriseImg" src="./Images/sunrise.png" alt="Picture indicating a sunrise";> Sunrise: ${sunriseHour}`;

        // sunset
        const sunset = document.getElementById('sunset');
        const sunsetValue = json.sys.sunset
        const sSet = new Date(sunsetValue * 1000);
        const sunsetHour = sSet.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false, timeZone: 'America/Los_Angeles'});

        sunset.innerHTML = `<img class ="sunsetImg" src="./Images/sunset.png" alt="Picture indicating a sunset";>Sunset: ${sunsetHour}`;    
    });

    //fetch 5 day forecast
    fetch(API_FORECAST)
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        // filter to display temperature at 12:00 each day
        const forecasts = json.list
        const filteredForecast = forecasts.filter(forecast => forecast.dt_txt.includes("12:00:00"));

        // create weekday and temperature forEach filtered forecast
        filteredForecast.forEach((forecast) => {
            const temp = forecast.main.temp;
            const date = new Date(forecast.dt_txt);
            const options = { weekday: 'short' };
            const localDateString = date.toLocaleDateString('en-EN', options);
            const fiveDays = document.getElementById('five-days');
   
            fiveDays.innerHTML += `<p>${localDateString}. . . . . . . . . . . . . . . . . . .${temp.toFixed(1)}°c</p>`;  
        });

    });
    
