$("body").append(
  '<button type="button" style="display:none" class="iframe" id="master_name_ajax">Master Name Ajax</button>'
);
$("#videoSource2").hide();
$(".stop_me").hide();

var get_data = [];
var get_data2 = [];

// alert("hi");
// $("$stop_me").click();
$(".stop_me").click(function () {
  $("#durdur2").val("1");
  if (window.stream) {
    window.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
  $("#videoElement").hide();
  $(".let_camera").show();
  $("#start_me").show();
  $("#videoSource2").hide();
  $(".stop_me").hide();
});

function stop_us() {
  if (window.stream) {
    window.stream.getTracks().forEach(function (track) {
      track.stop();
      $("#durdur").val("1");
      $("#start_me").show();
    });
  }
}

$("body").on("DOMSubtreeModified", "#demo", function () {
  var benim_data = document.getElementById("demo").innerHTML;
  if (benim_data.length >= 100) {
    benim_data2 = benim_data.split("<br>");
    get_data = [];
    get_data2 = [];
    get_data.push(benim_data2);

    $(".let_camera").show();
    $(".stop_me").hide();
    $("#start_me").show();
    $("#videoSource2").hide();

    for (i = 0; i < get_data[0].length; i++) {
      if (get_data[0][i].toString().substring(0, 3) == "DAC") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        var name2 = name.split(" ");
        var first_name = name2[0];
        var middle_name = name2[1];
        get_data2.push({ first_name: first_name });
        get_data2.push({ middle_name: middle_name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DCS") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({ last_name: name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DBB") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);

        get_data2.push({
          dob: name.substring(0, 2) + "_" + name.substring(2, 4) + "_" + name.substring(4, 8),
        });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DAY") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({ eye_color: name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DAG") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        var murat = name;
        if (murat.includes("#")) {
          var murat3 = murat.indexOf("#");
          var murat4 = murat.length;
          var murat2 = murat.substring(0, murat3); //replace(murat2[0] + " Apt No" + murat2[1
          var murat5 = murat.substring(murat3 + 1, murat4);
          var address = murat2 + " Apt No" + murat5;
          get_data2.push({ address: address });
        } else {
          get_data2.push({ address: name });
        }
      }

      if (get_data[0][i].toString().substring(0, 3) == "DAI") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({ city: name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DAJ") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({ state: name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DCG") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({ country: name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "ZKB") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({ county: name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DBC") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        if (name == 1) {
          get_data2.push({ sex: "M" });
        }
        if (name == 2) {
          get_data2.push({ sex: "F" });
        }
      }
      if (get_data[0][i].toString().substring(0, 3) == "DAK") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({ zip_code: name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DBD" || get_data[0][i].toString().substring(0, 3) == "ZOE") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({
          issued_date: name.substring(0, 2) + "_" + name.substring(2, 4) + "_" + name.substring(4, 8),
        });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DBA") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({
          expiration_date: name.substring(0, 2) + "_" + name.substring(2, 4) + "_" + name.substring(4, 8),
        });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DAU") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(4, uzunluk);
        //var name2 = Math.round(name/12);
        get_data2.push({ height: name });
      }
      if (get_data[0][i].toString().substring(0, 3) == "DAW") {
        var uzunluk = get_data[0][i].length;
        var name = get_data[0][i].substring(3, uzunluk);
        get_data2.push({ weight: name });
      }
      if (get_data[0][i].includes("DAQ")) {
        var demo = get_data[0][i];
        var name1 = demo.split("DAQ");
        var name2 = name1[1];
        get_data2.push({ license_number: name2 });
      }
      if (get_data[0][i].includes("DAD")) {
        var demo = get_data[0][i];
        var name1 = demo.split("DAD");
        var name2 = name1[1];
        get_data2.push({ middle_name2: name2 });
      }
    }

    if (window.stream) {
      window.stream.getTracks().forEach(function (track) {
        track.stop();
        $("#videoElement").hide();
      });
    }
    var ajax_send = [];
    var ajax_send1 = [];
    var ajax_send2 = [];

    for (i = 0; i < 17; i++) {
      if (get_data2[i].hasOwnProperty("last_name")) {
        var last_name = get_data2[i].last_name;
      }
      if (get_data2[i].hasOwnProperty("first_name")) {
        var first_name = get_data2[i].first_name;
      }
      if (get_data2[i].hasOwnProperty("dob")) {
        var dob = get_data2[i].dob;
      }
      if (i == 16) {
        ajax_send = [];
        ajax_send1 = [];
        ajax_send2 = [];
        ajax_send.push(last_name);
        ajax_send1.push(first_name);
        ajax_send2.push(dob);
      }
    }

    var dobim = ajax_send2[0];
    var dobb = dobim;
    var dobb2 = dobb.split("_");
    var dobb3 = dobb2[0] + "/" + dobb2[1] + "/" + dobb2[2];

    $.ajax({
      // Send the username val to available.php
      type: "POST",
      data: {
        first_name: ajax_send1[0],
        last_name: ajax_send[0],
        dob: ajax_send2[0],
      },
      url: "../name_check2",
      success: function (data) {
        // Get the result
        if (data.length < 1) {
          $.confirm({
            title: "This action will make this report template as your default selection.",
            content: "Confirm to continue!",
            title: "",
            content:
              '<span style="font-weight:bold">!!!Nobody like: </span><hr><span style="font-weight:bold">' +
              ajax_send1[0] +
              " " +
              ajax_send[0] +
              " --" +
              dobb3 +
              "</span><hr>" +
              '<span style="font-weight:bold; color:red">Do you want to add?</span>',
            buttons: {
              confirm: function (ev) {
                $("#master_name_ajax").trigger("click");
                data_pass = true;
              },
              cancel: function () {
                //  $.alert('Canceled!');
              },
            },
          });
        }
        if (data.length == 1) {
          show_divs();
          $("#victim_specs").show();
          $("#name_search").show();
          $("#accordion2").show();
          $("#accordion3").show();
          $("#accordion4").show();
          $("#accordion5").show();
          $("#gonder").show();
          $("#first_name_div").show();
          $("#alias1_div").show();
          $("#alias2_div").show();
          $("#alias3_div").show();
          $("#middle_name_div").show();
          $("#last_name_div").show();
          $("#suffix_div").show();
          $("#dob_div").show();
          $("#race_div").show();
          $("#sex_div").show();

          $("#marital_status_div").show();
          $("#birth_place_div").show();
          $("#birth_state_div").show();
          $("#hair_div").show();
          $("#eye_div").show();
          $("#height_div").show();
          $("#weight_div").show();
          $("#scars_div").show();
          $("#gang_affiliation_div").show();
          $("#ssn_div").show();
          $("#fbi_div").show();
          $("#control_div").show();
          $("#interviewed_adress_div").show();
          $("#scars_div").show();
          $("#occupation_school_div").show();
          $("#cell_div").show();
          $("#other_tell_div").show();
          $("#email_div").show();
          $("#suspected_of_using_div").show();
          $("#additional_descriptions_div").show();
          $("#resident_div").show();
          $("#employer_phone_div").show();
          $("#employer_address_div").show();
          $("#employer_div").show();
          data_pass = true;
          $("#search_input").val(data[0].first_name + " " + data[0].last_name);
          $("#first_name_check").val(data[0].first_name);
          $("#last_name_check").val(data[0].last_name);
          $("#middle_name_check").val(data[0].middle_name);
          $("#dob_check").val(data[0].date_of_birth2);
          $("#interviewed_adress_check").val(data[0].Address2);
          $("#cell_check").val(data[0].cell_phone);
          $("#other_tel_check").val(data[0].other_tell);
          $("#email_check").val(data[0].email);
          $("#control_check").val(data[0].control);
          $("#fbi_check").val(data[0].fbi);
          $("#ssn_check").val(data[0].ssn);
          $("#first_name").val(data[0].first_name);
          $("#last_name").val(data[0].last_name);
          $("#middle_name").val(data[0].middle_name);
          $("#alias1").val(data[0].alias1);
          $("#alias2").val(data[0].alias2);
          $("#alias3").val(data[0].alias3);
          $("#dob").val(data[0].date_of_birth2);
          $("#sex.selectpicker").selectpicker("val", data[0].sex);
          $("#race.selectpicker").selectpicker("val", data[0].race);
          if (data[0].height) {
            $("#height1").val(data[0].height.substring(0, 1));
            $("#height2").val(data[0].height.substring(1, 3));

            if ($("#height1").hasClass("selectpicker")) {
              $("#height1").selectpicker("refresh");
            }

            if ($("#height2").hasClass("selectpicker")) {
              $("#height2").selectpicker("refresh");
            }
          }
          $("#weight").val(data[0].weight);
          $("#ssn").val(data[0].ssn);
          $("#fbi").val(data[0].fbi_no);
          $("#control").val(data[0].control_no);
          $("#gang_affiliation").val(data[0].gang_affiliation);
          $("#scars").val(data[0].scars_marks);
          $("#interviewed_adress").val(data[0].Address2);
          $("#city2").val(data[0].City);
          $("#nghbd2").val(data[0].Neighborhood);
          $("#state2").val(data[0].State);
          $("#lat").val(data[0].PointY);
          $("#lng").val(data[0].PointX);
          $("#country2").val(data[0].Country);
          $("#county2").val(data[0].County);
          $("#occupation_school").val(data[0].occupation_school);
          $("#apt_no").val(data[0].apt_no);
          $("#cell").val(data[0].cell_phone);
          $("#other_tel").val(data[0].other_tell);
          $("#email").val(data[0].email);
          var additional_parse = data[0].additional_descriptives;
          if (additional_parse != null || additional_parse != "") {
            additional_parse2 = data[0].additional_descriptives.split(",");
            $("#additional_descriptions").selectpicker("val", additional_parse2);
          }

          $("#resident").selectpicker("val", data[0].resident_status);
          $("#employer").selectpicker("val", data[0].employer);
          $("#employer_phone").val(data[0].employer_phone);
          $("#employer_address").val(data[0].employer_address);
          $("#master_name_id").val(data[0].master_name_id);
          $("#birth_place").val(data[0].birth_place);
          $("#marital_status").selectpicker("val", data[0].marital_status);
          $("#eye").selectpicker("val", data[0].eye_color);
          $("#hair").selectpicker("val", data[0].hair_color);
          $("#birth_state").selectpicker("val", data[0].birth_state);
        }

        if (data.length > 1) {
          //'<div id="isim_ekle" style-"background-color:black; height:200px; width:500px;">'+
          //'<input type="text" value="'+data[0].first_name+'"/>'+
          //'</div>	'
          $(".form-check").remove();
          $("#exampleModal").modal("show");
          //$("#master_name_ajax").trigger('click');
          for (i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
              var color = "black";
            } else {
              var color = "black";
            }

            $("#modelim").append(
              '<div class="form-check col-md-12"><input type="checkbox" class="form-check-input" id="' +
                i +
                '" style="width: 25px; height: 25px; float:left; margin-top:20px">' +
                '<label class="form-check-label" for="exampleCheck1" style="margin-top:20px; color:' +
                color +
                '">' +
                data[i].first_name +
                " " +
                data[i].last_name +
                " " +
                data[i].date_of_birth +
                " --" +
                data[i].Address +
                "</label></div>"
            );
            //<h4></h4>
          }
          var hangi_data = [];

          $("input:checkbox").on("click", function () {
            if ($(this).prop("checked")) {
              hangi_data = [];
              $("input:checkbox").not(this).prop("checked", false);
              hangi_data.push($(this).prop("id"));
            }
          });

          $("#continue_selected").click(function () {
            var data_row = hangi_data[0];
            $("#exampleModal").modal("hide");
            //$("#master_name_ajax2").trigger('click');

            $("#victim_specs").show();
            $("#name_search").show();
            $("#accordion2").show();
            $("#accordion3").show();
            $("#accordion4").show();
            $("#accordion5").show();
            $("#gonder").show();
            $("#first_name_div").show();
            $("#alias1_div").show();
            $("#alias2_div").show();
            $("#alias3_div").show();
            $("#middle_name_div").show();
            $("#last_name_div").show();
            $("#dob_div").show();
            $("#race_div").show();
            $("#sex_div").show();

            $("#marital_status_div").show();
            $("#birth_place_div").show();
            $("#birth_state_div").show();
            $("#hair_div").show();
            $("#eye_div").show();
            $("#height_div").show();
            $("#weight_div").show();
            $("#scars_div").show();
            $("#gang_affiliation_div").show();
            $("#ssn_div").show();
            $("#fbi_div").show();
            $("#control_div").show();
            $("#interviewed_adress_div").show();
            $("#scars_div").show();
            $("#occupation_school_div").show();
            $("#cell_div").show();
            $("#other_tell_div").show();
            $("#email_div").show();
            $("#suspected_of_using_div").show();
            $("#additional_descriptions_div").show();
            $("#resident_div").show();
            $("#employer_phone_div").show();
            $("#employer_address_div").show();
            $("#employer_div").show();

            $("#search_input").val(data[data_row].first_name + " " + data[data_row].last_name);
            data_pass = true;
            $("#first_name_check").val(data[data_row].first_name);
            $("#last_name_check").val(data[data_row].last_name);
            $("#middle_name_check").val(data[data_row].middle_name);
            $("#dob_check").val(data[data_row].date_of_birth2);
            $("#interviewed_adress_check").val(data[data_row].Address2);
            $("#cell_check").val(data[data_row].cell_phone);
            $("#other_tel_check").val(data[data_row].other_tell);
            $("#email_check").val(data[data_row].email);
            $("#control_check").val(data[data_row].control);
            $("#fbi_check").val(data[data_row].fbi);
            $("#ssn_check").val(data[data_row].ssn);
            $("#first_name").val(data[data_row].first_name);
            $("#last_name").val(data[data_row].last_name);
            $("#middle_name").val(data[data_row].middle_name);
            $("#alias1").val(data[data_row].alias1);
            $("#alias2").val(data[data_row].alias2);
            $("#alias3").val(data[data_row].alias3);
            $("#dob").val(data[data_row].date_of_birth2);
            $("#sex.selectpicker").selectpicker("val", data[data_row].sex);
            $("#race.selectpicker").selectpicker("val", data[data_row].race);
            $("#height").val(data[data_row].height);

            if (data[data_row].height) {
              $("#height1").val(data[data_row].height.substring(0, 1));
              $("#height2").val(data[data_row].height.substring(1, 3));

              if ($("#height1").hasClass("selectpicker")) {
                $("#height1").selectpicker("refresh");
              }

              if ($("#height2").hasClass("selectpicker")) {
                $("#height2").selectpicker("refresh");
              }
            }

            $("#weight").val(data[data_row].weight);
            $("#ssn").val(data[data_row].ssn);
            $("#fbi").val(data[data_row].fbi_no);
            $("#control").val(data[data_row].control_no);
            $("#gang_affiliation").val(data[data_row].gang_affiliation);
            $("#scars").val(data[data_row].scars_marks);
            $("#interviewed_adress").val(data[data_row].Address2);
            $("#city2").val(data[data_row].City);
            $("#nghbd2").val(data[data_row].Neighborhood);
            $("#state2").val(data[data_row].State);
            $("#lat").val(data[data_row].PointY);
            $("#lng").val(data[data_row].PointX);
            $("#country2").val(data[data_row].Country);
            $("#county2").val(data[data_row].County);
            $("#occupation_school").val(data[data_row].occupation_school);
            $("#apt_no").val(data[data_row].apt_no);
            $("#cell").val(data[data_row].cell_phone);
            $("#other_tel").val(data[data_row].other_tell);
            $("#email").val(data[data_row].email);
            var additional_parse = data[data_row].additional_descriptives;
            if (additional_parse == null || additional_parse == "") {
            } else {
              additional_parse2 = additional_parse.replace(/&quot;/g, '"');
              $("#additional_descriptions").selectpicker("val", JSON.parse(additional_parse2));
            }
            $("#resident").selectpicker("val", data[data_row].resident_status);
            $("#employer").val(data[data_row].employer);
            $("#employer_phone").val(data[data_row].employer_phone);
            $("#employer_address").val(data[data_row].employer_address);
            $("#master_name_id").val(data[data_row].master_name_id);
            $("#birth_place").val(data[data_row].birth_place);
            $("#marital_status").selectpicker("val", data[data_row].marital_status);
            $("#eye").selectpicker("val", data[data_row].eye_color);
            $("#hair").selectpicker("val", data[data_row].hair_color);
            $("#birth_state").selectpicker("val", data[data_row].birth_state);
          }); // end of continue_selected clicked

          $("#add_new").click(function () {
            $("#exampleModal").modal("hide");
            $("#master_name_ajax").trigger("click");
          });
        } // end of more than one mastername suggestions
      }, // end of success
    }); // end of ajax
  }
});

