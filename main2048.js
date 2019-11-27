var board = new Array();
var score=0;
var hasConflicted = new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function prepareForMobile(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellSpace=20;
        cellSideLength=100;
    }

    $('#board').css('width',gridContainerWidth - 2*cellSpace);
    $('#board').css('height',gridContainerWidth - 2*cellSpace);
    $('#board').css('padding',cellSpace);
    $('#board').css('border-radius', 0.02*gridContainerWidth );

    $('.board').css('width',cellSideLength);
    $('.board').css('height',cellSideLength);
    $('.board').css('border-radius',cellSideLength*0.02);

}

function newgame(){
    //初始化棋盘格
    init();
    //随机在两个格子里生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var boardcell = $("#board"+i+j);
            boardcell.css('top',getPosTop(i,j));
            boardcell.css('left',getPosLeft(i,j));
        }
    }

    for(var i=0;i<4;i++){
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }

    updateboardview();

    score=0;
}

function updateboardview(){

    $(".numbercell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#board").append('<div class="numbercell" id="numbercell'+i+''+j+'"></div>');
            var numberCell = $("#numbercell"+i+j);

            if(board[i][j]==0){
                numberCell.css('width','0px');
                numberCell.css("height","0px");
                numberCell.css('top',getPosTop(i,j)+0.5*cellSideLength);
                numberCell.css('left',getPosLeft(i,j)+0.5*cellSideLength);  
            }else{
                numberCell.css('width',cellSideLength);
                numberCell.css('height',cellSideLength);
                numberCell.css('top',getPosTop(i,j));
                numberCell.css('left',getPosLeft(i,j)); 
                numberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                numberCell.css('color',getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);

            }
            hasConflicted[i][j]=false;
        }
    }

    $('.numbercell').css('line-height',cellSideLength+'px');
    $('.numbercell').css('font-size',0.6*cellSideLength+'px');

}

function generateOneNumber(){
    if(nospace(board)){
        return false;
    }else{
        //随机一个位置
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));

        var time=0;
        while(time<50){
            if(board[randx][randy]==0){
                break;
            }

            randx = parseInt(Math.floor(Math.random()*4));
            randy = parseInt(Math.floor(Math.random()*4));
            
            time++;
        }

        if(time==50){
            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++){
                    if(board[i][j]==0){
                        randx=i;
                        randy=j;
                    }
                }
            }
        }

        //随机生成数字
        var randNumber = Math.random() < 0.5 ? 2 : 4;

        //显示
        board[randx][randy]=randNumber;
        showNumberWithAnimation(randx,randy,randNumber);

        return true;
    }
}

$(document).keydown(function(event){
    event.preventDefault();
    switch(event.keyCode){
        case 37:
            if(moveLeft()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isgameover()",300);
            }
            break;
        case 38:
            if(moveUp()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isgameover()",300);
            }
            break;
        case 39:
            if(moveRight()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isgameover()",300);
            }
            break;
        case 40:
            if(moveDown()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isgameover()",300);
            }
            break;
        default:
            break;
                    

    }
});

document.addEventListener('touchstart',function(event){
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;

    var deltax = endx-startx;
    var deltay = endy-starty;

    if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth)
        return;

    if(Math.abs(deltax)>=Math.abs(deltay)){
        if(deltax>0){
            //moveright;
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }else{
            //moveleft
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }else{
        if(deltay>0){
            //movedown
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }else{
            //moveup
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});


function isgameover(){
    if(nospace(board)&& nomove(board)){
        gameover();
    }
}

function gameover(){
    alert("你死了!");
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noBlock(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j]&&noBlock(i,k,j,board)&&!hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score +=board[i][k];
                        updateScore(score);

                        hasConflicted[i][k]=true;
                        continue;

                    }
                }
            }
        }
    }
    setTimeout("updateboardview()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&&noBlock(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j]&&noBlock(i,k,j,board)&&!hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score +=board[i][k];
                        updateScore(score);

                        hasConflicted[i][k]=true;
                        continue;

                    }
                }
            }
        }
    }
    setTimeout("updateboardview()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlock1(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j]&&noBlock1(j,k,i,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score +=board[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;

                    }
                }
            }
        }
    }
    setTimeout("updateboardview()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noBlock1(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j]&&noBlock1(j,k,i,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score +=board[k][j];
                        updateScore(score);

                        hasConflicted[k][j]=true;
                        continue;

                    }
                }
            }
        }
    }
    setTimeout("updateboardview()",200);
    return true;
}
