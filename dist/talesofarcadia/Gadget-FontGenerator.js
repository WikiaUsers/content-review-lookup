/*
//Cookies
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
setCookie("test",true, 1/(24*60));
getCookie("test");
*/
var d = document.getElementById("fontGenerator");
setTimeout(function(){
	if (d != null) {
		var htmlcode = '<textarea placeholder="Enter your text!" id="fgInput"></textarea><label>Please insert a language:</label><select id="fgSelect"><option value="Trollhunters">Trollhunters</option><option value="Trollish">Trollish</option><option value="Akiridion">Akiridion</option></select><button id="fgButton">Generate an image!</button><div style="font-family: Trollhunters" id="fontOutput">Type something in the inputBox</div>';
		d.innerHTML = htmlcode;
		var a = document.getElementById("fgInput");
		var b = document.getElementById("fontOutput");
		a.addEventListener("keyup", function() {b.innerText = a.value});
		a.addEventListener("keydown", function() {b.innerText = a.value.slice(0,a.value.length - 1) + "�"});
		var c=document.getElementById("fgSelect");
		c.addEventListener("change", function() {b.style.fontFamily = c.value});
		document.getElementById("fgbg").innerHTML += "<canvas style='display:none' width='1200px' height='497px' id='fgc'>Your browser does not support our feature!</canvas>";
		var fgbg = new Image();
		fgbg.crossOrigin = "anonymous";
		fgbg.src = 'https://static.wikia.nocookie.net/trollhunters/images/9/97/Fg_background.png';
		var ee = document.querySelector("#fgbg div a img");
		//if (getCookie('fgt') != '') {document.getElementById("fgInput").value = getCookie('fgt');}
		document.getElementById("fgButton").addEventListener("click", function() {
			var canvas = document.getElementById("fgc");
			var fgc = canvas.getContext("2d");
			fgc.drawImage(fgbg,0,0,1200,497);
			fgc.font = "50px " + document.getElementById("fgSelect").value;
			fgc.textAlign = "center";
			var fgl = document.getElementById("fgInput").value;
			var fgll = [];
			while (fgl.length > 0) {
				fgll.push(fgl.slice(0,50));
				fgl = fgl.slice(50, fgl.length);
			}
			var fgls = '';
			for (var i=0; i<fgll.length; i++) {fgls += fgll[i] + "-\n";}
			fgl = fgls.split('\n');
			switch (fgl.length -1) {
				case 0:
				case 1:
					fgc.fillText(fgl[0],610,220,1150);
					break;
				case 2:
					fgc.fillText(fgl[0],610,150,1150);
					fgc.fillText(fgl[1],610,300,1150);
					break;
				case 3:
					fgc.fillText(fgl[0],610,120,1150);
					fgc.fillText(fgl[1],610,270,1150);
					fgc.fillText(fgl[2],610,420,1150);
					break;
				case 4:
					fgc.fillText(fgl[0],610,80,1150);
					fgc.fillText(fgl[1],610,190,1150);
					fgc.fillText(fgl[2],610,300,1150);
					fgc.fillText(fgl[3],610,410,1150);
					break;
				case 5:
					fgc.fillText(fgl[0],610,60,1150);
					fgc.fillText(fgl[1],610,150,1150);
					fgc.fillText(fgl[2],610,240,1150);
					fgc.fillText(fgl[3],610,330,1150); 
					fgc.fillText(fgl[4],610,420,1150);
					break;
				case 6:
					fgc.fillText(fgl[0],610,50,1150);
					fgc.fillText(fgl[1],610,130,1150);
					fgc.fillText(fgl[2],610,210,1150);
					fgc.fillText(fgl[3],610,290,1150);
					fgc.fillText(fgl[4],610,370,1150);
					fgc.fillText(fgl[5],610,450,1150);
					break;
				case 7:
					fgc.fillText(fgl[0],610,40,1150);
					fgc.fillText(fgl[1],610,110,1150);
					fgc.fillText(fgl[2],610,180,1150);
					fgc.fillText(fgl[3],610,250,1150);
					fgc.fillText(fgl[4],610,320,1150); 
					fgc.fillText(fgl[5],610,390,1150);
					fgc.fillText(fgl[6],610,450,1150);
					break;
				case 8:
					fgc.fillText(fgl[0],610,40,1150);
					fgc.fillText(fgl[1],610,100,1150);
					fgc.fillText(fgl[2],610,160,1150);
					fgc.fillText(fgl[3],610,220,1150);
					fgc.fillText(fgl[4],610,280,1150);
					fgc.fillText(fgl[5],610,340,1150);
					fgc.fillText(fgl[6],610,400,1150);
					fgc.fillText(fgl[7],610,460,1150);
					break;
				default:
					alert("Too long!");
			}
			var url = canvas.toDataURL("png");
			ee.src = url;
			//setCookie("fgt",document.getElementById("fgInput").value, 7);
			document.write(ee.outerHTML);
		});
	}
}, 2750);