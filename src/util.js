/**
 * Translates a cell position into coordinates w.r.t the screen.
 * @param {*} coord, object containing the coordinates
 * @param {Object} type, containes information of what type coord is of through ['type': *TYPE*]
 */
function cellToCoordinate(coord, type){
    var x = 0,y = 0;
    
    if(type === undefined || type['type'] === 'tuple' ){
        x = coord[0]; y = coord[1];
    }else if(type['type'] === 'node'){
        x = coord.x; y = coord.y;
    }

    return [x*CELL_WIDTH + CELL_WIDTH/2, y*CELL_WIDTH + CELL_WIDTH/2];
}
    

/**
 * Returns an array of neighbouring accessable nodes of type Node.
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

            // array comparison wrong
            if( 0 < tx && tx < NCOLS && 0 < ty && ty < NROWS && JSON.stringify(get(tx*CELL_WIDTH + CELL_WIDTH/2, ty*CELL_WIDTH+ CELL_WIDTH/2)) != JSON.stringify(MOUNTAIN_CELL)){
                if(!(i == 0 && j == 0)){
                    n.push({ x: tx, y: ty, gScore:0, fScore:0 })
                }
                
            }
        }   
    }
    return n;
}


function compareArrays(a1, a2){
    if(a1.length != a2.length){
        return false;
    }
    for(var i = 0; i < a1.length; i ++){
        if(a1[i] != a2[i]){
            return false;
        }
    }
    return true;
}