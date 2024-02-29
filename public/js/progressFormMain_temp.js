/* --------------- VARIABLES --------------- */
const PROGRESSBAR_LISTS = $("#progressbar li");
const FIELDSETS = $("fieldset");
const PREVIOUS_BUTTON = $("#previous_button");
const NEXT_BUTTON = $("#next_button");
const SAVE_PROGRESS = $("#save_progress");
const DL_DECODER = $("#start_me");
const NARRATIVE = $("#narrative");
var valid_check = null;

let last_pressed_key = null;

for (let i = 0; i < FIELDSETS.length; i++) {
  //if (FIELDSETS.eq(i).children('h4').length < 1) {
  //    FIELDSETS.eq(i).prepend(`<h4>${FORM_HEADER}</h4>`);
  //}
}

var current_fs = FIELDSETS.first(),
  next_fs = current_fs.next(),
  previous_fs = null;  
current_fs.addClass("active_fs");
PREVIOUS_BUTTON.hide();
PROGRESSBAR_LISTS.eq(FIELDSETS.index(current_fs)).addClass("active");

let FIELDSETS_ACTIVE = FIELDSETS.not(".skip_step");
if (FIELDSETS_ACTIVE.last().hasClass("active_fs")) next_button.innerHTML = "Save & Close";

NEXT_BUTTON.click(function () {
  valid_check = "no";
  if (FORM.valid()) {
    valid_check = "yes";
    var bul = $("#progressbar li").eq($("fieldset").index(next_fs));
  } else {
    var bul = $("#progressbar li").eq($("fieldset").index(current_fs));
  }
  $("#remained_page").val(bul[0].id);
  if (bul[0].id == "li_son") {
    $("#progress_value").val(0);
  }

  if (FORM.attr("id") == "add_form2") {
    valid_check = "yes";
  }

  if (valid_check == "yes") {
    FIELDSETS_ACTIVE = FIELDSETS.not(".skip_step");

    PREVIOUS_BUTTON.show();
    //if (FIELDSETS_ACTIVE.last().hasClass('active_fs')) {
    //    FORM.submit();
    //    return;
    //}

    current_fs.removeClass("active_fs");
    (current_fs = current_fs.next()), (next_fs = current_fs.next()), (previous_fs = current_fs.prev());
    current_fs.addClass("active_fs");
    PROGRESSBAR_LISTS.eq(FIELDSETS.index(current_fs)).addClass("active");

    // if (current_fs.hasClass('skip_step')) {
    //     NEXT_BUTTON.click();
    //     return;
    // }

    if (FIELDSETS_ACTIVE.last().hasClass("active_fs")) {
      next_button.innerHTML = "Save & Close";
      $(NEXT_BUTTON).addClass("hide_save");
      $("#next_button_save").addClass("hide_save");
     //SAVE_PROGRESS.hide();
      SAVE_PROGRESS.remove();
      $("#next_button").hide();
      $("#next_button_save").show();
      $("#next_button_save_approve").show();
    }
  }
});

function checkIsOnline() {
  return new Promise((resolve, reject) => {
    $.get("/is-online")
      .done(resolve)
      .fail(() => {
        Swal.fire({
          icon: "error",
          title: "No connection",
          text: "Failed to connect to Peel9. Please try again later",
        });
        reject();
      });
  });
}

$("#next_button_save").click(function () {
  form_submit(post_url);
});

$("#next_button_save_approve").click(function () {
  form_submit2(post_url);
});

