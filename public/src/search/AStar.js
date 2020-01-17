
function aStar(start, end){

    this.open_list = [];
    
    this.start = start;
    this.end = end;

    this.f_score = {};
    this.g_score = {};
    this.previous = {};

    this.g_score[[this.start.x ,this.start.y]] = 0;
    this.f_score[[this.start.x ,this.start.y]] = heuristic(this.start, this.end);

    this.open_list.push(this.start);

    this.step = function(){

        if(compareArrays(this.open_list, [])){
            return undefined;
        }

        current = this.open_list.pop() // Find element with lowest fScore
        if(this.compare(current, this.end)){
            // Complete!
            this.open_list.push(current); // push final step back
            return current;
        }

        var ns = current.neighbours;
        for(var n = 0; n < ns.length; n++){
            var neighbour = ns[n];
           
            var tentative_g_score = this.gScore(current) + distance(current, neighbour); // Distance from start to neighbouring node

            if(tentative_g_score < this.gScore(neighbour)){
                this.previous[[neighbour.x, neighbour.y]] = current;
                this.g_score[[neighbour.x, neighbour.y]] = tentative_g_score;
                this.f_score[[neighbour.x, neighbour.y]] = this.gScore(neighbour) + heuristic(neighbour, this.end);

                if(!this.inOpenList(neighbour)){
                    this.insertBinary(neighbour);
                }
            }
        }
        return this.open_list[this.open_list.length -1]; // return node with lowest fScore
    }

    this.inOpenList = function(node){
        // Binary search
        var L = 0;
        var R = this.open_list.length-1;
    
        while(L <= R){
            var m = int((L + R)/2);
    
            if(this.fScore(this.open_list[m]) > this.fScore(node)){
                L = m +1;
            }else if(this.fScore(this.open_list[m]) < this.fScore(node)){
                R = m -1;
            }else{
                return this.compare(this.open_list[m], node);
            }
        }
        return false;
    }

    this.insertBinary = function(node){

        // If open set is empty
        if(this.open_list.length == 0){
            this.open_list.push(node);
            return;
        }

        var L = 0;
        var R = this.open_list.length-1;
    
        var m = 0;
        while(L < R){
            m = int((L + R)/2);
            if(this.fScore(node) <= this.fScore(this.open_list[m])){
                L = m +1;
            }else{
                R = m;
            }
        }
        var a = this.fScore(this.open_list[L]);
        var b = this.fScore(node);
        var index = a > b ? L+1 : L;
    
        this.open_list.splice(index, 0, node);
        return;
    }

    this.gScore = function(node){
        return this.g_score[[node.x, node.y]] == undefined ? Infinity : this.g_score[[node.x, node.y]];
    }

    this.fScore = function(node){
        return this.f_score[[node.x, node.y]] == undefined ? Infinity : this.f_score[[node.x, node.y]];
    }

    this.compare = function(n1, n2){
        return n1.x == n2.x && n1.y == n2.y;
    }

    this.debug = function(list){
        for(var i = 0; i < list.length; i++){
            console.log(this.fScore(list[i]));
        }
        console.log();
    }
}

// function linearSearch(list, value){
//     for(var i = 0; i < list.length; i++){
//         if(list[i].x == value.x && list[i].y == value.y){
//             return i;
//         }
//     }
//     return undefined;
// }

function distance(from, to){
    return pythagoras(from, to);
}

function heuristic(n1, n2){
    return pythagoras(n1, n2);
}