if ("{{granted}}" == "on") {
  var granted = true;
} else {
  granted = false;
}

let search_input_valid = false;
var video = document.querySelector("#videoElement");
var hdConstraints = {
  video: { mandatory: { minWidth: 1280, minHeight: 720 } },
};
var hhdConstraints = {
  video: { mandatory: { minWidth: 1920, minHeight: 1080 } },
};
var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 640,
      maxHeight: 480,
    },
  },
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia ||
  navigator.oGetUserMedia;

if (navigator.getUserMedia) {
  document.getElementById("demo").innerHTML = "Blah!";
  //navigator.getUserMedia({video: true}, handleVideo, videoError);
  try {
    navigator.getUserMedia(hhdConstraints, handleVideo, videoError);
  } catch (error) {
    navigator.getUserMedia(hdConstraints, handleVideo, videoError);
  }

  //< !--navigator.getUserMedia(hdConstraints, handleVideo, videoError); -->
}

function handleVideo(stream) {
  //< !--video.src = window.URL.createObjectURL(stream); -->
  try {
    this.srcObject = stream;
  } catch (error) {
    this.src = window.URL.createObjectURL(stream);
  }
}
function videoError(e) {
  // do something
}

var player = document.getElementById("videoElement");
var snapshotCanvas = document.getElementById("snapshot");

