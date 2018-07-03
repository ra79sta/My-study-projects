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
                    $(".quickAddForm").hide();
                    console.log("Successfuly Done");
                },
                error: function (e) {
                    alert("Error!")
                    console.log("ERROR:", e);
                }
            });
            resetData();
            del();
        } else {
            alert("Enter data!!!")
        }
    };


    //SEARCH LAST NAME

    /* $("#find").on("click", function () {
         var searchTerm = $("#searchLastName").val();
         var api = "http://localhost:3000/people?lastname=" +  searchTerm;
         if ($("#searchLastName").val() === "") {
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
                     };
                     $("#searchLastName").val("");
                     del();
                 },
                 error: function (e) {
                     $(".phoneBook").html("<strong>Error</strong>");
                     $("#searchLastName").val("");
                     console.log("ERROR: ", e);
                 }
             });
         }
     });*/
    $("#find").on("click", function () {
        var searchTerm = $("#searchLastName").val();
        if ($("#searchLastName").val() === "") {
            ajaxGet();
        } else {
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/people",
                async: false,
                dataType: 'json',
                success: function (result) {
                    $(".phoneBook").html("");
                    for (i = 0; i < result.length; i++) {
                        if (result[i].lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                            $(".phoneBook").append('<div class="entry">' +
                                '<div class="firstName"><p>' + result[i].firstname + '</p></div>' +
                                '<div class="lastName"><p>' + result[i].lastname + '</p></div>' +
                                '<div class="phoneNumber"><p>' + result[i].phonenumber + '</p></div>' +
                                '<div class="del"><a href="#" class="delbutton" data-id=' + result[i].id + '>Delete</a></div>' +
                                '</div>')
                        }
                    };
                    $("#searchLastName").val("");
                    del();
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
                del();
            },
            error: function (e) {
                $(".phoneBook").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }

        });
    }

    //DELETE REQUEST
    function del() {
        $(".entry").delegate(".delbutton", "click", function () {

            var TheID = $(this).attr("data-id");
            console.log(TheID);
            var rem = $(this).closest(".entry");
            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/people/" + TheID,
                success: function () {
                    rem.remove();
                    //location.reload(true);
                    console.log('done!');
                }
            });
        });

    }
    del();

    $("#back").on("click", function() {
        ajaxGet();
    });

    function resetData() {
        $("#firstname").val("");
        $("#lastname").val("");
        $("#phone").val("");
    }


    $("#QuickAdd").on("click", function () {
        $(".quickAddForm").show();
    });
    $("#Cancel").on("click", function () {
        $(".quickAddForm").hide();
        $("input[type=text]").val("");
    });

});
