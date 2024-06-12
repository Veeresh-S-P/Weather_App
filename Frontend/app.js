document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://weather-app-mrd8.onrender.com/api/weather';
    const searchButton = document.getElementById('search-button');
    const locationInput = document.getElementById('location-input');
    const weatherInfo = document.getElementById('weather-info');
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    let darkMode = false;
  
    const fetchWeather = async (location) => {
      try {
        const response = await fetch(`${API_URL}?location=${location}`);
        const data = await response.json();
  
        if (response.ok) {
          displayWeather(data);
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert('Error fetching weather data');
      }
    };
  
    const displayWeather = (data) => {
      weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${new Date().toDateString()}</p>
        <p>${new Date().toLocaleTimeString()}</p>
        <h3>${data.main.temp}°C</h3>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
    };
  
    searchButton.addEventListener('click', () => {
      const location = locationInput.value;
      if (location) {
        fetchWeather(location);
      } else {
        alert('Please enter a location');
      }
    });
  
    toggleDarkModeButton.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.classList.toggle('dark-mode', darkMode);
      toggleDarkModeButton.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
    });
  });
  