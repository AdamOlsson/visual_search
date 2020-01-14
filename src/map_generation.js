
// var graph;

// function drawMap(cols, rows, cw, perlin_inc, thresh){
    
//     // var isGround = new Array(cols*rows);
//     graph = new Array(cols*rows);

//     var yoff = 0;
//     for(var y = 0; y < rows; y++){
//         var xoff = 0;
//         for(var x = 0; x < cols; x++){
//             var r = noise(xoff,yoff)*255;

//             if(255*thresh > r){
//                 r = GROUND;
//                 // isGround[x + y*rows] = true;
//             }else{
//                 r = MOUNTAIN;
//                 // isGround[x + y*rows] = false;
//             }

//             drawEllipse([x,y], cw, color(r,r,r))

//             xoff += perlin_inc;
//         }
//         yoff += perlin_inc;
//     }
// }

// function connectWithNeighbours(x,y, ncol, nrow){
//     var dxdy = [[-1,0], [-1,1],[0.1],[1,1]]; // neighbouring node indices to connect as neighbours
//     var node = new Node(x,y);
//     graph.push(node);

//     for(var i = 0; i < dxdy.length; i++){
//         var neighbour = graph[(x+dxdy[i][0]) + (y+dxdy[i][0])*ncol];
//         neighbour.neighbours.push(node);
//         node.neighbours.push(neighbour);
//     }


// }
// function createGraph(isGroundList, ncol, nrow){
//     for(var i = 0; i < isGroundList.length; i++){
//         var x = 
//     }
// }



