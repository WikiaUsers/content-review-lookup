// <nowiki>
var header=new Object();

header.openmenu=function(id) {
if (id>this.progress) this.progress=id;
this.inhalt='<table width=700><tr>';
for (i=1; i<this.menus.length; i++) {if (i>this.progress) this.inhalt+='<td>'+i+'. '+this.menus[i][0]+'</td>'; else if (i==id) this.inhalt+='<td><b>'+i+'. '+this.menus[i][0]+'</b></td>'; else this.inhalt+='<td><a href="javascript:header.openmenu('+i+')">'+i+'. '+this.menus[i][0]+'</a></td>';}
this.inhalt+='</tr></table>';
document.getElementById("headermenu").innerHTML=this.inhalt;
for (i=0; i<this.menus.length; i++) {document.getElementById("headermenu"+i).style.display="none";}
document.getElementById("headermenu"+id).style.display="block";
}

header.preview=function() {
this.name=document.getElementById("headername").value;
this.inhalt='<br><b>Vorschau:</b><br>';
this.inhalt+='<div style="width: 520px; height: 120px;" class="headermain">';
if (this.name!="") this.inhalt+='<div style="position: absolute; margin: 87px 75px; padding: 3px 10px; background-color: white; font-size: 1.1em; font-family: \'Trebuchet MS\', Arial; z-index: 1;"><b>'+this.name+'</b></div>';
if (this.img0!="") {
	this.inhalt+='<div style="position: absolute; margin-left: '+this.img2+'px; margin-top: '+this.img3+'px; overflow: hidden; clip:rect('+this.img4[0]+', '+this.img4[1]+', '+this.img4[2]+', '+this.img4[3]+'); clip:rect('+this.img4[0]+' '+this.img4[1]+' '+this.img4[2]+' '+this.img4[3]+'); z-index: 2;"><img src="http://www.jedipedia.de/wiki/';
	if (this.img1!=this.imgwidth) this.inhalt+='thumb.php?f='+this.img0+'&w='+this.img1; else this.inhalt+='images/'+this.img0;
	this.inhalt+='" width='+this.img5+'></div>';
}
if (this.bg!="") this.inhalt+='<div style="position: absolute; margin-left: 50px; padding-top: 27px; padding-bottom: 100px; z-index: 1; font-family: \'EPISODE I\'; font-size: 60pt; color: #E7E7E7;" class="headerbg">'+this.bg+'</div><div style="position: absolute; margin-left: 15px; padding-top: 41px; padding-bottom: 100px; z-index: 2; font-family: \'EPISODE I\'; font-size: 39pt;">'+this.bg+'</div><div class="headerline" style="margin-top: 88px; height: 2px;">&nbsp;</div><div class="headerline" style="margin-top: 92px; height: 1px;">&nbsp;</div><div class="headerline" style="margin-top: 96px; height: 6px;">&nbsp;</div><div class="headerline" style="margin-top: 105px; height: 3px;">&nbsp;</div><div class="headerline" style="margin-top: 110px; height: 1px;">&nbsp;</div>';
this.inhalt+='</div>';
document.getElementById("headerpreview").innerHTML=this.inhalt;
this.inhalt='{{UserHeader|'+this.alignment+'|'+this.bg+'|'+this.name+'|'+this.img0;
if (this.img0!="") this.inhalt+='|'+this.img1+'|'+this.img2+'|'+this.img3+'|'+this.img4[0]+'|'+this.img4[1]+'|'+this.img4[2]+'|'+this.img4[3];
this.inhalt+='}}';
document.getElementById("headeroutput").innerHTML=this.inhalt;
this.adjustlines();
}

