"use strict";
let day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let mounth = ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь','Июль', 'Август','Сентябрь', 'Октябрь','Ноябрь', 'Декабрь'];
let hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
let minutes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];

let year = function(startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;  
    while ( startYear <= currentYear ) {
        years.push(startYear++);
    }   
    return years;
}

let utc = function() {
    let currentUtc = -12;
    var arrUtc = [];
    for(let i = 0; i <= 24; i++){
        arrUtc.push(currentUtc + i); 
    }
    return arrUtc;
}

let years = year(2019-99);

let elementUtc = document.getElementById('utc');
let elementDay = document.getElementById('day');
let elementMounth = document.getElementById('mounth');
let elementHours = document.getElementById('hours');
let elementYears = document.getElementById('years');
let elementMinutes =  document.getElementById('minutes');

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

years.forEach((value, index) => {
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



/*Пошло поехало*/ 

let sunTime = document.getElementById("sunTime");
let placeBorn = document.getElementById("placeBorn");

sunTime.addEventListener('change', (event) => {
    if (event.target.checked) {
        placeBorn.style.display = "flex";   
    } else {
        placeBorn.style.display = "none";
    }
  })
  var date = new Date();

function getElementsById(id) {
    return [...document.getElementsByTagName('*')].filter(element => element.id === id)
}

let result = getElementsById('tableTime');
var sunDay = 2;
var theHours = new Date();

let tableResult = document.getElementById("tableResult");
let titleText =  document.getElementById("titleText")
tableResult.style.display = "none";

let sum = document.getElementById('sum');

var city = [];
var cityLL = [];
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var jsonResponse = JSON.parse(this.responseText);
        for(let i = 0; i < jsonResponse.length; i++){
            //console.log(jsonResponse[i]);
            city.push(jsonResponse[i].Город);
            cityLL.push({"city":jsonResponse[i].Город, "lat": jsonResponse[i].Широта,'lon': jsonResponse[i].Долгота});
        }
    }
};

new autoComplete({
    selector: 'input[name="city"]',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = city;
        var matches = [];
        for (let i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});

let elementCity = document.getElementById('city');
var lat = 55.76;
var lon = 37.64;

elementCity.addEventListener('change', (event) => {
    var ch = cityLL;
    for(let i=0; i<ch.length; i++){
        if(ch[i].city == event.srcElement.value){
            lat = ch[i].lat;
            lon = ch[i].lon;
        }
    }
});


xhttp.open("GET", "https://aleksandrowmike.github.io/calculator/city.json", true);
xhttp.send();

ymaps.ready(init);

function init(){
            
navigator.geolocation.getCurrentPosition(function(location) {
      // Создание карты.
      var myMap = new ymaps.Map("map", {
        center: [location.coords.latitude, location.coords.longitude],
        zoom: 10
    });
    lat = location.coords.latitude;
    lon = location.coords.longitude;
    document.getElementById('lat').value = location.coords.latitude;
    document.getElementById('lon').value = location.coords.longitude;

    var myPlacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [location.coords.latitude, location.coords.longitude]
        }
    });

    myMap.geoObjects.add(myPlacemark);

    sum.addEventListener('click', (event) => {
        tableResult.style.display = "table";
        titleText.style.visibility = "hidden";
        result.forEach((value, index) => { 
            if(index%2 == 0){
                if(index == 0){
                    let hour = Number(elementUtc.options[elementUtc.selectedIndex].value);
                    value.innerHTML = Math.abs(hour) + ":00" ;
                }else{
                    let h = (index - 2 + sunDay) - 1 + Number(elementUtc.options[elementUtc.selectedIndex].value);
                    theHours.setHours(h);
                    value.innerHTML = theHours.getHours() + ":00";
                }
            }else{
                let h = (index + sunDay) + 10 + Number(elementUtc.options[elementUtc.selectedIndex].value);
                theHours.setHours(h);
                value.innerHTML =  theHours.getHours() + ":00";
            }
        });
    
        var myPlacemark = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [lat, lon]
            }
        });
    
        document.getElementById('lat').value = lat;
        document.getElementById('lon').value = lon;
        myMap.geoObjects.add(myPlacemark);
        myMap.setCenter(myPlacemark.geometry.getCoordinates());
    });
    

});

      


        
}

