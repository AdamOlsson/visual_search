var NCOLS, NROWS;
var CELL_WIDTH = 10;
var INC = 0.14; // small = larger clusters
var THRESH = 0.51; // between 0 and 1

var search;
var start_node, end_node, current_node;

var counter = 0;

function setup(){
    var window_width = 1000;
    var window_height = 500;
    createCanvas(window_width + CELL_WIDTH/2,window_height + CELL_WIDTH/2);

    NCOLS = window_width/CELL_WIDTH;
    NROWS = window_height/CELL_WIDTH;
    noStroke();
    drawMap(NCOLS, NROWS, CELL_WIDTH, INC, THRESH);

    start_node = getRandomGroundCell(NCOLS, NROWS);
    end_node = getRandomGroundCell(NCOLS, NROWS);

    drawEllipse([start_node[0], start_node[1]], CELL_WIDTH, color(0,255,0));
    drawEllipse([end_node[0], end_node[1]], CELL_WIDTH, color(0,0,255));

    // Send in graph
    search = new aStar(start_node , end_node);

    frameRate(15);    
}


function draw(){
    var node = search.step();

    if(node == undefined){
        console.log("NO PATH FOUND");
        noLoop();
    }else if(node.x == end_node[0] && node.y == end_node[1]){
        console.log("END FOUND");
        noLoop();
    }

    drawEllipse([node.x, node.y], CELL_WIDTH, color(146,220,247));

    counter += 1;
}