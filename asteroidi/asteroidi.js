$(document).ready(function () {

    $("#apiCall").on("click", function () {
        ajaxGet();
        $("#dataInput").html("");
        $(".autoBox").html("");
    });
    let hazObj = {};
    let hazArrObj = [];

    //AJAX GET
    function ajaxGet() {

        let start_date = $("#startDate").val();
        let end_date = $("#endDate").val();

        //check difference between dates
        let start = new Date(start_date);
        let end = new Date(end_date);
        let timeDifference = Math.abs(end.getTime() - start.getTime());
        let diffDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

        localStorage.setItem("start_date", JSON.stringify(start_date));
        localStorage.setItem("end_date", JSON.stringify(end_date));

        // do ajax call with input dates
        let api = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + start_date + "&end_date=" + end_date + "&api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2";
        if (diffDays <= 7) {
            $.ajax({
                type: "GET",
                url: api,
                dataType: "json",
                success: function (result) {
                    $(".asteroidList").html("<tr>" +
                        "<thead><th>Datum</th>" +
                        "<th>Ime</th>" +
                        "<th>Brzina kretanja (km/h)</th>" +
                        "<th>Min. Precnik (m)</th>" +
                        "<th>Max. Precnik (m)</th>" +
                        "</tr></thead>");

                    let asteroids = result.near_earth_objects;
                    let keys = Object.keys(asteroids);

                    for (let i = 0; i < keys.length; i++) {
                        let year = result["near_earth_objects"][keys[i]];
                        for (let j = 0; j < year.length; j++) {
                            let hazarduos = result["near_earth_objects"][keys[i]][j]["is_potentially_hazardous_asteroid"]; //potetially hazard asteroids
                            // take data form JSON file
                            let id = result["near_earth_objects"][keys[i]][j]["id"];
                            let name = result["near_earth_objects"][keys[i]][j]["name"];
                            let date = result["near_earth_objects"][keys[i]][j]["close_approach_data"][0]["close_approach_date"];
                            let speed = result["near_earth_objects"][keys[i]][j]["close_approach_data"][0]["relative_velocity"]["kilometers_per_hour"];
                            let diametarMin = result["near_earth_objects"][keys[i]][j]["estimated_diameter"]["meters"]["estimated_diameter_min"];
                            let diametarMax = result["near_earth_objects"][keys[i]][j]["estimated_diameter"]["meters"]["estimated_diameter_max"];
                            //let link = result["near_earth_objects"][keys[i]][j]["links"]["self"];

                            if (hazarduos) {

                                $(".asteroidList").append(
                                    "<tbody><tr><td>" + date +
                                    "</td><td>" + name +
                                    "</td><td>" + speed +
                                    "</td><td>" + diametarMin +
                                    "</td><td>" + diametarMax +
                                    "</td></tr></tbody>");

                                $("#dataInput").append(
                                    "<option data-id='" + id + "'value='" + name + "'>" + name + "</option>"
                                );
                                // pick which asteroids you do calculation of passing near Earth
                                $(document).on("change", "input", function () {
                                    let options = $('datalist')[0].options;
                                    for (let i = 0; i < options.length; i++) {
                                        if (options[i].value == $(this).val()) {
                                            let ID = options[i].dataset.id;
                                            $(".autoBox").append(
                                                "<ul><li class='element' id =" + ID + ">" + $(this).val() + "<div class='remove'>X</div>" + "</li><ul>"
                                            );
                                            options[i].remove();
                                            hazObj = {
                                                hazName: $(this).val(),
                                                hazId: ID
                                            };
                                            hazArrObj.push(hazObj);
                                            localStorage.setItem("hazArrObj", JSON.stringify(hazArrObj)); // put array in local storage to call it in second js file

                                            // remove asteroids from the list of chosen
                                            $(".remove").on("click", function () {
                                                $(this).parent().remove();
                                                let li_Id = $(this).parent()[0].id;
                                                let el_name = $(this).parent()[0].firstChild.data;
                                                for (let j = 0; j < hazArrObj.length; j++) {
                                                    if (hazArrObj[j].hazId == li_Id) {
                                                        hazArrObj.splice(j, 1);
                                                        $("#dataInput").append(
                                                            "<option data-id='" + li_Id + "'value='" + el_name + "'>" + el_name + "</option>"
                                                        );
                                                        localStorage.setItem("hazArrObj", JSON.stringify(hazArrObj)); // put array in local storage to call it in second js file
                                                    }
                                                }
                                            });
                                            $("#asteroidSearch").val("");
                                            break;
                                        }
                                    }
                                });

                            }
                        }
                    }
                    //pagitation for table of asteroids
                    let totalRows = $(".asteroidList").find("tbody tr:has(td)").length;
                    let recordPerPage = 10;
                    let totalPages = Math.ceil(totalRows / recordPerPage);
                    let pages = $("<div id='pages'></div>");
                    for (let g = 0; g < totalPages; g++) {
                        $("<span class='pageNumber'>&nbsp;" + (g + 1) + "</span>").appendTo(pages);
                    }
                    pages.appendTo(".asteroidList");

                    $(".pageNumber").hover(
                        function () {
                            $(this).addClass("focus");
                        },
                        function () {
                            $(this).removeClass("focus");
                        }
                    );

                    $("table").find("tbody tr:has(td)").hide();
                    let tr = $("table tbody tr:has(td)");
                    for (let k = 0; k <= recordPerPage - 1; k++) {
                        $(tr[k]).show();
                    }
                    $("span").click(function () {
                        $(".asteroidList").find("tbody tr:has(td)").hide();
                        let pBegin = ($(this).text() - 1) * recordPerPage;
                        console.log($(this).text());
                        let pEnd = $(this).text() * recordPerPage - 1;
                        for (let l = pBegin; l <= pEnd; l++) {
                            $(tr[l]).show();
                        }
                    });

                    $("#asteroidSearch").css("display", "block");
                    $(".autoBox").css("display", "block");
                    $(".showChart").css("display", "block");
                },
                error: function (e) {
                    $(".asteroidList").html("<strong>Error</strong>");
                    console.log("ERROR: ", e);
                }
            });
        } else {
            alert("Date input is incorect!");
            resetData();
            $("#asteroidSearch").css("display", "none");
            $(".autoBox").css("display", "none");
            $(".showChart").css("display", "none");
            $(".asteroidList").html("");
            $("#dataInput").html("");
            $("#asteroidSearch").val("");
            $(".autoBox").html("");
            $(".part").html("");
        }
        resetData();
    }

    function resetData() {
        $("#startDate").val("");
        $("#endDate").val("");
    }

});
