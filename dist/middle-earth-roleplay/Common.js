/* Any JavaScript here will be loaded for all users on every page load. */
/*Admin Comment Background Highlighting Code*/
$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Tybereous"]').length;
}).next().css({
    background: "rgba(0, 0, 0, 0.90)", 
    padding: '10px',
    color: "#680000",
}).find(".quote").css({
   background: "rgba(200, 200, 200, 0.40)"


});

/*$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="James_of_the_iron_hills"]').length;
}).next().css({
    background: "rgba(255, 125, 0, 0.70) url('https://vignette.wikia.nocookie.net/middle-earth-roleplay/images/3/37/AdminWatermark.png/revision/latest?cb=20160718133120') bottom center no-repeat",
    padding: '10px'
});*/

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Maltalidenta_Kwuitidherali"]').length;
}).next().css({
    background: "rgba(204, 255, 255, 0.70)",
    padding: '10px'
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Dark_dwarves_2"]').length;
}).next().css({
    background: "rgba(255, 255, 255, 0.70) url('https://vignette.wikia.nocookie.net/middle-earth-roleplay/images/7/76/Medal_DD2.png/revision/latest?cb=20160729193257') bottom right/95px 80px no-repeat",
    padding: '10px'
});

/* Goodbye, old friend.

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Edacnik"]').length;
}).next().css({
    background: "rgba(218, 165, 32, 0.70)", 
    padding: '10px'
});
*/

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Patrick.vtap"]').length;
}).next().css({
    background: "rgba(78, 137, 117, 0.70) url('https://vignette.wikia.nocookie.net/middle-earth-roleplay/images/a/aa/ModWatermark.png/revision/latest?cb=20160718132951') bottom center no-repeat",
    padding: '10px'
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Eureka_Enderborn"]').length;
}).next().css({
    background: "rgba(0, 0, 0, 1) url('https://vignette.wikia.nocookie.net/middle-earth-roleplay/images/3/37/AdminWatermark.png/revision/latest?cb=20160718133120') bottom center no-repeat",
    padding: '10px',
   color: "white"
}).find(".quote").css({
   background: "rgba(200, 200, 200, 0.40)"
});


$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="High_Prince_Imrahil"]').length;
}).next().css({
    background: "rgba(92, 138, 230, 0.70) url('https://vignette.wikia.nocookie.net/middle-earth-roleplay/images/a/aa/ModWatermark.png/revision/latest?cb=20160718132951') bottom center no-repeat",
    padding: '10px'
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="The_Lord_of_Minas_Morgul"]').length;
}).next().css({
    background: "rgba(0, 0, 0, 0.70)", 
    padding: '10px',
   color: "rgba(251, 88, 0, 0.70)"
}).find(".quote").css({
   background: "rgba(200, 200, 200, 0.40)"
});

/*$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Lotrings"]').length;
}).next().css({
    background: "rgba(255, 255, 255, 0.70) url('https://vignette.wikia.nocookie.net/middle-earth-roleplay/images/a/aa/ModWatermark.png/revision/latest?cb=20160718132951') bottom center no-repeat",
    padding: '10px'
});*/

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="TheShade6"]').length;
}).next().css({
    background: "rgba(0, 103, 0, 0.70) url('https://vignette.wikia.nocookie.net/middle-earth-roleplay/images/3/37/AdminWatermark.png/revision/latest?cb=20160718133120') bottom center no-repeat",
    padding: '10px'
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="The_Indomitable"]').length;
}).next().css({
    background: "rgba(0, 0, 0, 0.70) url('https://vignette.wikia.nocookie.net/middle-earth-roleplay/images/3/37/AdminWatermark.png/revision/latest?cb=20160718133120') bottom center no-repeat",
    padding: '10px',
    color: "red"
}).find(".quote").css({
   background: "rgba(200, 200, 200, 0.40)"
});

/*$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Faenor_of_the_Silver_Laurel"]').length;
}).next().css({
    background: "rgba
});*/

/*72 118 255*/
/*Text color code*/
/* ,
   color: "white"
}).find(".quote").css({
   background: "rgba(200, 200, 200, 0.40)"
});
*/

/*92, 138, 230, 0.70*/
/* MOD IMAGE: https://images.wikia.nocookie.net/__cb20141205133613/lotrminecraftmod/images/d/d1/Mod.png') */
/*<span class="insertusername"></span>*/
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

var quote = $('.quote:not(.customquote)');
quote.addClass("mw-collapsible mw-collapsed");
quote.each(function() {
    $(this).html(
        $(this).html().replace(
            /^(.* wrote:(?:\n|<br>))([\s\S]*)$/m,
            '$1<span class="mw-collapsible-content">$2</span>'
        )
    );
});