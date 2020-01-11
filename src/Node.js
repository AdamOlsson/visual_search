function Node(x, y) {
    this.x = x;
    this.y = y;

    this.fScore = 0;
    this.gScore = 0;

    this.updateFScore = function(heuristicScore) {
        this.fScore = this.gScore + heuristicScore;
    } 

    this.updateGScore = function(stepWeight){
        this.gScore += stepWeight;
    }
}