var captureButton = document.getElementById("capture");
//  var captureButton2 = document.getElementById('capture2');
var captureButton3 = document.getElementById("capture3");
//var captBottom = document.getElementById('snapHat');
var textBottom = document.getElementById("saveText");
// var captureButton9 = document.getElementById('capture9');

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var txfname = "img_text";
var XdatStr = "date";

textBottom.addEventListener("click", function () {
  var temp = new Date();
  var minth = 1 + temp.getMonth();
  var dateStr =
    temp.getFullYear() +
    "_" +
    minth +
    "_" +
    temp.getDate() +
    "-" +
    temp.getHours() +
    "_" +
    temp.getMinutes() +
    "_" +
    temp.getSeconds();
  XdateStr = dateStr;
  txfname = "IMG_" + dateStr;

  saveTextAsFile(txfname);
  pcanvas2blob().then(download2X);

  document.getElementById("demo").innerHTML = "saved";
});

function calistir() {
  document.getElementById("demo").innerHTML = "Reading PDF417.";

  //      var dname = document.location.hostname;
  //var pos = dname.indexOf("froglet");

  var VH = 1080;
  var VW = 1920;

  VH = video.videoHeight;
  VW = video.videoWidth;

  //ctx.canvas.width  = 1280;
  // ctx.canvas.height = 720;

  ctx.canvas.width = VW;
  ctx.canvas.height = VH;

  ctx.drawImage(video, 0, 0);

  // var image = canvas.toDataURL("image/png").replace("image/png","image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.

  //       window.location.href=image; // it will save locally

  // var imgd = ctx.getImageData(0, 0, 1280, 720);
  var imgd = ctx.getImageData(0, 0, VW, VH);
  var pix = imgd.data;

  /*   for (var i = 0, n = pix.length; i < n; i += 4) {
                      pix[i  ] = 255 - pix[i  ]; // red
                      pix[i+1] = 255 - pix[i+1]; // green
                      pix[i+2] = 255 - pix[i+2]; // blue
                     // i+3 is alpha (the fourth element)
                    } 
               
                   for (var i = 0, n = 1280*3; i < n; i += 4) {
                      pix[i  ] = 0;
                      pix[i+1] = 0;
                      pix[i+2] = 0;
                     // i+3 is alpha (the fourth element)
                    } 
               */

  //var nDataBytes = 1280*720*4;
  var nDataBytes = VH * VW * 4;

  var pdf417Heap = new Uint8Array(Module.HEAPU8.buffer, 1028);

  var buf = Module._malloc(nDataBytes);
  Module.HEAPU8.set(pix, buf);

  // Draw the ImageData at the given (x,y) coordinates.
  ctx.putImageData(imgd, 0, 0);

  var b = _pdf417JS(buf, VH, VW, 1024);

  var heapBu = new Uint8Array(Module.HEAPU8.buffer, buf, 1028);
  var vanz = bin2Strung(heapBu);

  if (b <= 0) {
    vanz = "No Read.";
  }

  Module._free(buf);

  document.getElementById("demo").innerHTML = vanz;
}

