/* Test sur le wiki */

/*var affichage = false;

/* Fonction SetCookie qui crée un cookie pour une valeur et son attribut */

/*function SetCookie (name, value) {
	var argv=SetCookie.arguments;
	var argc=SetCookie.arguments.length;
	var expires=(argc > 2) ? argv[2] : null;
	var path=(argc > 3) ? argv[3] : null;
	var domain=(argc > 4) ? argv[4] : null;
	var secure=(argc > 5) ? argv[5] : false;
	document.cookie=name+"="+escape(value)+
		((expires==null) ? "" : ("; expires="+expires.toGMTString()))+
		((path==null) ? "" : ("; path="+path))+
		((domain==null) ? "" : ("; domain="+domain))+
		((secure==true) ? "; secure" : "");
}*/

/*function getCookieVal(offset) {
	var endstr=document.cookie.indexOf (";", offset);
	if (endstr==-1)
      		endstr=document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie (name) {
	var arg=name+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while (i<clen) {
		var j=i+alen;
		if (document.cookie.substring(i, j)==arg)
                        return getCookieVal (j);
                i=document.cookie.indexOf(" ",i)+1;
                        if (i==0) break;}
	return null;
}*/


/* On crée notre cookie pour l'affichage */

/*var pathname=location.pathname;
	var myDomain=pathname.substring(0,pathname.lastIndexOf('/')) +'/';
	var date_exp = new Date();
	date_exp.setTime(date_exp.getTime()+(365*24*3600*1000));
	// Ici on définit une durée de vie de 365 jours
	SetCookie("affichage",true,date_exp,myDomain);*/

/*var affichage=GetCookie(affichage);*/

/* Début du script à proprement dit : affichage d'un message Javascript une seule fois et seulement s'il a pas été deja affiché autre part */

*/

var flag = true;

var modifie = function Modifie () {

    if(flag){
    alert("Ceci est une encyclopédie ouverte à tous, n\'hésitez pas à modifier une page !");
    }
    flag = false;
    /*affichage = true;*/
}

document.getElementById("Modifier").onmouseover= modifie;