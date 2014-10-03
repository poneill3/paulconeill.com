function octopus(){
var colors =[	"#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e",
		"#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50",
		"#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6",
		"#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d"];
var width = 1980,
    height = 1200,
    root;
var text;
var types =["hex1","hex2","hex3","hex4","hex5"];
var force = d3.layout.force()
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height).attr("viewBox", "0 0 1920 1200");

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");
    var root={ "name":"test","color":colors[1],"size": 20};
    root.children=[];   
for(var a =0; a < 3; a++){
	root.children[a]={"name":"test "+a,"color":colors[2], "size": 15};
	root.children[a].children = [];
	for(var b =0; b < 4; b++){
		root.children[a].children[b]={"name":"test "+a+" "+b,"color":colors[3], "size": 10};
		root.children[a].children[b].children = [];
		for(var c =0; c < 4; c++){
			root.children[a].children[b].children[c]={"name":"test "+a+" "+b+" "+c,"color":colors[4], "size": 5};
		}			
	}	
}
	update();
	collapseAllChildren(root);
function update() {
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .linkDistance(50)
      .charge(-534)
      .start();

  // Update the links�
  link = link.data(links, function(d) { return d.target.id; });

  // Exit any old links.
  link.exit().remove();

  // Enter any new links.
  link.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  // Update the nodes�
  node = node.data(nodes, function(d) { return d.id; });

  // Exit any old nodes.
  node.exit().remove();

  // Enter any new nodes.
  var hexNode = node.enter().append("circle")
      .attr("class", "hex")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.size; })
      .style("fill", function(d) { return d.color; })
      .on("click", click)
      .call(force.drag);
      hexNode.append("text")
	.attr("x", 14)
	.attr("font-color","green")
	.attr("dy", ".35em")
	.text(function(d) { return d.name; });
	var collapseMe = flatten(nodes);
	for(var  j= collapseMe.length-1;j >0; j--){
		click(collapseMe[j]);
	};
	
}            

function collapseAllChildren(node){
    if (node.children) {
      for(var i=0; i< node.children.length;i++){
      	      collapseAllChildren(node.children[i]);
      }
      node._children = node.children;
      node.children = null;
    } else {
      node.children = node._children;
      node._children = null;
    }
    update();

}
function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
                                       
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

// Color leaf nodes orange, and packages white or blue.


// Toggle children on click.
function click(d) {
  if (!d3.event.defaultPrevented) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update();
  }
}

// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [], i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}
}
function octo(parent, data,w,h) {
  var width = w, // default width
      height = h; // default height

  function my() {
  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
  }

  my.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return my;
  };

  my.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return my;
  };

  return my;
}