PREVIOUS_BUTTON.click(function () {
  var bul = $("#progressbar li").eq($("fieldset").index(current_fs));
  var bul2 = $("#progressbar li").eq($("fieldset").index());
  $("#remained_page").val(bul[0].id);
  if (bul[0].id == "li_son") {
    $("#progress_value").val(0);
  }
  next_loop_control = 0;
  FIELDSETS_ACTIVE = FIELDSETS.not(".skip_step");
  $(NEXT_BUTTON).removeClass("hide_save");
  $("#next_button_save").removeClass("hide_save");
  $("#next_button_save_approve").removeClass("hide_save");

  if (FIELDSETS_ACTIVE.first().hasClass("active_fs")) {
    return;
  }
  //SAVE_PROGRESS.show();
  $("#next_button").show();
  $("#next_button_save").hide();
  $("#next_button_save_approve").hide();
  PROGRESSBAR_LISTS.eq(FIELDSETS.index(current_fs)).removeClass("active");

  current_fs.removeClass("active_fs");
  (current_fs = current_fs.prev()), (next_fs = current_fs.next()), (previous_fs = current_fs.prev());
  current_fs.addClass("active_fs");
  PROGRESSBAR_LISTS.eq(FIELDSETS.index(current_fs)).addClass("active");

  if (current_fs.hasClass("skip_step")) {
    PREVIOUS_BUTTON.click();
    return;
  }

  if (FIELDSETS_ACTIVE.first().hasClass("active_fs")) PREVIOUS_BUTTON.hide();
  if (!FIELDSETS_ACTIVE.last().hasClass("active_fs")) next_button.innerHTML = "Next";
});
function cancel_form() {
  const isFormDirty = $("#cancel_button").attr("is-form-dirty") === "true";
  $("#cancel_button").removeAttr("is-form-dirty");

  const saveProgressButton = $("#save_progress").get(0);

  let content = "This action will close the current page. Any unsaved updates will be lost.";

  let buttons = {
    confirm: function (ev) {
      if (FORM.attr("id") == "add_form22") {
        window.location.href = "../view";
      } else {
        parent.jQuery.colorbox.close(true);
      }
    },
  };

  if (
    isFormDirty &&
    saveProgressButton &&
    !saveProgressButton.disabled &&
    $._data(saveProgressButton, "events")?.click
  ) {
    content =
      "Choose Save & Exit to save your progress or Close w/o Save not to save your progress or press Cancel to continue working on this page";
    buttons = {
      ["save & exit"]: function (ev) {
        $(saveProgressButton).click();
      },
      ["close w/o save"]: function (ev) {
        parent.jQuery.colorbox.close(true);
      },
    };
  }

  $.confirm({
    title: "This action will exit the form",
    content,
    buttons: {
      ...buttons,
      cancel: function () {},
    },
  });
}

function form_submit(post_url) {
  var isValid = FORM.valid();
  console.log(post_url);
  checkIsOnline().then(() => {
    if (isValid) {
      $("#next_button_save").hide();
      $("#next_button_save_approve").hide();
      $("#save_progress").prop("disabled", true);
      $("#progress-form-backdrop").addClass("open");

      let formData = FORM.serialize();

      const randomUuid = $("#random-uuid").val();

      if (randomUuid) {
        formData += "&random_uuid=" + randomUuid;
      }

      $.ajax({
        type: "POST",
        url: post_url,
        data: formData,
        success: function (data) {
          // console.log(data)
          if (data.success == true || data.insertId != null) {
            $("#formDirty").remove();
            $.alert("Succesfully added to the source database");

            if (typeof customPostSuccessCallback !== "undefined") {
              customPostSuccessCallback(data);              
            }
            setTimeout(function () {
              parent.jQuery.colorbox.close(true);              
            }, 1400);
          } else {
            $.confirm({
              title: "oops. Something went wrong",
              content: data,
              buttons: {
                SendToPeel9: {
                  text: "Send to Peel9",
                  btnClass: "btn-blue",
                  keys: ["enter", "shift"],
                  action: function () {
                    window.location.href = "../user_request_form/" + data;
                  },
                },
                cancel: function () {
                  //$.alert('Canceled!');
                },
              },
            });
          }
        },
        complete: function () {
          $("#save_progress").prop("disabled", false);
          $("#progress-form-backdrop").removeClass("open");
        },
      });
    }
  });

  return isValid;
}

