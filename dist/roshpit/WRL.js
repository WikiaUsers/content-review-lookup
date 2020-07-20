
function myFunction() {
var value = document.getElementById("weapon_att").value - 1;
var x = document.getElementById("weapon_lvl").value; 
for (var I = 1; I <= x; ++I)
value = Math.round(1.1 * value);
alert(value);
}