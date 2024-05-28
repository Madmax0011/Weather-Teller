
document.getElementById('get-weather-btn').addEventListener('click', getWeather);

document.getElementById('city-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'cc8c5cb6188ee3f8e9be3c5f665d6e27';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherDetails = `
                    <h3>Weather in ${data.name}</h3>
                    <p><i class="fas fa-temperature-low"></i> Temperature: ${data.main.temp} °C</p>
                    <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].description}</p>
                    <p><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</p>
                    <p><i class="fas fa-wind"></i> Wind Speed: ${data.wind.speed} m/s</p>
                `;
                document.getElementById('weather-details').innerHTML = weatherDetails;
            } else {
                document.getElementById('weather-details').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-details').innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        });
}

