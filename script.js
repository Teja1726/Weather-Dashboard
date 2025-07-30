async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return alert("Enter a city name");

  const response = await fetch(`/weather?city=${city}`);
  const data = await response.json();

  if (data.error) {
    document.getElementById('weatherResult').innerHTML = `<p>${data.error}</p>`;
    return;
  }

  document.getElementById('weatherResult').innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡️ Temp: ${data.main.temp} °C</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <p>🌥️ Weather: ${data.weather[0].description}</p>
  `;
}
