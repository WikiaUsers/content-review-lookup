importScript('MediaWiki:Editlib.js');

var DJvars_CheckPage = "Wikip�dia:Patrouille RC/Modifications � relire";
var DJvars_ScriptPage = "MediaWiki:DrapeauJaune.js";

var DJvars_Texts = {
 "flagsrc"               : "//upload.wikimedia.org/wikipedia/commons/6/69/Flag_icon_-_yellow.svg",
 "flagtitle"             : "Une demande de relecture a �t� faite pour cette modification",
 "flagalt"               : "Drapeau Jaune",
 "flagheight"            : "20",
 "waitsrc"               : "//upload.wikimedia.org/wikipedia/commons/b/b4/Loading_Animation.gif",
 "waittitle"             : "Wait",
 "waitalt"               : "",
 "notifdone"             : "Demande de seconde relecture envoy�e !",
 "notifremoved"          : "Marquage retir� !",
 "notiferror"            : "Une erreur est survenue... Recharger la page pour v�rifier si la modification a �t� effectu�e ou non.",
 "notifmissingportals"   : "Demande de seconde relecture envoy�e ! (la sous-page de certains portails semble cependant manquante)",
 "notifportalmaymiss"    : "Un de ces portails peut ne pas exister : ",
 "notifalreadyasked"     : "Une demande de seconde relecture a d�j� �t� faite.",
 "notifnotasked"         : "Il n'y a pas de demande de seconde relecture pour cette modification. Elle vient peut-�tre d'�tre retir�e par un autre contributeur.",
 "resumescript"          : "DJ",
 "resumeadd"             : "[[Special:Diff/$1|$2]] = Marqu�e comme douteuse ($3)",
 "resumerm"              : "[[Special:Diff/$1|$2]] = Marqu�e comme relue ($3)",
 "askreviewlinktext"     : "Demander une seconde relecture",
 "askremovelinktext"     : "Retirer le marquage",
 "sidebartext"           : "$1 modification$2 � relire",
 "sidebarlink"           : "/wiki/Wiki Mihawk Moha:Patrouille_RC/Modifications_�_relire"
};

var DJ_maxTimeout = 5;

/*
==========================================
	Initialisation commune � l'ajout et au retrait de diffs � la liste des modifs douteuses
==========================================
*/

/*
	# Fonction execut� sur toutes les pages de diff
	V�rifie si la dif est marqu� comme douteuse
	-> Si oui, alors cela r�cup�re et affiche le commentaire, et met le lien pour retirer le marquage
	-> Si non, met le lien pour marquer la diff comme douteuse
*/
$(function() {
	if($(".diff").length) {
		$(".diff-ntitle").append('<div id="dj-diff-ntitle6"></div>');
		$.get( mw.util.wikiScript( 'api' ), {
			format: 'xml',
			action: 'query',
			titles: DJvars_CheckPage,
			prop: 'revisions',
			rvprop: 'content'
		} ).done( function(r) {
			var comment = "";
			var wikicode = $(r).find('rev').text();
			if(typeof DJparam_sidebarlink !=='undefined') {
				if(DJparam_sidebarlink)
					showSidebarLink(wikicode);
			}
			var oldid = wgRevisionId;
			var pattern = new RegExp("\\* ?\\[\\[Sp(�|e)cial:Diff\\/"+oldid+"\\|[^\\[\\]]+\\]\\]");
			if(pattern.test(wikicode)){
				var lines = wikicode.split('\n');
				for(var i=0; i<lines.length;i++) {
					if(pattern.test(lines[i])) {
						comment = lines[i].match("^\\* ?\\[\\[Sp(?:�|e)cial:Diff\\/"+oldid+"\\|[^\\[\\]]+\\]\\](.*)")[1];
						break;
					}
				}
				$("#dj-diff-ntitle6").html('<img alt="'+DJvars_Texts['flagalt']+'" src="'+DJvars_Texts['flagsrc']+'" height="'+DJvars_Texts['flagheight']+'" title="'+DJvars_Texts['flagtitle']+'"/> '+DJ_parselink(comment)+'<br/><span id="DJlink">[<a href="javascript:DJ_rm_show()">'+DJvars_Texts['askremovelinktext']+'</a>]</span>');
			}
			else
				$("#dj-diff-ntitle6").html('<span id="DJlink">[<a href="javascript:DJ_add_show()">'+DJvars_Texts["askreviewlinktext"]+'</a>]</span>');
		});
	}
	else if(typeof DJparam_sidebarlink !=='undefined') {
		if(DJparam_sidebarlink)
			showSidebarLink(null);
	}
});




