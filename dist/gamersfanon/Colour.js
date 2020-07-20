<script type="text/javascript">
/*   Color Change Text
*/

//   Change next line for your text msg.

var msg = 'changing color letters'
var colorTimer = null;

//  Color can be altered below - eg. remove - ABCDEF = darker

function toHex(n){
var hexChars = '0123456789ABCDEF';
if (n == 0) return n;
var j, k;
var temp = '';
while (n != 0){
j = n % 16;
n = (n - j)/16;
temp = hexChars.charAt(j) + temp;
}
return temp;
}
function colorize(){
if (!document.getElementById) return;
for (i=0; i<msg.length; i++){
k = Math.round(Math.random() * 16777215);
k = toHex(k);
while (k.length < 6){
k = k + '0';
}
document.getElementById('colorizer' + i).style.color = '#' + k;
}

//  Speed change below - Default = 200 - Lower = Faster 

colorTimer = window.setTimeout('colorize()', 200);
}
</script>


<!-- [Part 2] Add onload to <BODY> tag.-->

<BODY onload='colorize();'>


<!-- [Part 3] Paste this where you wish text to appear. -->
<!-- Change style to your choice -->

<div id="text" style="font-size:large; font-family: 'Courier New', Courier, monospace; letter-spacing:normal; font-weight:bold; font-style:normal; text-align:center; padding-top:15px;">
<script>
for (var i=0; i<msg.length; i++){
document.write("<span id ='colorizer" + i + "'>" + msg.charAt(i) + "</span>");
}
</script></div>