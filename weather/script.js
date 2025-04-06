async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "09a17dee26166c0ebba7e7ea4de8b3ab";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const weatherInfo = document.getElementById("weatherInfo");
  const spinner = document.getElementById("loading");

  spinner.style.display = "block";
  weatherInfo.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const weatherHtml = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" />
        <p><strong>${data.weather[0].main}</strong>: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
      `;

      weatherInfo.innerHTML = `<div class="fade-in">${weatherHtml}</div>`;
    } else {
      weatherInfo.innerHTML = `<p>City not found!</p>`;
    }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching data</p>`;
  } finally {
    spinner.style.display = "none";
  }
}
