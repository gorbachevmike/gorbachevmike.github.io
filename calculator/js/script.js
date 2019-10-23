"use strict";

function createArr(start, limit){
    let temp = [];
    for(let i=start; i <= limit; i++){
        temp.push(i);
    }
    return temp;
}

function createYearArr(startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;  
    while ( startYear <= currentYear ) {
        years.push(startYear++);
    }   
    return years;
}

let day = createArr(1,31);
let mounth = ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь','Июль', 'Август','Сентябрь', 'Октябрь','Ноябрь', 'Декабрь'];
let year = createYearArr(2019-99);
let minutes = createArr(0,59);
let hours = createArr(0, 23);

let utc = () => {
    let currentUtc = -12;
    var arrUtc = [];
    for(let i = 0; i <= 24; i++){
        arrUtc.push(currentUtc + i); 
    }
    return arrUtc;
};

let elementUtc = document.getElementById('utc');
let elementDay = document.getElementById('day');
let elementMounth = document.getElementById('mounth');
let elementHours = document.getElementById('hours');
let elementYears = document.getElementById('years');
let elementMinutes =  document.getElementById('minutes');
let elementMenuItem = document.getElementById('menuItem');

utc().forEach((value, index) => {
    let option = document.createElement('option');
    if(value == 3){
        option.selected = true;
    }
    if(value > 0){
        option.text = "UTC +" + value;
        option.value = value;
          
    elementUtc.add(option);
    }else{
        option.text = "UTC " + value;
        option.value = value;
          
    elementUtc.add(option);
    }

  
});

mounth.forEach((value, index) => {
    let option = document.createElement('option');
    option.text = value;
    option.value = value;
    elementMounth.add(option);
});

year.forEach((value, index) => {
    let option = document.createElement('option');
    option.text = value;
    option.value = value;
    elementYears.add(option);
});

hours.forEach((value, index) => {
    let option = document.createElement('option');
    option.text = value;
    option.value = value;
    elementHours.add(option);
});

minutes.forEach((value, index) => {
    let option = document.createElement('option');
    option.text = value;
    option.value = value;
    elementMinutes.add(option);
});

for(let key in day){
    let option = document.createElement('option');
    option.text = day[key];
    option.value = day[key];
    elementDay.add(option);
}

//Tabs

var tab; // заголовок вкладки
var tabContent; // блок содержащий контент вкладки

window.onload=function() {
    tabContent=document.getElementsByClassName('tabContent');
    tab=document.getElementsByClassName('content__menu-item-link');
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for (var i=a; i<tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('active');
    }
}

document.getElementById('menuItem').onclick= function (event) {
    var target=event.target;
    if (target.className=='content__menu-item-link') {
       for (var i=0; i<tab.length; i++) {
           if (target == tab[i]) {
               showTabsContent(i);
               break;
}}}}

function showTabsContent(b){
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('active');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}


/*Пошло поехало*/ 

let sunTime = document.getElementById("sunTime");
let placeBorn = document.getElementById("placeBorn");

sunTime.addEventListener('change', (event) => {
    if (event.target.checked) {
        placeBorn.style.display = "flex";   
    } else {
        placeBorn.style.display = "none";
    }
});

var date = new Date();

function getElementsById(id) {
    return [...document.getElementsByTagName('*')].filter(element => element.id === id)
}

let result = getElementsById('tableTime');
let result2 = getElementsById('tableTime2');

let resultR = getElementsById('tableTimeR');
let resultR2 = getElementsById('tableTimeR2');

let resultS = getElementsById('tableTimeS');
let resultS2 = getElementsById('tableTimeS2');

var sunDay = 2;
var theHours = new Date();

let tableResult = document.getElementById("tableResult");
let titleText =  document.getElementById("titleText")

tableResult.style.display = "none";

let sum = document.getElementById('sum');

/* Автозаполнение города */
var token = "5bbca3f4fd3dcaa4f2b4f78a39925ce876332e6a";

var type  = "ADDRESS";
var $city = $("#city");

var geo_lon = 37.64;