if (window.stream) {
  window.stream.getTracks().forEach(function (track) {
    track.stop();
  });
}

captureButton3.addEventListener("click", function () {
  document.getElementById("demo").innerHTML = " OCRing MRZ.";

  var VH = 1080;
  var VW = 1920;
  VH = video.videoHeight;
  VW = video.videoWidth;

  ctx.canvas.width = VW;
  ctx.canvas.height = VH;

  ctx.drawImage(video, 0, 0);

  var imgd = ctx.getImageData(0, 0, VW, VH);
  var pix = imgd.data;

  var nDataBytes = VH * VW * 4; //1280*720*4;

  var pdf417Heap = new Uint8Array(Module.HEAPU8.buffer, 1028);

  var bluf = Module._malloc(nDataBytes);
  Module.HEAPU8.set(pix, bluf);

  // Draw the ImageData at the given (x,y) coordinates.
  ctx.putImageData(imgd, 0, 0);

  var c = _DLreadJS(bluf, VH, VW, 1024);

  var heapBuc = new Uint8Array(Module.HEAPU8.buffer, bluf, 1028);
  var vanc = bin2Strung(heapBuc);

  if (c <= 0) {
    vanc = "No Read.";
  }

  Module._free(bluf);
  document.getElementById("demo").innerHTML = vanc;
});

