$(function() {
    var i = Math.floor((Math.random() * 50)),
 
    anim = {
        // Puppet
        '1': ['http://i.imgur.com/iSVMwfO.gif', 'bottom:-200px; right:0;', {bottom:"-3px"}, {bottom:"-200px"}, 'width="150" height="150"', 2000],
         //Springtrap
        '2': ['http://i.imgur.com/xN53Xrs.png', 'bottom:30%; left:-300px;', {left:'0px'}, {left:'-300px'}, 'width="112" height="150"', 2000],
         //Mangl
        '3': ['http://i.imgur.com/aelf3fm.png', 'top:-300px; right:30%;', {top:"48px"}, {top:"-300px"}, '', 2000],
         //Foksi
        '4': ['http://i.imgur.com/hVH9eBK.png', 'bottom:0; left:-300px;', {left:"0px"}, {opacity:"0"}, 'width="200" height="284"', 2000],
        // Phantom Freddie
        '5': ['http://i.imgur.com/fizYYnK.gif', 'bottom:0; right:-200px;', {right:"100%"}, {right:"150%"}, '', 10000], 
        // Baloon Girl
        '6': ['http://i.imgur.com/IalymF6.png', 'bottom:-300px; right:45%;', {bottom:"0px"}, {bottom:"-300px"}, '', 2000] 
    };
 
    if (typeof(anim[i]) == 'undefined') return;
 
    var data = anim[i];
 
    $('body').append('<div id="MaSnK" style="position:fixed; '+data[1]+' z-index:1000;"><img src="'+data[0]+'" '+data[4]+'></div>');
    $('#MaSnK').animate(data[2], data[5], function() {
        setTimeout(function(){
            $('#MaSnK').animate(data[3], 2000, function() {
                $('#MaSnK').remove();
            });
        }, 2000);
    });
});