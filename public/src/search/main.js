var NCOLS, NROWS;
var CELL_WIDTH = 10;
var INC = 0.14; // small = larger clusters
var THRESH = 0.51; // between 0 and 1

var search, world;
var start_node, end_node, current_node;

var counter = 0;

function setup(){
    var window_width = 1000;
    var window_height = 500;
    createCanvas(window_width + CELL_WIDTH/2,window_height + CELL_WIDTH/2);

    NCOLS = window_width/CELL_WIDTH;
    NROWS = window_height/CELL_WIDTH;

    noStroke();
    world = new World(NCOLS, NROWS);
    world.generate(CELL_WIDTH, INC, THRESH);

    start_node = world.getRandomNode();
    end_node = world.getRandomNode();

    drawEllipse([start_node.x, start_node.y], CELL_WIDTH, color(0,255,0));
    drawEllipse([end_node.x, end_node.y], CELL_WIDTH, color(0,0,255));

    search = new aStar(start_node , end_node);

    frameRate(30);    
}


function draw(){
    var node = search.step();

    if(node == undefined){
        console.log("NO PATH FOUND");
        noLoop();
    }else if(node.x == end_node.x && node.y == end_node.y){
        console.log("END FOUND");
        noLoop();
    }

    drawEllipse([node.x, node.y], CELL_WIDTH, color(146,220,247));
    
    counter += 1;

    noLoop();
}

// function drawNodes(node){
//     var WHITE = [0,0,0,255]

//     drawEllipse([node.x, node.y], CELL_WIDTH, color(146,220,247));

//     for(var i = 0; i < node.neighbours.length; i++){
//         var n = node.neighbours[i];
//         var p_coord = cellToCoordinate([n.x, n.y], {'type':'tuple'});

//         var c = get(p_coord[0], p_coord[1]);

//         if(compareArrays(c,WHITE)){
//             drawEllipse([node.x, node.y], CELL_WIDTH, color(255,0,100));
//         }
//     }
// }
