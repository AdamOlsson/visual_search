var MOUNTAIN = 0;
var GROUND = 255;

function drawMap(cols, rows, cw, perlin_inc, thresh){
    var yoff = 0;

    for(var y = 0; y < rows; y++){
        var xoff = 0;
        for(var x = 0; x < cols; x++){
            var r = noise(xoff,yoff)*255;

            if(255*thresh > r){
                r = GROUND;
            }else{
                r = MOUNTAIN;
            }

            drawEllipse([x,y], cw, color(r,r,r))

            xoff += perlin_inc;
        }
        yoff += perlin_inc;
    }
}

function drawEllipse(cpos, width, color){
    fill(color);
    var coord = cellToCoordinate([cpos[0], cpos[1]], {'type': 'tuple'});
    ellipse(coord[0],coord[1], width);
}

// IT AINT PRETTY BUT IT WORKS
function getRandomGroundCell(xmax, ymax){
    var cell = [int(random(xmax)), int(random(ymax))];
    while(!isGround(cell)){
        cell = [int(random(xmax)), int(random(ymax))];
    }
    return [cell[0], cell[1]];
}

function isGround(cell){
    var coord = cellToCoordinate([cell[0], cell[1]], {'type':'tuple'});
    return compareArrays(get(coord[0], coord[1]), [GROUND, GROUND, GROUND, 255]); 
}

function isMountain(cell){
    var coord = cellToCoordinate([cell[0], cell[1]], {'type':'tuple'});
    return compareArrays(get(coord[0], coord[1]), [MOUNTAIN, MOUNTAIN, MOUNTAIN, 255]); 
}