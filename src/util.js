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