/* Recupero automatico username per modulo wiki del mese */

$(document).ready(function() {
if (wgArticleId === 3579) {
if (wgUserName === null) {
$("#entry_2079584507").val("#Auto: Anon#"); // username
} else {
$("#entry_2079584507").val(wgUserName); // username
}
}
});