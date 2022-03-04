const api = {
    key: "409c290fdbce15f819d350969ff90bef",
    lang: "pt_br",
    units: "metric"
};

function getWeather(latitude, longitude){
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=${api.units}&lang=${api.lang}`;
    axios.get(url).then(response => {
        let weather = response.data.weather[0].main;
        let icon = response.data.weather[0].icon;
        let city = response.data.name;
        let temp = response.data.main.temp.toFixed(0);
        let tempMin = response.data.main.temp_min.toFixed(0);
        let tempMax = response.data.main.temp_max.toFixed(0);
        document.querySelector("#city").innerHTML = city;
        document.querySelector("#tempNum").innerHTML = `${temp}°C`;
        document.querySelector("#weather").innerHTML = weather;
        document.querySelector("#tempMinMax").innerHTML = `${tempMin}°C/${tempMax}°C`;
        document.querySelector("#weathericon").src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
    })
}

function getWeatherFromLocation(position) {
    const coords = position.coords;
    getWeather(coords.latitude, coords.longitude);
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getWeatherFromLocation, rejectPosition);
}

function rejectPosition(error){
   alert (`Então digite os dados de sua cidade nos campos abaixo!`);
}

function getWeatherFromInput (){
    const nameCity = document.querySelector(`.cityInput`).value;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${nameCity}&limit=1&appid=${api.key}`;
    axios.get(url).then(response => {
        console.log(response)
        getWeather(response.data[0].lat, response.data[0].lon);
    })
}