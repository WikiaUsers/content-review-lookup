/* Случайный фон для вики */
function randomBg() {
    var imgs = [
        'http://2.firepic.org/2/images/2014-11/12/kglcjxvdsu65.jpg',
        'http://3.firepic.org/3/images/2014-11/13/a3oh38ujhc3s.jpg',
        'http://3.firepic.org/3/images/2014-11/13/4y08rcsuo1l1.jpg',
        'http://3.firepic.org/3/images/2014-11/13/6i7q7qawd0q2.jpg',

    ];
 
    $('body').css('background-image','url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
$(randomBg);