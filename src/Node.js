function Node(x, y) {
    this.x = x;
    this.y = y;

    this.fScore = Infinity;
    this.gScore = Infinity;

    this.previous = undefined;

    this.neighbours = [];

    // this.updateFScore = function(heuristicScore) {
    //     this.fScore = this.gScore + heuristicScore;
    // } 

    // this.updateGScore = function(stepWeight){
    //     this.gScore += stepWeight;
    // }

}