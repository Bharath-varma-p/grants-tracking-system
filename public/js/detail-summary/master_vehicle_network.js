export function networkRender(data) {
    var mousd = 0;
  
    function setCursor() {
      var div = document.getElementById("graph-chart");
      if (mousd % 2 != 0) {
        if (div) {
          div.style.cursor = "move";
        }
      } else {
        if (mousd % 2 == 0) {
          if (div) {
            div.style.cursor = "auto";
          }
        }
      }
      mousd++;
    }
  
    $(document).on("click", "#graph-chart", setCursor);
  
    var div = document.getElementById("graph-chart");
    var parseDate = d3.time.format("%m/%d/%Y").parse;
    d3.selectAll("#graph-chart").selectAll("svg").remove();
    var window_ori = 400; //window.innerHeight * 0.945;
    var window2 = document.getElementById("graph-chart").offsetWidth;
    var window3 = document.getElementById("graph-chart").offsetHeight;
    var w = window2;
    var h = window_ori;
    var radius = 6;
    var color = d3.scale.category10();
    var svg = d3
      .select("#graph-chart")
      .append("svg")
      .attr("viewBox", "0 0 " + w + " " + h)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .call(d3.behavior.zoom().on("zoom", zoomed))
      .append("svg:g");
  
    var force = d3.layout.force().size([w, h]).charge(-250).gravity(0.05).linkStrength(3).linkDistance(120);
    force.drag().on("dragstart", function () {
      d3.event.sourceEvent.stopPropagation();
    });
    function zoomed() {
      svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }
    //---Insert-------
    var node_drag = d3.behavior.drag().on("dragstart", dragstarted).on("drag", dragmove).on("dragend", dragend);
    function dragstarted(d, i) {
      force.stop(); // stops the force auto positioning before you start dragging
    }
    function dragmove(d, i) {
      d.px += d3.event.dx;
      d.py += d3.event.dy;
      d.x += d3.event.dx;
      d.y += d3.event.dy;
    }
    function dragend(d, i) {
      d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
      force.resume();
    }
    function releasenode(d) {
      d.fixed = false; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
      //force.resume();
    }
    //set up graph in same style as original example but empty
    var graph = { nodes: [], links: [], locs: [] };
    ///////////////////////////////////////
    data.forEach(function (d) {
      d.person_name = d.person_name ? d.person_name : "Incident";
      d.EdgeAge = d.EdgeAge ? d.EdgeAge : 1;
      d.short_offense = d.short_offense ? d.short_offense : "No Involved Crimes";
      d.AgeGrp = +d.NodeAge / 2 + +d.EdgeAge / 2;
      d.Degree = 1;
      graph.links.push({ source: d.person_name, target: d.vehicle_id, ID: d.id });
      graph.nodes.push({
        name2: d.person_name,
        Degree: d.Address2,
        name: d.person_name,
        target: d.vehicle_id,
        ID: d.vehicle_id,
        PageRank: 3,
        Source: d.data_source,
        Degree2: 3,
        Ego: d.date_time,
        DOB: d.person_dob,
        NodeDOB: d.person_dob,
        edgeName: d.person_name,
        edgeDOB: d.crime_name,
        edgeGang: d.incident_no,
        nodeGang: d.inc_id,
        AssocDate: d.date_time,
        offense: d.crime_name,
        Address: d.Address2,
        Year: d.short_offense,
        Age: d.department,
        AgeGroup: 1,
        SourceGroup: d.department,
      });
      graph.locs.push({
        name2: d.person_name,
        Degree: 3,
        name: d.person_name,
        target: d.vehicle_id,
        ID: d.id,
        PageRank: 3,
        Source: d.data_source,
        Degree2: 3,
        Ego: d.date_time,
        DOB: d.person_dob,
        NodeDOB: d.person_dob,
        edgeName: d.vehicle_id,
        edgeDOB: d.crime_name,
        edgeGang: 1,
        nodeGang: 1,
        AssocDate: d.date_time,
        offense: d.crime_name,
        Address: d.Address2,
        Year: d.short_offense,
        Age: d.department,
        AgeGroup: 1,
        SourceGroup: d.department,
      });
      graph.nodes.push({
        name2: d.vehicle_id,
        Degree: d.Address2,
        name: d.vehicle_id,
        target: d.person_name,
        ID: d.vehicle_id,
        PageRank: 3,
        Source: d.data_source,
        Degree2: 3,
        Ego: d.date_time,
        DOB: d.person_dob,
        NodeDOB: d.person_dob,
        edgeName: d.person_name,
        edgeDOB: d.crime_name,
        edgeGang: d.incident_no,
        nodeGang: d.inc_id,
        AssocDate: d.date_time,
        offense: d.crime_name,
        Address: d.Address2,
        Year: d.short_offense,
        Age: d.department,
        AgeGroup: 1,
        SourceGroup: d.department,
      });
    });
    var gx = crossfilter(graph.nodes);
    var nodeDimension = gx.dimension(function (d) {
        return [d.name, d.Ego, d.name2, d.Degree, d.ID, d.DOB, d.SourceGroup, d.Source, d.Year, d.edgeName, d.edgeGang, d.nodeGang];
      }),
      nodeGroup = nodeDimension.group(),
      nodes = nodeGroup.top(Infinity);
  
    var nodesmap = d3
      .nest()
      .key(function (d) {
        return d.key[0];
      })
      .rollup(function (d) {
        return {
          name: d[0].key[0],
          PageRank: d[0].key[1],
          label: d[0].key[2],
          Degree: d[0].key[3],
          ID: d[0].key[4],
          DOB: d[0].key[5],
          SG: d[0].key[6],
          Source: d[0].key[7],
          Year: d[0].key[8],
          edgeName: d[0].key[9],
          edgeGang: d[0].key[10],
          nodeGang: d[0].key[11],
        };
      })
      .map(nodes);
    nodes = d3.keys(
      d3
        .nest()
        .key(function (d) {
          return d.key[0];
        })
        .map(nodes)
    );
    graph.links.forEach(function (d, i) {
      if (graph.links[i].target != "-1") {
        graph.links[i].source = nodes.indexOf(graph.links[i].source);
        graph.links[i].target = nodes.indexOf(graph.links[i].target);
      }
    });
    nodes.forEach(function (d, i) {
      nodes[i] = {
        name: nodesmap[d].name,
        PageRank: nodesmap[d].PageRank,
        label: nodesmap[d].label,
        degree: nodesmap[d].Degree,
        id: nodesmap[d].ID,
        DOB: nodesmap[d].DOB,
        Source: nodesmap[d].Source,
        Year: nodesmap[d].Year,
        edgeName: nodesmap[d].edgeName,
        edgeGang: nodesmap[d].edgeGang,
        nodeGang: nodesmap[d].nodeGang,
      };
    });
    var links = graph.links;
  
    force.nodes(nodes).links(links).on("tick", tick).start();
    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function (d) {
        if (d.label == document.getElementById("vehicle_id").value) {
          return "<strong>Vehicle ID:</strong> <span style='color:red'>" + d.label + "</span>";
        }
        if (d.label == "Incident") {
          return "<strong>Incident </strong> <span>Linkage</span>";
        } else {
          return "<strong>Name:</strong> <span style='color:red'>" + d.label + "</span>" + "<br/>" + "<strong>DOB:</strong> <span style='color:red'>" + d.DOB + "</span>";
        }
      });
    svg.call(tip);
    var link = svg.selectAll(".link").data(links).enter().append("g").style("stroke", "gray").attr("class", "link");
    link.append("line").style("stroke-width", function (d) {
      return (1 * 2 - 1) * 3 + "px";
    });
  
    link
      .filter(function (d) {
        return 2 > 1;
      })
      .append("line")
      .attr("class", "separator");
    var node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", function (d) {
        return "node" + d.person_name + " " + d.location;
      })
      .on("dblclick", releasenode)
      .call(force.drag)
      .on("dblclick", connectedNodes) //Added
      .on("mouseover", function (d) {
        d3.select(this).select("circle").style("stroke-width", 6);
  
        var nodeNeighbors = links
          .filter(function (link) {
            return link.source.index === d.index || link.target.index === d.index;
          })
          .map(function (link) {
            return link.source.index === d.index ? link.target.index : link.source.index;
          });
  
        svg.selectAll("circle").style("stroke", "gray");
  
        svg
          .selectAll("circle")
          .filter(function (node) {
            return nodeNeighbors.indexOf(node.index) > -1;
          })
          .style("stroke", "red");
        d3.select(this).select("circle").style("stroke", "orange");
        d3.select(this).select("text").style("font", "16px sans-serif");
        d3.selectAll("tr." + d.label).style("background-color", "orange");
      })
      .on("mouseout", function (d) {
        svg.selectAll("circle").style("stroke", "gray");
        d3.select(this).select("circle").style("stroke-width", 1.5);
  
        d3.select(this).select("text").style("font", "12px sans-serif");
        d3.selectAll("tr." + d.label).style("background-color", "white");
      })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
      .on("mousedown", function (d) {
        d.fixed = true;
      });
    node
      .append("circle")
      .attr("r", function (d) {
        return 10;
      })
      .style("fill", function (d) {
        if (d.label.substring(0, 4) != "Peel") {
          return "#eee";
        } else {
          return "#eee";
        }
      });
    node
      .append("text")
      .attr("dx", 20)
      .attr("dy", ".35em")
      .text(function (d) {
        if (d.label.substring(0, 4) == "Peel" || d.label == "Incident") {
          return "";
        } else {
          return d.label;
        }
      })
      .style("none", "gray");
  
    var images = node
      .append("svg:image")
      .attr("xlink:href", function (d) {
        if (d.label == document.getElementById("vehicle_id").value) {
          return "/images/car_icon2.png";
        }
        if (d.label == "Incident") {
          return "/images/incident_icon.png";
        } else {
          return "/images/person_icon.png";
        }
      })
      .attr("x", function (d) {
        return -25;
      })
      .attr("y", function (d) {
        return -25;
      })
      .attr("height", 40)
      .attr("width", 40);
  
    images
      .on("mouseenter", function () {
        // select element in current context
        d3.select(this)
          .transition()
          .attr("x", function (d) {
            return -60;
          })
          .attr("y", function (d) {
            return -60;
          })
          .attr("height", 100)
          .attr("width", 100);
      })
      // set back
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .attr("x", function (d) {
            return -25;
          })
          .attr("y", function (d) {
            return -25;
          })
          .attr("height", 50)
          .attr("width", 50);
      });
    var linkedByIndex = {};
    links.forEach(function (d) {
      linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });
  
    function tick() {
      link
        .selectAll("line")
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });
      node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }
  
    var toggle = 0;
    var linkedByIndex = {};
    for (let i = 0; i < nodes.length; i++) {
      linkedByIndex[i + "," + i] = 1;
    }
    links.forEach(function (d) {
      linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });
  
    function neighboring(a, b) {
      return linkedByIndex[a.index + "," + b.index];
    }
    function connectedNodes() {
      if (toggle == 0) {
        d = d3.select(this).node().__data__;
        node.style("opacity", function (o) {
          return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
        });
        link.style("opacity", function (o) {
          return (d.index == o.source.index) | (d.index == o.target.index) ? 1 : 0.1;
        });
  
        toggle = 1;
      } else {
        node.style("opacity", 1);
        link.style("opacity", 1);
        toggle = 0;
      }
    }
  
    dc.renderAll();
  }