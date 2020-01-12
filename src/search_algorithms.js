
function aStar(start, end){
    this.came_from = [];
    this.open_list = [];
    this.start = new Node(start[0], start[1]);
    this.end = new Node(end[0], end[1]);

    // Initiate gScore and fScore for start node
    this.start.gScore = 0;
    this.start.fScore = heuristic(this.start, this.end);

    this.open_list.push(this.start);

    this.step = function(){
        current = this.open_list.pop() // Find element with lowest fScore
        if(current.x == this.end.x && current.y == this.end.y){
            // Complete!
            this.open_list.push(current); // push final step back
            return 0; // TODO
        }

        var ns = getNeighbours(current);
        for(var n = 0; n < ns.length; n++){
            var neighbour = ns[n];
            var total_distance = current.gScore + distance(current, neighbour); // Distance from start to neighbouring node
            if(total_distance < neighbour.gScore){
                this.came_from.push(current);
                neighbour.gScore = total_distance;
                neighbour.fScore = neighbour.gScore + heuristic(neighbour, this.end);
                // if(neighbour not in this.open_list ) {
                //     // sorted insert  of neighbour into this.open_list with lowest fScore at end
                // }
            }
        }

        return this.open_list[this.open_list.length -1]; // return node with lowest fScore
    }
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
                    n.push({ x: tx, y: ty, gScore:0, fScore:0 })
                }
                
            }
        }   
    }
    return n;
}