snapHat.addEventListener("click", function () {
  document.getElementById("demo").innerHTML = "saving new image";

  takeASnap().then(download);
});

function takeASnap() {
  //const canvas = document.createElement('canvas'); // create a canvas
  //const ctx = canvas.getContext('2d'); // get its context

  canvas.width = video.videoWidth; // set its size to the one of the video
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0); // the video

  return new Promise((res, rej) => {
    canvas.toBlob(res, "image/jpeg"); // request a Blob from the canvas
  });
}

function pcanvas2blob() {
  return new Promise((res, rej) => {
    canvas.toBlob(res, "image/jpeg"); // request a Blob from the canvas
  });
}

function download2X(blob) {
  // uses the <a download> to download a Blob
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);

  a.download = "IMG_" + XdateStr + ".jpg";
  document.body.appendChild(a);
  a.click();
}

function download(blob) {
  // uses the <a download> to download a Blob
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  var temp = new Date();
  var minth = 1 + temp.getMonth();
  var dateStr =
    temp.getFullYear() +
    "_" +
    minth +
    "_" +
    temp.getDate() +
    "-" +
    temp.getHours() +
    "_" +
    temp.getMinutes() +
    "_" +
    temp.getSeconds();

  a.download = "IMG_" + dateStr + ".jpg";
  document.body.appendChild(a);
  a.click();
}