function iplocate() {
    var serviceUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address";
    var params = {
      type: "GET",
      contentType: "application/json",
      headers: {
        "Authorization": "Token " + token
      }
    };
    return $.ajax(serviceUrl, params);
}
  // город и населенный пункт
 
  
iplocate().done(function(response) {
      var location = response.location;
      if (!location) {
        return;
      }    
      $city.suggestions().setSuggestion(location);
});
  
/* /Автозаполнение города */


/* Расчет солнечного времени*/

function calcSunStartTime(data ,midnight = 0, noon = 12){

    let fromMidnightToNoon = noon - midnight;
    let hr = fromMidnightToNoon / 12;

    data.forEach((value, index) => {
        if(index%2 == 0){
            if(index == 0){
                let hour = Number(elementUtc.options[elementUtc.selectedIndex].value) - 3;
                theHours.setHours(hour);
                value.innerHTML = (theHours.getHours()<10?'0':'') + theHours.getHours() + ":00";
            }else{
                let h = midnight + (index - 1)*hr + (Number(elementUtc.options[elementUtc.selectedIndex].value) - 3);
                theHours.setHours(h);
                value.innerHTML = (theHours.getHours()<10?'0':'') + theHours.getHours() + ":00";
            }
        }else{
            let h = noon + index*hr + (Number(elementUtc.options[elementUtc.selectedIndex].value) - 3);
            theHours.setHours(h);
            value.innerHTML = (theHours.getHours()<10?'0':'') + theHours.getHours() + ":00";
        }
    });

}

function calcSunEndTime(data ,midnight = 0, noon = 12){

    let fromMidnightToNoon = noon - midnight;
    let hr = fromMidnightToNoon / 12;

    data.forEach((value, index) => {
        if(index%2 == 0){
            let h = midnight + (index + 1)*hr + (Number(elementUtc.options[elementUtc.selectedIndex].value) - 3);
            theHours.setHours(h);
            value.innerHTML = (theHours.getHours()<10?'0':'') + theHours.getHours() + ":00";
        }else{
            if(index == 11){
                let h = noon + (index + 1)*hr + (Number(elementUtc.options[elementUtc.selectedIndex].value) - 3);
                theHours.setHours(h);
                value.innerHTML = (theHours.getHours()<10?'0':'') + theHours.getHours() + ":00";
            }else{
                let h = noon + (index + 2)*hr + (Number(elementUtc.options[elementUtc.selectedIndex].value) - 3);
                theHours.setHours(h);
                value.innerHTML = (theHours.getHours()<10?'0':'') + theHours.getHours() + ":00";
            }
        }
    });

}
function parseTime(s) {
    var c = s.split(':');
    return parseInt(c[0]) * 60 + parseInt(c[1]);
 }

function secondToHours(value, incKMinutes = 0){
    let hour = ((value / 60) / 60);
    let minutes = (hour - Math.trunc(hour))*100 + incKMinutes;
    if(Math.abs(minutes) > 60){
        hour = hour + 1;
        minutes = minutes - 60;
    }
    let obj = {
        hours: Math.trunc(hour),
        minutes: Math.abs(Math.trunc(minutes))
    };
    return obj;

}

