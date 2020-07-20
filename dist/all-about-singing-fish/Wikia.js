$('body').css('background-image', 'url(https://images.wikia.nocookie.net/all-about-singing-fish/images/1/10/FISH.gif)');
$('img').each(function(){
$(this).css('position', 'relative');
var number = 1 + Math.floor(Math.random() * 600);
$('this').animate({
    left: number
}, 500);
});