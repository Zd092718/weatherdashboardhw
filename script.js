let apiKey = "2c10febf165600372c07befbcdd2e966";
let searchbarEl = $('.searchbar');
let searchInputEl = $('#city');
let searchButtonEl = $('.search');
let todayDisplayEl = $('.todaydisplay');
let date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
let today = new Date(year, month, day);
function findWeather(city){
    let cityFind = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(cityFind)
    .then(response => {
        if(!response.ok){
            throw response.json();
        }
        return response.json();
    }
    )
    .then(cityData => {

        console.log(cityData)
        var latitude = cityData.coord.lat;
        var longitude = cityData.coord.lon;

        let fives = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
        fetch(fives)
        .then(response => {
            if(!response.ok){
                throw response.json();
            }
            return response.json();
        })
        .then(weatherData => {
            console.log(weatherData.daily)
            for (let i = 0; i < weatherData.daily.length; i++) {
                const loopDays = weatherData.daily[i]
                console.log(loopDays)
                let date = new Date();
                const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
                let ndate = new Date(year, month, day + i);
                console.log(ndate)
            }
            //today element
            var cityEl = document.createElement('h2');
            cityEl.textContent = `${searchInputEl.val()} (${today})`
            todayDisplayEl.append(cityEl)
            var detailList = document.createElement('ul');
            todayDisplayEl.append(detailList)
            var tempEl = document.createElement('li');
            tempEl.textContent = `Temperature: ${weatherData.daily[0].temp.day} F`
            detailList.append(tempEl);
            var windEl = document.createElement('li');
            windEl.textContent = `Wind Speed: ${weatherData.daily[0].wind_speed} MPH`
            detailList.append(windEl)
            var humidityEl = document.createElement('li');
            humidityEl.textContent = `Humidity: ${weatherData.daily[0].humidity} %`
            detailList.append(humidityEl);
            var uvindexEl = document.createElement('li');
            uvindexEl.textContent = `UV Index: ${weatherData.daily[0].uvi}`
            detailList.append(uvindexEl)
        })
    })

}


function displayWeather(){

}

function handleFormSubmit(event){
    event.preventDefault();
    var cityVal = searchInputEl.val();
    console.log(cityVal)
    findWeather(cityVal);
    displayWeather();
}
// var cityVal = searchInputEl.value;
// fiveDay(cityVal);
// todayFore(cityVal);

searchButtonEl.on('click', handleFormSubmit)