function calcRubberStartTime(data, latitude, longitude, midnight = 0, noon = 12){

    let sunset = new Date().sunset(+latitude, +longitude);
    let sunrise = new Date().sunrise(+latitude, +longitude);
    
    let lenghtDay = Math.trunc((sunset - sunrise)/1000);

    let lenghtNight = 86400 - lenghtDay;

    let diffDayNight = lenghtDay - lenghtNight;

    let incK =  Math.round(diffDayNight / 84);

    let incKMinutes = incK/60 - Math.trunc(incK/60);

    if(Math.abs(incKMinutes*100) > 60){
        incKMinutes = Math.trunc(Math.abs(incKMinutes*100) - 60);
        if(incK > 0){
            incK = incK + 60;
        }else{
            incK = incK - 60;
        }
    }else{
        incKMinutes = Math.trunc(Math.abs(incKMinutes*100));
    }

    data.forEach((value, index) => { 
        switch (index) {
            case 0: 
            let rats = ((sunset.getHours()*60 + sunset.getMinutes())*60) + 5*3600 + 15*Math.abs(incK);
            rats = secondToHours(rats,incKMinutes);
            let ratsHours = +rats.hours + 1;
            value.innerHTML = (rats.hours<10?'0':'') + ratsHours + ":" + (Number(rats.minutes)<10?'0':'')+ Number(rats.minutes);
            break;
            case 1:
                let goat = 43200 + 6*incK;
                goat = secondToHours(goat);
                value.innerHTML = (goat.hours<10?'0':'')+ goat.hours + ":" +  (incKMinutes + Number(goat.minutes));
            break;
            case 3:
                let Monkey  = 43200 + 10800 + 15*incK;
                Monkey = secondToHours(Monkey);
                let monkeyHours = +Monkey.hours;
                value.innerHTML = (Monkey.hours<10?'0':'')+ monkeyHours + ":" +  (incKMinutes + Number(Monkey.minutes));
            break;
            case 5:
                let Rooster = 43200 + 3600*5 + 20*incK;
                Rooster = secondToHours(Rooster);
                let roosterHours = +Rooster.hours;
                value.innerHTML = (Rooster.hours<10?'0':'') + roosterHours + ":" +  (incKMinutes + Number(Rooster.minutes));
            break; 
            case 4:
                let Tiger = 0 + 3600*3 + 15*incK;
                Tiger = secondToHours(Tiger);
                let TigerHours = +Tiger.hours;
                value.innerHTML = (Tiger.hours<10?'0':'') + TigerHours + ":" +  (incKMinutes + Number(Tiger.minutes));
            break;
            case 2:
                    let Bull = 0 + 3600 + 6*incK;
                    Bull = secondToHours(Bull,incKMinutes);
                    let BullHours = +Bull.hours - 1;
                    value.innerHTML = (Bull.hours<10?'0':'') + BullHours + ":" + (Number(Bull.minutes)<10?'0':'')+ Number(Bull.minutes);
            break;
            case 6:
                    let Rabbit  = 0 + 3600*5 + 20*incK;
                    Rabbit = secondToHours(Rabbit);
                    let RabbitHours = +Rabbit.hours;
                    value.innerHTML = (Rabbit.hours<10?'0':'') + RabbitHours + ":" +  (incKMinutes + Number(Rabbit.minutes));
            break;
            case 7:
                    let dog  = ((sunset.getHours()*60 + sunset.getMinutes())*60) + 3600 + incK;
                    dog = secondToHours(dog);
                    let dogHours = +dog.hours;
                    value.innerHTML = (dog.hours<10?'0':'') + dogHours + ":" +  (incKMinutes + Number(dog.minutes));
            break;
            case 8:
                let Dragon = ((sunrise.getHours()*60 + sunrise.getMinutes())*60) + 3600 + incK;
                Dragon = secondToHours(Dragon);
                let DragonHours = +Dragon.hours - 2;
                value.innerHTML = (Dragon.hours<10?'0':'') + DragonHours + ":" +  (incKMinutes + Number(Dragon.minutes));
            break;
            case 9:
                let pig  = ((sunset.getHours()*60 + sunset.getMinutes())*60) + 3*3600 + 6*Math.abs(incK);
                pig = secondToHours(pig,incKMinutes);
                let pigHours = +pig.hours;
                value.innerHTML = (pig.hours<10?'0':'') + pigHours + ":" + (Number(pig.minutes)<10?'0':'')+ Number(pig.minutes);
            break;
            case 10:
                let Snake = ((sunrise.getHours()*60 + sunrise.getMinutes())*60) + 3*3600 + 6*Math.abs(incK);
                Snake = secondToHours(Snake,incKMinutes);
                let SnakeHours = +Snake.hours - 2;
                value.innerHTML = (SnakeHours < 10?'0':'') + SnakeHours + ":" +  Number(Snake.minutes);
            break;
            case 12:
                    let horse = ((sunrise.getHours()*60 + sunrise.getMinutes())*60) + 5*3600 + 15*Math.abs(incK);
                    horse = secondToHours(horse,incKMinutes);
                    let horseHours = +horse.hours - 3;
                    value.innerHTML = (horseHours < 10?'0':'') + horseHours + ":" +  (Number(horse.minutes)<10?'0':'')+ Number(horse.minutes);
            break;
            default:
                value.innerHTML = "--:--" ;
          }
    });

}

