/**
 * EvaluationDeluxe
 *
 * La fonction EvalProject ajoute un ou plusieurs boutons qui ouvrent un popup d'évaluation
 * sur un ou plusieurs projets donné. Le bouton n'est ajouté que sur les pages de discussion
 * des articles.
 *
 * Un modèle d'évaluation de projet sera mis à jour ou ajouté sur la page de
 * discussion concernée.
 *
 * Auteurs : Ugo14
 * Date de dernière révision : 28 août 2007 à 23:23
 * {{:Projet:JavaScript/Script|EvalProject}}
 */

/********************************************************************************************************
*  Exemple de personnalisation pour le projet "Sécurité informatique" (à mettre dans votre monobook.js) :
*********************************************************************************************************
* obtenir("EvalProject");
* 
* function ajoutEvalProject() {
*   evalProjectButtons=Array();
*   evalProjectNames=Array();
*  with (evalProjectButtons) {
*    push("//images.wikia.com/aigles-et-lys/fr/images/3/32/Btn_toolbar_Evalution_Securite_informatique.png");
*  }
* 
*  with (evalProjectNames) {
*    push("Sécurité informatique");
*  }
* }
* addOnloadHook(ajoutEvalProject);
*/
//<source lang=javascript>//<pre><nowiki>
//////////////////////ZONE PERSONNALISABLE//////////////////////
var evalProjectButtons = new Array();
var evalProjectNames = new Array();
 
with (evalProjectButtons) {
        push("//images.wikia.com/aigles-et-lys/fr/images/7/73/Button_iran.png"); //push(""); donne le bouton vide
}
with (evalProjectNames) {
        push("Iran");
}
/////////////////FIN DE LA ZONE PERSONNALISABLE/////////////////
 
