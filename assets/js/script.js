var tasks = {};
//-----CAPTURE TODAY'S DATE-----//
var dateToday = moment().format("dddd, MMMM Do");
$("#currentDay").append(dateToday);
//-----DISPLAYS TASKS ON THE PAGE-----//
var createTask = function(arr) {
    $.each(arr, function(index, value) {
        var hourId = "#hour-" + (index+9);
        console.log(hourId, $(hourId))
        $(hourId).find(".taskText").text(value);
    })
}
//-----CHANGES THE COLOR BASED ON TIME-----//
var scheduleFormat = function() {
    //Check each .row class
    $(".row").each(function() {
        var hour = parseInt($(this).attr("id").replace("hour-",""));
        console.log(moment().format("H"));
        //class changed based on hour
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
//-----LOADS TASKS FROM SAVE FILE OR CREATES NEW-----//
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("daySchedule"));
    //if no tasks present
    if (!tasks) {
        tasks = {
            [dateToday]: []
        };
    } else if (!tasks[dateToday]) { //if no tasks for today's date
        tasks[dateToday] = [];
    }
    scheduleFormat();
    $.each(tasks, function(date,arr) {
        //Loads task if present for today's date
        if (date === dateToday) {
            createTask(arr);
        }
    })
}
//-----SAVES TASK IN LOCAL STORAGE-----//
var saveTasks = function() {
    localStorage.setItem("daySchedule", JSON.stringify(tasks));
}
//-----TEXT EDIT IF CLICKED ON THE TASK AREA-----//
$(".col-10").on("click", function() {
    console.log($(this));
    var text = $(this).find("p").text().trim();

    var textInput = $("<textarea>").val(text).addClass("addNewTask");
        
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");

});
//-----WHEN MOVING OUT OF THE TEXTAREA-----//
//-----IMPORTANT: IF SAVE BUTTON IS NOT CLICKED IT WILL ROLL BACK TO PREVIOUS TEXT-----//
$(".col-10").on("blur", "textarea", function() {
    //assign text area to a variable
    var theTextArea = $("textarea");
    //execute replace after a delay to avoid conflict with save button
    setTimeout(function() {
        if ($("textarea").length) {
            var hour = theTextArea.closest(".row").attr("id").replace("hour-","");
            var oldText = tasks[dateToday][hour-9];
            var taskP = $("<p>").addClass("taskText").text(oldText);
            theTextArea.replaceWith(taskP);
            console.log(hour);
        }
    }, 500);
});
//-----SAVE BUTTON - SAVES THE CORRESPONDING TASK WHEN CLICKED-----//
$(".saveBtn").on("click", function(event) {
    //if to avoid console log error
    if ($(this).closest(".row").find("textarea").length) {
        var newText = $(this).closest(".row").find("textarea").val().trim();

        var hour = $(this).closest(".row").attr("id").replace("hour-","");

        tasks[dateToday][hour-9] = newText;

        var taskP = $("<p>")
        .addClass("taskText")
        .text(newText);

        $(this).closest(".row").find("textarea").replaceWith(taskP);

        saveTasks();
    }
});

loadTasks();
//-----CHECK EVERY 3 MINUTES IF HOUR HAS CHANGED-----//
setInterval(function() {
    scheduleFormat()    
  }, 180000);