function calcRubberEndTime(data, latitude, longitude, midnight = 0, noon = 12){

    let sunset = new Date().sunset(+latitude, +longitude);
    let sunrise = new Date().sunrise(+latitude, +longitude);
    
    let lenghtDay = Math.trunc((sunset - sunrise)/1000);

    let lenghtNight = 86400 - lenghtDay;

    let diffDayNight = lenghtDay - lenghtNight;

    let incK =  Math.round(diffDayNight / 84);

    let incKMinutes = incK/60 - Math.trunc(incK/60);

    if(Math.abs(incKMinutes*100) > 60){
        incKMinutes = Math.trunc(Math.abs(incKMinutes*100) - 60);
        if(incK > 0){
            incK = incK + 60;
        }else{
            incK = incK - 60;
        }
    }else{
        incKMinutes = Math.trunc(Math.abs(incKMinutes*100));
    }

    data.forEach((value, index) => { 
        switch (index) {
            case 0: 
            let rats = ((sunset.getHours()*60 + sunset.getMinutes())*60) + 7*3600 + 15*Math.abs(incK);
            rats = secondToHours(rats,incKMinutes);
            let ratsHours = (+rats.hours<=24?0:+rats.hours);
            value.innerHTML = (ratsHours<10?'0':'') + ratsHours + ":" + (Number(rats.minutes)<10?'0':'')+ Number(rats.minutes);
            break;
            case 1:
                let goat = 43200 + 6*incK;
                goat = secondToHours(goat);
                let goatHours = +goat.hours + 2;
                value.innerHTML = (goat.hours<10?'0':'')+ goatHours + ":" +  (incKMinutes + Number(goat.minutes));
            break;
            case 3:
                let Monkey  = 43200 + 10800 + 15*incK;
                Monkey = secondToHours(Monkey);
                let monkeyHours = +Monkey.hours + 2;
                value.innerHTML = (Monkey.hours<10?'0':'')+ monkeyHours + ":" +  (incKMinutes + Number(Monkey.minutes));
            break;
            case 5:
                let Rooster = 43200 + 3600*5 + 20*incK;
                Rooster = secondToHours(Rooster);
                let roosterHours = +Rooster.hours + 2;
                value.innerHTML = (Rooster.hours<10?'0':'') + roosterHours + ":" +  (incKMinutes + Number(Rooster.minutes));
            break; 
            case 4:
                let Tiger = 0 + 3600*3 + 15*incK;
                Tiger = secondToHours(Tiger);
                let TigerHours = +Tiger.hours + 2;
                value.innerHTML = (Tiger.hours<10?'0':'') + TigerHours + ":" +  (incKMinutes + Number(Tiger.minutes));
            break;
            case 2:
                    let Bull = 0 + 3600 + 6*incK;
                    Bull = secondToHours(Bull,incKMinutes);
                    let BullHours = +Bull.hours+1;
                    value.innerHTML = (Bull.hours<10?'0':'') + BullHours + ":" + (Number(Bull.minutes)<10?'0':'')+ Number(Bull.minutes);
            break;
            case 6:
                    let Rabbit  = 0 + 3600*5 + 20*incK;
                    Rabbit = secondToHours(Rabbit);
                    let RabbitHours = +Rabbit.hours + 2;
                    value.innerHTML = (Rabbit.hours<10?'0':'') + RabbitHours + ":" +  (incKMinutes + Number(Rabbit.minutes));
            break;
            case 7:
                    let dog  = ((sunset.getHours()*60 + sunset.getMinutes())*60) + 3600 + incK;
                    dog = secondToHours(dog);
                    let dogHours = +dog.hours + 2;
                    value.innerHTML = (dog.hours<10?'0':'') + dogHours + ":" +  (incKMinutes + Number(dog.minutes));
            break;
            case 8:
                let Dragon = ((sunrise.getHours()*60 + sunrise.getMinutes())*60) + 3600 + incK;
                Dragon = secondToHours(Dragon);
                let DragonHours = +Dragon.hours;
                value.innerHTML = (Dragon.hours<10?'0':'') + DragonHours + ":" +  (incKMinutes + Number(Dragon.minutes));
            break;
            case 9:
                let pig  = ((sunset.getHours()*60 + sunset.getMinutes())*60) + 3*3600 + 6*Math.abs(incK);
                pig = secondToHours(pig,incKMinutes);
                let pigHours = +pig.hours + 2;
                value.innerHTML = (pig.hours<10?'0':'') + pigHours + ":" + (Number(pig.minutes)<10?'0':'')+ Number(pig.minutes);
            break;
            case 10:
                let Snake = ((sunrise.getHours()*60 + sunrise.getMinutes())*60) + 3*3600 + 6*Math.abs(incK);
                Snake = secondToHours(Snake,incKMinutes);
                let SnakeHours = +Snake.hours;
                value.innerHTML = (SnakeHours < 10?'0':'') + SnakeHours + ":" +  Number(Snake.minutes);
            break;
            case 12:
                    let horse = ((sunrise.getHours()*60 + sunrise.getMinutes())*60) + 5*3600 + 15*Math.abs(incK);
                    horse = secondToHours(horse,incKMinutes);
                    let horseHours = +horse.hours - 1;
                    value.innerHTML = (horseHours < 10?'0':'') + horseHours + ":" +  (Number(horse.minutes)<10?'0':'')+ Number(horse.minutes);
            break;
            default:
                value.innerHTML = "--:--" ;
        }
    });

}