header.menu4=function() {
if (document.getElementsByName("headerimg")[0].checked) {
	this.img0='';
} else {
	this.img0=this.custom0;
	if (typeof parseInt(this.custom1) == "number") if (this.imgwidth>this.custom1) this.img1=parseInt(this.custom1); else this.img1=this.imgwidth;
	this.img2=this.custom2;
	this.img3=this.custom3;
	this.tempheight=Math.round(this.imgheight*parseInt(this.custom1)/this.imgwidth)
	this.img4=new Array(Math.round(this.bordertop/100*this.tempheight)+"px", Math.round((1+this.borderright/100)*parseInt(this.custom1))+"px", Math.round((1+this.borderbottom/100)*this.tempheight)+"px", Math.round(this.borderleft/100*parseInt(this.custom1))+"px");
	this.img5=parseInt(this.custom1);
}
header.preview();
}

header.init=function() {
this.progress=0;
this.bg="Jedipedia";
this.menus=new Array();
this.menus[0]=new Array("Header-Generierung","Mit diesem Programm kannst du deinen eigenen Header für deine Benutzerseite erstellen.",'');
this.menus[1]=new Array("Ausrichtung wählen","Normalerweise wird der Header zentriert (also in der Mitte des Bildschirms) angezeigt. Du kannst den Header aber auch linksbündig oder rechtsbündig anzeigen lassen.",'<input type="radio" name="align" onclick="header.alignment=\'left\';header.preview();"> linksbündig<br><input type="radio" name="align" checked onclick="header.alignment=\'center\';header.preview();"> zentriert<br><input type="radio" name="align" onclick="header.alignment=\'right\';header.preview();"> rechtsbündig');
this.menus[2]=new Array("Hintergrund wählen","Standardmäßig steht im Hintergrund das Wort &bdquo;Jedipedia&ldquo;, wenn du willst, kannst du diesen Text ändern (optimal ist eine Länge zwischen 6 und 12 Zeichen) oder den Hintergrund leer lassen.",'<table><tr><td valign="top"><input type="radio" name="headerbg" checked onclick="header.bg=document.getElementById(\'headerbgtext\').value;header.preview();"></td><td>Hintergrundtext<br><input value="Jedipedia" onkeyup="header.bg=this.value;header.preview();" id="headerbgtext"></td></tr><tr><td><input type="radio" name="headerbg" onclick="header.bg=\'\';header.preview();"></td><td>Kein Hintergrundtext</td></tr></table>');
this.menus[3]=new Array("Name eingeben","Der Name wird unten links im Header angezeigt. Wenn du keinen Namen haben willst, kannst du dieses Feld leer lassen.",'Name: <input id="headername" value="Header" onkeyup="header.preview();" size=30>');
this.menus[4]=new Array("Bild aussuchen","Wenn du ein Bild in deinem Header haben willst, kannst du bei Jedipedia nach einem Bild der gewünschten Person oder des gewünschten Gegenstandes suchen und anschließend das Bild auf die richtige Größe zuschneiden.",'<div id="menu4content"></div>');
this.menus[5]=new Array("Code generieren","Den folgenden Code kannst du in deine Benutzerseite kopieren, um den Header dort zu platzieren.",'<textarea rows=2 cols=75 readonly id="headeroutput">{{UserHeader}}</textarea>');

this.inhalt='<div style="border:1px solid black;">';
this.inhalt+='<div id="headermenu"></div><div id="headerpreview" style="display:none;"></div>';
for (i=0; i<this.menus.length; i++) {
	this.inhalt+='<div id="headermenu'+i+'"><h3>'+header.menus[i][0]+'</h3>'+header.menus[i][1]+'<br><br>'+header.menus[i][2]+'<br><p align="right">';
	switch (i) {
	case 0:
		this.inhalt+='<input type="button" value="Programm starten" onclick="header.openmenu(1);document.getElementById(\'headerpreview\').style.display=\'block\';">';
		break;
	case 1:
		this.inhalt+='<input type="button" value="Weiter" onclick="header.openmenu('+(i+1)+');">';
		break;
	case (header.menus.length-2):
		this.inhalt+='<input type="button" value="Zurück" onclick="header.openmenu('+(i-1)+');"> <input type="button" value="Fertig stellen" onclick="header.openmenu('+(i+1)+');">';
		break;
	case (header.menus.length-1):
		this.inhalt+='<input type="button" value="Zurück" onclick="header.openmenu('+(i-1)+');">';
		break;
	default:
		this.inhalt+='<input type="button" value="Zurück" onclick="header.openmenu('+(i-1)+');"> <input type="button" value="Weiter" onclick="header.openmenu('+(i+1)+');">';
		break;
	}
	this.inhalt+='</p></div>';
}
this.inhalt+='</div>';
document.getElementById("header-programm").innerHTML=this.inhalt;

this.inhalt='<table>';
this.inhalt+='<tr><td valign="top"><input type="radio" name="headerimg" onclick="header.menu4();document.getElementById(\'headerimg2\').style.display=\'none\';" checked></td><td>Kein Bild</td></tr>';
this.inhalt+='<tr><td valign="top"><input type="radio" name="headerimg" onclick="header.menu4();document.getElementById(\'headerimg2\').style.display=\'block\';"></td><td>Eigenes Bild<div id="headerimg2" style="border:1px solid black; display:none;">';
this.inhalt+='Bitte gebe den Dateinamen des Bildes an: <a href="http://www.jedipedia.de/wiki/index.php/Kategorie:Bilder">(nach einem Bild suchen)</a><br>';
this.inhalt+='<input id="custom0" value="Beispiel.jpg" onkeyup="header.custom0keypress();" size=40> <img src="http://www.jedipedia.de/wiki/images/Ajax-loader.gif" id="headerimgloader" style="display:none;"><br><br>';
this.inhalt+='Bildgröße ändern: <input id="custom1" onkeyup="header.custom1keypress();" size=3 value=150>px<br><br>';
this.inhalt+='Bildausschnitt verändern:<table cellspacing=0 cellpadding=0><tr style="height:15px;"><td style="width:15px;"></td><td style="width:15px;"></td><td style="width:30px;" align="center"><a href="javascript:if (header.bordertop<100){header.bordertop++;header.menu4();}">&darr;</a></td><td style="width:15px;"></td><td style="width:15px;"></td></tr><tr style="height:15px;"><td></td><td style="border-top:1px solid black;border-left:1px solid black;"></td><td style="border-top:1px solid black;" align="center"><a href="javascript:if (header.bordertop>0){header.bordertop--;header.menu4();}">&uarr;</a></td><td style="border-top:1px solid black;border-right:1px solid black;"></td><td></td></tr><tr style="height:15px;"><td><a href="javascript:if (header.borderleft<100){header.borderleft++;header.menu4();}">&rarr;</a></td><td style="border-left:1px solid black;"><a href="javascript:if (header.borderleft>0){header.borderleft--;header.menu4();}">&larr;</a></td><td></td><td style="border-right:1px solid black;"><a href="javascript:if (header.borderright<0){header.borderright++;header.menu4();}">&rarr;</a></td><td><a href="javascript:if (header.borderright>-100){header.borderright--;header.menu4();}">&larr;</a></td></tr><tr style="height:15px;"><td></td><td style="border-left:1px solid black;border-bottom:1px solid black;"></td><td style="border-bottom:1px solid black;" align="center"><a href="javascript:if (header.borderbottom<0){header.borderbottom++;header.menu4();}">&darr;</a></td><td style="border-bottom:1px solid black;border-right:1px solid black;"></td><td></td></tr><tr style="height:15px;"><td></td><td></td><td align="center"><a href="javascript:if (header.borderbottom>-100){header.borderbottom--;header.menu4();}">&uarr;</a></td><td></td><td></td></tr></table><br><br>';
this.inhalt+='Bild verschieben: <a href="javascript:header.custom2=header.custom2-5;header.menu4();">&lArr;</a> <a href="javascript:header.custom2--;header.menu4();">&larr;</a> <a href="javascript:header.custom3=header.custom3-5;header.menu4();">&uArr;</a> <a href="javascript:header.custom3--;header.menu4();">&uarr;</a> <a href="javascript:header.custom3++;header.menu4();">&darr;</a> <a href="javascript:header.custom3=header.custom3+5;header.menu4();">&dArr;</a> <a href="javascript:header.custom2++;header.menu4();">&rarr;</a> <a href="javascript:header.custom2=header.custom2+5;header.menu4();">&rArr;</a>';
this.inhalt+='</div></td></tr>';
this.inhalt+='</table>';
document.getElementById("menu4content").innerHTML+=this.inhalt;
header.alignment="center";
if (wgUserName!=null) document.getElementById("headername").value=wgUserName;
this.img0='';
this.custom0=document.getElementById("custom0").value;this.custom1=150;this.custom2=350;this.custom3=10;this.custom4=new Array("0px", "auto", "auto", "0px");
this.imgwidth=600;this.imgheight=400;
this.bordertop=0;this.borderleft=0;this.borderright=0;this.borderbottom=0;

header.openmenu(0);
header.preview();
}

