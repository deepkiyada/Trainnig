var selectedCity = "Aurangabad";
var temperature = "23";
var citiesDropdown = "";
var one = "";
var two = "";
var three = "";
var four = "";

showCities();

function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

function showCities () {
    return fetch('https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json')
.then(response => response.json())
.then(weather => {
    
    one = `<div class="flex-container">
            <div class="topbar-date">
                <div class="dateDate">
                    10
                </div>
                <div>
                    <div class="dayDate">Friday </div>
                    <div class="monthDate">December, 2021</div>
                </div>
            </div>
            <div class="topbar-center">
                <div class="place">
                    <p class="topbar-centerLabel">Select Place</p>
                    <select id="dropdown" onchange="selectOption()" name="All Places" class="topbar-centerValue">`
    for(let r = 0; r <= (weather.city.length) -1; r++){
        var stringCityWeather = json2array(weather.city);

        two +=`<option selected="selected" value="${stringCityWeather[r].name}">${stringCityWeather[r].name}</option>`
        };

        three = `</select>
        </div>
        <div class="days">
            <p class="topbar-centerLabel">How Many Days?</p>
            <select name="one week" class="topbar-centerValue">
                <option value="One Week">One Week</option>
            </select>
        </div>
        <div class="date">
            <p class="topbar-centerLabel">Select Date</p>
            <p class="topbar-centerValue">12/10/2021</p>
        </div>
        <div class="setting">
            <i class="fas fa-sliders-h"></i>
        </div>
        <div class="go">
            <button class="go">
                <i class="fas fa-search"></i>&nbsp; Go!
            </button>
        </div>
    </div>`

    });
}

//---------------------------------- ON CHANGE FUNCTION
function selectOption(){
    var selectedCity = document.getElementById("dropdown").value;
    console.log(selectedCity);

    if(selectedCity != null){

        var urla = "https://api.weatherapi.com/v1/current.json?key=fd8e5c4dc1f349379c7101858220802&q=";
        var urlb = selectedCity;
        var urlc = "&aqi=no";

        fetch(urla+selectedCity+urlc).then(response => response.json()).then(temp => {
            let temperature = temp.current.temp_c;
            console.log(urla+urlb+urlc);
            console.log(temperature);

        showTemperature(selectedCity, temperature);
       });
    }
}

fetch('https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json')
.then(response => response.json())
.then(weather => showTemperature(selectedCity, temperature));


function showTemperature(selectedCity, temperature){

    four = `<div class="topbar-weather">
        <div class="cloudWeather">
            <i class="fas fa-cloud"></i>
        </div>
        <div class="temperatureWeather">
            ${temperature}&#8451;
        </div>
        <div>
            <div class="cityWeather">${selectedCity}</div>
            <div class="countryWeather">IN</div>
        </div>
    </div>
    </div>`;

citiesDropdown = one + two + three + four;

let centerBarUI = document.getElementById("topbar");
centerBarUI.innerHTML = citiesDropdown;

populateCards();

};

// ----------------------------- CARDS SECTION
function populateCards(){
    fetch('https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/make-your-trip-package.json')
    .then(response => response.json())
    .then(data => showCards(data));

    function showCards(data){
        let cards = "";

        for(var i = 0; i < data.length; i++){

            if(data[i].isBookmark != true){
                var bkmk = `far`;
            }else{
                var bkmk = `fas`;
            }

        cards += `<div class="card">
            <div class="card-header">
                <div>
                    <div class="cardHeading">${data[i].cityName}</div>
                    <div class="cardDate">${data[i].tourDate}</div>
                    <div class="cardCategory">${data[i].category}</div>   
                </div>
                <div id="bookmark">
                    <i  class="${bkmk} fa-bookmark"></i>
                </div>
            </div>
            <div class="card-weather">
                <p>Average Temperature</p>
                <hr>
                <div class="card-temperature"> +
                ${data[i].temp}&#8451; &nbsp;<i class='fas fa-sun' style='font-size:24px'></i>
                </div>
            </div>
            <div class="img">
                <img src="${data[i].cityImg}" alt="city-img" class="cityImg" srcset="">
            </div>
            <div class="card-bottomBar">
                <div class="topbar-centerLabel">
                    Total Price:
                    <div class="price">${data[i].price}</div>
                </div>
                <div class="exploreBtn">
                    <button>Explore</button>
                </div>
            </div>
        </div>`;

        let cardsUI = document.getElementById("cardsDisplay");
        cardsUI.innerHTML = cards;
        }
    }
}
