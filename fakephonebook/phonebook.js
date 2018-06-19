$(document).ready(function () {
    ajaxGet();
    //AJAX POST
    //Submit Form
    $("#postForm").submit(function (event) {
        event.preventDefault();
        ajaxPost();
    });

    //Prepare Data
    function ajaxPost() {
        var formData = {
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            phonenumber: $("#phone").val()
        }
        if ($("#firstname").val() != "" && $("#lastname").val() != "" && $("#phone").val() != "") {

            //POST REQUEST

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:3000/people",
                data: JSON.stringify(formData),
                dataType: 'json',
                success: function (result) {
                    ajaxGet();
                    location.reload(true);
                    $(".quickAddForm").hide();
                    console.log("Successfuly Done");
                },
                error: function (e) {
                    alert("Error!")
                    console.log("ERROR:", e);
                }
            });
            resetData();
        }
    };


    //SEARCH LAST NAME
    //var seacrhTerm = $("#searchLastName").val();
    $("#find").on("click", function () {

        var api = "http://localhost:3000/people?lastname=" + $("#searchLastName").val();
        if ($("#searchLastName").val() === "") {
            location.reload(true);
            ajaxGet();
        } else {
            $.ajax({
                type: "GET",
                url: api,
                async: false,
                dataType: 'json',
                success: function (result) {
                    $(".phoneBook").html("");
                    for (i = 0; i < result.length; i++) {
                        $(".phoneBook").append('<div class="entry">' +
                            '<div class="firstName"><p>' + result[i].firstname + '</p></div>' +
                            '<div class="lastName"><p>' + result[i].lastname + '</p></div>' +
                            '<div class="phoneNumber"><p>' + result[i].phonenumber + '</p></div>' +
                            '<div class="del"><a href="#" class="delbutton" data-id=' + result[i].id + '>Delete</a></div>' +
                            '</div>')
                        $("#searchLastName").val("");

                    };
                    $("#searchLastName").val("");
                },
                error: function (e) {
                    $(".phoneBook").html("<strong>Error</strong>");
                    $("#searchLastName").val("");
                    console.log("ERROR: ", e);
                }
            });
        }
    });

    //GET REQUEST


    function ajaxGet() {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/people",
            async: false,
            dataType: 'json',
            success: function (result) {
                $(".phoneBook").html("");
                for (i = 0; i < result.length; i++) {
                    $(".phoneBook").append('<div class="entry">' +
                        '<div class="firstName"><p>' + result[i].firstname + '</p></div>' +
                        '<div class="lastName"><p>' + result[i].lastname + '</p></div>' +
                        '<div class="phoneNumber"><p>' + result[i].phonenumber + '</p></div>' +
                        '<div class="del"><a href="#" class="delbutton" data-id=' + result[i].id + '>Delete</a></div>' +
                        '</div>')
                }
            },
            error: function (e) {
                $(".phoneBook").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }

        });
    }

    //DELETE REQUEST

    $(".entry").delegate(".delbutton", "click", function () {

        var TheID = $(this).attr("data-id");
        console.log(TheID);
        var rem = $(this).closest(".entry");
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/people/" + TheID,
            success: function () {
                rem.remove();
                console.log('done!');
            }
        });
    });


    function resetData() {
        $("#firstname").val("");
        $("#lastname").val("");
        $("#phone").val("");
    }


    $(".quickAdd").on("click", function () {
        $(".quickAddForm").show();
    });
    $("#Cancel").on("click", function () {
        $(".quickAddForm").hide();
        $("input[type=text]").val("");
    });

});
