$('.tt1').mouseover(function(e) {
    window.dispatchEvent(new CustomEvent('scroll'));
});
$('.scrollbox').scroll(function(e) {
    window.dispatchEvent(new CustomEvent('scroll'));
});