/*
==========================================
	Fonctions g�rant l'ajout de diffs � la liste des modifs douteuses
==========================================
*/

/*
	# Fonction execut� lors du clic sur le lien "[Demander une seconde relecture]"
	Affiche � la place du lien une zone de saisie et un bouton, auquel elle ajoute un �v�nement lors du clic
	Cet �v�nement r�cup�re, formatte et transmet les informations de diff et de la zone de saisie � la fonction ''DJ_add_check''
*/
function DJ_add_show() {
	$("#dj-diff-ntitle6").html('<input type="text" id="DJinput" class="mw-ui-input" maxlength="255"/><input type="button" value="Flag!" id="DJbutton" class="mw-ui-button mw-ui-constructive" style="background: #ffb50d; border-color: #ffb50d;"/>');
	$("#DJinput").focus();
	$("#DJbutton").click(function() {
		oldid = wgRevisionId;
		page = wgTitle;
		comment = $("#DJinput").val().substr(0, 255);
		DJ_add_check(oldid, page, comment);
	});
}

/*
	# Fonction execut� apr�s la validation du marquage
	V�rifie si la diff n'a pas �t� marqu� entre temps par quelqu'un d'autre
	-> Si elle n'est pas marqu�, alors on la marque en appelant la fonction ''DJ_add_write''
*/
function DJ_add_check(oldid, page, comment) {
	$.get( mw.util.wikiScript( 'api' ), {
		format: 'xml',
		action: 'query',
		titles: DJvars_CheckPage,
		prop: 'revisions',
		rvprop: 'content'
	} ).done( function(r) {
		var wikicode = $(r).find('rev').text();
		var pattern = new RegExp("\\* ?\\[\\[Sp(e|�)cial:Diff\\/"+oldid+"\\|[^\\[\\]]+\\]\\]");
		if(pattern.test(wikicode))
			mw.notify(DJvars_Texts["notifalreadyasked"]);
		else
			DJ_add_write(oldid, page, comment);
	} );
}

/*
	# Execut� apr�s validation du marquage, et une fois les v�rifications effectu�s
	Ajoute la diff � la liste des diffs � relire
*/
function DJ_add_write(oldid, page, comment) {
	$("#dj-diff-ntitle6").html('<img alt="'+DJvars_Texts["waitalt"]+'" src="'+DJvars_Texts["waitsrc"]+'" title="'+DJvars_Texts["waittitle"]+'"/>');
	editlib_addBottom(DJvars_CheckPage, "\n* [[Special:Diff/"+oldid+"|"+page+" <small>(oldid="+oldid+")</small>]] : "+comment, "[["+DJvars_ScriptPage+"|"+DJvars_Texts["resumescript"]+"]] : "+DJvars_Texts["resumeadd"].split("$1").join(oldid).split("$2").join(page).split("$3").join(comment));
	DJ_add_isFinished(1, 0, comment);
}

/*
	# Execut� une fois la requ�te pour ajouter la diff � la liste envoy�
	Attend et v�rifie que l'ajout c'est bien pass� (ou non)
*/
function DJ_add_isFinished(nbToWait, nbLoop, comment) {
	if(editcount == nbToWait) {
		mw.notify(DJvars_Texts["notifdone"]);
		$("#dj-diff-ntitle6").html('<img alt="'+DJvars_Texts["flagalt"]+'" src="'+DJvars_Texts["flagsrc"]+'" height="'+DJvars_Texts["flagheight"]+'" title="'+DJvars_Texts["flagtitle"]+'"/> '+DJ_parselink(comment));
	}
	else if(nbLoop < DJ_maxTimeout)
		setTimeout(function(){DJ_add_isFinished(nbToWait, nbLoop+1, comment)},1000);
	else {
		$("#dj-diff-ntitle6").html('');
		mw.notify(DJvars_Texts["notiferror"]);
	}
}




/*
==========================================
	Fonctions g�rant le retrait de diffs � la liste des modifs douteuses
==========================================
*/

