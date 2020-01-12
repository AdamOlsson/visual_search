var NCOLS, NROWS;
var CELL_WIDTH = 10;
var INC = 0.14; // small = larger clusters
var THRESH = 0.51; // between 0 and 1

var search;
var start_node, end_node, current_node;

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

    search = new aStar(start_node , end_node);

    frameRate(10);    
}


function draw(){

    search.step();
    noLoop();

}