var snejk = {
  init: function() {    
    snejk.update();
    snejk.timeout = setTimeout(snejk.move, snejk.speed);
    
    $('body').keypress(function(e) {
      switch(e.key) {
        case 'w':
          snejk.player.dir = 'UP';
          break;
        case 'd':
          snejk.player.dir = 'RIGHT';
          break;
        case 's':
          snejk.player.dir = 'DOWN';
          break;
        case 'a':
          snejk.player.dir = 'LEFT';
          break;
      }
    });
    
    $('#s5-4').html('W');
    $('#s6-5').html('D');
    $('#s5-6').html('S');
    $('#s4-5').html('A');
  },
  update: function() {
    $('#s5-4').html(''); $('#s6-5').html(''); $('#s5-6').html(''); $('#s4-5').html('');
    $('#s'+snejk.apple.x+'-'+snejk.apple.y).html('🍎');
    $('#s'+snejk.player.x+'-'+snejk.player.y).html('🐍');
    
    if (snejk.player.x === snejk.apple.x && snejk.player.y === snejk.apple.y) {
      snejk.apple.x = Math.floor(Math.random() * 11);
      snejk.apple.y = Math.floor(Math.random() * 11);
      snejk.speed = Math.ceil(snejk.speed*(3/4));
      snejk.points++;
    }
    console.log(snejk.apple.x, snejk.apple.y);
  },
  move: function() {
    $('#s'+snejk.player.x+'-'+snejk.player.y).html('');
    switch(snejk.player.dir) {
      case 'UP':
        snejk.player.y--;
        break;
      case 'RIGHT':
        snejk.player.x++;
        break;
      case 'DOWN':
        snejk.player.y++;
        break;
      case 'LEFT':
        snejk.player.x--;
        break;
    }
    if (snejk.player.x > 10 || snejk.player.x < 0 || snejk.player.y > 10 || snejk.player.y < 0) {
      snejk.lose();
      return;
    }
    snejk.update();
    snejk.timeout = setTimeout(snejk.move, snejk.speed);
  },
  lose: function() {
    $('#s'+snejk.apple.x+'-'+snejk.apple.y).html('');
    $('#s'+snejk.player.x+'-'+snejk.player.y).html('');
    $('#s4-5').html('D');
    $('#s5-5').html('E');
    $('#s6-5').html('D');
    $('#s5-3').html(snejk.points);
  },
  timeout: null,
  speed: 750,
  player: {
    x: 5,
    y: 5,
    dir: null
  },
  apple: {
    x: 2,
    y: 2
  },
  points: 0
};

$(function() {
  if(wgTitle === 'Snejk') {
    snejk.init();  
  }
});