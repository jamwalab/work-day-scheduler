var dateToday = moment().format("dddd, MMMM Do");
$("#currentDay").append(dateToday);
/*tasks = {
    [dateToday]: []
};*/
console.log($("#currentDay"), moment().format("H"), moment().format("dddd, MMMM Do"));
var createTask = function(arr) {
    $.each(arr, function(index, value) {
        var hourId = "#hour-" + (index+9);
        console.log(hourId, $(hourId))
        $(hourId).find(".taskText").text(value);
    })
}
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
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("daySchedule"));

    if (!tasks) {
        tasks = {
            [dateToday]: []
        };
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
var saveTasks = function() {
    localStorage.setItem("daySchedule", JSON.stringify(tasks));
}
var textareaToP = function(text) {
    var taskP = $("<p>")
        .addClass("taskText")
        .text(text);
    return taskP;
}
$(".col-10").on("click", function() {
  //  console.log($(this).find($("p")));
  //  console.log(event);
 //  console.log($(this).has("p").length)
  //  console.log($("p").length)
    var text = $(this).find("p").text().trim();

    var textInput = $("<textarea>").val(text).addClass("addNewTask");
        
    $(this).find("p").replaceWith(textInput);
    textInput.trigger("focus");

    /*$(".saveBtn").on("click", function(event) {
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
    });*/

    /*$(".col-10").on("blur", "textarea", function() {
        console.log("in")
        setTimeout(function() {
            var taskP = $("<p>").addClass("taskText");
            $("textarea").replaceWith(taskP);
            loadTasks();
            /*console.log($("textarea"))
            if ($("textarea").length) {
                var taskP = $("<p>").addClass("taskText").text(text);
                $("textarea").replaceWith(taskP);
                console.log("innnnnnnnnnnnnn")
            }   
        }, 200);
        
        //$(this).replaceWith(taskP);
    })*/
});
$(".col-10").on("blur", "textarea", function() {
    console.log("in")
    setTimeout(function() {
        var taskP = $("<p>").addClass("taskText");
        $("textarea").replaceWith(taskP);
        loadTasks();
        /*console.log($("textarea"))
        if ($("textarea").length) {
            var taskP = $("<p>").addClass("taskText").text(text);
            $("textarea").replaceWith(taskP);
            console.log("innnnnnnnnnnnnn")
        }*/   
    }, 200);
    
    //$(this).replaceWith(taskP);
});
/*$(".col-10").on("blur", "textarea", function() {
    console.log("in")
    setTimeout(function() {
        console.log($("textarea"))
        if ($("textarea").length) {
            var taskP = $("<p>").addClass("taskText").text(text);
            $("textarea").replaceWith(taskP);
            console.log("innnnnnnnnnnnnn")
        }    
    }, 500);
})*/
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
loadTasks();