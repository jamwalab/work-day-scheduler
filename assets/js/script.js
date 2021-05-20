var date = moment().format("dddd, MMMM Do");
$("#currentDay").append(date);
tasks = {};

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
$(".col-10").on("click", function(event) {
  //  console.log($(this).find($("p")));
  //  console.log(event);
 //  console.log($(this).has("p").length)
  //  console.log($("p").length)
    var text = $(this).find("p")
            .text()
            .trim();
    var textInput = $("<textarea>")
            .val(text);
        
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");
});
scheduleFormat();