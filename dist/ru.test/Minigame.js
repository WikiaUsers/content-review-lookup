// Тестовая игра
// Скрипт создан только с целью проверки своих собственных сил.
// Да и просто скоротать время за этой бессмысленной игрой.
// Смысл игры - поймать красный шарик. Управление - WSAD
//
// @author: Kopcap94

$(function() {
    $('body').append('<div id="MainPoint" style="width:50px; height:50px; top:200px; left:200px; position:fixed; border-radius:25px; background-color:black; z-index:5000; display:none;" />');
    $('body').append('<div id="TargetPoint" style="width:50px; height:50px; top:350px; left:350px; position:fixed; border-radius:25px; background-color:red; z-index:4500; display:none;" />');
    $(".WikiaBarWrapper .toolbar .tools").append('<button style="display:inline-block; margin:-1px 3px;" type="button" id="StartGame">Игра!</button>');
    
    width = $(window).width();
    height = $(window).height();
    moveAction = false;
    gameStatus = false;
    countClick = countHit = 0;

    $('body').append(
        '<div id="GameResults" style="width:100px; height:125px; text-align:center; color:black; background-color:white; z-index:4000; border:1px solid black; font-size:120%; position:fixed; top:' + (height - 155) + 'px; left:' + (width - 105) + 'px; display:none;">' +
            '<div style="width:100%;">Moves: <span class="ClickCount">0</span></div>' +
            '<div style="width:100%;">Score: <span class="HitCount">0</span></div>' +
            '<div style="width:100%; margin-top:20px;">' +
                'W - Вверх<br>' +
                'S - Вниз<br>' +
                'A - Влево<br>' +
                'D - Вправо' +
            '</div>' +
        '</div>'
    );
    
    $('#StartGame').click(function() {
        gameStatus = gameStatus ? false:true;
        if (gameStatus) {
            $('#MainPoint, #TargetPoint, #GameResults').show();
        } else {
            $('#MainPoint, #TargetPoint, #GameResults').hide();
        }
    });
    
    $('body').on('keydown', function(e) {
        if (!gameStatus) {
            return;
        }
        
        positionY = parseInt($('#MainPoint').css('top').replace('px',''),'10');
        positionX = parseInt($('#MainPoint').css('left').replace('px',''),'10');
        position2Y = parseInt($('#TargetPoint').css('top').replace('px',''),'10');
        position2X = parseInt($('#TargetPoint').css('left').replace('px',''),'10');
        
        position2Ymin = position2Y - 50;
        position2Ymax = position2Y + 50;
        position2Xmin = position2X - 50;
        position2Xmax = position2X + 50;
        
        countClick++;
    
        if (e.which == 87) { // UP
            goUp = positionY - 25;
            if (goUp <= 50) {
                goUp = 50;
            }
            $('#MainPoint').css('top',goUp);
            positionY = goUp;
        } else if (e.which == 83) { // DOWN
            goDown = positionY + 25;
            if (goDown >= height - 50) {
                goDown = height - 75;
            }
            $('#MainPoint').css('top',goDown);
            positionY = goDown;
        } else if (e.which == 65) { // LEFT
            goLeft = positionX - 25;
            if (goLeft < 0) {
                goLeft = 0;
            }
            $('#MainPoint').css('left',goLeft);
            positionX = goLeft;
        } else if (e.which == 68) { // RIGHT
            goRight = positionX + 25;
            if (goRight >= width - 25) {
                goRight = width - 50;
            }
            $('#MainPoint').css('left',goRight);
            positionX = goRight;
        } else {
            countClick--;
        }
        
        $('.ClickCount').text(countClick);
        
        if ((position2Ymin < positionY && positionY < position2Ymax) && (position2Xmin < positionX && positionX < position2Xmax)) {
            if (moveAction) {
                return;
            }
            moveAction = true;
            
            positionY2 = Math.floor(Math.random()*height - 75);
            if (positionY2 <= 50) { positionY2 = 50; }
            
            positionX2 = Math.floor(Math.random()*width - 50);
            if (positionX2 < 0) { positionX2 = 50; }
            
            $('#TargetPoint').animate({top:positionY2,left:positionX2}, 1000, function() {
                moveAction = false;    
            });
            
            countHit++;
            $('.HitCount').text(countHit);
        }
    });
});