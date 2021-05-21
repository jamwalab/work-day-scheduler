var dateToday = moment().format("dddd, MMMM Do");
$("#currentDay").append(dateToday);

console.log($("#currentDay"), moment().format("H"), moment().format("dddd, MMMM Do"));
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

    if (!tasks) {
        tasks = {
            [dateToday]: []
        };
    } else if (!tasks[dateToday]) {
        tasks[dateToday] = [];
    }
    scheduleFormat();
    console.log(tasks);
    $.each(tasks, function(date,arr) {
        console.log(date,arr);
        if (date === dateToday) {
            console.log(arr)
            createTask(arr);
        }
    })
}
//-----SAVES TASK IN LOCAL STORAGE-----//
var saveTasks = function() {
    localStorage.setItem("daySchedule", JSON.stringify(tasks));
}

$(".col-10").on("click", function() {

    var text = $(this).find("p").text().trim();

    var textInput = $("<textarea>").val(text).addClass("addNewTask");
        
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");

});
$(".col-10").on("blur", "textarea", function() {
    console.log("in")
    setTimeout(function() {
        var taskP = $("<p>").addClass("taskText");
        $("textarea").replaceWith(taskP);
        loadTasks();
    }, 200);
});

$(".saveBtn").on("click", function(event) {
    console.log($(this));
    console.log($(this).closest(".row").find(".col-10"));
    var newText = $(this).closest(".row").find("textarea").val().trim();

    var hour = $(this).closest(".row").attr("id").replace("hour-","");

    console.log(newText,hour, "in");

    tasks[dateToday][hour-9] = newText;

    var taskP = $("<p>")
    .addClass("taskText")
    .text(newText);

    $(this).closest(".row").find("textarea").replaceWith(taskP);

    saveTasks();
});

loadTasks();