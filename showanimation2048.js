function showNumberWithAnimation(i,j,randNumber){
    var number=$("#numbercell"+i+j);

    number.css('background-color',getNumberBackgroundColor(randNumber));
    number.css('color',getNumberColor(randNumber));
    number.text(randNumber);

    number.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
        },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numbercell=$('#numbercell'+fromx+fromy);
    numbercell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function updateScore(score){
    $('#score').text(score);
}