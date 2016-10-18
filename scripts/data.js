$(document).ready(function() {
    var lat;
    var long;
    
    //Location by the coordinates
    
    $.getJSON('http://ip-api.com/json', function(data2) {
        lat = data2.lat;
        long = data2.lon;
        
         var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=93423cd537d8b5132f4cff5001224210';
        
$.getJSON(api, function(data) {
    
    var fTemp;
    var cTemp;
    var kTemp;
    
    var tempSwap = true;
    var windSwamp = true;
    //JSON call for Open Weather API
             var weatherType = data.weather[0].description;
             kTemp = data.main.temp;
             var windSpeed = data.wind.speed;
             var city = data.name;
             
             //Temperature in Fahrenheit
             fTemp = (kTemp *(9/5)-459.67).toFixed(1);
             //Temperature in Celsius
             cTemp = (kTemp-273).toFixed(1);
             
             $("#city").html(city);
             $("#weatherType").html(weatherType);
             $("#cTemp").html(cTemp + " &#8451");
             
             //Toggle between temp. measurements
             $("#cTemp").click(function() {
                 if (tempSwap === false) {
                     $("#cTemp").html(cTemp + " &#8451");
                     tempSwap = true;
                 }
                 else {
                     $("#cTemp").html(fTemp + " &#8457;")
                     tempSwap = false;
                 }
             })
             var mwindSpeed = (2.237 * windSpeed).toFixed(2);
             $("#windSpeed").html(windSpeed + " meter/sec");
             
             //Toggle between wind measurements
             $("#windSpeed").click(function () {
                 if(windSwamp === false) {
                     $("#windSpeed").html(windSpeed + " meter/sec");
                     windSwamp = true;
                 }
                 else {
                     $("#windSpeed").html(mwindSpeed + " mph")
                     windSwamp = false;
                 }
             })
             if(weatherType === "rain" || weatherType === "light rain") {
                 $('body').css('background-image', 'url(../images/rainy.jpg)');
             }
             else if(weatherType === "snow") {
                 $('body').css('background-image', 'url(../images/snowy.jpg)');
             }
             else {
                 $('body').css('background-image', 'url(../images/background_img.jpg');
             }
            })
            $('#table_wrap').hide();
            //Weather by a city
           $('#cityInput').keypress(function (e) {
           $('#geoWeather').hide();
  //pressing enter
  if(e.which == 13) {
  $('#table_wrap').show();
  //getting the name of the city
  var cityName = $('#cityInput').val();
  var lang = 'en';
    //JSON data request
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=93423cd537d8b5132f4cff5001224210&units=metric' + '&lang='+ lang, function(data) {
    var temp;
    var fTemp;
    var cTemp;
    var kTemp;
    var tempSwap = true;
    var windSwamp = true;
    //JSON call for Open Weather API
             var weatherType = data.weather[0].description;
             temp = data.main.temp;
             var windSpeed = data.wind.speed;
             var city = data.name;
             var picture = data.weather[0].icon;
             var pressure = data.main.pressure;
             var humidity = data.main.humidity; 
             //Temperature in Celsius
             cTemp = temp.toFixed(1);
             
             $('#city2').html(city);
             $('#cTemp2').html(cTemp + " &#8451");
             $('#weatherType2').html("condition: " + weatherType);
             $('#windSpeed2').html("Wind speed: " + windSpeed + " m/sec");
             $('#pressure2').html("Pressure: " + pressure + " hPa");
             $('#humidity2').html("Humidity: " + humidity + " %");
             //the method which shows the weather icon
             $('#picture2').html('<img src="images/'+ picture +'.png"/>');
    });
    
$.getJSON('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=93423cd537d8b5132f4cff5001224210&cnt=7&units=metric' + '&lang='+ lang, function(data) {
    var offset = (new Date()).getTimezoneOffset()*60*1000;
    $.each(data.list, function() {
        var localTime = new Date(this.dt*1000 - offset);
        addWeather(
            this.weather[0].icon,
            moment(localTime).calendar(), // Use moment.js for date format
            Math.round(this.temp.day) + '&deg;C',
            this.speed + ' m/s',
            this.humidity
            );
    });
});
function addWeather(icon, day, temp, speed, humidity) {
        $('.days').html(day);
        $('.icons').html('<img src="images/'+ icon +'.png"/>');
        $('.temps').html(temp);
        $('.wind').html(speed);
        $('.moist').html(humidity);
    }
  }
  }); 

})
    
    
})
