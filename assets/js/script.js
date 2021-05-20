var dateToday = moment().format("dddd, MMMM Do");
$("#currentDay").append(dateToday);
tasks = {
    [dateToday]: []
};
console.log(tasks)

console.log($("#currentDay"), moment().format("H"), moment().format("dddd, MMMM Do"));

var scheduleFormat = function() {
    //Check each .row class
    $(".row").each(function() {
      //  //console.log($(this).attr("id"));
        //Check the row if to pick up the row hour >> to integer
        var hour = parseInt($(this).attr("id").replace("hour-",""));
      //  //console.log(hour, typeof(hour), typeof(moment().format("H")));
        //Check the current hour and colour the box accordingly
        if (parseInt(moment().format("H")) > hour) {
            $(this).find(".col-10").addClass("past");
        }
        else if (parseInt(moment().format("H")) === hour) {
            $(this).find(".col-10").addClass("present");
        }
        else {
            $(this).find(".col-10").addClass("future");
        }
    });
};
$(".col-10").on("click", function() {
  //  console.log($(this).find($("p")));
    console.log(event);
 //  console.log($(this).has("p").length)
  //  console.log($("p").length)
    var text = $(this).find("p").text().trim();

    var textInput = $("<textarea>").val(text).addClass("addNewTask");
        
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");

    $("body").on("click", function(event) {
        console.log($(this));
        /*console.log($(this).closest(".row").find(".col-10"));
        var newText = $(this).closest(".row").find("textarea").val().trim();

        var hour = $(this).closest(".row").attr("id").replace("hour-","");

        console.log(newText,hour, "in");

        tasks[dateToday][hour-9] = newText;

        var taskP = $("<p>")
        .addClass("taskText")
        .text(newText);

        $(this).replaceWith(taskP);*/
    });

    /*$(".col-10").on("blur", "textarea", function() {
        var taskP = $("<p>")
        .addClass("taskText")
        .text(text);

        $(this).replaceWith(taskP);
    })*/
});
/*$(".col-10").on("blur", "textarea", function() {
    var text = $(this).val().trim();

    var hour = $(this).closest(".row").attr("id").replace("hour-","");

    console.log(text,hour);

    tasks[dateToday][hour-9] = text;

    console.log(tasks)
    var taskP = $("<p>")
        .addClass("taskText")
        .text(text);
});*/
scheduleFormat();