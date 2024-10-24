// DOM
const searchInput = document.querySelector('input');
const showButton = document.querySelector('button');

const h3CityName = document.querySelector('h3');
const h1Temp = document.querySelector('h1');
const p1 = document.querySelectorAll('p')[0];
const p2 = document.querySelectorAll('p')[1];
const p3 = document.querySelectorAll('p')[2];
const img = document.querySelector('img');

const api_key = '&appid=2a44318a88c074e4bdbd09721e9f08b6';
const base_url = 'https://api.openweathermap.org/data/2.5/weather?q=';

const weather_status = {
    Clouds: "Облачно",
    Rain: "Дождь",
    Sunny: "Ясно",
    Haze: "Туман",
};

const dynamic_img = {
    Haze: './haze.png', 
    Clouds: './rain.png',
    Sunny: './sunny.png',
    Rain: './rain2.png',
}
function getWeather(cityName = 'Bishkek') {
    fetch(base_url + cityName + api_key)
        .then(response => {
            if (!response.ok) {
                throw new Error('Город не найден'); 
            }
            return response.json();
        })
        .then(city => {
            const { name, sys, wind, main, weather } = city;
            const { country } = sys;

            h3CityName.innerHTML = name + ` <span>${country}</span>`;
            p1.innerText = weather_status[weather[0].main] || 'Неизвестно';
            p2.innerText = 'Ветер ' + wind.speed + ' км/ч';
            p3.innerText = 'Влажность ' + main.humidity + ' %';
            h1Temp.innerHTML = `${Math.ceil(main.temp - 273.15)} <span>°C</span>`;
            img.src = dynamic_img[weather[0].main]
        })
        .catch(error => {
            alert(error.message);
            h3CityName.innerText = '';
            p1.innerText = '';
            p2.innerText = '';
            p3.innerText = '';
            h1Temp.innerHTML = '';
        })
        .finally(() => {
            searchInput.value = ''; 
        });
}

showButton.addEventListener('click', () => {
    const cityName = searchInput.value.trim();
    if (cityName) {
        getWeather(cityName);
    } else {
        alert('Ведите название города');
    }
});

getWeather();
