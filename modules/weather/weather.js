const https = require('https');
const offlineFallback = {
  temperature: 28,
  humidity: 60,
  condition: "Partly Cloudy",
};

function fetchWeather(apiKey, city, callback) {
  if (!apiKey) {
    return callback(`Offline Weather: ${offlineFallback.temperature}°C, ${offlineFallback.condition}`);
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  https.get(url, (res) => {
    let data = "";
    res.on("data", chunk => { data += chunk; });
    res.on("end", () => {
      try {
        const weather = JSON.parse(data);
        const description = weather.weather[0].description;
        const temp = weather.main.temp;
        callback(`Weather in ${city}: ${temp}°C, ${description}`);
      } catch (err) {
        callback(`Error: Could not parse weather data. Using offline fallback: ${offlineFallback.temperature}°C, ${offlineFallback.condition}`);
      }
    });
  }).on("error", () => {
    callback(`Offline Weather: ${offlineFallback.temperature}°C, ${offlineFallback.condition}`);
  });
}

module.exports = { fetchWeather };
