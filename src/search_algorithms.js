
function aStar(start, end){
    this.open_list = [];
    this.start = start;
    this.end = end;

    this.f_score = {};
    this.g_score = {};
    this.previous = {};

    this.hasVisited = new Array(NCOLS*NROWS); // A boolean array keeping track of what nodes that are visited

    this.g_score[[this.start.x ,this.start.y]] = 0;
    this.f_score[[this.start.x ,this.start.y]] = heuristic(this.start, this.end);

    this.open_list.push(this.start);
    this.hasVisited[cellToIndex(this.start.x, this.start.y)] = true;

    this.step = function(){

        if(compareArrays(this.open_list, [])){
            return undefined;
        }

        current = this.open_list.pop() // Find element with lowest fScore
        if(current.x == this.end.x && current.y == this.end.y){
            // Complete!
            this.open_list.push(current); // push final step back
            return this.end;
        }

        var ns = current.neighbours;
        for(var n = 0; n < ns.length; n++){
            var neighbour = ns[n];
           
            var tentative_g_score = this.g_score[[current.x, current.y]] + distance(current, neighbour); // Distance from start to neighbouring node
        
            var old_g_score = this.g_score[[neighbour.x, neighbour.y]] == undefined ? Infinity : this.g_score[[neighbour.x, neighbour.y]]
            if(tentative_g_score < old_g_score){
                this.previous[[neighbour.x, neighbour.y]] = current;
                this.g_score[[neighbour.x, neighbour.y]] = tentative_g_score;
                this.f_score[[neighbour.x, neighbour.y]] = this.g_score[[neighbour.x, neighbour.y]] + heuristic(neighbour, this.end);

                var index = cellToIndex(neighbour.x, neighbour.y);
                if(this.hasVisited[index] != true){
                    this.hasVisited[index] = true;
                    this.open_list = this.insertSortedFScore(neighbour, this.open_list);
                }
            }
        }
        return this.open_list[this.open_list.length -1]; // return node with lowest fScore
    }

    this.insertSortedFScore = function(node, list){
        for(var i = 0; i < list.length; i++){

            if(this.f_score[[list[i].x, list[i].y]] < this.f_score[[node.x, node.y]]){
                list.splice(i, 0, node);
                return list;
            }
        }
        list.push(node);
        return list;
    }
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