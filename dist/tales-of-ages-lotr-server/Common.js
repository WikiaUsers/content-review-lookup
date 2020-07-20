/* Any JavaScript here will be loaded for all users on every page load. */

//********************************************************\\
 //***Admin Background Colors for Forums and Message Walls***\\
//************************************************************\\

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Glflegolas"]').length;
}).next().css({
    background: "rgba(56, 124, 68, 0.75) url('https://vignette.wikia.nocookie.net/tales-of-ages-lotr-server/images/0/03/Admin1_120.png') bottom center no-repeat",
    padding: '10px'
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Obsidianwiz"]').length;
}).next().css({
    background: "rgba(163, 71, 163, 0.75) url('https://vignette.wikia.nocookie.net/tales-of-ages-lotr-server/images/0/03/Admin1_120.png') bottom center no-repeat",
    padding: '10px'
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Faenor of the Silver Laurel"]').length;
}).next().css({
    background: "rgba(204, 241, 255, 0.75) url('https://vignette.wikia.nocookie.net/tales-of-ages-lotr-server/images/0/03/Admin1_120.png') bottom center no-repeat",
    padding: '10px'
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Pipeweed Pirate"]').length;
}).next().css({
    background: "rgba(212, 175, 55, 0.75) url('https://vignette.wikia.nocookie.net/tales-of-ages-lotr-server/images/0/03/Admin1_120.png') bottom center no-repeat",
    padding: '10px'
});