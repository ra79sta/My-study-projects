$(document).ready(function () {
    var lat;
    var long;
    var cTemp;
    var fTemp;
    var change;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {


            lat = position.coords.latitude;
            long = position.coords.longitude;

            //$("#data").html("latitude: " + lat + "<br>longitude: " + long);

            var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=851c3afba36014d7cbbd8ca33fa71acd&units=metric";


            $.getJSON(api, function (data) {
                var weather = data.weather[0].description;
                var cels = data.main.temp;
                var wind = data.wind.speed;
                var city = data.name + ", " + data.sys.country;

                cTemp = Math.round(cels);
                fTemp = Math.round(cTemp * 1.8 + 32);

                $("#city").html(city);
                $("#temp").html(cTemp + " &#x2103;");
                $("#temp").click(function () {
                    if (change === true) {
                        $("#temp").html(cTemp + " &#x2103;");
                        change = false;
                    } else {
                        $("#temp").html(fTemp + " &#x2109;");
                        change = true;
                    }
                });
                $("#windspeed").html("Wind speed: " + wind + " m/s");
                $("#weather").html(weather);


                if (cTemp > 22 && cTemp < 35) {
                    $("body").css("background-image", "url(http://cdn.c.photoshelter.com/img-get2/I0000KkYYeoPpOAI/fit=1000x750/dt864caribou-spring.jpg)");
                } else if (cTemp <= 22 && cTemp > 15) {
                    $("body").css("background-image", "url(https://i.ytimg.com/vi/NSeZgn4-jLw/maxresdefault.jpg)");
                } else if (cTemp >= 35) {
                    $("body").css("background-image", "url(http://b385fed712fd99481829-27c3a013525af50c99c4197a0e343ea6.r2.cf3.rackcdn.com/2013/12/P1080456.jpg)");
                } else if (cTemp <= 15 && cTemp > 9) {
                    $("body").css("background-image", "url(https://s-media-cache-ak0.pinimg.com/originals/26/f5/42/26f5429510f6f558134bae36a14966be.jpg)");
                } else if (cTemp <= 9 && cTemp >= 0) {
                    $("body").css("background-image", "url(https://4.bp.blogspot.com/_IfdWOybw6zk/TQp5Zu0FvBI/AAAAAAAAAMU/2yfNhkC9L3g/s1600/DSCN2548.JPG)");
                } else if (cTemp < 0) {
                    $("body").css("background-image", "url(https://www.thefacebeauty.co.uk/blog/wp-content/uploads/2010/11/cold-weather.jpg)");
                }


                //console.log(city);
                //console.log(api);

            });
        });
    }

});
