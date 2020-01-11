
function aStar(start, end){
    this.closed_list = [];
    this.open_list = [];
    this.start = start;
    this.end = end;

    this.start.fScore = heuristic(this.start, this.end);
    this.open_list.push(this.start);

    this.step = function(){
    }
}


function heuristic(n1, n2){
    return pythagoras(n1, n2);
}