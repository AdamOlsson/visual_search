
function aStar(start, end){

    this.open_list = [];
    
    this.min_f_score_index;
    this.start = start;
    this.end = end;

    this.f_score = {};
    this.g_score = {};
    this.previous = {};

    this.hasVisited = new Array(NCOLS*NROWS); // A boolean array keeping track of what nodes that are visited

    this.g_score[[this.start.x ,this.start.y]] = 0;
    this.f_score[[this.start.x ,this.start.y]] = heuristic(this.start, this.end);

    this.open_list.push(this.start);
    this.min_f_score_index = 0;

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

function distance(from, to){
    return 1;
}

function heuristic(n1, n2){
    return pythagoras(n1, n2);
}

