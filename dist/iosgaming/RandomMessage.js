<script type="text/javascript">
var textarray = [
"Welcome to the Wiki!",
"Full of information!",
"Editable by anyone!",
"<sup> Superscript is awesome! </sup>" // No comma after last entry
];

function RndText() {
var rannum= Math.floor(Math.random()*textarray.length);
document.getElementById('ShowText').innerHTML=textarray[rannum];
}
onload = function() { RndText(); }

var inter = setInterval(function() { RndText(); }, 2000);

</script>