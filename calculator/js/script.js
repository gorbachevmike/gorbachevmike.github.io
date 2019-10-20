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
let elementMenuItem = document.getElementById('menuItem');

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
  $city.suggestions({
    token: token,
    type: type,
    hint: false,
    bounds: "city-settlement",
  });
  
  iplocate().done(function(response) {
      var location = response.location;
      console.log(location);
      if (!location) {
        return;
      }    
      $city.suggestions().setSuggestion(location);
});
  
/* /Автозаполнение города */

var lat = 55.76;
var lon = 37.64;

var city = '';

var elementCity = document.getElementById('city');



ymaps.ready(init);

function init(){
            
navigator.geolocation.getCurrentPosition(function(location) {
      // Создание карты.
      var myMap = new ymaps.Map("map", {
        center: [location.coords.latitude, location.coords.longitude],
        zoom: 10
    });

    sum.addEventListener('click', (event) => {
        tableResult.style.display = "block";
        titleText.style.display = "none";
        elementMenuItem.style.display = 'flex';
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

        result2.forEach((value, index) => { 
            if(index%2 == 0){
                if(index == 0){
                    let hour = Number(elementUtc.options[elementUtc.selectedIndex].value) + 1;
                    value.innerHTML = Math.abs(hour) + ":00" ;
                }else{
                    let h = (index - 2 + sunDay) - 1 + Number(elementUtc.options[elementUtc.selectedIndex].value) + 2;
                    theHours.setHours(h);
                    value.innerHTML = theHours.getHours() + ":00";
                }
            }else{
                let h = (index + sunDay) + 10 + Number(elementUtc.options[elementUtc.selectedIndex].value) + 2;
                theHours.setHours(h);
                value.innerHTML =  theHours.getHours() + ":00";
            }
        });

        resultS.forEach((value, index) => { 
            if(index%2 == 0){
                if(index == 0){
                    let hour = Number(elementUtc.options[elementUtc.selectedIndex].value);
                    value.innerHTML = Math.abs(hour) + ":00" ;
                }else if(index == 10){
                    value.innerHTML = "--:--" ;
                }else{
                    let h = (index - 2 + sunDay) - 1 + Number(elementUtc.options[elementUtc.selectedIndex].value);
                    theHours.setHours(h);
                    value.innerHTML = theHours.getHours() + ":00";
                }
            }else{
                if(index == 11){
                    value.innerHTML = "--:--" ;
                }else if(index == 9){
                    value.innerHTML = "--:--" ;
                }else {
                    let h = (index + sunDay) + 10 + Number(elementUtc.options[elementUtc.selectedIndex].value);
                    theHours.setHours(h);
                    value.innerHTML =  theHours.getHours() + ":00";
                }
                    
            }
        });


        resultS2.forEach((value, index) => { 
            if(index%2 == 0){
                if(index == 0){
                    let hour = Number(elementUtc.options[elementUtc.selectedIndex].value);
                    value.innerHTML = Math.abs(hour) + ":41" ;
                }else if(index == 10){
                    value.innerHTML = "--:--" ;
                }else{
                    let h = (index - 2 + sunDay) - 1 + Number(elementUtc.options[elementUtc.selectedIndex].value)+1;
                    theHours.setHours(h);
                    value.innerHTML = theHours.getHours() + ":00";
                }
            }else{
                if(index == 11){
                    value.innerHTML = "--:--" ;
                }else if(index == 9){
                    value.innerHTML = "--:--" ;
                }else {
                    let h = (index + sunDay) + 10 + Number(elementUtc.options[elementUtc.selectedIndex].value) +1;
                    theHours.setHours(h);
                    value.innerHTML =  theHours.getHours() + ":00";
                }
                    
            }
        });

        var myGeocoder = ymaps.geocode(elementCity.value);
        myGeocoder.then(
            function (res) {
                var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                var myPlacemark = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: res.geoObjects.get(0).geometry.getCoordinates()
                    }
                });
                myMap.geoObjects.add(myPlacemark);
                myMap.setCenter(myPlacemark.geometry.getCoordinates());
                document.getElementById('lat').value = coordinates[0];
                document.getElementById('lon').value = coordinates[1];
            },
            function (err) {
                alert('Ошибка');
            }
        );
        
    
       
        
    });
    

});

      


        
}

