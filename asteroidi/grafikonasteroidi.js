$(document).ready(function () {

    let newArrObj = JSON.parse(localStorage.getItem("hazArrObj")); //restore array form first js file to call ajax
    let start_date = JSON.parse(localStorage.getItem("start_date"));
    let end_date = JSON.parse(localStorage.getItem("end_date"));

    grafs();

    function grafs() {
        for (let g = 0; g < newArrObj.length; g++) {
            let api2 = "https://api.nasa.gov/neo/rest/v1/neo/" + newArrObj[g].hazId + "?api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2";
            $.ajax({
                type: "GET",
                url: api2,
                dataType: "json",
                success: function (data) {
                    $(".message").html(
                        "<h4>Potencijalo opasni asteroidi u preiodu od " + start_date + " do " + end_date + "</h4>" +
                        "<p>Na garfikonu je prikazan broj potenciajlno opasnih prolaza asteroida pored zemlje u periodu od 1900. do 1999. godine</p>"
                    );
                    $(".chartsGrafs").append(
                        "<div class='charts' id='" + newArrObj[g].hazId + "'></div>"
                    );

                    let dateApproachArr = [];
                    let numberOfPaassing = 0;
                    let startYear = "1900-01-01";
                    let endYear = "1999-12-31";
                    let closeApproach = data["close_approach_data"];

                    for (let i = 0; i < closeApproach.length; i++) {
                        let dateApproach = closeApproach[i]["close_approach_date"];
                        dateApproachArr.push(dateApproach);

                    }
                    for (let j = 0; j < dateApproachArr.length; j++) {

                        if (checkRange(startYear, endYear, dateApproachArr[j])) {
                            numberOfPaassing++;

                            if (numberOfPaassing < 25) {
                                $("#" + newArrObj[g].hazId).css("background-color", "green").animate({
                                    opacity: "1",
                                    width: numberOfPaassing * 10
                                }, 50);
                            } else if (numberOfPaassing > 25 && numberOfPaassing < 45) {
                                $("#" + newArrObj[g].hazId).css("background-color", "yellow").animate({
                                    opacity: "1",
                                    width: numberOfPaassing * 10
                                }, 50);;
                            } else if (numberOfPaassing > 45 && numberOfPaassing < 75) {
                                $("#" + newArrObj[g].hazId).css("background-color", "orange").animate({
                                    opacity: "1",
                                    width: numberOfPaassing * 10
                                }, 50);;
                            } else {
                                $("#" + newArrObj[g].hazId).css("background-color", "red").animate({
                                    opacity: "1",
                                    width: numberOfPaassing * 10
                                }, 50);;
                            }
                        }

                    }
                    $(".chartsGrafs").append(
                        "<div class='passName'>" + newArrObj[g].hazName + "</div>" +
                        "<div class='asterNumber'>" + "Broj prolazaka je: " + numberOfPaassing + "</div>"

                    )
                },
                error: function (e) {
                    $(".autoBox").html("<strong>Error</strong>");
                    console.log("ERROR: ", e);
                }
            });
        };
    };
    // helper function -- check if date form array of dates is between  dates from range
    function checkRange(from, to, dateCheck) {
        let fromDate, toDate, dateChDate;
        fromDate = Date.parse(from);
        toDate = Date.parse(to);
        dateChDate = Date.parse(dateCheck);

        if ((dateChDate <= toDate && dateChDate >= fromDate)) {
            return true;
        }
        return false;
    }
    $(".backBut").on("click", function() {
        let hazArrObj = [];
        localStorage.setItem("hazArrObj", JSON.stringify(hazArrObj));
    });
});
