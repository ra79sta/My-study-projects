$(document).ready(function () {

    $("#search").click(function () {

        var termSearch = $("#termSearch").val();

        var api = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + termSearch + "&format=json&callback=?";

        $.ajax({
            type: "GET",
            url: api,
            async: false,
            dataType: 'json',
            success: function (data) {


                $("#display").html("");

                for (var i = 0; i < data[1].length; i++) {
                    $("#display").append("<div class='box1'><a href= " + data[3][i] + "><h2>" + data[1][i] + "</h2></a>" + "<p>" + data[2][i] + "</p></div>");

                    $("#termSearch").val("");
                    $("a").click(function () {
                        $(this).attr("target", "_blank");
                    });
                };
                //console.log(api);
                //console.log(data);   
            }
        });
    });

    $("#termSearch").keypress(function (e) {
        if (e.which === 13) {
            $("#search").click();
        }
    });
    $("#presskey").submit(function (event) {
        // prevent default browser behaviour
        event.preventDefault();

    });


});
