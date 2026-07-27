const apiKey = "7a32ee42ffef1e28ad741767669b6aaf";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city === ""){
        alert("Enter a city name");
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", (e)=>{
    if(e.key==="Enter"){
        searchBtn.click();
    }
});

async function getWeather(city){

    try{

        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response=await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data=await response.json();

        document.getElementById("cityName").innerText=data.name;

        document.getElementById("temp").innerText=Math.round(data.main.temp)+"°C";

        document.getElementById("humidity").innerText=data.main.humidity+"%";

        document.getElementById("wind").innerText=(data.wind.speed*3.6).toFixed(1)+" km/h";

        document.getElementById("pressure").innerText=data.main.pressure+" hPa";

        document.getElementById("description").innerText=data.weather[0].description;

        document.getElementById("feels").innerText=data.main.feels_like+" °C";

        document.getElementById("hum").innerText=data.main.humidity+" %";

        document.getElementById("winds").innerText=(data.wind.speed*3.6).toFixed(1)+" km/h";

        document.getElementById("visibility").innerText=(data.visibility/1000)+" km";

        const sunrise=new Date(data.sys.sunrise*1000);

        const sunset=new Date(data.sys.sunset*1000);

        document.getElementById("sunrise").innerText=sunrise.toLocaleTimeString();

        document.getElementById("sunset").innerText=sunset.toLocaleTimeString();

        const icon=data.weather[0].icon;

        document.getElementById("icon").src=
        `https://openweathermap.org/img/wn/${icon}@4x.png`;

        changeBackground(data.weather[0].main);
        loadForecast(city);
        loadMap(
            data.coord.lat,
            data.coord.lon,
            data.name
        );
        )

    }

    catch(error){

        alert(error.message);

    }

}

function changeBackground(weather){

    switch(weather){

        case "Clear":

        document.body.style.background=
        "linear-gradient(135deg,#00c6ff,#0072ff)";
        break;

        case "Clouds":

        document.body.style.background=
        "linear-gradient(135deg,#757f9a,#d7dde8)";
        break;

        case "Rain":

        document.body.style.background=
        "linear-gradient(135deg,#373b44,#4286f4)";
        break;

        case "Thunderstorm":

        document.body.style.background=
        "linear-gradient(135deg,#232526,#414345)";
        break;

        case "Snow":

        document.body.style.background=
        "linear-gradient(135deg,#e6dada,#274046)";
        break;

        default:

        document.body.style.background=
        "linear-gradient(-45deg,#4facfe,#00f2fe,#43e97b,#38f9d7)";
    }

}

window.onload=()=>{

    getWeather("Bengaluru");

};
function getCurrentLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
            document.getElementById("humidity").innerText = data.main.humidity + "%";
            document.getElementById("wind").innerText =
                (data.wind.speed * 3.6).toFixed(1) + " km/h";

            loadForecast(data.name);
            loadMap(data.coord.lat, data.coord.lon, data.name);

        });

    } else {

        alert("Geolocation is not supported by this browser.");

    }

}

getCurrentLocation();