
function aStar(start, end){
    this.open_list = [];
    this.start = new Node(start[0], start[1]);
    this.end = new Node(end[0], end[1]);

    this.hasVisited = new Array(NCOLS*NROWS); // A boolean array keeping track of what nodes that are visited

    // Initiate gScore and fScore for start node
    this.start.gScore = 0;
    this.start.fScore = heuristic(this.start, this.end);

    this.open_list.push(this.start);
    this.hasVisited[cellToIndex(this.start.x, this.start.y)] = true;

    this.step = function(){

        if(compareArrays(this.open_list, [])){
            return undefined;
        }

        current = this.open_list.pop() // Find element with lowest fScore
        if(current.x == this.end.x && current.y == this.end.y){
            // Complete!
            console.log("END");
            this.open_list.push(current); // push final step back
            return this.end;
        }

        var ns = getNeighbours(current);
        for(var n = 0; n < ns.length; n++){
            var neighbour = ns[n];
            var tentative_gScore = current.gScore + distance(current, neighbour); // Distance from start to neighbouring node
            if(tentative_gScore < neighbour.gScore){
                neighbour.previous = current;
                neighbour.gScore = tentative_gScore;
                neighbour.fScore = neighbour.gScore + heuristic(neighbour, this.end);

                var index = cellToIndex(neighbour.x, neighbour.y);
                if(this.hasVisited[index] != true){
                    this.hasVisited[index] = true;
                    this.open_list = insertSortedFScore(neighbour, this.open_list);
                }
            }
            // console.log(this.open_list.length);
        }
        return this.open_list[this.open_list.length -1]; // return node with lowest fScore
    }
}

function includesNode_prime(node, list){

}

function cellToIndex(x,y){
    return x + y*NROWS;
}

/**
 * Currently only handles distances to neighbours.
 * @param {Node} from 
 * @param {Node} to 
 */
function distance(from, to){
    if(isMountain([to.x, to.y])){
        return Infinity;
    }
    return 1;
}


function heuristic(n1, n2){
    return pythagoras(n1, n2);
}

/**
 * Returns an array of neighbouring nodes of type Node.
 * @param {Node} node, the node whose neighbours are returned.
 */
function getNeighbours(node){
    var n = [];
    var tx, ty;

    var MOUNTAIN_CELL = [0, 0, 0, MOUNTAIN]

    for(i = -1; i < 2; i++){
        for(j = -1; j < 2; j++){
            tx = node.x + i;
            ty = node.y + j;

            if( 0 < tx && tx < NCOLS && 0 < ty && ty < NROWS){
                if(!(i == 0 && j == 0)){
                    n.push(new Node(tx,ty));
                }
                
            }
        }   
    }
    return n;
}