function download_png(blob) {
  // uses the <a download> to download a Blob
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  var temp = new Date();
  var minth = 1 + temp.getMonth();
  var dateStr =
    temp.getFullYear() +
    "_" +
    minth +
    "_" +
    temp.getDate() +
    "-" +
    temp.getHours() +
    "_" +
    temp.getMinutes() +
    "_" +
    temp.getSeconds();
  a.download = "IMG_" + dateStr + ".png";
  document.body.appendChild(a);
  a.click();
}

function canvaSnap() {
  return new Promise((res, rej) => {
    canvas.toBlob(res, "image/png"); // request a Blob from the canvas
  });
}

function saveTextAsFile(txt_name) {
  var ocr_text = document.getElementById("demo").innerHTML;
  var res = ocr_text.replace(/<br>/g, "\r\n");
  var res2 = res.replace(/&lt;/g, "<");
  //var res2 = unescape(res);

  var blab = new Blob([res2], { type: "text/plain" });

  let a = document.createElement("a");
  a.href = URL.createObjectURL(blab);
  a.download = txt_name + ".txt";
  document.body.appendChild(a);

  a.click();
}

function saveImageAndText(fname) {
  var ocr_text = document.getElementById("demo").innerHTML;
  var blab = new Blob([ocr_text], { type: "text/plain" });

  let a = document.createElement("a");
  a.href = URL.createObjectURL(blab);
  a.download = txt_name + ".txt";
  document.body.appendChild(a);
  a.click();
}