header.custom1keypress=function() {
	if (document.getElementById("custom1").value!=this.custom1 && document.getElementById("custom1").value!="") {
		window.clearTimeout(this.timeout1);
		this.timeout1=window.setTimeout('header.custom1=document.getElementById("custom1").value;header.menu4();',300);
	}
}
header.custom0keypress=function() {
	if (document.getElementById("custom0").value!=this.custom0) {
		window.clearTimeout(this.timeout);
		document.getElementById("headerimgloader").style.display="none";
		document.getElementById("custom0").style.color="black";
		this.timeout=window.setTimeout('document.getElementById("headerimgloader").style.display="inline";header.getfileinfo();',500);
	}
}
header.fileinforequest = new getXmlHttpRequestObject();
header.getfileinfo=function() {
	this.custom0=document.getElementById("custom0").value;
	this.fileinforequest = new getXmlHttpRequestObject();
	if (this.fileinforequest.readyState == 4 || this.fileinforequest.readyState == 0) {
		this.fileinforequest.open("GET", '/wiki/api.php?action=query&prop=imageinfo&iiprop=size&format=xml&titles=Bild:'+this.custom0, true);
		this.fileinforequest.onreadystatechange = header.parsefileinfo;
		this.fileinforequest.send(null);
	}
}
header.parsefileinfo=function() {
	if (header.fileinforequest.readyState == 4) {
		header.output=eval(header.fileinforequest.responseXML);
		if (header.output.getElementsByTagName("ii")[0]) {
			document.getElementById("custom0").style.color="#002bb8";//blue
			header.imgwidth = header.output.getElementsByTagName("ii")[0].getAttributeNode("width").nodeValue;
			header.imgheight = header.output.getElementsByTagName("ii")[0].getAttributeNode("height").nodeValue;
			document.getElementById("headerimgloader").style.display="none";
			header.menu4();
		} else {
			document.getElementById("custom0").style.color="#ba0000";//red
			document.getElementById("headerimgloader").style.display="none";
		}
	}
}
header.adjustlines=function() {
	this.elements1 = document.getElementsByTagName("div");
	for (i=0; i<this.elements1.length; i++) {
		if (this.elements1[i].className=="headermain") {
			this.elements2 = this.elements1[i].getElementsByTagName("div");
			for (j=0; j<this.elements2.length; j++) {
				if (this.elements2[j].className=="headerbg") {
					this.elements2[j].style.letterSpacing="0pt";
					if (this.elements2[j].innerHTML!="Jedipedia")
						this.elements2[j].style.letterSpacing=Math.round(-21.09*Math.log(this.elements2[j].offsetWidth)+126.83);
					this.tempwidth=this.elements2[j].offsetWidth-25;
					for (k=0; k<this.elements2.length; k++) {
						if (this.elements2[k].className=="headerline") {
							this.elements2[k].style.width=this.tempwidth+"px";
						}
					}
					break;
				}
			}
		}
	}
}
if (doneOnloadHook!=true) addOnloadHook(header.adjustlines); else header.adjustlines();
if (wgPageName=="Vorlage:UserHeader" && wgAction=="view") if (doneOnloadHook!=true) addOnloadHook(header.init); else header.init();
// </nowiki>