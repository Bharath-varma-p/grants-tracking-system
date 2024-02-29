var image_name;
var image_index;
var map_name;
var targets = [];
var no_damage_click = null,
  undercarriage_click = null,
  all_areas_click = null,
  unit_not_at_scene_click = null;

function maphilight() {
  $("#map_graph").maphilight({
    fillColor: "ff0000",
  });
  /*	
	$(function() {
        $('#map_graph2').maphilight({
            fillColor: 'ff0000'
        });
    });
	
		$(function() {
        $('#map_graph3').maphilight({
            fillColor: 'ff0000'
        });
    });
	
			$(function() {
        $('#map_graph4').maphilight({
            fillColor: 'ff0000'
        });
    });
	
			$(function() {
        $('#map_graph5').maphilight({
            fillColor: 'ff0000'
        });
    });
	
			$(function() {
        $('#map_graph6').maphilight({
            fillColor: 'ff0000'
        });
    });
	
			$(function() {
        $('#map_graph7').maphilight({
            fillColor: 'ff0000'
        });
    });
	*/

  $(
    "#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine, #ten, #eleven, #twelve, #thirteen, #fourteen, #fifteen, #sixteen"
  ).mouseover(function () {
    $("#twelve").addClass("background-color:blue");
    $(function () {
      $("#map_graph").maphilight({
        fillColor: "ff0000",
      });
    });
  });

  $("#three2, #six2, #nine2, #twelve2").mouseover(function () {
    $("#twelve2").addClass("background-color:blue");
    $("#map_graph2").maphilight({
      fillColor: "ff0000",
    });
  });

  $("#three3, #six3, #nine3, #twelve3").mouseover(function () {
    $("#twelve3").addClass("background-color:blue");
    $("#map_graph3").maphilight({
      fillColor: "ff0000",
    });
  });

  $("#three4, #six4, #nine4, #twelve4").mouseover(function () {
    $("#twelve4").addClass("background-color:blue");
    $("#map_graph4").maphilight({
      fillColor: "ff0000",
    });
  });

  $(
    "#zero5, #one5, #two5, #three5, #four5, #five5, #six5, #seven5, #eight5, #nine5, #ten5, #eleven5, #twelve5, #thirteen5, #fourteen5, #fifteen5, #sixteen5"
  ).mouseover(function () {
    $("#twelve5").addClass("background-color:blue");
    $("#map_graph5").maphilight({
      fillColor: "ff0000",
    });
  });
  $(
    "#zero6, #one6, #two6, #three6, #four6, #five6, #six6, #seven6, #eight6, #nine6, #ten6, #eleven6, #twelve6, #thirteen6, #fourteen6, #fifteen6, #sixteen6"
  ).mouseover(function () {
    $("#twelve6").addClass("background-color:blue");
    $(function () {
      $("#map_graph6").maphilight({
        fillColor: "ff0000",
      });
    });
  });

  $("#three7, #six7, #nine7, #twelve7").mouseover(function () {
    $("#twelve7").addClass("background-color:blue");
    $("#map_graph7").maphilight({
      fillColor: "ff0000",
    });
  });

  $(
    "#zero8, #one8, #two8, #three8, #four8, #five8, #six8, #seven8, #eight8, #nine8, #ten8, #eleven8, #twelve8, #thirteen8, #fourteen8, #fifteen8, #sixteen8"
  ).mouseover(function () {
    $("#twelve8").addClass("background-color:blue");
    $(function () {
      $("#map_graph8").maphilight({
        fillColor: "ff0000",
      });
    });
  });

  $(
    "#zero9, #one9, #two9, #three9, #four9, #five9, #six9, #seven9, #eight9, #nine9, #ten9, #eleven9, #twelve9, #thirteen9, #fourteen9, #fifteen9, #sixteen9"
  ).mouseover(function () {
    $("#twelve9").addClass("background-color:blue");
    $(function () {
      $("#map_graph9").maphilight({
        fillColor: "ff0000",
      });
    });
  });

  $(
    "#zero10, #one10, #two10, #three10, #four10, #five10, #six10, #seven10, #eight10, #nine10, #ten10, #eleven10, #twelve10, #thirteen10, #fourteen10, #fifteen10, #sixteen10"
  ).mouseover(function () {
    $("#twelve10").addClass("background-color:blue");
    $(function () {
      $("#map_graph10").maphilight({
        fillColor: "ff0000",
      });
    });
  });

  $("#unit_type_div .selectpicker")
    .selectpicker()
    .change(function () {
      targets = [];

      var unit_type_value = $("#unit_type").val();
      switch_image(unit_type_value);
    });

  $("#unit_type").selectpicker("val", "1");

  var imge = 0;
  var imge2 = 0;
  var imge3 = 0;
  var imge4 = 0;
  //No Damage

  //UnderCar
  $("#no_damage").click(function (e) {
    if (no_damage_click == 1) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage").removeClass("undercar_hi");
      no_damage_click = null;
      imge4 = 0;
    } else {
      imge4 = imge4 + 1;
    }

    if (imge4 == 1 && no_damage_click == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("0"); //change this
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage").addClass("undercar_hi");
      imge4 = 2;
      no_damage_click = null;
    }
    if (imge4 == 3) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage").removeClass("undercar_hi");
      imge4 = 0;
    }
  });

  //UnderCar
  $("#undercar").click(function (e) {
    if (undercarriage_click == 1) {
      var no_damage = targets.indexOf("14"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#undercar").removeClass("undercar_hi");
      undercarriage_click = null;
      imge = 0;
    } else {
      imge = imge + 1;
    }

    if (imge == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("14"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#undercar").addClass("undercar_hi");
      imge = 2;
      undercarriage_click = null;
    }
    if (imge == 3) {
      var undercar = targets.indexOf("14"); //change this
      targets.splice(undercar, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#undercar").removeClass("undercar_hi");
      imge = 0;
    }
  });

  //Load
  $("#load").click(function (e) {
    if (all_areas_click == 1) {
      var no_damage = targets.indexOf("15"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#load").removeClass("undercar_hi");
      all_areas_click = null;
      imge2 = 0;
    } else {
      imge2 = imge2 + 1;
    }

    if (imge2 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("15"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#load").addClass("undercar_hi");
      imge2 = 2;
      all_areas_click = null;
    }
    if (imge2 == 3) {
      var load = targets.indexOf("15"); //change this
      targets.splice(load, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#load").removeClass("undercar_hi");
      imge2 = 0;
    }
  });

  //Trailer
  $("#trailer").click(function (e) {
    if (unit_not_at_scene_click == 1) {
      var no_damage = targets.indexOf("16"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#trailer").removeClass("undercar_hi");
      unit_not_at_scene_click = null;
      imge3 = 0;
    } else {
      imge3 = imge3 + 1;
    }

    if (imge3 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("16"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#trailer").addClass("undercar_hi");
      imge3 = 2;
      unit_not_at_scene_click = null;
    }
    if (imge3 == 3) {
      var trailer = targets.indexOf("16"); //change this
      targets.splice(trailer, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#trailer").removeClass("undercar_hi");
      imge3 = 0;
    }
  });

  var imge_3 = 0;
  var imge2_3 = 0;
  var imge3_3 = 0;
  var imge4_3 = 0;
  //No Damage

  //UnderCar
  $("#no_damage3").click(function (e) {
    if (no_damage_click == 1) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage3").removeClass("undercar_hi");
      no_damage_click = null;
      imge4_3 = 0;
    } else {
      imge4_3 = imge4_3 + 1;
    }

    if (imge4_3 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("0"); //change this
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage3").addClass("undercar_hi");
      imge4_3 = 2;
      no_damage_click = null;
    }
    if (imge4_3 == 3) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage3").removeClass("undercar_hi");
      imge4_3 = 0;
    }
  });

  //UnderCar
  $("#undercar3").click(function (e) {
    if (undercarriage_click == 1) {
      var no_damage = targets.indexOf("14"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#undercar3").removeClass("undercar_hi");
      undercarriage_click = null;
      imge_3 = 0;
    } else {
      imge_3 = imge_3 + 1;
    }

    if (imge_3 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("14"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#undercar3").addClass("undercar_hi");
      imge_3 = 2;
      undercarriage_click = null;
    }
    if (imge_3 == 3) {
      var undercar = targets.indexOf("14"); //change this
      targets.splice(undercar, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#undercar3").removeClass("undercar_hi");
      imge_3 = 0;
    }
  });

  //Load
  $("#load3").click(function (e) {
    if (all_areas_click == 1) {
      var no_damage = targets.indexOf("15"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#load3").removeClass("undercar_hi");
      all_areas_click = null;
      imge2_3 = 0;
    } else {
      imge2_3 = imge2_3 + 1;
    }

    if (imge2_3 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("15"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#load3").addClass("undercar_hi");
      imge2_3 = 2;
      all_areas_click = null;
    }
    if (imge2_3 == 3) {
      var load = targets.indexOf("15"); //change this
      targets.splice(load, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#load3").removeClass("undercar_hi");
      imge2_3 = 0;
    }
  });

  //Trailer
  $("#trailer3").click(function (e) {
    if (unit_not_at_scene_click == 1) {
      var no_damage = targets.indexOf("16"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#trailer3").removeClass("undercar_hi");
      unit_not_at_scene_click = null;
      imge3_3 = 0;
    } else {
      imge3_3 = imge3_3 + 1;
    }

    if (imge3_3 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("16"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#trailer3").addClass("undercar_hi");
      imge3_3 = 2;
      unit_not_at_scene_click = null;
    }
    if (imge3_3 == 3) {
      var trailer = targets.indexOf("16"); //change this
      targets.splice(trailer, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#trailer3").removeClass("undercar_hi");
      imge3_3 = 0;
    }
  });

  var imge_4 = 0;
  var imge2_4 = 0;
  var imge3_4 = 0;
  var imge4_4 = 0;
  //No Damage

  //UnderCar
  $("#no_damage4").click(function (e) {
    if (no_damage_click == 1) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage4").removeClass("undercar_hi");
      no_damage_click = null;
      imge4_4 = 0;
    } else {
      imge4_4 = imge4_4 + 1;
    }

    if (imge4_4 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("0"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#no_damage4").addClass("undercar_hi");
      imge4_4 = 2;
      no_damage_click = null;
    }
    if (imge4_4 == 3) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#no_damage4").removeClass("undercar_hi");
      imge4_4 = 0;
    }
  });

  //UnderCar
  $("#undercar4").click(function (e) {
    if (undercarriage_click == 1) {
      var no_damage = targets.indexOf("14"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#undercar4").removeClass("undercar_hi");
      undercarriage_click = null;
      imge_4 = 0;
    } else {
      imge_4 = imge_4 + 1;
    }

    if (imge_4 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("14"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#undercar4").addClass("undercar_hi");
      imge_4 = 2;
      undercarriage_click = null;
    }
    if (imge_4 == 3) {
      var undercar = targets.indexOf("14"); //change this
      targets.splice(undercar, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#undercar4").removeClass("undercar_hi");
      imge_4 = 0;
    }
  });

  //Load
  $("#load4").click(function (e) {
    if (all_areas_click == 1) {
      var no_damage = targets.indexOf("15"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      // var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);
      $("#load4").removeClass("undercar_hi");
      all_areas_click = null;
      imge2_4 = 0;
    } else {
      imge2_4 = imge2_4 + 1;
    }

    if (imge2_4 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("15"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#load4").addClass("undercar_hi");
      imge2_4 = 2;
      all_areas_click = null;
    }
    if (imge2_4 == 3) {
      var load = targets.indexOf("15"); //change this
      targets.splice(load, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#load4").removeClass("undercar_hi");
      imge2_4 = 0;
    }
  });

  //Trailer
  $("#trailer4").click(function (e) {
    if (unit_not_at_scene_click == 1) {
      var no_damage = targets.indexOf("16"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      // var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);
      $("#trailer4").removeClass("undercar_hi");
      unit_not_at_scene_click = null;
      imge3_4 = 0;
    } else {
      imge3_4 = imge3_4 + 1;
    }

    if (imge3_4 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("16"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#trailer4").addClass("undercar_hi");
      imge3_4 = 2;
      unit_not_at_scene_click = null;
    }
    if (imge3_4 == 3) {
      var trailer = targets.indexOf("16"); //change this
      targets.splice(trailer, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#trailer4").removeClass("undercar_hi");
      imge3_4 = 0;
    }
  });

  var imge_5 = 0;
  var imge2_5 = 0;
  var imge3_5 = 0;
  var imge4_5 = 0;
  //No Damage

  //UnderCar
  $("#no_damage5").click(function (e) {
    if (no_damage_click == 1) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      // var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);
      $("#no_damage5").removeClass("undercar_hi");
      no_damage_click = null;
      imge4_5 = 0;
    } else {
      imge4_5 = imge4_5 + 1;
    }

    if (imge4_5 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("0"); //change this
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage5").addClass("undercar_hi");
      imge4_5 = 2;
      no_damage_click = null;
    }
    if (imge4_5 == 3) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage5").removeClass("undercar_hi");
      imge4_5 = 0;
    }
  });

  //UnderCar
  $("#undercar5").click(function (e) {
    if (undercarriage_click == 1) {
      var no_damage = targets.indexOf("14"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#undercar5").removeClass("undercar_hi");
      undercarriage_click = null;
      imge_5 = 0;
    } else {
      imge_5 = imge_5 + 1;
    }

    if (imge_5 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("14"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#undercar5").addClass("undercar_hi");
      imge_5 = 2;
      undercarriage_click = null;
    }
    if (imge_5 == 3) {
      var undercar = targets.indexOf("14"); //change this
      targets.splice(undercar, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#undercar5").removeClass("undercar_hi");
      imge_5 = 0;
    }
  });

  //Load
  $("#load5").click(function (e) {
    if (all_areas_click == 1) {
      var no_damage = targets.indexOf("15"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#load5").removeClass("undercar_hi");
      all_areas_click = null;
      imge2_5 = 0;
    } else {
      imge2_5 = imge2_5 + 1;
    }

    if (imge2_5 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("15"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#load5").addClass("undercar_hi");
      imge2_5 = 2;
      all_areas_click = null;
    }
    if (imge2_5 == 3) {
      var load = targets.indexOf("15"); //change this
      targets.splice(load, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#load5").removeClass("undercar_hi");
      imge2_5 = 0;
    }
  });

  //Trailer
  $("#trailer5").click(function (e) {
    if (unit_not_at_scene_click == 1) {
      var no_damage = targets.indexOf("16"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#trailer5").removeClass("undercar_hi");
      unit_not_at_scene_click = null;
      imge3_5 = 0;
    } else {
      imge3_5 = imge3_5 + 1;
    }

    if (imge3_5 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("16"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#trailer5").addClass("undercar_hi");
      imge3_5 = 2;
      unit_not_at_scene_click = null;
    }
    if (imge3_5 == 3) {
      var trailer = targets.indexOf("16"); //change this
      targets.splice(trailer, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#trailer5").removeClass("undercar_hi");
      imge3_5 = 0;
    }
  });

  var imge_6 = 0;
  var imge2_6 = 0;
  var imge3_6 = 0;
  var imge4_6 = 0;
  //No Damage

  //UnderCar
  $("#no_damage6").click(function (e) {
    if (no_damage_click == 1) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);
      $("#no_damage6").removeClass("undercar_hi");
      no_damage_click = null;
      imge4_6 = 0;
    } else {
      imge4_6 = imge4_6 + 1;
    }

    if (imge4_6 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("0"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
      $("#no_damage6").addClass("undercar_hi");
      imge4_6 = 2;
      no_damage_click = null;
    }
    if (imge4_6 == 3) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#no_damage6").removeClass("undercar_hi");
      imge4_6 = 0;
    }
  });

  //UnderCar
  $("#undercar6").click(function (e) {
    if (undercarriage_click == 1) {
      var no_damage = targets.indexOf("14"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#undercar6").removeClass("undercar_hi");
      undercarriage_click = null;
      imge_6 = 0;
    } else {
      imge_6 = imge_6 + 1;
    }

    if (imge_6 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("14"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#undercar6").addClass("undercar_hi");
      imge_6 = 2;
      undercarriage_click = null;
    }
    if (imge_6 == 3) {
      var undercar = targets.indexOf("14"); //change this
      targets.splice(undercar, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#undercar6").removeClass("undercar_hi");
      imge_6 = 0;
    }
  });

  //Load
  $("#load6").click(function (e) {
    if (all_areas_click == 1) {
      var no_damage = targets.indexOf("15"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#load6").removeClass("undercar_hi");
      all_areas_click = null;
      imge2_6 = 0;
    } else {
      imge2_6 = imge2_6 + 1;
    }

    if (imge2_6 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("15"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#load6").addClass("undercar_hi");
      imge2_6 = 2;
      all_areas_click = null;
    }
    if (imge2_6 == 3) {
      var load = targets.indexOf("15"); //change this
      targets.splice(load, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#load6").removeClass("undercar_hi");
      imge2_6 = 0;
    }
  });

  //Trailer
  $("#trailer6").click(function (e) {
    if (unit_not_at_scene_click == 1) {
      var no_damage = targets.indexOf("16"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#trailer6").removeClass("undercar_hi");
      unit_not_at_scene_click = null;
      imge3_6 = 0;
    } else {
      imge3_6 = imge3_6 + 1;
    }

    if (imge3_6 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("16"); //change this
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#trailer6").addClass("undercar_hi");
      imge3_6 = 2;
      unit_not_at_scene_click = null;
    }
    if (imge3_6 == 3) {
      var trailer = targets.indexOf("16"); //change this
      targets.splice(trailer, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#trailer6").removeClass("undercar_hi");
      imge3_6 = 0;
    }
  });

  var imge_8 = 0;
  var imge2_8 = 0;
  var imge3_8 = 0;
  var imge4_8 = 0;
  //No Damage

  //UnderCar
  $("#no_damage8").click(function (e) {
    if (no_damage_click == 1) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#no_damage8").removeClass("undercar_hi");
      no_damage_click = null;
      imge4_8 = 0;
    } else {
      imge4_8 = imge4_8 + 1;
    }

    if (imge4_8 == 1) {
      document.getElementById("suspect_link_1").value = null;
      //Selectpicker behaviors
      targets.push("0"); //change this
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#no_damage8").addClass("undercar_hi");
      imge4_8 = 2;
      no_damage_click = null;
    }

    if (imge4_8 == 3) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#no_damage8").removeClass("undercar_hi");
      imge4_8 = 0;
    }
  });

  //UnderCar
  $("#undercar8").click(function (e) {
    if (undercarriage_click == 1) {
      var no_damage = targets.indexOf("14"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#undercar8").removeClass("undercar_hi");
      undercarriage_click = null;
      imge_8 = 0;
    } else {
      imge_8 = imge_8 + 1;
    }

    if (imge_8 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("14"); //change this
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#undercar8").addClass("undercar_hi");
      imge_8 = 2;
      undercarriage_click = null;
    }
    if (imge_8 == 3) {
      var undercar = targets.indexOf("14"); //change this
      targets.splice(undercar); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#undercar8").removeClass("undercar_hi");
      imge_8 = 0;
    }
  });

  //Load
  $("#load8").click(function (e) {
    if (all_areas_click == 1) {
      var no_damage = targets.indexOf("15"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#load8").removeClass("undercar_hi");
      all_areas_click = null;
      imge2_8 = 0;
    } else {
      imge2_8 = imge2_8 + 1;
    }

    if (imge2_8 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("15"); //change this
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#load8").addClass("undercar_hi");
      imge2_8 = 2;
      all_areas_click = null;
    }
    if (imge2_8 == 3) {
      var load = targets.indexOf("15"); //change this
      targets.splice(load); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#load8").removeClass("undercar_hi");
      imge2_8 = 0;
    }
  });

  //Trailer
  $("#trailer8").click(function (e) {
    if (unit_not_at_scene_click == 1) {
      var no_damage = targets.indexOf("16"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#trailer8").removeClass("undercar_hi");
      unit_not_at_scene_click = null;
      imge3_8 = 0;
    } else {
      imge3_8 = imge3_8 + 1;
    }

    if (imge3_8 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("16"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#trailer8").addClass("undercar_hi");
      imge3_8 = 2;
      unit_not_at_scene_click = null;
    }
    if (imge3_8 == 3) {
      var trailer = targets.indexOf("16"); //change this
      targets.splice(trailer, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#trailer8").removeClass("undercar_hi");
      imge3_8 = 0;
    }
  });

  var imge_9 = 0;
  var imge2_9 = 0;
  var imge3_9 = 0;
  var imge4_9 = 0;
  //No Damage

  //UnderCar
  $("#no_damage9").click(function (e) {
    if (no_damage_click == 1) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#no_damage9").removeClass("undercar_hi");
      no_damage_click = null;
      imge4_9 = 0;
    } else {
      imge4_9 = imge4_9 + 1;
    }

    if (imge4_9 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("0"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#no_damage9").addClass("undercar_hi");
      imge4_9 = 2;
      no_damage_click = null;
    }
    if (imge4_9 == 3) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#no_damage9").removeClass("undercar_hi");
      imge4_9 = 0;
    }
  });

  //UnderCar
  $("#undercar9").click(function (e) {
    if (undercarriage_click == 1) {
      var no_damage = targets.indexOf("14"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#undercar9").removeClass("undercar_hi");
      undercarriage_click = null;
      imge_9 = 0;
    } else {
      imge_9 = imge_9 + 1;
    }

    if (imge_9 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("14"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#undercar9").addClass("undercar_hi");
      imge_9 = 2;
      undercarriage_click = null;
    }
    if (imge_9 == 3) {
      var undercar = targets.indexOf("14"); //change this
      targets.splice(undercar, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#undercar9").removeClass("undercar_hi");
      imge_9 = 0;
    }
  });

  //Load
  $("#load9").click(function (e) {
    if (all_areas_click == 1) {
      var no_damage = targets.indexOf("15"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#load9").removeClass("undercar_hi");
      all_areas_click = null;
      imge2_9 = 0;
    } else {
      imge2_9 = imge2_9 + 1;
    }

    if (imge2_9 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("15"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#load9").addClass("undercar_hi");
      imge2_9 = 2;
      all_areas_click = null;
    }
    if (imge2_9 == 3) {
      var load = targets.indexOf("15"); //change this
      targets.splice(load, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#load9").removeClass("undercar_hi");
      imge2_9 = 0;
    }
  });

  //Trailer
  $("#trailer9").click(function (e) {
    if (unit_not_at_scene_click == 1) {
      var no_damage = targets.indexOf("16"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#trailer9").removeClass("undercar_hi");
      unit_not_at_scene_click = null;
      imge3_9 = 0;
    } else {
      imge3_9 = imge3_9 + 1;
    }

    if (imge3_9 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("16"); //change this
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#trailer9").addClass("undercar_hi");
      imge3_9 = 2;
      unit_not_at_scene_click = null;
    }
    if (imge3_9 == 3) {
      var trailer = targets.indexOf("16"); //change this
      targets.splice(trailer, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      // var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#trailer9").removeClass("undercar_hi");
      imge3_9 = 0;
    }
  });

  var imge_10 = 0;
  var imge2_10 = 0;
  var imge3_10 = 0;
  var imge4_10 = 0;
  //No Damage

  //UnderCar
  $("#no_damage10").click(function (e) {
    if (no_damage_click == 1) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      // var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#no_damage10").removeClass("undercar_hi");
      no_damage_click = null;
      imge4_10 = 0;
    } else {
      imge4_10 = imge4_10 + 1;
    }

    if (imge4_10 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("0"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#no_damage10").addClass("undercar_hi");
      imge4_10 = 2;
      no_damage_click = null;
    }
    if (imge4_10 == 3) {
      var no_damage = targets.indexOf("0"); //change this
      targets.splice(no_damage, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#no_damage10").removeClass("undercar_hi");
      imge4_10 = 0;
    }
  });

  //UnderCar
  $("#undercar10").click(function (e) {
    if (undercarriage_click == 1) {
      var no_damage = targets.indexOf("14"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#undercar10").removeClass("undercar_hi");
      undercarriage_click = null;
      imge_10 = 0;
    } else {
      imge_10 = imge_10 + 1;
    }

    if (imge_10 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("14"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#undercar10").addClass("undercar_hi");
      imge_10 = 2;
      undercarriage_click = null;
    }
    if (imge_10 == 3) {
      var undercar = targets.indexOf("14"); //change this
      targets.splice(undercar, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#undercar10").removeClass("undercar_hi");
      imge_10 = 0;
    }
  });

  //Load
  $("#load10").click(function (e) {
    if (all_areas_click == 1) {
      var no_damage = targets.indexOf("15"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#load10").removeClass("undercar_hi");
      all_areas_click = null;
      imge2_10 = 0;
    } else {
      imge2_10 = imge2_10 + 1;
    }

    if (imge2_10 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("15"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#load10").addClass("undercar_hi");
      imge2_10 = 2;
      all_areas_click = null;
    }
    if (imge2_10 == 3) {
      var load = targets.indexOf("15"); //change this
      targets.splice(load, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);

      $("#load10").removeClass("undercar_hi");
      imge2_10 = 0;
    }
  });

  //Trailer
  $("#trailer10").click(function (e) {
    if (unit_not_at_scene_click == 1) {
      var no_damage = targets.indexOf("16"); //change this
      targets.splice(no_damage, 1); //change this
      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      $("#lane").selectpicker("val", targets);

      $("#trailer10").removeClass("undercar_hi");
      unit_not_at_scene_click = null;
      imge3_10 = 0;
    } else {
      imge3_10 = imge3_10 + 1;
    }

    if (imge3_10 == 1) {
      document.getElementById("suspect_link_1").value = null;

      //Selectpicker behaviors
      targets.push("16"); //change this
      document.getElementById("suspect_link_1").value = targets;
      //var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#trailer10").addClass("undercar_hi");
      imge3_10 = 2;
      unit_not_at_scene_click = null;
    }
    if (imge3_10 == 3) {
      var trailer = targets.indexOf("16"); //change this
      targets.splice(trailer, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      // var suspo = document.getElementById('suspect_link_1').value.split(',');
      $("#lane").selectpicker("val", targets);

      $("#trailer10").removeClass("undercar_hi");
      imge3_10 = 0;
    }
  });

  //Front
  $("#twelve").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Front Door
  $("#one").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#one").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#one").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("1"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("1"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Fender
  $("#two").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#two").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#two").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("2"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("2"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Rear Door
  $("#three").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Tail
  $("#four").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#four").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#four").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("4"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("4"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });
  //Rear
  $("#five").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#five").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#five").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("5"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("5"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Tail
  $("#six").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Rear Door
  $("#seven").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#seven").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#seven").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("7"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("7"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //left Front Door
  $("#eight").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eight").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eight").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("8"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("8"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Fender
  $("#nine").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Top
  $("#ten").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#ten").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#ten").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("10"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("10"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#eleven").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eleven").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eleven").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("11"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("11"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#thirteen").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#thirteen").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#thirteen").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("13"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("13"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  /////Damage Report for Bicycle

  //For Twelve
  $("#twelve2").click(function (e) {
    e.preventDefault();
    //document.getElementById('suspect_link_1').value=null;
    var data = $("#twelve2").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve2").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      /// when the maphilight is already on
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      //alert(targets);

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      ////Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", targets);

      //
    }
  });

  //For Three
  $("#three2").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three2").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three2").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Six
  $("#six2").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six2").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six2").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Nine
  $("#nine2").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine2").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine2").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  /////Damage Report for Motor Home

  //For Twelve
  $("#twelve3").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve3").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve3").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Three
  $("#three3").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three3").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three3").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Six
  $("#six3").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six3").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six3").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Nine
  $("#nine3").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine3").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine3").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  /////Damage Report for Horse Rider

  //For Twelve
  $("#twelve4").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve4").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve4").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Three
  $("#three4").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three4").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three4").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Six
  $("#six4").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six4").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six4").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Nine
  $("#nine4").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine4").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine4").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  /////Damage Report for Person

  //For Twelve
  $("#twelve7").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve7").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve7").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Three
  $("#three7").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three7").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three7").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Six
  $("#six7").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six7").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six7").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //For Nine
  $("#nine7").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine7").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine7").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Damage Report for Car Trailer
  //Front
  $("#twelve5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve5").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Front Door
  $("#one5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#one5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#one5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("1"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("1"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Fender
  $("#two5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#two5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#two5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("2"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("2"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Rear Door
  $("#three5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Tail
  $("#four5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#four5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#four5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("4"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("4"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });
  //Rear
  $("#five5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#five5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#five5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("5"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("5"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Tail
  $("#six5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Rear Door
  $("#seven5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#seven5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#seven5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("7"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("7"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //left Front Door
  $("#eight5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eight5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eight5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("8"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("8"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Fender
  $("#nine5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Top
  $("#ten5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#ten5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#ten5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("10"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("10"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#eleven5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eleven5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eleven5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("11"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("11"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#thirteen5").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#thirteen5").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#thirteen5").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("13"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("13"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  ////Damage Report For Train

  //Front
  $("#twelve6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve6").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Front Door
  $("#one6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#one6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#one6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("1"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("1"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Fender
  $("#two6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#two6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#two6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("2"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("2"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Rear Door
  $("#three6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Tail
  $("#four6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#four6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#four6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("4"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("4"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });
  //Rear
  $("#five6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#five6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#five6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("5"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("5"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Tail
  $("#six6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Rear Door
  $("#seven6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#seven6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#seven6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("7"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("7"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //left Front Door
  $("#eight6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eight6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eight6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("8"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("8"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Fender
  $("#nine6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Top
  $("#ten6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#ten6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#ten6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("10"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("10"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#eleven6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eleven6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eleven6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("11"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("11"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#thirteen6").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#thirteen6").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#thirteen6").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("13"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("13"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  ////Damage Report For Bus

  //Front
  $("#twelve8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve8").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Front Door
  $("#one8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#one8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#one8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("1"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("1"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Fender
  $("#two8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#two8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#two8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("2"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("2"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Rear Door
  $("#three8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Tail
  $("#four8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#four8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#four8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("4"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("4"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });
  //Rear
  $("#five8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#five8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#five8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("5"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("5"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Tail
  $("#six8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Rear Door
  $("#seven8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#seven8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#seven8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("7"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("7"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //left Front Door
  $("#eight8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eight8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eight8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("8"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("8"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Fender
  $("#nine8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Top
  $("#ten8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#ten8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#ten8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("10"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("10"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#eleven8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eleven8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eleven8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("11"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("11"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#thirteen8").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#thirteen8").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#thirteen8").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("13"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("13"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  ////Damage Report For Motorcycle

  //Front
  $("#twelve9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve9").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Front Door
  $("#one9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#one9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#one9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("1"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("1"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Fender
  $("#two9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#two9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#two9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("2"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("2"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Rear Door
  $("#three9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Tail
  $("#four9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#four9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#four9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("4"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("4"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });
  //Rear
  $("#five9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#five9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#five9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("5"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("5"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Tail
  $("#six9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Rear Door
  $("#seven9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#seven9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#seven9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("7"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("7"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //left Front Door
  $("#eight9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eight9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eight9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("8"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("8"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Fender
  $("#nine9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Top
  $("#ten9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#ten9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#ten9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("10"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("10"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#eleven9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eleven9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eleven9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("11"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("11"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#thirteen9").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#thirteen9").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#thirteen9").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("13"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("13"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  ////Damage Report For Semi Truck

  //Front
  $("#twelve10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#twelve10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    //Delete the deselections from selectpicker
    $("#twelve10").data("maphilight", data).trigger("alwaysOn.maphilight");

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("12"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("12"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Front Door
  $("#one10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#one10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#one10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("1"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("1"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Fender
  $("#two10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#two10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#two10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("2"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("2"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Rear Door
  $("#three10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#three10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#three10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("3"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("3"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Right Tail
  $("#four10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#four10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#four10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("4"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("4"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });
  //Rear
  $("#five10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#five10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#five10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("5"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("5"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Tail
  $("#six10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#six10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#six10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("6"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("6"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Rear Door
  $("#seven10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#seven10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#seven10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("7"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("7"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //left Front Door
  $("#eight10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eight10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eight10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("8"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("8"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Left Fender
  $("#nine10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#nine10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#nine10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("9"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("9"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  //Top
  $("#ten10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#ten10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#ten10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("10"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("10"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#eleven10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#eleven10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#eleven10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("11"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("11"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });

  $("#thirteen10").click(function (e) {
    e.preventDefault();
    document.getElementById("suspect_link_1").value = null;
    var data = $("#thirteen10").mouseout().data("maphilight") || {};
    data.alwaysOn = !data.alwaysOn;
    $("#thirteen10").data("maphilight", data).trigger("alwaysOn.maphilight");
    //Delete the deselections from selectpicker

    if ((data.neverOn = !data.alwaysOn)) {
      document.getElementById("suspect_link_1").value = "";
      var front = targets.indexOf("13"); //change this
      targets.splice(front, 1); //change this

      document.getElementById("suspect_link_1").value = null;
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    } else {
      //Selectpicker behaviors
      targets.push("13"); //change this
      document.getElementById("suspect_link_1").value = targets;
      var suspo = document.getElementById("suspect_link_1").value.split(",");
      $("#lane").selectpicker("val", suspo);
    }
  });
}

function switch_image(unit_type_value) {
  let divId;

  if (
    unit_type_value == 1 ||
    unit_type_value == 2 ||
    unit_type_value == 3 ||
    unit_type_value == 4 ||
    unit_type_value == 5 ||
    unit_type_value == 6 ||
    unit_type_value == 11 ||
    unit_type_value == 13 ||
    unit_type_value == 14 ||
    unit_type_value == 16 ||
    unit_type_value == 18 ||
    unit_type_value == 20 ||
    unit_type_value == 21 ||
    unit_type_value == 99 ||
    unit_type_value == 12 ||
    unit_type_value == 9 ||
    unit_type_value == 10
  ) {
    divId = "pas_car";
    $("#pas_car").show();
    image_name = "pas_car";
    image_index = "";
    map_name = "map_graph";
  } else {
    $("#pas_car").hide();
  }

  if (unit_type_value == 26) {
    divId = "bicycle";
    $("#bicycle").show();
    image_name = "bicycle";
    image_index = 2;
    $("#map_graph2").addClass("map_graph2");
    $("#map_graph2").width(200);
    map_name = "map_graph2";
  } else {
    $("#bicycle").hide();
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 17) {
    divId = "motor_home";
    $("#motor_home").show();
    image_name = "motor_home";
    image_index = 3;
    map_name = "map_graph3";
    $("#map_graph3").width(200);
  } else {
    $("#motor_home").hide();
    $("#map_graph3").addClass("map_graph2");
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 22) {
    divId = "horse_rider";
    image_name = "motor_home";
    image_index = 3;
    map_name = "map_graph4";
    $("#horse_rider").show();
    $("#map_graph4").width(200);
  } else {
    $("#horse_rider").hide();
    $("#map_graph4").addClass("map_graph2");
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == "1_1") {
    divId = "car_trailer";
    image_name = "car_trailer";
    image_index = 5;
    $("#car_trailer").show();
    $("#map_graph5").width(250);
    map_name = "map_graph5";
  } else {
    $("#car_trailer").hide();
    $("#map_graph5").addClass("map_graph3");
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 27) {
    divId = "train";
    $("#train").show();
    image_name = "train";
    image_index = 6;
    map_name = "map_graph6";
  } else {
    $("#train").hide();
    $("#map_graph6").addClass("map_graph3");
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 15) {
    divId = "semi_truck";
    $("#semi_truck").show();
    $("#map_graph10").width(250);
    image_name = "semi_truck";
    image_index = 10;
    map_name = "map_graph10";
  } else {
    $("#semi_truck").hide();
    $("#map_graph10").addClass("map_graph3");
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 23 || unit_type_value == 24 || unit_type_value == 25) {
    divId = "person";
    $("#person").show();
    image_name = "person";
    image_index = 7;
    map_name = "map_graph7";
    $("#map_graph7").width(200);
  } else {
    $("#person").hide();
    $("#map_graph7").addClass("map_graph2");
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 19) {
    divId = "bus";
    $("#bus").show();
    image_index = 8;
    image_name = "bus";
    map_name = "map_graph8";
    $("#map_graph8").width(250);
  } else {
    $("#bus").hide();
    $("#map_graph8").addClass("map_graph3");
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 7 || unit_type_value == 8) {
    divId = "motorcycle";
    $("#motorcycle").show();
    image_name = "motorcycle";
    image_index = 9;
    map_name = "map_graph9";
    $("#map_graph9").width(250);
  } else {
    $("#motorcycle").hide();
    $("#map_graph9").addClass("map_graph3");
    $("#lane").selectpicker("val", "");
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (divId) {
    if ($("#" + divId + " #damage_scale_container").length == 0) {
      $("#damage_scale_container").appendTo("#" + divId);
      $("#initial_point_container").appendTo("#" + divId);
    }
  }
}

function switch_image_print(unit_type_value, ism) {
  if (
    unit_type_value == 1 ||
    unit_type_value == 2 ||
    unit_type_value == 3 ||
    unit_type_value == 4 ||
    unit_type_value == 5 ||
    unit_type_value == 6 ||
    unit_type_value == 11 ||
    unit_type_value == 13 ||
    unit_type_value == 14 ||
    unit_type_value == 16 ||
    unit_type_value == 18 ||
    unit_type_value == 20 ||
    unit_type_value == 21 ||
    unit_type_value == 99 ||
    unit_type_value == 12 ||
    unit_type_value == 9 ||
    unit_type_value == 10
  ) {
    $("#pas_car" + ism).show();
    image_name = "pas_car";
    image_index = "";
    map_name = "map_graph";
  } else {
    $("#pas_car" + ism).hide();
  }

  if (unit_type_value == 26) {
    $("#bicycle" + ism).show();
    image_name = "bicycle";
    image_index = 2;
    $("#map_graph2" + ism).addClass("map_graph2");
    $("#map_graph2" + ism).width(200);
    map_name = "map_graph2";
  } else {
    $("#bicycle" + ism).hide();
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 17) {
    $("#motor_home" + ism).show();
    image_name = "motor_home";
    image_index = 3;
    map_name = "map_graph3";
    $("#map_graph3").width(200);
  } else {
    $("#motor_home" + ism).hide();
    $("#map_graph3" + ism).addClass("map_graph2");
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 22) {
    image_name = "motor_home";
    image_index = 3;
    map_name = "map_graph4";
    $("#horse_rider" + ism).show();
    $("#map_graph4" + ism).width(200);
  } else {
    $("#horse_rider" + ism).hide();
    $("#map_graph4" + ism).addClass("map_graph2");
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == "1_1") {
    image_name = "car_trailer";
    image_index = 5;
    $("#car_trailer" + ism).show();
    $("#map_graph5" + ism).width(250);
    map_name = "map_graph5";
  } else {
    $("#car_trailer" + ism).hide();
    $("#map_graph5" + ism).addClass("map_graph3");
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 27) {
    $("#train" + ism).show();
    image_name = "train";
    image_index = 6;
    map_name = "map_graph6";
  } else {
    $("#train" + ism).hide();
    $("#map_graph6" + ism).addClass("map_graph3");
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 15) {
    $("#semi_truck" + ism).show();
    $("#map_graph10" + ism).width(250);
    image_name = "semi_truck";
    image_index = 10;
    map_name = "map_graph10";
  } else {
    $("#semi_truck" + ism).hide();
    $("#map_graph10" + ism).addClass("map_graph3");
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 23 || unit_type_value == 24 || unit_type_value == 25) {
    $("#person" + ism).show();
    image_name = "person";
    image_index = 7;
    map_name = "map_graph7";
    $("#map_graph7" + ism).width(200);
  } else {
    $("#person" + ism).hide();
    $("#map_graph7" + ism).addClass("map_graph2");
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 19) {
    $("#bus" + ism).show();
    image_index = 8;
    image_name = "bus";
    map_name = "map_graph8";
    $("#map_graph8" + ism).width(250);
  } else {
    $("#bus" + ism).hide();
    $("#map_graph8" + ism).addClass("map_graph3");
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }

  if (unit_type_value == 7 || unit_type_value == 8) {
    $("#motorcycle" + ism).show();
    image_name = "motorcycle";
    image_index = 9;
    map_name = "map_graph9";
    $("#map_graph9" + ism).width(250);
  } else {
    $("#motorcycle" + ism).hide();
    $("#map_graph9" + ism).addClass("map_graph3");
    //$("#lane").selectpicker('val', '');
    //document.getElementById('suspect_link_1').value=null;
    targets = [];
  }
}
