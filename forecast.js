const apiKey = "7a32ee42ffef1e28ad741767669b6aaf";

async function loadForecast(city){

    try{

        const url =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        const forecastBox = document.querySelector(".forecast-box");

        forecastBox.innerHTML = "";
        drawChart(data);

        for(let i=0;i<data.list.length;i+=8){

            const day = data.list[i];

            const date = new Date(day.dt * 1000);

            const weekday = date.toLocaleDateString("en-US",{
                weekday:"short"
            });

            forecastBox.innerHTML += `
                <div class="day">
                    <h4>${weekday}</h4>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
                    <h3>${Math.round(day.main.temp)}°C</h3>
                    <p>${day.weather[0].main}</p>
                </div>
            `;

        }

    }

    catch(error){

        console.log(error);

    }

}