function form_submit2(post_url) {
  checkIsOnline().then(() => {
    var data = FORM.serializeArray();
    data.push({
      supervisor_approval: "yes",
      user_approved: 1,
      supervised_approved: 1,
      supervisor_approved_on: new Date(),
      user_approved_on: new Date(),
      user_id: req.session.passport.user.id,
      supervisor_id: req.session.passport.user.id,
      supervisor_badge: req.session.passport.user.badge_number,
      user_badge: req.session.passport.user.badge_number,
      supervisor_name: req.session.passport.user.username,
      user_name: req.session.passport.user.badge_number,
    });

    $("#next_button_save").hide();
    $("#next_button_save_approve").hide();

    $("#save_progress").prop("disabled", true);
    $("#progress-form-backdrop").addClass("open");

    let formData = FORM.serialize();

    const randomUuid = $("#random-uuid").val();

    if (randomUuid) {
      formData += "&random_uuid=" + randomUuid;
    }

    $.ajax({
      type: "POST",
      url: post_url,
      data: formData,
      success: function (data) {
        if (data.success == true) {
          $("#formDirty").remove();
          $.alert("Succesfully added to the source database");
          setTimeout(function () {
            parent.jQuery.colorbox.close(true);
          }, 1400);
        } else {
          $.confirm({
            title: "oops. Something went wrong",
            content: data,
            buttons: {
              SendToPeel9: {
                text: "Send to Peel9",
                btnClass: "btn-blue",
                keys: ["enter", "shift"],
                action: function () {
                  window.location.href = "../user_request_form/" + data;
                },
              },
              cancel: function () {
                //$.alert('Canceled!');
              },
            },
          });
        }
      },
      complete: function () {
        $("#save_progress").prop("disabled", false);
        $("#progress-form-backdrop").removeClass("open");
      },
    });
  });
}

//Disable Enter Button
// function noenter() {
//  $(window).keydown(function(event){
//     if(event.keyCode == 13) {
//       event.preventDefault();
//       return false;
//     }
//   });
//   }
$(function () {
  $("#previous_button").focus(function () {
    $("#previous_button").css("border", "#262626 solid 4px");
  });
  $("#previous_button").blur(function () {
    $("#previous_button").css("border", "#262626 solid 1px");
  });

  $("#next_button").focus(function () {
    $("#next_button").css("border", "#262626 solid 4px");
  });
  $("#next_button").blur(function () {
    $("#next_button").css("border", "#262626 solid 1px");
  });

  $("#cancel_button").focus(function () {
    $("#cancel_button").css("border", "#262626 solid 4px");
  });
  $("#cancel_button").blur(function () {
    $("#cancel_button").css("border", "#262626 solid 1px");
  });

  $("#save_progress").focus(function () {
    $("#save_progress").css("border", "#262626 solid 4px");
  });
  $("#save_progress").blur(function () {
    $("#save_progress").css("border", "#262626 solid 1px");
  });

  $("input.typeahead").on("blur", function (e) {
    if ($(this).val().trim() === "") {
      if ($(this).attr("address-should-be-selected")) {
        const oldVal = $(this).data("selected-val");
        const isRequired = $(this).prop("required");

        if (oldVal && isRequired) {
          $(e.currentTarget).val(oldVal).valid();
        }
      }
    }
  });

  jQuery.validator.addMethod(
    "require-disabled",
    function (value, element, params) {
      return this.optional(element) === true || element.value;
    },
    "This field is required"
  );

  jQuery.validator.addMethod(
    "address-should-be-selected",
    function (value, element, params) {
      if (element.classList.contains("tt-hint")) return true;

      return (
        this.optional(element) === true ||
        !$(element).val().trim() ||
        $(element).val().trim() === ($(element).data("selected-val") || "")
      );
    },
    "Please select an address"
  );

  jQuery.validator.addMethod(
    "master-should-be-selected",
    function (value, element, params) {
      if (element.classList.contains("tt-hint")) return true;

      return this.optional(element) === true || $(params).val().trim() || $(element).data("unknown-selected");
    },
    "Please select a value"
  );

  FORM.validate().settings.errorPlacement = function (error, element) {
    if (element.hasClass("tt-hint")) return;

    if (element.parent().hasClass("input-group")) {
      error.insertAfter(element.parent());
    } else if (element.hasClass("selectpicker")) {
      if (element.parents(".input-group").length) {
        element.next().find(".filter-option-inner-inner").eq(0).empty();
        error.appendTo(element.next().find(".filter-option-inner-inner").eq(0));
      } else error.insertAfter(element.parents(".bootstrap-select").eq(0));
    } else error.insertAfter(element);
  };
  FORM.validate().settings.ignore = ":not(.bootstrap-select:visible > .selectpicker, input:visible, textarea:visible)";
  //FORM.validate().settings.ignore = ':not(:visible > .selectpicker:hidden, input:visible, textarea:visible)';
});

