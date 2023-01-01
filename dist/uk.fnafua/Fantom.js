// Код на аниматроников v0.21b
// Специально для ru.five-nights-at-freddys-rus
// @author: Kopcap94
!function( $ ) {
    var i = Math.floor( ( Math.random() * 25 ) ),
    anim = {
        // Марионетка
        '1': [
            'https://i.imgur.com/ykXHGlN.gif', 
            'bottom: -200px; right: 0;', 
            {bottom: "-3px"},
            {bottom: "-200px"}, 
            'width="150" height="150"', 
            2000
        ],
         //Спрингтрап
        '2': [
            'https://i.imgur.com/74eCEhD.png',
            'bottom: 30%; left: -300px;', 
            {left: '0px'},
            {left: '-300px'}, 
            'width="112" height="150"',
            2000
        ],
         //Мангл
        '3': [
            'https://i.imgur.com/bjn0gM4.png', 
            'top: -300px; right: 30%;', 
            {top: "48px"}, 
            {top: "-300px"}, 
            '',
            2000
        ],
         //Фокси
        '4': [
            'https://i.imgur.com/NMpVU4E.png', 
            'bottom: 0; left: -300px;', 
            {left: "0px"}, 
            {opacity: "0"}, 
            'width="200" height="284"', 
            2000
        ],
        // Фантом Фредди
        '5': [
            'https://i.imgur.com/jPUxoqo.gif', 
            'bottom: 0; right: -200px;', 
            {right: "100%"}, 
            {right: "150%"}, 
            '', 
            10000
        ], 
        // Baloon Girl
        '6': [
            'https://i.imgur.com/pzN611i.png', 
            'bottom: -300px; right: 45%;',
            {bottom: "0px"},
            {bottom: "-300px"},
            '',
            2000
        ],
        //Эннард
        '7': [
            'https://i.imgur.com/FwmmCkJ.png',
            'bottom: 0; left: -300px;', 
            {left: "0px"}, 
            {opacity: "0"}, 
            'width="220" height="304"', 
            2000
        ] 
    };
    
    if ( typeof anim[ i ] === 'undefined') return;

    var data = anim[ i ];
    
    $( 'body' ).append(
        '<div id="MarFNAF" style="position:fixed; ' + data[1] + ' z-index:1000;">' +
            '<img src="' + data[0] + '" ' + data[4] + ' />' +
        '</div>'
    );

    $( '#MarFNAF' ).animate( data[2], data[5], function() {
        setTimeout(function(){
            $( '#MarFNAF' ).animate( data[3], 2000, function() {
                $( '#MarFNAF' ).remove(); // Чистим за собой
            });
        }, 2000);
    });
}( this.jQuery );