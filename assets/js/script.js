$("#currentDay").append(moment().format("dddd, MMMM Do"));

console.log($("#currentDay"), moment().format("H"), moment().format("dddd, MMMM Do"));

var scheduleFormat = function() {
    $(".row").each(function() {
        console.log($(this).attr("id"));
        var hour = parseInt($(this).attr("id").replace("hour-",""));
        console.log(hour, typeof(hour), typeof(moment().format("H")));
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
scheduleFormat();