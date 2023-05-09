
let date = new Date()

//Mostrando Horário

function showHours() {

    let date1 = new Date()

    let hourContainer = document.querySelector('#hour')
    let minuteContainer = document.querySelector('#minutes')


    let hour = date1.getHours()
    let minute = date1.getMinutes()

    hourContainer.innerHTML = hour
    minuteContainer.innerHTML = minute

    let hourStr = hour.toString()


    if (hourStr.length == 1) {
        hourContainer.innerHTML = `0${hour}`
    } else {
        hourContainer.innerHTML = hour
    }




    let minuteStr = minute.toString()

    if (minuteStr.length == 1) {
        minuteContainer.innerHTML = `0${minute}`
    }
    else {
        minuteContainer.innerHTML = minute
    }

}

showHours()


setInterval(showHours, 1000)

//Mudando dia

function showDays() {

    let day = date.getDay()

    let dayAtMonth = date.getDate()

    let dayContainer = document.querySelector('#date2')

    dayContainer.innerHTML = dayAtMonth

    let numberDay = document.querySelector('#date')

    switch (day) {
        case 0:
            numberDay.innerHTML = 'dom'
            break;

        case 1:
            numberDay.innerHTML = 'seg'
            break

        case 2:
            numberDay.innerHTML = 'ter'
            break

        case 3:
            numberDay.innerHTML = 'qua'
            break

        case 4:
            numberDay.innerHTML = 'qui'
            break

        case 5:
            numberDay.innerHTML = 'sex'
            break

        case 6:
            numberDay.innerHTML = 'sab'
            break


    }
}
showDays()

setInterval(showDays, 1000)

function showMonth() {

    let showMonths = document.querySelector('#date3')

    let month = date.getMonth() + 1

    let monthStr = month.toString()

    if (monthStr.length == 1) {
        monthStr = `0${monthStr}`
    }

    let arrayMonth = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.']

    for (i = 0; i <= 12; i++) {

        switch (month) {
            case i:
                showMonths.innerHTML = arrayMonth[i - 1]
                break
        }

    }


}

showMonth()

setInterval(showMonth, 1000)


// Trabalhando com API 

const apiKey = "371a4f6b13f536664db98aae6dcd7441"

let city = 'São Paulo';

function renderWeather(weather) {

    const tempShow = document.querySelector('#show-temp')
    const umidityShow = document.querySelector('#umidity')
    const airShow = document.querySelector('#air')

    const umidity = weather.main.humidity
    const air = weather.wind.speed
    const tempK = weather.main.temp
    const tempCelsius = tempK - 273.15

    tempShow.innerHTML = `${tempCelsius.toFixed(0)} C°`
    airShow.innerHTML = `${air}`;
    umidityShow.innerHTML = `${umidity}%`
}

//Puxando Dados


async function fetchWeather() {


    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=371a4f6b13f536664db98aae6dcd7441`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();

        })
        .then(data => {
            renderWeather(data);
            changeImageWeather(data);
        })
        .catch(error => {
            console.error('Error:', error);
            // Exibir uma mensagem de erro ao usuário:
            alert('Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.');
        });




}

fetchWeather(city)


//Trocando Foto 

function changeImageWeather(weather) {
    let imgWeather = document.querySelector('.img-weather')

    let hour = date.getHours()

    let dayOrNight = '';

    if (hour >= 6 && hour <= 18) {
        dayOrNight = 'Day'
    } else {
        dayOrNight = 'Night'
    }

    let cloudsStatus = weather.clouds.all


    if (cloudsStatus >= 50 && cloudsStatus <= 75 && dayOrNight == 'Day') {
        imgWeather.src = 'assets/clouds.png'
        imgWeather.classList.add("margin-bottom")
    } else {
        imgWeather.src = 'assets/moon-clouds.png'
        imgWeather.classList.add("margin-bottom")
    }

    if (cloudsStatus > 75 && dayOrNight == 'Day') {
        imgWeather.src = 'assets/bad-weather.png'
    } else {
        imgWeather.src = 'assets/rainy.png'
        imgWeather.classList.add("margin-bottom")
    }


    if (cloudsStatus < 50 && dayOrNight == 'Day') {
        imgWeather.src = 'assets/sun.png'
        imgWeather.classList.add("margin-bottom")
    } else {
        imgWeather.src = 'assets/moon.png'
        imgWeather.classList.add("margin-bottom")
    }

}

//Change Mode 

modeScreen()

function modeScreen() {

    const hour = date.getHours()

    const toggleBtn = document.querySelector('.btn-toggle');

    const body = document.querySelector('body');


    if (hour >= 6 && hour <= 18) { 
        body.classList.remove('dark-mode')
    }
    else {
        body.classList.add('dark-mode')
    }

}





