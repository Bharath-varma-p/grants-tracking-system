$(document).ready(function () {
  /*
  $.each(Przedmioty, function(key, value) {
      $('#sel1').append($("<option/>", {
          text: key
      }));
  });
  */
  calendar();
});

function calendar() {
  $("#calendar").fullCalendar({
    themeSystem: "bootstrap3",
    events: "./calendar_events",
    timezone: "local",
    lang: "eng",
    height: 455,
    editable: true,
    header: {
      left: "prev,next,today",
      center: "title",
      right: "",
    },
    eventClick: function (event) {
      start = moment(new Date(event.start)).format("MM/DD/YYYY HH:mm");
      end = moment(new Date(event.end)).format("MM/DD/YYYY HH:mm");
      $("#updateEvent").modal("show");
      $("#title_edit").val(event.title);
      $("#edit_id").val(event.id);
      $("#start_edit").val(start);
      $("#end_edit").val(end);
      $("#created_by").val(event.added_by);
      $("#subject_edit").val(event.subject);
      $("#backgroundColor_edit").val(event.backgroundColor);
      $("#updateEvent .selectpicker").selectpicker("refresh");
    },
    defaultView: "month",
    slotDuration: "00:20:00",
    minTime: "01:00:00",
    maxTime: "10:00:00",
    weekends: true,

    eventRender: function (event, element, view) {},
    selectable: true,
    selectHelper: true,
    displayEventTime: true,

    select: function (start, end, allDay) {
      $("#createEvent").modal("show");
      var CurrentDate = moment(start).format("MM/DD/YYYY HH:mm");
      $("#start").val(CurrentDate);
    },

    editable: true,

    /* 
      eventDrop: function(event, delta) {
       var s = event.start.toJSON();
       if (event.end === null)
         var e = event.start.toJSON();
       else
         var e = event.end.toJSON();
     $.ajax({
     url: 'update_events.php',
     data: 'title='+ event.title+'&start='+ s +'&end='+ e +'&id='+ event.id ,
     type: "POST",
     success: function(json) {
          //alert('eventDrop success');
     }
     });
     },
     */
    /*
    eventResize: function(event) {   
    $.ajax({
     url: 'update_calendar',
    data: {title:document.getElementById('title')},//='+ event.title+'&start='+ s +'&end='+ e+'&id='+ event.id },
     type: "POST",
     success: function(json) {
       //alert('eventResize success');
     }
    });
    
    }
    */
  });
}

$("#editEvent").on("click", function () {
  if (
    document.getElementById("title_edit").value != "" &&
    document.getElementById("start_edit").value != "" &&
    document.getElementById("end_edit").value != ""
  ) {
    $.ajax({
      url: "calendar",
      data: {
        title: document.getElementById("title_edit").value,
        start: document.getElementById("start_edit").value,
        end: document.getElementById("end_edit").value,
        subject: document.getElementById("subject_edit").value,
        backgroundColor: document.getElementById("backgroundColor_edit").value,
        id: document.getElementById("edit_id").value,
        whattodo: "update",
      },
      type: "POST",
      success: function (data) {
        $("#updateEvent").modal("hide");
        $("#calendar").fullCalendar("refetchEvents");
      },
    });
  } else {
    alert("Please fill title, start and end date");
  }
});

$("#deleteEvent").on("click", function () {
  if (
    document.getElementById("title_edit").value != "" &&
    document.getElementById("start_edit").value != "" &&
    document.getElementById("end_edit").value != ""
  ) {
    $.ajax({
      url: "calendar",
      data: {
        title: document.getElementById("title_edit").value,
        start: document.getElementById("start_edit").value,
        end: document.getElementById("end_edit").value,
        subject: document.getElementById("subject_edit").value,
        backgroundColor: document.getElementById("backgroundColor_edit").value,
        id: document.getElementById("edit_id").value,
        whattodo: "delete",
      },
      type: "POST",
      success: function (data) {
        $("#calendar").fullCalendar("refetchEvents");
      },
    });
  } else {
    alert("Please fill title, start and end date");
  }
});

$("#addEvent").on("click", function () {
  if (
    document.getElementById("title").value != "" &&
    document.getElementById("start").value != "" &&
    document.getElementById("end").value != ""
  ) {
    $.ajax({
      url: "calendar",
      data: {
        title: document.getElementById("title").value,
        start: document.getElementById("start").value,
        end: document.getElementById("end").value,
        subject: document.getElementById("subject").value,
        backgroundColor: document.getElementById("backgroundColor").value,
        only_me1: document.getElementById("only_me1").value,
        only_me: only_me_bucket,
        whattodo: "new",
      },
      type: "POST",
      success: function (data) {
        $("#createEvent").modal("hide");
        $("#calendar").fullCalendar("refetchEvents");
      },
    });
  } else {
    alert("Please fill title, start and end date");
  }
});
