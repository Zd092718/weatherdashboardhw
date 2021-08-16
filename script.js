let apiKey = "2c10febf165600372c07befbcdd2e966";
let searchbarEl = $('.searchbar');
let searchInputEl = $('#city');
let searchButtonEl = $('.search');
let todayDisplayEl = $('.todaydisplay');
let cardEl = $('.card')
let day1El = $('.day1');
let day2El = $('.day2');
let day3El = $('.day3');
let day4El = $('.day4');
let day5El = $('.day5');
let date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
let today = new Date(year, month, day);
function findWeather(city, state){

    let cityFind = `https://api.openweathermap.org/data/2.5/weather?q=${city},US-${state}&appid=${apiKey}`
    // let cityFind = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

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
            //today element
            todayDisplayEl.text("");

            var date1 = document.createElement('h3');
            date1.textContent = `${searchInputEl.val()} ${month + 1}/${day}/${year}`;
            todayDisplayEl.append(date1);

            var detailList1 = document.createElement('ul');
            todayDisplayEl.append(detailList1)
            
            var temp1 = document.createElement('li');
            temp1.textContent = `Temperature: ${weatherData.daily[0].temp.day} F`;
            detailList1.append(temp1);
            
            var humidity1 = document.createElement('li');
            humidity1.textContent = `Humidity: ${weatherData.daily[0].humidity} %`
            detailList1.append(humidity1);
            
            var wind1 = document.createElement('li');
            wind1.textContent = `Wind Speed: ${weatherData.daily[0].wind_speed} MPH`
            detailList1.append(wind1); 
            
            var uvi = document.createElement('li');
            uvi.textContent = `UV Index: ${weatherData.daily[0].uvi}`
            detailList1.append(uvi)

            clearDivs();

            for (let i = 1; i < 6; i++) {
                const loopDays = weatherData.daily[i]
                let dayEl = $(`.day${i}`)
                console.log(loopDays)
                let date = new Date();
                const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
                let ndate = new Date(year, month, day + i);
                const [nmonth, nday, nyear] = [ndate.getMonth(), ndate.getDate(), ndate.getFullYear()];
                console.log(ndate)

                let iconID = weatherData.daily[i].weather[0].icon

                var icon = document.createElement('img');
                icon.className = "weather-icon"
                icon.setAttribute('src', `http://openweathermap.org/img/wn/${iconID}@2x.png`);
                dayEl.append(icon);

                var date1 = document.createElement('h3');
                date1.textContent = `${nmonth + 1}/${nday}/${nyear}`;
                dayEl.append(date1);
                var detailList = document.createElement('ul');
                dayEl.append(detailList)
    
                var temp = document.createElement('li');
                temp.textContent = `Temperature: ${loopDays.temp.day} F`;
                detailList.append(temp);
    
                var humidity = document.createElement('li');
                humidity.textContent = `Humidity: ${loopDays.humidity} %`
                detailList.append(humidity);
    
                var wind = document.createElement('li');
                wind.textContent = `Wind Speed: ${loopDays.wind_speed} MPH`
                detailList.append(wind);
            }
        })
    })
}

//function to clean previous search results
function clearDivs(){
    day1El.text('');
    day2El.text('');
    day3El.text('');
    day4El.text('');
    day5El.text('');
}

var historyData = JSON.parse(localStorage.getItem('history') || '[]');
console.log(historyData)
for (let i = 0; i < historyData.length; i++) {  
    const historyItem = historyData[i];
    
    var histButton = document.createElement('button');
    histButton.className = "history-buttons"
    histButton.textContent = historyItem;
    $('.history').append(histButton);
    histButton.addEventListener('click', function(){
        findWeather(historyItem)
    })
}

function handleFormSubmit(event){
    event.preventDefault();
    var cityVal = searchInputEl.val();
    console.log(cityVal)
    findWeather(cityVal);
    var history = JSON.parse(localStorage.getItem('history') || '[]');
    if(history.indexOf(cityVal) === -1){
        history.push(cityVal);
    }
    localStorage.setItem('history', JSON.stringify(history));
    
}

searchButtonEl.on('click', handleFormSubmit)