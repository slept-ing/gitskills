documentWidth=window.screen.availWidth;
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;
const b= 0;
function getPosTop(i,j){
    return cellSpace+i*(cellSpace+cellSideLength);
}

function getPosLeft(i,j){
     return cellSpace+j*(cellSpace+cellSideLength);
    
}

function getNumberBackgroundColor(number){
    switch(number){
        case 2: return "#C1FFE4";break;
        case 4: return "#ADFEDC";break;
        case 8: return "#96FED1";break;
        case 16: return "#7AFEC6";break;
        case 32: return "#4EFEB3";break;
        case 64: return "#1AFD9C";break;
        case 128: return "#02F78E";break;
        case 256: return "#02DF82";break;
        case 512: return "#02C874";break;
        case 1024: return "#01B468";break;
        case 2048: return "#019858";break;
        case 4096: return "#01814A";break;
        case 8192: return "#006030";break;
    }
    return "black";
}

function getNumberColor(number){
    if(number<=4){
        return "gray";
    }
    return "white"; 
}

function nospace(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true;
            }
        }
    }
    return false;
}


function noBlock(row,col1,col2,board){
    for(var i=col1+1;i<col2;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;
}


function noBlock1(col,row1,row2,board){
    for(var i=row1+1;i<row2;i++){
        if(board[i][col]!=0){
            return false;
        }
    }
    return true;
}

function nomove(board){
    if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board))
        return false;
    
    return true;
}