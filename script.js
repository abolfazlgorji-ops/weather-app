const apiKey = 'c4af6b06840310d5f2817ad39155e1e6';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();

        // پنهان کردن پیام خطا اگر موفق بود
        errorMessage.style.display = "none";

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        // تغییر آیکون بر اساس وضعیت آب‌وهوا
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "./image/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "./image/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "./image/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "./image/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "./image/mist.png";
        } else {
            weatherIcon.src = "./image/clear.png"; // حالت پیش‌فرض
        }

    } catch (error) {
        // نمایش پیام خطا در صفحه
        errorMessage.style.display = "block";
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter a city name.";
    }
});