// PROGRESSBAR ANIMATION
for (let i = 0; i < PROGRESSBAR_LISTS.length; i++) {
  const list_item = PROGRESSBAR_LISTS.eq(i);
  list_item.on("mouseover", () => {
    list_item.addClass("list_hover");
  });
  list_item.on("mouseout", () => {
    PROGRESSBAR_LISTS.removeClass("list_hover");
  });
  list_item.on("click", () => {
    valid_check = "no";
    if (FORM.valid()) {
      valid_check = "yes";
      var bul = $("#progressbar li").eq($("fieldset").index(next_fs));
    } else {
      var bul = $("#progressbar li").eq($("fieldset").index(current_fs));
    }
    $("#remained_page").val(bul[0].id);
    if (bul[0].id == "li_son") {
      $("#progress_value").val(0);
    }

    if (FORM.attr("id") == "add_form2") {
      valid_check = "yes";
    }

    if (valid_check != "yes") return;

    if (list_item.hasClass("active")) {
      for (let i = 0; i < PROGRESSBAR_LISTS.length; i++) {
        PREVIOUS_BUTTON.click();
        if (!list_item.hasClass("active")) {
          NEXT_BUTTON.click();
          return;
        }
      }
    } else {
      for (let i = 0; i < PROGRESSBAR_LISTS.length; i++) {
        if (FORM.attr("id") == "add_form2") {
          valid_check = "yes";
        }

        NEXT_BUTTON.click();

        if (list_item.hasClass("active")) {
          return;
        }
      }
      list_item.addClass("list_click_failed");
      setTimeout(() => {
        list_item.removeClass("list_click_failed");
      }, 400);
    }
  });
}

//$(document).on("keydown", function (e) {
//    if (e.keyCode === 13 && last_pressed_key === 16) {
//        e.preventDefault();
//        PREVIOUS_BUTTON.click();
//        return;
//    }
//    if (e.keyCode === 13 && !NARRATIVE.is(':focus')) {
//        e.preventDefault();
//        NEXT_BUTTON.click();
//    }
//    last_pressed_key = e.keyCode;
//});
//$(document).on("keyup", function (e) {
//    if (e.keyCode !== 13) {
//        last_pressed_key = null;
//    }
//});
/*
$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function (form) {
        const select_fields = $('select.form-control.selectpicker')
        for (let i = 0; i < select_fields.length; i++) {
            let select = select_fields.eq(i)
            if (select.val() === null) {
                select.append(`<input name='${select.attr('name')}' value=''>`)
            }
            if (select.hasClass('select_date')) {
                let date_object = new Date(select.val()[0]);
                date_value = '';
                if (date_object != 'Invalid Date') {
                    date_value = date_object.getFullYear() + '-' + (date_object.getMonth() + 1) + '-' + date_object.getDate() + ' ' + date_object.getHours() + ':' + date_object.getMinutes() + ':' + date_object.getSeconds();
                }
                select.selectpicker('val', null)
                select.append(`<input name='${select.attr('name')}' value='${date_value}'>`);
            }
        }

        const checkboxes = $('input[type=checkbox]')
        for (let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes.eq(i)
            if (!checkbox.attr('checked')) {
                checkbox.append(`<input name='${checkbox.attr('name')}' value=''>`)
            }
        }

        const datetime_fields = $('div.input-group.date input');
        for (let i = 0; i < datetime_fields.length; i++) {
            let date_object = new Date(datetime_fields.eq(i).val());
			if(!$("skip_date")){
            date_value = '';
            if (date_object != 'Invalid Date') {
                date_value = date_object.getFullYear() + '-' + (date_object.getMonth() + 1) + '-' + date_object.getDate() + ' ' + date_object.getHours() + ':' + date_object.getMinutes() + ':' + date_object.getSeconds();
            }
            datetime_fields.eq(i).val(date_value)
			}
        }

        document.querySelectorAll('select').forEach(select => select.disabled = false)
        form.submit();
    }
});
*/