/*
	# Fonction execut� lors du clic sur le lien "[Retirer le marquage]"
	Affiche � la place du lien une zone de saisie et un bouton, auquel elle ajoute un �v�nement lors du clic
	Cet �v�nement r�cup�re, formatte et transmet les informations de diff et de la zone de saisie � la fonction ''DJ_rm_check''
*/
function DJ_rm_show() {
	$("#DJlink").remove();
	$("#dj-diff-ntitle6").append('<input type="text" id="DJinput" class="mw-ui-input" maxlength="255"/><input type="button" value="Unflag!" id="DJbutton" class="mw-ui-button mw-ui-constructive" style="background: #ffb50d; border-color: #ffb50d;"/>');
	$("#DJinput").focus();
	$("#DJbutton").click(function() {
		oldid = wgRevisionId;
		page = wgTitle;
		comment = $("#DJinput").val().substr(0, 255);
		DJ_rm_check(oldid, page, comment);
	});
}

/*
	# Fonction execut� apr�s avoir r�cup�r� le commentaire de retrait
	V�rifie si la diff n'a pas �t� retir� entre temps par quelqu'un d'autre
	-> Si ce n'est pas le cas, alors on retire la marque en appelant la fonction ''DJ_rm_takeoff''
*/
function DJ_rm_check(oldid, page, comment) {
	$.get( mw.util.wikiScript( 'api' ), {
		format: 'xml',
		action: 'query',
		titles: DJvars_CheckPage,
		prop: 'revisions',
		rvprop: 'content'
	} ).done( function(r) {
		var wikicode = $(r).find('rev').text();
		var pattern = new RegExp("\\* ?\\[\\[Sp(e|�)cial:Diff\\/"+oldid+"\\|[^\\[\\]]+\\]\\]");
		if(!pattern.test(wikicode))
			mw.notify(DJvars_Texts["notifnotasked"]);
		else
			DJ_rm_takeoff(oldid, page, wikicode, comment);
	} );
}

/*
	# Execut� apr�s clic sur retirer le marquage, et une fois les v�rifications effectu�s
	Retire la diff � la liste des diffs � relire
*/
function DJ_rm_takeoff(oldid, page, wikicode, comment) {
	$("#dj-diff-ntitle6").html('<img id="DJwait" alt="'+DJvars_Texts["waitalt"]+'" src="'+DJvars_Texts["waitsrc"]+'" title="'+DJvars_Texts["waittitle"]+'"/>');
	var pattern = new RegExp("\\* ?\\[\\[Sp(e|�)cial:Diff\\/"+oldid+"\\|[^\\[\\]]+\\]\\][^\n]*\n?");
	wikicode = wikicode.replace(pattern, "");
	editlib_replace(DJvars_CheckPage, wikicode, "[["+DJvars_ScriptPage+"|"+DJvars_Texts["resumescript"]+"]] : "+DJvars_Texts["resumerm"].split("$1").join(oldid).split("$2").join(page).split("$3").join(comment));
	DJ_rm_isFinished(1, 0);
}

/*
	# Execut� une fois la requ�te pour retirer la diff de la liste envoy�
	Attend et v�rifie que le retrait c'est bien pass� (ou non)
*/
function DJ_rm_isFinished(nbToWait, nbLoop) {
	if(editcount == nbToWait) {
		mw.notify(DJvars_Texts["notifremoved"]);
		$("#dj-diff-ntitle6").html('');
	}
	else if(nbLoop < DJ_maxTimeout)
		setTimeout(function(){DJ_rm_isFinished(nbToWait, nbLoop+1)},1000);
	else {
		$("#dj-diff-ntitle6").html('');
		mw.notify(DJvars_Texts["notiferror"]);
	}
}




/*
==========================================
	Fonctions annexes
==========================================
*/

/*
	Converti les liens internes �crit avec la syntaxe wikicode contenu dans "chaine" en HTML
*/
function DJ_parselink(chaine) {
	var reg = new RegExp("\\[\\[([^\\[\\]]+)\\|([^\\[\\]]+)\\]\\]");
	do {
		precedent = chaine;
		chaine = chaine.replace(reg, '<a href="'+mw.config.get('wgServer')+mw.config.get('wgArticlePath')+'">$2</a>');
	} while(chaine != precedent);
	reg = new RegExp("\\[\\[([^\\[\\]]+)\\]\\]");
	do {
		precedent = chaine;
		chaine = chaine.replace(reg, '<a href="'+mw.config.get('wgServer')+mw.config.get('wgArticlePath')+'">$1</a>');
	} while(chaine != precedent);
	return chaine;
}
/*
	Echape les meta-caract�re d'une chaine pour que cela ne pose pas de probl�me dans une regex
*/
RegExp.escape = function(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
};