function calcSovTime(dataSov,dataSov2,dataSun, dataRubber){
    dataSov.forEach((value, index)=>{
        if(index%2 == 0){
            value.innerHTML = dataSun[index].innerText;
        }else{
            value.innerHTML = dataSun[index].innerText;
        }
    });

    dataSov2.forEach((value, index)=>{
        if(index%2 == 0){
            value.innerHTML = dataRubber[index].innerText;
        }else{
            value.innerHTML = dataRubber[index].innerText;
        }
    });

}


/* Конец расчета*/

document.getElementById('clear').addEventListener('click', () =>{
    tableResult.style.display = "none";
    elementMenuItem.style.display = 'none';
    titleText.style.display = "block";
});

var city = '';

var elementCity = document.getElementById('city');
var coordinates = [];

ymaps.ready(init);

function init(){ 
    var myMap;
    // Получение место нахождения
    iplocate().done((response)=>{
        var location = response.location;
         // Создание карты.
        myMap = new ymaps.Map("map", {
            center: [location.data.geo_lat,location.data.geo_lon],
            zoom: 10
        });
        var locateMarker = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [location.data.geo_lat,location.data.geo_lon]
            }
        });

        

        myMap.geoObjects.add(locateMarker);

        document.getElementById('lat').value = location.data.geo_lat;
        document.getElementById('lon').value = location.data.geo_lon;
    });

    $city.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "city-settlement",
        onSelect: function(suggestion) {
            var changeLocation = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [suggestion.data.geo_lat,suggestion.data.geo_lon]
                }
            });

            myMap.geoObjects.add(changeLocation);
            myMap.setCenter(changeLocation.geometry.getCoordinates());

            document.getElementById('lat').value = suggestion.data.geo_lat;
            document.getElementById('lon').value = suggestion.data.geo_lon;
        }
    });

    sum.addEventListener('click', (event) => {
        tableResult.style.display = "block";
        titleText.style.display = "none";
        elementMenuItem.style.display = 'flex';

        calcSunStartTime(result);
        calcSunEndTime(result2);

        calcRubberStartTime(resultR,document.getElementById('lat').value, document.getElementById('lon').value);
        calcRubberEndTime(resultR2,document.getElementById('lat').value, document.getElementById('lon').value);

        calcSovTime(resultS,resultS2, result, resultR2);
    });
       
}

