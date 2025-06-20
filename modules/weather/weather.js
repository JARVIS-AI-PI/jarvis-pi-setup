// modules/weather/weather.js

const https = require("https");
const API_KEY = "demo"; // You can replace this with your own OpenWeatherMap API key

function getWeather(city, callback) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    https.get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            try {
                const weather = JSON.parse(data);
                if (weather.main) {
                    const response = `Weather in ${city}: ${weather.weather[0].description}, Temp: ${weather.main.temp}°C, Humidity: ${weather.main.humidity}%`;
                    callback(response);
                } else {
                    callback("Sorry, I couldn't get the weather for that location.");
                }
            } catch (error) {
                callback("Error parsing weather data.");
            }
        });
    }).on("error", (err) => {
        callback("Unable to retrieve weather data.");
    });
}

module.exports = {
    getWeather,
};
