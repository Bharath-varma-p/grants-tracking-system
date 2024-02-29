function startChartLogs(data) {
  //Special Table Column Names
  $("#th7").text("Date");
  $("#th8").text("Address");
  $("#th9").text("Event Type");
  $("#th10").text("Event Group");
  //toplevel crossfilter
  var xf = crossfilter(data);
  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  }
  //counter
  var all = xf.groupAll();
  dataCount.dimension(xf).group(all);

  function chartStart() {
    $("#chart1_containter").css("height", document.getElementById("height1").value + "px");
    barchart1 = xf.dimension(function (d) {
      let returnValue;
      if (field_name1 == "sex") {
        returnValue = d.sex;
      }
      if (field_name1 == "race") {
        returnValue = d.race;
      }
      if (field_name1 == "user") {
        returnValue = d.user;
      }
      if (field_name1 == "year(daily_logs.created_date) as year") {
        returnValue = +d.year;
      }
      if (field_name1 == "month(daily_logs.created_date) as month") {
        returnValue = d.month;
      }
      if (field_name1 == "dayname(daily_logs.created_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name1 == "hour(daily_logs.created_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name1 == "year(crash_date) as year") {
        returnValue = +d.year;
      }
      if (field_name1 == "month(crash_date) as month") {
        returnValue = d.month;
      }
      if (field_name1 == "dayname(crash_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name1 == "hour(crash_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name1 == "event_type") {
        returnValue = d.event_type;
      }
      if (field_name1 == "event_group") {
        returnValue = d.event_group;
      }
      if (field_name1 == "control_no") {
        returnValue = d.control_no;
      }
      if (field_name1 == "fbi_no") {
        returnValue = d.fbi_no;
      }
      if (field_name1 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
        returnValue = d.incident_date;
      }
      if (field_name1 == "date_format(date_of_birth,'%m/%d/%Y') as date_of_birth") {
        returnValue = d.incident_date;
      }
      if (field_name1 == "first_name") {
        returnValue = d.first_name;
      }
      if (field_name1 == "last_name") {
        returnValue = d.last_name;
      }
      if (
        field_name1 == "calculateAge( date_of_birth , IFNULL(daily_logs.start_time, daily_logs.created_date ) ) as age"
      ) {
        returnValue = d.age;
      }
      if (field_name1 == "orc_no") {
        returnValue = d.orc_no;
      }
      if (field_name1 == "gang_affiliation") {
        returnValue = d.gang_affiliation;
      }
      if (field_name1 == "additional_descriptions") {
        returnValue = d.additional_descriptions;
      }
      if (field_name1 == "user") {
        returnValue = d.user;
      }
      if (field_name1 == "lp_VIN") {
        returnValue = d.lp_VIN;
      }
      if (field_name1 == "description") {
        returnValue = d.description;
      }
      if (field_name1 == "weather_main") {
        returnValue = d.weather_main;
      }
      if (field_name1 == "Address") {
        returnValue = d.Address;
      }
      if (field_name1 == "crime_name") {
        returnValue = d.crime_name;
      }

      return typeof returnValue === "undefined" ? "" : returnValue;
    });

    d3.select("#download_data").on("click", function () {
      var blob = new Blob([d3.csv.format(barchart1.top(Infinity))], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "suspect.csv");
    });
    //alert(field_name);
    Chart1.dimension(barchart1)
      .group(barchart1.group())
      //.height(280)
      .x(d3.scale.ordinal())
      .colorAccessor(function (d, i) {
        return i;
      })
      .ordinalColors(document.getElementById("colors1").value.split(","))
      //.ordinalColors(['brown','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628'])
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .centerBar(false)
      .renderLabel(true)
      .clipPadding(20)
      .barPadding(0.1)
      .outerPadding(0.1)
      .controlsUseVisibility(true)
      .margins({
        top: document.getElementById("top_margin1").value,
        left: document.getElementById("left_margin1").value,
        right: document.getElementById("right_margin1").value,
        bottom: document.getElementById("bottom_margin1").value,
      })
      .xAxisLabel(document.getElementById("x_axis1").value)
      .yAxisLabel("")
      .ordering(function (d) {
        if (d.key == "Jan") return 0;
        else if (d.key == "Feb") return 1;
        else if (d.key == "Mar") return 2;
        else if (d.key == "Apr") return 3;
        else if (d.key == "May") return 4;
        else if (d.key == "Jun") return 5;
        else if (d.key == "Jul") return 6;
        else if (d.key == "Aug") return 7;
        else if (d.key == "Sep") return 8;
        else if (d.key == "Oct") return 9;
        else if (d.key == "Nov") return 10;
        else if (d.key == "Dec") return 11;
      })
      .on("renderlet", function (chart) {
        var barsData = [];
        var bars = chart.selectAll(".bar").each(function (d) {
          barsData.push(d);
          processing = false;
        });
        if (bars && bars[0] && bars[0][0]) {
          d3.select(bars[0][0].parentNode).select("#inline-labels").remove();
          var gLabels = d3.select(bars[0][0].parentNode).append("g").attr("id", "inline-labels");
        }
        chart
          .selectAll("g.x text")
          .attr(
            "transform",
            "translate(-" +
              document.getElementById("rotate1").value +
              "," +
              document.getElementById("rotate1").value +
              ") rotate(-" +
              document.getElementById("rotate1").value +
              ")"
          );
      });
  }

  $("#field_name1").change(function () {
    var targets2 = [];
    $.each($(this).find("option:selected"), function () {
      targets2.push($(this).val());
      field_name1 = targets2;
      chartStart();
      RefreshTable();
      dc.renderAll();
    });
  });

  $("#field_name2").change(function () {
    var targets2 = [];
    $.each($(this).find("option:selected"), function () {
      targets2.push($(this).val());
      field_name2 = targets2;
      chartStart2();
      RefreshTable();
      dc.renderAll();
    });
  });
  $("#field_name3").change(function () {
    var targets2 = [];
    $.each($(this).find("option:selected"), function () {
      targets2.push($(this).val());
      field_name3 = targets2;
      chartStart3();
      RefreshTable();
      dc.renderAll();
    });
  });

  $("#field_name4").change(function () {
    var targets2 = [];
    $.each($(this).find("option:selected"), function () {
      targets2.push($(this).val());
      field_name4 = targets2;
      chartStart4();
      RefreshTable();
      dc.renderAll();
    });
  });

  $("#field_name5").change(function () {
    var targets2 = [];
    $.each($(this).find("option:selected"), function () {
      targets2.push($(this).val());
      field_name5 = targets2;
      chartStart5();
      RefreshTable();
      dc.renderAll();
    });
  });

  $("#field_name6").change(function () {
    var targets2 = [];
    $.each($(this).find("option:selected"), function () {
      targets2.push($(this).val());
      field_name6 = targets2;
      chartStart6();
      RefreshTable();
      dc.renderAll();
    });
  });

  function chartStart2() {
    $("#chart2_containter").css("height", document.getElementById("height2").value + "px");
    barchart2 = xf.dimension(function (d) {
      let returnValue;
      if (field_name2 == "sex") {
        returnValue = d.sex;
      }
      if (field_name2 == "date_format(date_of_birth,'%m/%d/%Y') as date_of_birth") {
        returnValue = d.incident_date;
      }
      if (field_name2 == "weather_main") {
        returnValue = d.weather_main;
      }
      if (field_name2 == "first_name") {
        returnValue = d.first_name;
      }
      if (field_name2 == "crime_name") {
        returnValue = d.crime_name;
      }
      if (field_name2 == "last_name") {
        returnValue = d.last_name;
      }
      if (
        field_name2 == "calculateAge( date_of_birth , IFNULL(daily_logs.start_time, daily_logs.created_date )  ) as age"
      ) {
        returnValue = d.age;
      }
      if (field_name2 == "race") {
        returnValue = d.race;
      }
      if (field_name2 == "user") {
        returnValue = d.user;
      }
      if (field_name2 == "year(daily_logs.created_date) as year") {
        returnValue = +d.year;
      }
      if (field_name2 == "month(daily_logs.created_date) as month") {
        returnValue = d.month;
      }
      if (field_name2 == "dayname(daily_logs.created_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name2 == "hour(daily_logs.created_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name2 == "year(crash_date) as year") {
        returnValue = +d.year;
      }
      if (field_name2 == "month(crash_date) as month") {
        returnValue = d.month;
      }
      if (field_name2 == "dayname(crash_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name2 == "hour(crash_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name2 == "event_type") {
        returnValue = d.event_type;
      }
      if (field_name2 == "event_group") {
        returnValue = d.event_group;
      }
      if (field_name2 == "control_no") {
        returnValue = d.control_no;
      }
      if (field_name2 == "fbi_no") {
        returnValue = d.fbi_no;
      }
      if (field_name2 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
        returnValue = d.incident_date;
      }
      if (field_name2 == "orc_no") {
        returnValue = d.orc_no;
      }
      if (field_name2 == "gang_affiliation") {
        returnValue = d.gang_affiliation;
      }
      if (field_name2 == "additional_descriptions") {
        returnValue = d.additional_descriptions;
      }
      if (field_name2 == "user") {
        returnValue = d.user;
      }
      if (field_name2 == "lp_VIN") {
        returnValue = d.lp_VIN;
      }
      if (field_name2 == "description") {
        returnValue = d.description;
      }
      if (field_name2 == "Address") {
        returnValue = d.Address;
      }

      return typeof returnValue === "undefined" ? "" : returnValue;
    });
    //alert(field_name);
    Chart2.dimension(barchart2)
      .group(barchart2.group())
      //.height(280)
      .x(d3.scale.ordinal())
      .colorAccessor(function (d, i) {
        return i;
      })
      .ordinalColors(document.getElementById("colors2").value.split(","))
      //.ordinalColors(['brown','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628'])
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .centerBar(false)
      .renderLabel(true)
      .clipPadding(20)
      .barPadding(0.1)
      .outerPadding(0.1)
      .margins({
        top: document.getElementById("top_margin2").value,
        left: document.getElementById("left_margin2").value,
        right: document.getElementById("right_margin2").value,
        bottom: document.getElementById("bottom_margin2").value,
      })
      .xAxisLabel(document.getElementById("x_axis2").value)
      .yAxisLabel("")
      .ordering(function (d) {
        if (d.key == "Jan") return 0;
        else if (d.key == "Feb") return 1;
        else if (d.key == "Mar") return 2;
        else if (d.key == "Apr") return 3;
        else if (d.key == "May") return 4;
        else if (d.key == "Jun") return 5;
        else if (d.key == "Jul") return 6;
        else if (d.key == "Aug") return 7;
        else if (d.key == "Sep") return 8;
        else if (d.key == "Oct") return 9;
        else if (d.key == "Nov") return 10;
        else if (d.key == "Dec") return 11;
      })
      .on("renderlet", function (chart) {
        var barsData = [];
        var bars = chart.selectAll(".bar").each(function (d) {
          barsData.push(d);
          processing = false;
        });
        if (bars && bars[0] && bars[0][0]) {
          d3.select(bars[0][0].parentNode).select("#inline-labels").remove();
          var gLabels = d3.select(bars[0][0].parentNode).append("g").attr("id", "inline-labels");
        }
        chart
          .selectAll("g.x text")
          .attr(
            "transform",
            "translate(-" +
              document.getElementById("rotate2").value +
              "," +
              document.getElementById("rotate2").value +
              ") rotate(-" +
              document.getElementById("rotate2").value +
              ")"
          );
      });
  }

  function chartStart3() {
    $("#chart3_containter").css("height", document.getElementById("height3").value + "px");
    barchart3 = xf.dimension(function (d) {
      let returnValue;
      if (field_name3 == "sex") {
        returnValue = d.sex;
      }
      if (field_name3 == "crime_name") {
        returnValue = d.crime_name;
      }
      if (field_name3 == "date_format(date_of_birth,'%m/%d/%Y') as date_of_birth") {
        returnValue = d.incident_date;
      }
      if (field_name3 == "first_name") {
        returnValue = d.first_name;
      }
      if (field_name3 == "weather_main") {
        returnValue = d.weather_main;
      }
      if (field_name3 == "last_name") {
        returnValue = d.last_name;
      }
      if (
        field_name3 == "calculateAge( date_of_birth , IFNULL(daily_logs.start_time, daily_logs.created_date )  ) as age"
      ) {
        returnValue = d.age;
      }
      if (field_name3 == "race") {
        returnValue = d.race;
      }
      if (field_name3 == "user") {
        returnValue = d.user;
      }
      if (field_name3 == "year(daily_logs.created_date) as year") {
        returnValue = +d.year;
      }
      if (field_name3 == "month(daily_logs.created_date) as month") {
        returnValue = d.month;
      }
      if (field_name3 == "dayname(daily_logs.created_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name3 == "hour(daily_logs.created_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name3 == "year(crash_date) as year") {
        returnValue = +d.year;
      }
      if (field_name3 == "month(crash_date) as month") {
        returnValue = d.month;
      }
      if (field_name3 == "dayname(crash_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name3 == "hour(crash_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name3 == "event_type") {
        returnValue = d.event_type;
      }
      if (field_name3 == "event_group") {
        returnValue = d.event_group;
      }
      if (field_name3 == "control_no") {
        returnValue = d.control_no;
      }
      if (field_name3 == "fbi_no") {
        returnValue = d.fbi_no;
      }
      if (field_name3 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
        returnValue = d.incident_date;
      }
      if (field_name3 == "orc_no") {
        returnValue = d.orc_no;
      }
      if (field_name3 == "gang_affiliation") {
        returnValue = d.gang_affiliation;
      }
      if (field_name3 == "additional_descriptions") {
        returnValue = d.additional_descriptions;
      }
      if (field_name3 == "user") {
        returnValue = d.user;
      }
      if (field_name3 == "lp_VIN") {
        returnValue = d.lp_VIN;
      }
      if (field_name3 == "description") {
        returnValue = d.description;
      }
      if (field_name3 == "Address") {
        returnValue = d.Address;
      }

      return typeof returnValue === "undefined" ? "" : returnValue;
    });
    //alert(field_name);
    Chart3.dimension(barchart3)
      .group(barchart3.group())
      //.height(280)
      .x(d3.scale.ordinal())
      .colorAccessor(function (d, i) {
        return i;
      })
      .ordinalColors(document.getElementById("colors3").value.split(","))
      //.ordinalColors(['brown','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628'])
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .centerBar(false)
      .renderLabel(true)
      .clipPadding(20)
      .barPadding(0.1)
      .outerPadding(0.1)
      .margins({
        top: document.getElementById("top_margin3").value,
        left: document.getElementById("left_margin3").value,
        right: document.getElementById("right_margin3").value,
        bottom: document.getElementById("bottom_margin3").value,
      })
      .xAxisLabel(document.getElementById("x_axis3").value)
      .yAxisLabel("")
      .ordering(function (d) {
        if (d.key == "Jan") return 0;
        else if (d.key == "Feb") return 1;
        else if (d.key == "Mar") return 2;
        else if (d.key == "Apr") return 3;
        else if (d.key == "May") return 4;
        else if (d.key == "Jun") return 5;
        else if (d.key == "Jul") return 6;
        else if (d.key == "Aug") return 7;
        else if (d.key == "Sep") return 8;
        else if (d.key == "Oct") return 9;
        else if (d.key == "Nov") return 10;
        else if (d.key == "Dec") return 11;
      })
      .on("renderlet", function (chart) {
        var barsData = [];
        var bars = chart.selectAll(".bar").each(function (d) {
          barsData.push(d);
          processing = false;
        });
        if (bars && bars[0] && bars[0][0]) {
          d3.select(bars[0][0].parentNode).select("#inline-labels").remove();
          var gLabels = d3.select(bars[0][0].parentNode).append("g").attr("id", "inline-labels");
        }
        chart
          .selectAll("g.x text")
          .attr(
            "transform",
            "translate(-" +
              document.getElementById("rotate3").value +
              "," +
              document.getElementById("rotate3").value +
              ") rotate(-" +
              document.getElementById("rotate3").value +
              ")"
          );
      });
  }

  function chartStart4() {
    $("#chart4_containter").css("height", document.getElementById("height4").value + "px");
    barchart4 = xf.dimension(function (d) {
      let returnValue;
      if (field_name4 == "sex") {
        returnValue = d.sex;
      }
      if (field_name4 == "crime_name") {
        returnValue = d.crime_name;
      }
      if (field_name4 == "weather_main") {
        returnValue = d.weather_main;
      }
      if (field_name4 == "date_format(date_of_birth,'%m/%d/%Y') as date_of_birth") {
        returnValue = d.incident_date;
      }
      if (field_name4 == "first_name") {
        returnValue = d.first_name;
      }
      if (field_name4 == "last_name") {
        returnValue = d.last_name;
      }
      if (
        field_name4 == "calculateAge( date_of_birth , IFNULL(daily_logs.start_time, daily_logs.created_date ) ) as age"
      ) {
        returnValue = d.age;
      }
      if (field_name4 == "race") {
        returnValue = d.race;
      }
      if (field_name4 == "user") {
        returnValue = d.user;
      }
      if (field_name4 == "year(daily_logs.created_date) as year") {
        returnValue = +d.year;
      }
      if (field_name4 == "month(daily_logs.created_date) as month") {
        returnValue = d.month;
      }
      if (field_name4 == "dayname(daily_logs.created_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name4 == "hour(daily_logs.created_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name4 == "year(crash_date) as year") {
        returnValue = +d.year;
      }
      if (field_name4 == "month(crash_date) as month") {
        returnValue = d.month;
      }
      if (field_name4 == "dayname(crash_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name4 == "hour(crash_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name4 == "event_type") {
        returnValue = d.event_type;
      }
      if (field_name4 == "event_group") {
        returnValue = d.event_group;
      }
      if (field_name4 == "control_no") {
        returnValue = d.control_no;
      }
      if (field_name4 == "fbi_no") {
        returnValue = d.fbi_no;
      }
      if (field_name4 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
        returnValue = d.incident_date;
      }
      if (field_name4 == "orc_no") {
        returnValue = d.orc_no;
      }
      if (field_name4 == "gang_affiliation") {
        returnValue = d.gang_affiliation;
      }
      if (field_name4 == "additional_descriptions") {
        returnValue = d.additional_descriptions;
      }
      if (field_name4 == "user") {
        returnValue = d.user;
      }
      if (field_name4 == "lp_VIN") {
        returnValue = d.lp_VIN;
      }
      if (field_name4 == "description") {
        returnValue = d.description;
      }
      if (field_name4 == "Address") {
        returnValue = d.Address;
      }

      return typeof returnValue === "undefined" ? "" : returnValue;
    });
    //alert(field_name);
    Chart4.margins({
      top: document.getElementById("top_margin4").value,
      left: document.getElementById("left_margin4").value,
      right: document.getElementById("right_margin4").value,
      bottom: document.getElementById("bottom_margin4").value,
    })

      .label(function (d) {
        return d.key + ":" + d.value;
      })
      .dimension(barchart4)
      .group(barchart4.group())
      .ordering(function (d) {
        if (d.key == "Monday") return 0;
        else if (d.key == "Tuesday") return 1;
        else if (d.key == "Wednesday") return 2;
        else if (d.key == "Thursday") return 3;
        else if (d.key == "Friday") return 4;
        else if (d.key == "Saturday") return 5;
        else if (d.key == "Sunday") return 6;
        else if (d.key == "All Other Theft") return 7;
      })
      .elasticX(true);
  }

  function chartStart5() {
    $("#chart5_containter").css("height", document.getElementById("height5").value + "px");
    barchart5 = xf.dimension(function (d) {
      let returnValue;
      if (field_name5 == "sex") {
        returnValue = d.sex;
      }
      if (field_name5 == "crime_name") {
        returnValue = d.crime_name;
      }
      if (field_name5 == "weather_main") {
        returnValue = d.weather_main;
      }
      if (field_name5 == "date_format(date_of_birth,'%m/%d/%Y') as date_of_birth") {
        returnValue = d.incident_date;
      }
      if (field_name5 == "first_name") {
        returnValue = d.first_name;
      }
      if (field_name5 == "last_name") {
        returnValue = d.last_name;
      }
      if (
        field_name5 == "calculateAge( date_of_birth , IFNULL(daily_logs.start_time, daily_logs.created_date ) ) as age"
      ) {
        returnValue = d.age;
      }
      if (field_name5 == "year(crash_date) as year") {
        returnValue = +d.year;
      }
      if (field_name5 == "month(crash_date) as month") {
        returnValue = d.month;
      }
      if (field_name5 == "dayname(crash_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name5 == "hour(crash_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name5 == "race") {
        returnValue = d.race;
      }
      if (field_name5 == "user") {
        returnValue = d.user;
      }
      if (field_name5 == "year(daily_logs.created_date) as year") {
        returnValue = +d.year;
      }
      if (field_name5 == "month(daily_logs.created_date) as month") {
        returnValue = d.month;
      }
      if (field_name5 == "dayname(daily_logs.created_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name5 == "hour(daily_logs.created_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name5 == "event_type") {
        returnValue = d.event_type;
      }
      if (field_name5 == "event_group") {
        returnValue = d.event_group;
      }
      if (field_name5 == "control_no") {
        returnValue = d.control_no;
      }
      if (field_name5 == "fbi_no") {
        returnValue = d.fbi_no;
      }
      if (field_name5 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
        returnValue = d.incident_date;
      }
      if (field_name5 == "orc_no") {
        returnValue = d.orc_no;
      }
      if (field_name5 == "gang_affiliation") {
        returnValue = d.gang_affiliation;
      }
      if (field_name5 == "additional_descriptions") {
        returnValue = d.additional_descriptions;
      }
      if (field_name5 == "user") {
        returnValue = d.user;
      }
      if (field_name5 == "lp_VIN") {
        returnValue = d.lp_VIN;
      }
      if (field_name5 == "description") {
        returnValue = d.description;
      }
      if (field_name5 == "Address") {
        returnValue = d.Address;
      }

      return typeof returnValue === "undefined" ? "" : returnValue;
    });
    //alert(field_name);
    Chart5.dimension(barchart5)
      .group(barchart5.group())
      //.height(280)
      .x(d3.scale.ordinal())
      .colorAccessor(function (d, i) {
        return i;
      })
      .ordinalColors(document.getElementById("colors5").value.split(","))
      //.ordinalColors(['brown','#377eb8','#5daf5a','#985ea3','#ff7f00','#ffff33','#a65628'])
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .centerBar(false)
      .renderLabel(true)
      .clipPadding(20)
      .barPadding(0.1)
      .outerPadding(0.1)
      .margins({
        top: document.getElementById("top_margin5").value,
        left: document.getElementById("left_margin5").value,
        right: document.getElementById("right_margin5").value,
        bottom: document.getElementById("bottom_margin5").value,
      })
      .xAxisLabel(document.getElementById("x_axis5").value)
      .yAxisLabel("")
      .ordering(function (d) {
        if (d.key == "Jan") return 0;
        else if (d.key == "Feb") return 1;
        else if (d.key == "Mar") return 2;
        else if (d.key == "Apr") return 3;
        else if (d.key == "May") return 4;
        else if (d.key == "Jun") return 5;
        else if (d.key == "Jul") return 6;
        else if (d.key == "Aug") return 7;
        else if (d.key == "Sep") return 8;
        else if (d.key == "Oct") return 9;
        else if (d.key == "Nov") return 10;
        else if (d.key == "Dec") return 11;
      })
      .on("renderlet", function (chart) {
        var barsData = [];
        var bars = chart.selectAll(".bar").each(function (d) {
          barsData.push(d);
          processing = false;
        });
        if (bars && bars[0] && bars[0][0]) {
          d3.select(bars[0][0].parentNode).select("#inline-labels").remove();
          var gLabels = d3.select(bars[0][0].parentNode).append("g").attr("id", "inline-labels");
        }
        chart
          .selectAll("g.x text")
          .attr(
            "transform",
            "translate(-" +
              document.getElementById("rotate5").value +
              "," +
              document.getElementById("rotate5").value +
              ") rotate(-" +
              document.getElementById("rotate5").value +
              ")"
          );
      });
  }

  function chartStart6() {
    $("#chart6_containter").css("height", document.getElementById("height6").value + "px");
    barchart6 = xf.dimension(function (d) {
      let returnValue;
      if (field_name6 == "sex") {
        returnValue = d.sex;
      }
      if (field_name6 == "crime_name") {
        returnValue = d.crime_name;
      }
      if (field_name6 == "weather_main") {
        returnValue = d.weather_main;
      }
      if (field_name6 == "date_format(date_of_birth,'%m/%d/%Y') as date_of_birth") {
        returnValue = d.incident_date;
      }
      if (field_name6 == "first_name") {
        returnValue = d.first_name;
      }
      if (field_name6 == "last_name") {
        returnValue = d.last_name;
      }
      if (
        field_name6 == "calculateAge( date_of_birth , IFNULL(daily_logs.start_time, daily_logs.created_date ) ) as age"
      ) {
        returnValue = d.age;
      }
      if (field_name6 == "race") {
        returnValue = d.race;
      }
      if (field_name6 == "user") {
        returnValue = d.user;
      }
      if (field_name6 == "year(daily_logs.created_date) as year") {
        returnValue = +d.year;
      }
      if (field_name6 == "month(daily_logs.created_date) as month") {
        returnValue = d.month;
      }
      if (field_name6 == "dayname(daily_logs.created_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name6 == "hour(daily_logs.created_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name6 == "year(crash_date) as year") {
        returnValue = +d.year;
      }
      if (field_name6 == "month(crash_date) as month") {
        returnValue = d.month;
      }
      if (field_name6 == "dayname(crash_date) as dayName") {
        returnValue = d.dayName;
      }
      if (field_name6 == "hour(crash_date) as hour") {
        returnValue = +d.hour;
      }
      if (field_name6 == "event_type") {
        returnValue = d.event_type;
      }
      if (field_name6 == "event_group") {
        returnValue = d.event_group;
      }
      if (field_name6 == "control_no") {
        returnValue = d.control_no;
      }
      if (field_name6 == "fbi_no") {
        returnValue = d.fbi_no;
      }
      if (field_name6 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
        returnValue = d.incident_date;
      }
      if (field_name6 == "orc_no") {
        returnValue = d.orc_no;
      }
      if (field_name6 == "gang_affiliation") {
        returnValue = d.gang_affiliation;
      }
      if (field_name6 == "additional_descriptions") {
        returnValue = d.additional_descriptions;
      }
      if (field_name6 == "user") {
        returnValue = d.user;
      }
      if (field_name6 == "lp_VIN") {
        returnValue = d.lp_VIN;
      }
      if (field_name6 == "description") {
        returnValue = d.description;
      }
      if (field_name6 == "Address") {
        returnValue = d.Address;
      }

      return typeof returnValue === "undefined" ? "" : returnValue;
    });
    //alert(field_name);
    Chart6.margins({
      top: document.getElementById("top_margin6").value,
      left: document.getElementById("left_margin6").value,
      right: document.getElementById("right_margin6").value,
      bottom: document.getElementById("bottom_margin6").value,
    })

      .label(function (d) {
        return d.key + ":" + d.value;
      })
      .dimension(barchart6)
      .group(barchart6.group())
      .ordering(function (d) {
        if (d.key == "Monday") return 0;
        else if (d.key == "Tuesday") return 1;
        else if (d.key == "Wednesday") return 2;
        else if (d.key == "Thursday") return 3;
        else if (d.key == "Friday") return 4;
        else if (d.key == "Saturday") return 5;
        else if (d.key == "Sunday") return 6;
        else if (d.key == "All Other Theft") return 7;
      })
      .elasticX(true);
  }

  //dimension for table search
  var tableDimension = xf.dimension(function (d) {
    return d;
  });
  function RefreshTable() {
    dc.events.trigger(function () {
      alldata = tableDimension.top(Infinity);
      datatable.fnClearTable();
      datatable.fnAddData(alldata);
      datatable.fnDraw();
    });
  }

  function tableStart() {
    //set options and columns
    var dataTableOptions = {
      destroy: true,
      responsive: true,
      aaSorting: [[0, "desc"]],
      lengthMenu: [
        [4, 25, 50, 100],
        [4, 25, 50, 100],
      ],
      oLanguage: {
        oPaginate: {
          sFirst: "",
          sPrevious: "",
          sNext: "",
          sLast: "",
        },
        sLengthMenu: "Records per page: _MENU_",
        sInfo: "Total of _TOTAL_ records (showing _START_ to _END_)",
        sInfoFiltered: "(filtered from _MAX_ total records)",
      },
      deferRender: true,
      columnDefs: [
        {
          targets: 0,
          visible: column1,
          data: function (d) {
            if (field_name1 == "sex") {
              return d.sex;
            }
            if (field_name1 == "race") {
              return d.race;
            }
            if (field_name1 == "user") {
              return d.user;
            }
            if (field_name1 == "year(daily_logs.created_date) as year") {
              return +d.year;
            }
            if (field_name1 == "month(daily_logs.created_date) as month") {
              return d.month;
            }
            if (field_name1 == "dayname(daily_logs.created_date) as dayName") {
              return d.dayName;
            }
            if (field_name1 == "hour(daily_logs.created_date) as hour") {
              return +d.hour;
            }
            if (field_name1 == "year(crash_date) as year") {
              return +d.year;
            }
            if (field_name1 == "month(crash_date) as month") {
              return d.month;
            }
            if (field_name1 == "dayname(crash_date) as dayName") {
              return d.dayName;
            }
            if (field_name1 == "hour(crash_date) as hour") {
              return +d.hour;
            }
            if (field_name1 == "event_type") {
              return d.event_type;
            }
            if (field_name1 == "control_no") {
              return d.control_no;
            }
            if (field_name1 == "fbi_no") {
              return d.fbi_no;
            }
            if (field_name1 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
              return d.incident_date;
            }
            if (field_name1 == "orc_no") {
              return d.orc_no;
            }
            if (field_name1 == "gang_affiliation") {
              return d.gang_affiliation;
            }
            if (field_name1 == "additional_descriptions") {
              return d.additional_descriptions;
            }
            if (field_name1 == "user") {
              return d.user;
            }
            if (field_name1 == "lp_VIN") {
              return d.lp_VIN;
            }
            if (field_name1 == "description") {
              return d.description;
            }
          },
          defaultContent: "",
        },
        {
          targets: 1,
          visible: column2,
          data: function (d) {
            if (field_name2 == "sex") {
              return d.sex;
            }
            if (field_name2 == "race") {
              return d.race;
            }
            if (field_name2 == "user") {
              return d.user;
            }
            if (field_name2 == "year(daily_logs.created_date) as year") {
              return +d.year;
            }
            if (field_name2 == "month(daily_logs.created_date) as month") {
              return d.month;
            }
            if (field_name2 == "dayname(daily_logs.created_date) as dayName") {
              return d.dayName;
            }
            if (field_name2 == "hour(daily_logs.created_date) as hour") {
              return +d.hour;
            }
            if (field_name2 == "year(crash_date) as year") {
              return +d.year;
            }
            if (field_name2 == "month(crash_date) as month") {
              return d.month;
            }
            if (field_name2 == "dayname(crash_date) as dayName") {
              return d.dayName;
            }
            if (field_name2 == "hour(crash_date) as hour") {
              return +d.hour;
            }
            if (field_name2 == "event_type") {
              return d.event_type;
            }
            if (field_name2 == "control_no") {
              return d.control_no;
            }
            if (field_name2 == "fbi_no") {
              return d.fbi_no;
            }
            if (field_name2 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
              return d.incident_date;
            }
            if (field_name2 == "orc_no") {
              return d.orc_no;
            }
            if (field_name2 == "gang_affiliation") {
              return d.gang_affiliation;
            }
            if (field_name2 == "additional_descriptions") {
              return d.additional_descriptions;
            }
            if (field_name2 == "user") {
              return d.user;
            }
            if (field_name2 == "lp_VIN") {
              return d.lp_VIN;
            }
            if (field_name2 == "description") {
              return d.description;
            }
          },
          defaultContent: "",
        },
        {
          targets: 2,
          visible: column3,
          data: function (d) {
            if (field_name3 == "sex") {
              return d.sex;
            }
            if (field_name3 == "race") {
              return d.race;
            }
            if (field_name3 == "user") {
              return d.user;
            }
            if (field_name3 == "year(daily_logs.created_date) as year") {
              return +d.year;
            }
            if (field_name3 == "month(daily_logs.created_date) as month") {
              return d.month;
            }
            if (field_name3 == "dayname(daily_logs.created_date) as dayName") {
              return d.dayName;
            }
            if (field_name3 == "hour(daily_logs.created_date) as hour") {
              return +d.hour;
            }
            if (field_name3 == "year(crash_date) as year") {
              return +d.year;
            }
            if (field_name3 == "month(crash_date) as month") {
              return d.month;
            }
            if (field_name3 == "dayname(crash_date) as dayName") {
              return d.dayName;
            }
            if (field_name3 == "hour(crash_date) as hour") {
              return +d.hour;
            }
            if (field_name3 == "event_type") {
              return d.event_type;
            }
            if (field_name3 == "control_no") {
              return d.control_no;
            }
            if (field_name3 == "fbi_no") {
              return d.fbi_no;
            }
            if (field_name3 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
              return d.incident_date;
            }
            if (field_name3 == "orc_no") {
              return d.orc_no;
            }
            if (field_name3 == "gang_affiliation") {
              return d.gang_affiliation;
            }
            if (field_name3 == "additional_descriptions") {
              return d.additional_descriptions;
            }
            if (field_name3 == "user") {
              return d.user;
            }
            if (field_name3 == "lp_VIN") {
              return d.lp_VIN;
            }
            if (field_name3 == "description") {
              return d.description;
            }
          },
          defaultContent: "",
        },
        {
          targets: 3,
          visible: column4,
          data: function (d) {
            if (field_name4 == "sex") {
              return d.sex;
            }
            if (field_name4 == "race") {
              return d.race;
            }
            if (field_name4 == "user") {
              return d.user;
            }
            if (field_name4 == "year(daily_logs.created_date) as year") {
              return +d.year;
            }
            if (field_name4 == "month(daily_logs.created_date) as month") {
              return d.month;
            }
            if (field_name4 == "dayname(daily_logs.created_date) as dayName") {
              return d.dayName;
            }
            if (field_name4 == "hour(daily_logs.created_date) as hour") {
              return +d.hour;
            }
            if (field_name4 == "year(crash_date) as year") {
              return +d.year;
            }
            if (field_name4 == "month(crash_date) as month") {
              return d.month;
            }
            if (field_name4 == "dayname(crash_date) as dayName") {
              return d.dayName;
            }
            if (field_name4 == "hour(crash_date) as hour") {
              return +d.hour;
            }
            if (field_name4 == "event_type") {
              return d.event_type;
            }
            if (field_name4 == "control_no") {
              return d.control_no;
            }
            if (field_name4 == "fbi_no") {
              return d.fbi_no;
            }
            if (field_name4 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
              return d.incident_date;
            }
            if (field_name4 == "orc_no") {
              return d.orc_no;
            }
            if (field_name4 == "gang_affiliation") {
              return d.gang_affiliation;
            }
            if (field_name4 == "additional_descriptions") {
              return d.additional_descriptions;
            }
            if (field_name4 == "user") {
              return d.user;
            }
            if (field_name4 == "lp_VIN") {
              return d.lp_VIN;
            }
            if (field_name4 == "description") {
              return d.description;
            }
          },
          defaultContent: "",
        },
        {
          targets: 4,
          visible: column5,
          data: function (d) {
            if (field_name5 == "sex") {
              return d.sex;
            }
            if (field_name5 == "race") {
              return d.race;
            }
            if (field_name5 == "user") {
              return d.user;
            }
            if (field_name5 == "year(daily_logs.created_date) as year") {
              return +d.year;
            }
            if (field_name5 == "month(daily_logs.created_date) as month") {
              return d.month;
            }
            if (field_name5 == "dayname(daily_logs.created_date) as dayName") {
              return d.dayName;
            }
            if (field_name5 == "hour(daily_logs.created_date) as hour") {
              return +d.hour;
            }
            if (field_name5 == "year(crash_date) as year") {
              return +d.year;
            }
            if (field_name5 == "month(crash_date) as month") {
              return d.month;
            }
            if (field_name5 == "dayname(crash_date) as dayName") {
              return d.dayName;
            }
            if (field_name5 == "hour(crash_date) as hour") {
              return +d.hour;
            }
            if (field_name5 == "event_type") {
              return d.event_type;
            }
            if (field_name5 == "control_no") {
              return d.control_no;
            }
            if (field_name5 == "fbi_no") {
              return d.fbi_no;
            }
            if (field_name5 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
              return d.incident_date;
            }
            if (field_name5 == "orc_no") {
              return d.orc_no;
            }
            if (field_name5 == "gang_affiliation") {
              return d.gang_affiliation;
            }
            if (field_name5 == "additional_descriptions") {
              return d.additional_descriptions;
            }
            if (field_name5 == "user") {
              return d.user;
            }
            if (field_name5 == "lp_VIN") {
              return d.lp_VIN;
            }
            if (field_name5 == "description") {
              return d.description;
            }
          },
          defaultContent: "",
        },
        {
          targets: 5,
          visible: column6,
          data: function (d) {
            if (field_name6 == "sex") {
              return d.sex;
            }
            if (field_name6 == "race") {
              return d.race;
            }
            if (field_name6 == "user") {
              return d.user;
            }
            if (field_name6 == "year(daily_logs.created_date) as year") {
              return +d.year;
            }
            if (field_name6 == "month(daily_logs.created_date) as month") {
              return d.month;
            }
            if (field_name6 == "dayname(daily_logs.created_date) as dayName") {
              return d.dayName;
            }
            if (field_name6 == "hour(daily_logs.created_date) as hour") {
              return +d.hour;
            }
            if (field_name6 == "year(crash_date) as year") {
              return +d.year;
            }
            if (field_name6 == "month(crash_date) as month") {
              return d.month;
            }
            if (field_name6 == "dayname(crash_date) as dayName") {
              return d.dayName;
            }
            if (field_name6 == "hour(crash_date) as hour") {
              return +d.hour;
            }
            if (field_name6 == "event_type") {
              return d.event_type;
            }
            if (field_name6 == "control_no") {
              return d.control_no;
            }
            if (field_name6 == "fbi_no") {
              return d.fbi_no;
            }
            if (field_name6 == "date_format(daily_logs.created_date,'%m/%d/%Y') as incident_date") {
              return d.incident_date;
            }
            if (field_name6 == "orc_no") {
              return d.orc_no;
            }
            if (field_name6 == "gang_affiliation") {
              return d.gang_affiliation;
            }
            if (field_name6 == "additional_descriptions") {
              return d.additional_descriptions;
            }
            if (field_name6 == "user") {
              return d.user;
            }
            if (field_name6 == "lp_VIN") {
              return d.lp_VIN;
            }
            if (field_name6 == "description") {
              return d.description;
            }
          },
          defaultContent: "",
        },
        {
          targets: 6,
          visible: column7,
          data: function (d) {
            return d.incident_date;
          },
          defaultContent: "",
        },
        {
          targets: 7,
          visible: column8,
          data: function (d) {
            return d.Address;
          },
          defaultContent: "",
        },
        {
          targets: 8,
          visible: column9,
          data: function (d) {
            return d.event_type;
          },
          defaultContent: "",
        },
        {
          targets: 9,
          visible: column10,
          data: function (d) {
            return d.event_group;
          },
          defaultContent: "",
        },
      ],
    };

    //initialize datatable
    datatable.dataTable(dataTableOptions);

    //call RefreshTable when dc-charts are filtered
    for (var i = 0; i < dc.chartRegistry.list().length; i++) {
      var chartI = dc.chartRegistry.list()[i];
      chartI.on("filtered", RefreshTable);
    }

    //filter all charts when using the datatables search box
    $("#searchme").on("keyup", function () {
      text_filter(tableDimension, this.value); //cities is the dimension for the data table

      function text_filter(dim, q) {
        if (q != "") {
          dim.filter(function (d) {
            return d.indexOf(q.toLowerCase()) !== -1;
          });
        } else {
          dim.filterAll();
        }
        RefreshTable();
        dc.redrawAll();
      }
    });
  }
  //custom refresh function, see http://stackoverflow.com/questions/21113513/dcjs-reorder-datatable-by-column/21116676#21116676

  //initCharts
  chartStart();
  chartStart2();
  chartStart3();
  chartStart4();
  chartStart5();
  chartStart6();
  tableStart();
  RefreshTable();
  dc.renderAll();
  $("#loading-screen").hide();

  //Filling with another report selection
  $("#my_charts").change(function () {
    barchart1.dispose();
    barchart2.dispose();
    barchart3.dispose();
    barchart4.dispose();
    barchart5.dispose();
    barchart6.dispose();

    $("#chart1").empty();
    $("#chart2").empty();
    $("#chart3").empty();
    $("#chart4").empty();
    $("#chart5").empty();
    $("#chart6").empty();
    //$("#field_name").empty();

    $(".selectpicker").selectpicker("refresh");

    var targets2 = [];
    $.each($(this).find("option:selected"), function () {
      targets2.push($(this).val());
      $("#save_as_form").val(targets2);
      var which_index = $(this).attr("chart_index");
      // alert(which_index);

      data = chart_data[parseInt(which_index)];
      $("#chart1_title").text(data.chart1_title);
      $("#chart2_title").text(data.chart2_title);
      $("#chart3_title").text(data.chart3_title);
      $("#chart4_title").text(data.chart4_title);
      $("#chart5_title").text(data.chart5_title);
      $("#chart6_title").text(data.chart6_title);
      $("#bir_title").val(data.chart1_title);
      $("#iki_title").val(data.chart2_title);
      $("#uc_title").val(data.chart3_title);
      $("#dort_title").val(data.chart4_title);
      $("#bes_title").val(data.chart5_title);
      $("#alti_title").val(data.chart6_title);
      $("#field_name1").val(data.var1);
      $("#field_name2").val(data.var2);
      $("#field_name3").val(data.var3);
      $("#field_name4").val(data.var4);
      $("#field_name5").val(data.var5);
      $("#field_name6").val(data.var6);

      $("#th1").text(data.chart1_title);
      $("#th2").text(data.chart2_title);
      $("#th3").text(data.chart3_title);
      $("#th4").text(data.chart4_title);
      $("#th5").text(data.chart5_title);
      $("#th6").text(data.chart6_title);

      field_name1 = data.var1;
      field_name2 = data.var2;
      field_name3 = data.var3;
      field_name4 = data.var4;
      field_name5 = data.var5;
      field_name6 = data.var6;
      $("#user").val(data.user);
      $("#chart_id").val(data.id);

      $("#chart_control1").val(data.chart_control);
      if (data.chart_control) {
        var chart_controls = data.chart_control.split(",");
        $("#chart_control").val(chart_controls);
        $(".selectpicker").selectpicker("refresh");
        $("#chart1_div").hide();
        $("#chart2_div").hide();
        $("#chart3_div").hide();
        $("#chart4_div").hide();
        $("#chart5_div").hide();
        $("#chart6_div").hide();
        $("#chart7_div").hide();
        chart_controls.forEach(function (d) {
          var goster = "#" + d + "_div";
          $(goster).show();
        });
      }

      document.getElementById("rotate1").value = data.rotate1;
      document.getElementById("rotate2").value = data.rotate2;
      document.getElementById("rotate3").value = data.rotate3;
      document.getElementById("rotate4").value = data.rotate4;
      document.getElementById("rotate5").value = data.rotate5;
      document.getElementById("rotate6").value = data.rotate6;
      document.getElementById("top_margin1").value = data.top_margin1;
      document.getElementById("top_margin2").value = data.top_margin2;
      document.getElementById("top_margin3").value = data.top_margin3;
      document.getElementById("top_margin4").value = data.top_margin4;
      document.getElementById("top_margin5").value = data.top_margin5;
      document.getElementById("top_margin6").value = data.top_margin6;
      document.getElementById("bottom_margin1").value = data.bottom_margin1;
      document.getElementById("bottom_margin2").value = data.bottom_margin2;
      document.getElementById("bottom_margin3").value = data.bottom_margin3;
      document.getElementById("bottom_margin4").value = data.bottom_margin4;
      document.getElementById("bottom_margin5").value = data.bottom_margin5;
      document.getElementById("bottom_margin6").value = data.bottom_margin6;
      document.getElementById("left_margin1").value = data.left_margin1;
      document.getElementById("left_margin2").value = data.left_margin2;
      document.getElementById("left_margin3").value = data.left_margin3;
      document.getElementById("left_margin4").value = data.left_margin4;
      document.getElementById("left_margin5").value = data.left_margin5;
      document.getElementById("left_margin6").value = data.left_margin6;
      document.getElementById("right_margin1").value = data.right_margin1;
      document.getElementById("right_margin2").value = data.right_margin2;
      document.getElementById("right_margin3").value = data.right_margin3;
      document.getElementById("right_margin4").value = data.right_margin4;
      document.getElementById("right_margin5").value = data.right_margin5;
      document.getElementById("right_margin6").value = data.right_margin6;
      document.getElementById("x_axis1").value = data.x_axis1;
      document.getElementById("x_axis2").value = data.x_axis2;
      document.getElementById("x_axis3").value = data.x_axis3;
      document.getElementById("x_axis4").value = data.x_axis4;
      document.getElementById("x_axis5").value = data.x_axis5;
      document.getElementById("x_axis6").value = data.x_axis6;
      document.getElementById("save_as_form").value = data.chart_name;

      (column1 = false),
        (column2 = false),
        (column3 = false),
        (column4 = false),
        (column5 = false),
        (column6 = false),
        (column7 = false),
        (column8 = false),
        (column9 = false),
        (column10 = false),
        (column11 = false);
      if (data.column1 == 1) {
        column1 = true;
      }
      if (data.column2 == 1) {
        column2 = true;
      }
      if (data.column3 == 1) {
        column3 = true;
      }
      if (data.column4 == 1) {
        column4 = true;
      }
      if (data.column5 == 1) {
        column5 = true;
      }
      if (data.column6 == 1) {
        column6 = true;
      }
      if (data.column7 == 1) {
        column7 = true;
      }
      if (data.column8 == 1) {
        column8 = true;
      }
      if (data.column9 == 1) {
        column9 = true;
      }
      if (data.column10 == 1) {
        column10 = true;
      }

      $("#column1").val(data.column1);
      $("#column2").val(data.column2);
      $("#column3").val(data.column3);
      $("#column4").val(data.column4);
      $("#column5").val(data.column5);
      $("#column6").val(data.column6);
      $("#column7").val(data.column7);
      $("#column8").val(data.column8);
      $("#column9").val(data.column9);
      $("#column10").val(data.column10);

      //document.getElementById('make_global').value=data.make_global;
      //document.getElementById('make_default').value=data.make_default;
      document.getElementById("colors1").value = data.colors1;
      document.getElementById("colors2").value = data.colors2;
      document.getElementById("colors3").value = data.colors3;
      document.getElementById("colors4").value = data.colors4;
      document.getElementById("colors5").value = data.colors5;
      document.getElementById("colors6").value = data.colors6;
      $(".selectpicker").selectpicker("refresh");

      chartStart();
      chartStart2();
      chartStart3();
      chartStart4();
      chartStart5();
      chartStart6();
      tableStart();
      RefreshTable();
      dc.renderAll();
    });
  });

  ///Chart Settings
  $("#chart1_settings").click(function () {
    $("#chart1Modal").modal("show");
  });
  $("#chart2_settings").click(function () {
    $("#chart2Modal").modal("show");
  });
  $("#chart3_settings").click(function () {
    $("#chart3Modal").modal("show");
  });
  $("#chart4_settings").click(function () {
    $("#chart4Modal").modal("show");
  });
  $("#chart5_settings").click(function () {
    $("#chart5Modal").modal("show");
  });
  $("#chart6_settings").click(function () {
    $("#chart6Modal").modal("show");
  });
  $("#chart7_settings").click(function () {
    $("#chart7Modal").modal("show");
  });

  $("#chart1Modal").on("hidden.bs.modal", function () {
    $("#chart1_title").text(document.getElementById("bir_title").value);
    chartStart();
    RefreshTable();
    dc.renderAll();
  });
  $("#chart2Modal").on("hidden.bs.modal", function () {
    $("#chart2_title").text(document.getElementById("iki_title").value);
    chartStart2();
    RefreshTable();
    dc.renderAll();
  });
  $("#chart3Modal").on("hidden.bs.modal", function () {
    $("#chart3_title").text(document.getElementById("uc_title").value);
    chartStart3();
    RefreshTable();
    dc.renderAll();
  });
  $("#chart4Modal").on("hidden.bs.modal", function () {
    $("#chart4_title").text(document.getElementById("dort_title").value);
    chartStart4();
    RefreshTable();
    dc.renderAll();
  });
  $("#chart5Modal").on("hidden.bs.modal", function () {
    $("#chart5_title").text(document.getElementById("bes_title").value);
    chartStart5();
    RefreshTable();
    dc.renderAll();
  });
  $("#chart6Modal").on("hidden.bs.modal", function () {
    $("#chart6_title").text(document.getElementById("alti_title").value);
    chartStart6();
    RefreshTable();
    dc.renderAll();
  });
  $("#chart7Modal").on("hidden.bs.modal", function () {
    $("#chart7_title").text(document.getElementById("yedi_title").value);
    (column1 = false),
      (column2 = false),
      (column3 = false),
      (column4 = false),
      (column5 = false),
      (column6 = false),
      (column7 = false),
      (column8 = false),
      (column9 = false),
      (column10 = false),
      (column11 = false);
    if (document.getElementById("column1").value == 1) {
      column1 = true;
    }
    if (document.getElementById("column2").value == 1) {
      column2 = true;
    }
    if (document.getElementById("column3").value == 1) {
      column3 = true;
    }
    if (document.getElementById("column4").value == 1) {
      column4 = true;
    }
    if (document.getElementById("column5").value == 1) {
      column5 = true;
    }
    if (document.getElementById("column6").value == 1) {
      column6 = true;
    }
    if (document.getElementById("column7").value == 1) {
      column7 = true;
    }
    if (document.getElementById("column8").value == 1) {
      column8 = true;
    }
    if (document.getElementById("column9").value == 1) {
      column9 = true;
    }
    if (document.getElementById("column10").value == 1) {
      column10 = true;
    }
    tableStart();
    RefreshTable();
    dc.renderAll();
  });
}
