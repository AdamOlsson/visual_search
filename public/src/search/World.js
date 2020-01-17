var MOUNTAIN = 0;
var GROUND = 255;

function World(ncol, nrow){
    this.ncol = ncol;
    this.nrow = nrow;

    this._graph;

    this.generate = function(cw, inc, thresh){
        this._graph = new Array(this.ncol*this.nrow); // clear old graph

        var yoff = 0;
        for(var y = 0; y < this.nrow; y++){
            var xoff = 0;
            for(var x = 0; x < this.ncol; x++){
                var r = noise(xoff,yoff)*255;
                if(255*thresh > r){
                    r = GROUND;
                    this.addAndConnect(x,y);
                }else{
                    r = MOUNTAIN;
                }
    
                drawEllipse([x,y], cw, color(r,r,r))
    
                xoff += inc;
            }
            yoff += inc;
        }
        // return this._graph;
    }

    this.addAndConnect = function(x,y){
        var node = new Node(x,y);
        if(y > 2){
            var dum = 0;
        }
        this._graph[x + y*this.ncol] = node;

        var dxdy = [[-1,0], [-1,-1],[0,-1],[1,-1]]; // neighbouring node indices to connect as neighbours

        for(var i = 0; i < dxdy.length; i++){
            var index = (node.x + dxdy[i][0]) + (node.y+dxdy[i][1])*this.ncol;
            if(node.x + dxdy[i][0] < 0 || node.y+dxdy[i][1] < 0 || index < 0 || this._graph[index] == undefined){
                continue;
            }else{
                var neighbour = this._graph[index];
                neighbour.neighbours.push(node);
                node.neighbours.push(neighbour);
            }
        }
    }

    // IT AINT PRETTY BUT IT WORKS
    this.getRandomNode = function(){
        var x = int(random(this.ncol));
        var y = int(random(this.nrow));
        var index = x + y*this.ncol;

        while(this._graph[index] == undefined){
            x = int(random(this.ncol));
            y = int(random(this.nrow));
            index = x + y*this.ncol;
        }
        return this._graph[index];
    }

    this.get = function(x,y){
        return this._graph[x + y*this.ncol];
    }
}

function drawEllipse(cpos, width, color){
    fill(color);
    var coord = cellToCoordinate([cpos[0], cpos[1]], {'type': 'tuple'});
    ellipse(coord[0],coord[1], width);
}


// function isGround(cell){
//     var coord = cellToCoordinate([cell[0], cell[1]], {'type':'tuple'});
//     return compareArrays(get(coord[0], coord[1]), [GROUND, GROUND, GROUND, 255]); 
// }

// function isMountain(cell){
//     var coord = cellToCoordinate([cell[0], cell[1]], {'type':'tuple'});
//     return compareArrays(get(coord[0], coord[1]), [MOUNTAIN, MOUNTAIN, MOUNTAIN, 255]); 
// }