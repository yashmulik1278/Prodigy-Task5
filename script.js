document.addEventListener('DOMContentLoaded', () => {
    const fetchWeatherButton = document.getElementById('fetchWeather');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    const apiKey = '1edc0f7528434a7785874146232008'; 
    const weatherApiUrl = 'https://api.weatherapi.com/v1/current.json';

    fetchWeatherButton.addEventListener('click', fetchWeather);
    locationInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            fetchWeather();
        }
    });

    function fetchWeather() {
        const location = locationInput.value;

        if (location.trim() !== '') {
            const apiUrl = `${weatherApiUrl}?key=${apiKey}&q=${encodeURIComponent(location)}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const weatherData = data.current;
                    const weatherHtml = `
                        <h2>Weather in ${location}</h2>
                        <p>Temperature: ${weatherData.temp_c}°C</p>
                        <p>Condition: ${weatherData.condition.text}</p>
                    `;
                    weatherInfo.innerHTML = weatherHtml;
                    locationInput.value = ''; 
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherInfo.innerHTML = 'Error fetching weather data';
                });
        }
    }
});