function bin2Strung(array) {
  var result = "";
  var max = 2048;
  for (var i = 0; i < max; i++) {
    var v = String.fromCharCode(array[i]);

    if (array[i] == 10) {
      result += "<br/>";
    } else {
      if (array[i] == 60) {
        //result +="&#60";
        result += "&lt";
      } else {
        result += String.fromCharCode(array[i]);
      }
    }

    if (array[i] == 0) {
      i = max;
    }
  }
  return result;
}

function myFunction() {
  document.getElementById("demo").innerHTML = "Doing My Best!";
}

function beni_ac() {
  var intervalId = null;
  var varCounter = 0;
  var varName = function () {
    if (document.getElementById("demo").innerHTML.length < 150 && document.getElementById("durdur2").value == "2") {
      varCounter++;
      calistir();
    }
    if (document.getElementById("demo").innerHTML.length >= 150) {
      clearInterval(intervalId);
    }
  };

  $(document).ready(function () {
    intervalId = setInterval(varName, 1000);
  });
}
//beni_ac();
function beni_kapa() {
  var intervalId2 = null;
  var varCounter2 = 0;
  var varName2 = function () {
    if (document.getElementById("durdur").value != 1) {
      varCounter2++;
      $("#videoElement").hide();
      stop_us();
    } else {
      clearInterval(intervalId2);
    }
  };

  $(document).ready(function () {
    intervalId2 = setInterval(varName2, 1000);
  });
}
beni_kapa();

