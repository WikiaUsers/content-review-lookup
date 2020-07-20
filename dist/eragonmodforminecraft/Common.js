/* Any JavaScript here will be loaded for all users on every page load. */

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="SamwiseFilmore"]').length;
}).next().css({
    backgroundColor: "#d07130"
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Sinthoniel"]').length;
}).next().css({
    backgroundColor: "#FF7F00"
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Special_Elf_Friend"]').length;
}).next().css({
    backgroundColor: "#00ced1"
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Rocket_Engineer"]').length;
}).next().css({
    backgroundColor: "#971c21"
});