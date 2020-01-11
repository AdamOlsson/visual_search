function pythagoras(n1, n2){
    dx = n1.x - n2.x;
    dy = n1.y - n2.y;
    return Math.sqrt(dx*dx + dy*dy);
}