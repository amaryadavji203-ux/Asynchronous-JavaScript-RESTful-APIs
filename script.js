const apiKey = "YOUR_API_KEY";

const button = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");

button.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city === ""){
        weatherDiv.innerHTML = "<p class='error'>Please enter a city.</p>";
        return;
    }

    getWeather(city);
});

async function getWeather(city){

    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        weatherDiv.innerHTML = "Loading...";

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    }catch(error){

        weatherDiv.innerHTML =
        `<p class="error">${error.message}</p>`;

    }
}

function displayWeather(data){

    const city = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const description = data.weather[0].description;

    weatherDiv.innerHTML = `
        <h2>${city}, ${country}</h2>

        <h3>${temperature} °C</h3>

        <p><strong>Weather:</strong> ${description}</p>

        <p><strong>Humidity:</strong> ${humidity}%</p>

        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
    `;
}