$("#master_name_ajax").click(function () {
  //first_name3:get_data2[2].first_name,
  //last_name3: get_data2[1].last_name,
  //dob3: get_data2[5].dob,
  //license_number3:get_data2[0].license_number,
  //middle_name3:get_data2[3].middle_name,
  //eye_color3:get_data2[7].eye_color,
  //address3:get_data2[8].address,
  //state3:get_data2[9].state,
  //zip_code3:get_data2[10].zip_code,
  //country3:get_data2[11].country,
  //county3:get_data2[12].county,
  //issued_date3:get_data2[4].issued_date,
  //expiration_date3:get_data2[6].expiration_date

  var linko = [];

  for (i = 0; i < get_data2.length; i++) {
    if (get_data2[i].hasOwnProperty("license_number")) {
      var license_number = get_data2[i].license_number;
    }
    if (get_data2[i].hasOwnProperty("first_name")) {
      var first_name = get_data2[i].first_name;
    }
    if (get_data2[i].hasOwnProperty("last_name")) {
      var last_name = get_data2[i].last_name;
    }
    if (get_data2[i].hasOwnProperty("middle_name")) {
      var middle_name = get_data2[i].middle_name;
    }
    if (get_data2[i].hasOwnProperty("issued_date")) {
      var issued_date = get_data2[i].issued_date;
    }
    if (get_data2[i].hasOwnProperty("dob")) {
      var dob = get_data2[i].dob;
    }
    if (get_data2[i].hasOwnProperty("expiration_date")) {
      var expiration_date = get_data2[i].expiration_date;
    }
    if (get_data2[i].hasOwnProperty("sex")) {
      var sex = get_data2[i].sex;
    }
    if (get_data2[i].hasOwnProperty("height")) {
      var height = get_data2[i].height;
    }
    if (get_data2[i].hasOwnProperty("weight")) {
      var weight = get_data2[i].weight;
    }
    if (get_data2[i].hasOwnProperty("eye_color")) {
      var eye_color = get_data2[i].eye_color;
    }
    if (get_data2[i].hasOwnProperty("address")) {
      var address = get_data2[i].address;
    }
    if (get_data2[i].hasOwnProperty("state")) {
      var state = get_data2[i].state;
    }
    if (get_data2[i].hasOwnProperty("zip_code")) {
      var zip_code = get_data2[i].zip_code;
    }
    if (get_data2[i].hasOwnProperty("country")) {
      var country = get_data2[i].country;
    }
    if (get_data2[i].hasOwnProperty("county")) {
      var county = get_data2[i].county;
    }
    if (get_data2[i].hasOwnProperty("city")) {
      var city = get_data2[i].city;
    }
    if (get_data2[i].hasOwnProperty("middle_name2")) {
      var middle_name2 = get_data2[i].middle_name2;
    }
    if (i == get_data2.length - 1) {
      linko = [];
      if (weight == undefined) {
        var weight = "";
      }
      if (county == undefined) {
        var county = "";
      }
      if (city == undefined) {
        var city = "";
      }
      if (height == undefined) {
        var height = "";
      }
      if (eye_color == undefined) {
        var eye_color = "";
      }
      if (zip_code == undefined) {
        var zip_code = "";
      }
      if (country == undefined) {
        var country = "";
      }
      if (state == undefined) {
        var state = "";
      }
      if (sex == undefined) {
        var sex = "";
      }
      if (dob == undefined) {
        var dob = "";
      }
      if (expiration_date == undefined) {
        var expiration_date = "";
      }
      if (issued_date == undefined) {
        var issued_date = "";
      }
      if (middle_name == undefined) {
        var middle_name = "";
      }
      if (last_name == undefined) {
        var last_name = "";
      }
      if (first_name == undefined) {
        var first_name = "";
      }
      if (license_number == undefined) {
        var license_number = "";
      }
      if (middle_name2 == undefined) {
        var middle_name2 = "";
      }
      linko.push(
        license_number +
          "-_" +
          last_name +
          "-_" +
          first_name +
          "-_" +
          middle_name +
          "-_" +
          issued_date +
          "-_" +
          dob +
          "-_" +
          expiration_date +
          "-_" +
          sex +
          "-_" +
          height +
          "-_" +
          weight +
          "-_" +
          eye_color +
          "-_" +
          address +
          "-_" +
          state +
          "-_" +
          zip_code +
          "-_" +
          country +
          "-_" +
          county +
          "-_" +
          city +
          "-_" +
          middle_name2
      );
    }
  }

  myPopupWin("../master_name_ajax/" + linko);
});
