let apiKey = "2c10febf165600372c07befbcdd2e966";
let searchbarEl = $('.searchbar');
let searchInputEl = $('#city');
let searchButtonEl = $('.search')
function findWeather(city){
    let cityFind = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(cityFind)
    .then(response => {
        if(!response.ok){
            throw response.json();
        }
        return response.json();
    })
    .then(cityData => {

        console.log(cityData)
        var latitude = cityData.coord.lat;
        var longitude = cityData.coord.lon;

        let fives = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${apiKey}`
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
                const getDay = weatherData.daily[i];
                let date = new Date();
                const month = date.getMonth();
                const day = date.getDate();
                const year = date.getFullYear();
                let ndate = new Date(year, month, day + i);
                console.log(getDay)
            }
        })
    })

}


function displayWeather(cityResult){
    var cityEl = document.createElement('h2');
    var tempEl = document.createElement('p')
    var tempEl = document.createElement('p')
    var tempEl = document.createElement('p')
}

function handleFormSubmit(event){
    event.preventDefault();
    var cityVal = searchInputEl.val();
    console.log(cityVal)
    findWeather(cityVal);
}
// var cityVal = searchInputEl.value;
// fiveDay(cityVal);
// todayFore(cityVal);

searchButtonEl.on('click', handleFormSubmit)