<pre>
<button onclick="Warning()">Warn</button>

function Warning() {
    var str = document.getElementById("demo").innerHTML; 
    var res = str.replace("Microsoft", "W3Schools");
    document.getElementById("demo").innerHTML = res; 
    document.getElementById("embed").innerHTML="<embed src='Off Pepper Steak Extended .ogg' autostart=true loop=false volume=100 hidden=true>";
   return true;
}


function playIt()
{
   document.getElementById("embed").innerHTML="<embed src='play.mp3' autostart=true loop=false volume=100 hidden=true>";
   return true;
}
</pre>