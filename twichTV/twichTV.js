$(document).ready(function () {
    var api;
    var api2;
    var channel = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

    for (var i = 0; i < channel.length; i++) {
        api = "https://wind-bow.gomix.me/twitch-api/channels/" + channel[i] + "?callback=?";

        $.getJSON(api, function (data) {

            var name = data.name;
            var logo = data.logo;
            if (logo === null) {
                logo = "http://www.team-aaa.com/photos/news/CSGO/nologo.jpg";
            }
            if (data.error) {
                logo = "http://www.team-aaa.com/photos/news/CSGO/nologo.jpg";
                $("#list").append("<div class='box row offline'><div class='col-md-3'><img class='img' src =" + logo + "></div><div class='col-md-3'><a target='blank' href='https://www.twitch.tv/" + name + "'>" + data.message + "</a></div><div class='col-md-3'>ERROR</div><div class='col-md-3'>ERROR</div><br></div>");
            }

            api2 = "https://wind-bow.gomix.me/twitch-api/streams/" + name + "?callback=?";
            // console.log(logo);

            $.getJSON(api2, function (data2) {
                var status
                if (data2.stream === null)
                    status = "offline";
                else {
                    status = "OnLine";
                }

                if (data2.stream === null && data.status != 404) {
                    /* $("#user").append("<a target='blank' href='https://www.twitch.tv/"+name+"'>"+name+"</a><br>");
                     $("#status").append("offline<br>");
                     $("#game").append("Null<br>");
                     $("#logo").append("<img class='img' src ="+logo+"><br>");*/
                    $("#list").append("<div class='box row offline'><div class='col-md-3'><img class='img' src =" + logo + "></div><div class='col-md-3'><a target='blank' href='https://www.twitch.tv/" + name + "'>" + name + "</a></div><div class='col-md-3'>" + status + "</div><div class='col-md-3'> No Game</div><br></div>");

                } else {
                    /* $("#user").append("<a target='blank' href='https://www.twitch.tv/"+name+"'>"+name+"</a><br>");
                      $("#status").append("OnLine<br>");
                      $("#game").append(data2.stream.game +"<br>");
                      $("#logo").append("<img class='img' src ="+logo+"><br>");*/
                    $("#list").append("<div class='box row online'><div class='col-md-3'><img class='img' src =" + logo + "></div><div class='col-md-3'><a target='blank' href='https://www.twitch.tv/" + name + "'>" + name + "</a></div><div class='col-md-3'>" + status + "</div><div class='col-md-3'> " + data2.stream.game + "</div><br></div>");
                }
                //console.log(data2);
            });
            //console.log(data);
        });
    };

    $("#all").on("click", function () {
        $(".online").show();
        $(".offline").show();

    });
    $("#online").on("click", function () {
        $(".online").show();
        $(".offline").hide();
    });
    $("#offline").on("click", function () {
        $(".online").hide();
        $(".offline").show();
    });
});
