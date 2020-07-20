var ignored = ["Nerdy The Fox", "RX-Bot"]; //Sorry Bot, but I need to check
var number = ignored.length;
var i = 0;
while (i < number) {
    ignoreUser(ignored[i]);
    i++;
}
function ignoreUser(user) {
    $(document.head).append('<style>li[data-user="'+user+'"] { display: none };</style>');
}