function popupEvalProject(project) {
        var pattern=new RegExp("\\{\\{Wikiprojet "+project+".*\\}\\}","i");
        var found=document.editform.wpTextbox1.value.match(pattern);
        var aa="inconnu";
        var ii="inconnue";
        var chki=new Array();
        var chka=new Array();
        for (i=0;i<4;i++) {chki[i]="";}
        for (i=0;i<6;i++) {chka[i]="";}
        if (found) {
                if (found[0].match(/importance=faible/i)) {
                        ii="faible";
                        chki[0]="checked";
                } else if (found[0].match(/importance=moyenne/i)) {
                        ii="moyenne";
                        chki[1]="checked";
                } else if (found[0].match(/importance=élevée/i)) {
                        ii="élevée";
                        chki[2]="checked";
                } else if (found[0].match(/importance=maximum/i)) {
                        ii="maximum";
                        chki[3]="checked";
                }
                if (found[0].match(/avancement=ébauche/i)) {
                        aa="ébauche";
                        chka[0]="checked";
                } else if (found[0].match(/avancement=BD/i)) {
                        aa="BD";
                        chka[1]="checked";
                } else if (found[0].match(/avancement=BA/i)) {
                        aa="BA";
                        chka[3]="checked";
                } else if (found[0].match(/avancement=B/i)) {
                        aa="B";
                        chka[2]="checked";
                } else if (found[0].match(/avancement=AdQ/i)) {
                        aa="AdQ";
                        chka[5]="checked";
                } else if (found[0].match(/avancement=A/i)) {
                        aa="A";
                        chka[4]="checked";
                }
        }
 
        var popup = window.open('','name','');
 
        javaCode =  '<script type="text\/javascript">var a="'+aa+'"; var i="'+ii+'"; function insertCode(){';
        javaCode += "var textarea=window.opener.document.editform.wpTextbox1.value; ";
        javaCode += 'var pattern=new RegExp("\\\\{\\\\{Wikiprojet '+project+'.*\\\\}\\\\}","i"); ';
        javaCode += 'if (textarea.match(pattern)) { ';
        javaCode += 'window.opener.document.editform.wpTextbox1.value=';
        javaCode += 'textarea.replace(pattern,"{{Wikiprojet '+project+'|avancement="+a+"|importance="+i+"}}");  ';
        javaCode += ' }else{ ';
        javaCode += 'window.opener.insertTags("","{{Wikiprojet '+project+'|avancement="+a+"|importance="+i+"}}",""); ';
        javaCode += ' } ';
        javaCode += 'window.opener.document.editform.wpSummary.value ="Évaluation wikiprojet '+project+' : importance="+i+", avancement="+a; ';
        javaCode += '} <\/script>';
 
        popup.document.write('<html><head><title>Évaluation de '+wgTitle+' pour le projet '+project+'</title>');
        popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
        popup.document.write('<style type="text\/css" media="screen projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
        popup.document.write(javaCode);
        popup.document.write('</head><body>');
        popup.document.write('<h1>Évaluation de <b>'+wgTitle+'</b> dans le cadre du projet <b>'+project+'</b></h1>');
        popup.document.write('<p><center><form name="paramForm">');
        popup.document.write('<table cellpading=1 cellspacing=0>');
        popup.document.write('<tr><th colspan=2>Avancement</th><th colspan=2>Importance</th></tr>');
        popup.document.write('<tr><td bgcolor="#6699ff"><input type="radio" name="avancement" id="AdQ" onCLick="a=\'AdQ\'" '+chka[5]+'></td>');
        popup.document.write('<td bgcolor="#6699ff"><label for="AdQ">AdQ</label></td>');
        popup.document.write('<td bgcolor="#ff00ff"><input type="radio" name="importance" id="maximum" onClick="i=\'maximum\'" '+chki[3]+'></td>');
        popup.document.write('<td bgcolor="#ff00ff"><label for="maximum">maximum</label></td></tr>');
        popup.document.write('<tr><td bgcolor="#66ffff"><input type="radio" name="avancement" id="A" onClick="a=\'A\'" '+chka[4]+'></td>');
        popup.document.write('<td bgcolor="#66ffff"><label for="A">A</label></td>');
        popup.document.write('<td bgcolor="#ff88ff"><input type="radio" name="importance" id="elevee" onClick="i=\'élevée\'" '+chki[2]+'></td>');
        popup.document.write('<td bgcolor="#ff88ff"><label for="elevee">élevée</label></td></tr>');
        popup.document.write('<tr><td bgcolor="#66ff66"><input type="radio" name="avancement" id="BA" onClick="a=\'BA\'" '+chka[3]+'></td>');
        popup.document.write('<td bgcolor="#66ff66"><label for="BA">BA</label></td>');
        popup.document.write('<td bgcolor="#ffccff"><input type="radio" name="importance" id="moyenne" onClick="i=\'moyenne\'" '+chki[1]+'></td>');
        popup.document.write('<td bgcolor="#ffccff"><label for="moyenne">moyenne</label></td></tr>');
        popup.document.write('<tr><td bgcolor="#ffff66"><input type="radio" name="avancement" id="B" onClick="a=\'B\'" '+chka[2]+'></td>');
        popup.document.write('<td bgcolor="#ffff66"><label for="B">B</label></td>');
        popup.document.write('<td bgcolor="#ffeeff"><input type="radio" name="importance" id="faible" onClick="i=\'faible\'" '+chki[0]+'></td>');
        popup.document.write('<td bgcolor="#ffeeff"><label for="faible">faible</label></td></tr>');
        popup.document.write('<tr><td bgcolor="#ffaa66"><input type="radio" name="avancement" id="BD" onClick="a=\'BD\'" '+chka[1]+'></td>');
        popup.document.write('<td bgcolor="#ffaa66"><label for="BD">BD</label></td>');
        popup.document.write('<td></td>');
        popup.document.write('<td></td></tr>');
        popup.document.write('<tr><td bgcolor="#ff6666"><input type="radio" name="avancement" id="ebauche" onClick="a=\'ébauche\'" '+chka[0]+'></td>');
        popup.document.write('<td bgcolor="#ff6666"><label for="ebauche">ébauche</label></td>');
        popup.document.write('<td></td>');
        popup.document.write('<td></td></tr>');
        popup.document.write('</table>');
        popup.document.write('<p>');
        popup.document.write('<input type="submit" value="Évaluer" onClick="javascript:insertCode();javascript:self.close()">');
        popup.document.write('<input type="submit" value="Annuler" onClick="javascript:self.close()">');
        popup.document.write('</form></center>');
        popup.document.write('<iframe id="article" src="//fr.wikipedia.org/wiki/'+wgTitle+'" width="100%" height="75%" align="bottom"></iframe>');
        popup.document.write('</body></html>');
        popup.document.close();
}
 
function EvalProject () {
 
        if ((wgAction != "edit") || (wgCanonicalNamespace != "Talk")) return false;
 
        if (document.createTextNode) {
                var toolbar = document.getElementById("toolbar");
                if (!toolbar) return;
 
                for(var i = 0; i < evalProjectNames.length; i ++) {
                        var img = document.createElement("img");
                        if (evalProjectButtons[i]==undefined || evalProjectButtons[i]=="") {
                                img.setAttribute("src","//images.wikia.com/aigles-et-lys/fr/images/8/84/Button_vide.png");
                        } else {
                                img.setAttribute("src", evalProjectButtons[i]);
                        }
                        var ref = document.createElement("a");
                        ref.setAttribute("href", "javascript:popupEvalProject('"+evalProjectNames[i]+"');");
                        ref.setAttribute("title", "Évaluation projet "+evalProjectNames[i]);
                        ref.appendChild(img);
 
                        toolbar.appendChild(ref);
                }
        }
}
 
addOnloadHook(EvalProject);

//</nowiki></pre></source>