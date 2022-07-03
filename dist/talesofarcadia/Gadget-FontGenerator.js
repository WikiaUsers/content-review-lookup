var d = document.getElementById("fontGenerator");
setTimeout(function(){
	if (d != null) {
		var htmlcode = '<textarea placeholder="Enter your text!" id="fgInput"></textarea><label>Please insert a language:</label><select id="fgSelect"><option value="Trollhunters">Trollhunters</option><option value="Trollish">Trollish</option><option value="Akiridion">Akiridion</option></select><div style="font-family: Trollhunters" id="fontOutput">Type something in the inputBox</div>';
		d.innerHTML = htmlcode;
		var a = document.getElementById("fgInput");
		var b = document.getElementById("fontOutput");
		a.addEventListener("keyup", function() {b.innerHTML = a.value});
		a.addEventListener("keydown", function() {b.innerHTML = a.value.slice(0,a.value.length - 1) + "&#981555554;"});
		var c=document.getElementById("fgSelect");
		c.addEventListener("change", function() {b.style.fontFamily = c.value});
	}
}, 3000);