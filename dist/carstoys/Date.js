<button onclick="date()">Date</button>

<script>
function date()
{
var d = new Date();
var x = document.getElementById("demo");
x.innerHTML=d.getDate();
}
</script>