/*Gadget for people, that doesn't want to see right-rail unhidden*/
$(function(){
$('body:not(.ns-8) .page__right-rail').addClass('is-rail-hidden');
});