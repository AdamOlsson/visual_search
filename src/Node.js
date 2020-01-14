function Node(x, y) {
    this.x = x;
    this.y = y;

    this.fScore = Infinity;
    this.gScore = Infinity;

    this.previous = undefined;

    this.neighbours = [];
}