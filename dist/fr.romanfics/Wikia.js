/*Initialisationd des liens de création*/
function initlinksACCUEIL() {
    $('#unicffbutton').replaceWith( "<div id=\"unicffbutton\" style=\"margin:5px;border:5px double #ACF; padding:5px;width:40%; display:inline-block\" onclick='initform(1)'>" + $( '#unicffbutton' ).html() + "</div>" )
    $('#multiffbutton').replaceWith( "<div id=\"multiffbutton\" style=\"margin:5px;border:5px double #ACF; padding:5px;width:40%; display:inline-block\" onclick='initform(2)'>" + $( '#multiffbutton' ).html() + "</div>" )
}
initlinksACCUEIL();

/*Lien vers Wiki Fanfiction*/
$('#WikiHeader h2.wordmark').after('<a id="toFather_link" style="position: absolute; top: 80px; left: 62px;"href="http://fr.fan-fiction.wikia.com/"><img src="https://vignette.wikia.nocookie.net/wpj-test-code/images/0/08/Logo_Simple.png/revision/latest?cb=20161210182157&path-prefix=fr" height="25"></img></a>')

/*/////////////////////////////////////////////////////////////////////////////
  /// Activation des formulaires pour la création facilitée des fanfictions ///
  /// Auteur : Parandar (http://demidieux.wikia.com/wiki/Mur:Parandar)      ///
  /// Version 2.0                                                           ///
  ///   (1.0 : Création des fonctionnalités)                                ///
  ///   (2.0 : Ajout de l'Editeur WYSIAWYG (ajout de balises facilité)      ///
  /////////////////////////////////////////////////////////////////////////////*/
/*Editor WYSIAWYG : What You See Is Almost What You Get (boutons pour ajouter des balises et prévisualisation du contenu*/
var SaveText, isNewTag;
function insertMetachars(sStartTag, sEndTag) {
    SaveText = document.getElementById('editorWYSIAWYG_textarea').value;
    console.log(SaveText);
    if(isNewTag===undefined) {
        document.getElementById('editorWYSIAWYG_recover').style.pointerEvents = 'auto';
        document.getElementById('editorWYSIAWYG_recover').style.opacity = 1;
    }
    var bDouble = arguments.length > 1, oMsgInput = document.getElementById('editorWYSIAWYG_textarea'), nSelStart = oMsgInput.selectionStart, nSelEnd = oMsgInput.selectionEnd, sOldText = oMsgInput.value;
    oMsgInput.value = sOldText.substring(0, nSelStart) + (bDouble ? sStartTag + sOldText.substring(nSelStart, nSelEnd) + sEndTag : sStartTag) + sOldText.substring(nSelEnd);
    oMsgInput.setSelectionRange(bDouble || nSelStart === nSelEnd ? nSelStart + sStartTag.length : nSelStart, (bDouble ? nSelEnd : nSelStart) + sStartTag.length);
    oMsgInput.focus();
}
function editorWYSIAWYG_preview() {
    document.getElementById('editorWYSIAWYG_area').style.display = 'none';
    document.getElementById('editorWYSIAWYG_display').style.display = 'block';
	var topreview = document.getElementById('editorWYSIAWYG_textarea').value;
	    topreview = topreview.replace(/(?:\r\n|\r|\n)/g, '<br />');
    document.getElementById('editorWYSIAWYG_previewarea').innerHTML = topreview;    
}
function editorWYSIAWYG_recover() {
	document.getElementById('editorWYSIAWYG_textarea').value = SaveText;
}

/*Apparition des formulaires*/
    //target prend la valeur 1 pour les fanfictions en 1 partie
    //target prend la valeur 2 pour les fanfictions à plusieurs parties
    //target prend la valeur 10 pour les chapitres des fanfictions en plusieurs parties
function initform(targeT){
    $('<div id="blurredbackgroundbox"><div id="FormBox" class="modal"><header><a href="#" onclick="$(\'#blurredbackgroundbox\').remove();" class="close" title="close">close</a><h3>Créer une nouvelle fanfiction</h3></header><section id="FormBoxSection"><p style="margin:20px;text-align:center;">...Chargement du formulaire...</p></section></div></div>').prependTo(".mediawiki")

    if(targeT == 1){
	var form_unicform = '<form id="formwikifanfic" class="form" name="unicfanfictionform">\
	<div style="height:300px;overflow:hidden">\
			<div id="divtodisplaynone" style="height:300px">\
				<fieldset>\
					<legend>Informations au sujet de la fanfiction</legend>\
					<table>\
						<tr>\
							<td><label for="titre">Titre</label></td>\
							<td><input id="titre" type="text" name="titre"/></td>\
						</tr>\
						<tr>\
							<td><label for="image">Image</label></td>\
							<td><input id="image" type="text" placeholder="Image.extension" name="image"/></td>\
						</tr>\
						<tr>\
							<td><label for="livre">Livre</label></td>\
							<td><input id="livre" type="text" name="livre"/></td>\
						</tr>\
						<tr>\
							<td><label for="auteur">Auteur</label></td>\
							<td><input id="auteur" type="text" name="auteur"/></td>\
						</tr>\
						<tr>\
							<td><label for="age">Restriction d\'âge</label></td>\
							<td><select id="age" name="age"><option value="">aucune</option><option value="3">3+</option><option value="7">7+</option><option value="10">10+</option><option value="12">12+</option><option value="14+">14+</option><option value="16">16+</option></select></td>\
						</tr>\
					</table>\
				</fieldset>\
			</div>\
			<div style="height:300px">\
				<fieldset id="editorWYSIAWYG_area">\
					<legend>Votre fanfiction : </legend>\
                    <p class="editorWYSIAWYG_options">\
                        <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;strong&gt\',\'&lt;\/strong&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/c/c0/EditorWYSIAWYG_Bold.png/revision/latest?cb=20161126221709&path-prefix=fr" alt="Texte en gras"/></span>\
                        <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;em&gt;\',\'&lt;\/em&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/a/a7/EditorWYSIAWYG_Italic.png/revision/latest?cb=20161126222742&path-prefix=fr" alt="Texte en italic"/></span>\
                        <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;h3&gt;\',\'&lt;\/h3&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/f/f6/EditorWYSIAWYG_Title.png/revision/latest?cb=20161126225350&path-prefix=fr" alt="Titre secondaire"/></span>	\
                        <span class="editorWYSIAWYG" onclick="insertMetachars(\'<hr>\')"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/6/60/EditorWYSIAWYG_Line.png/revision/latest?cb=20161126223144&path-prefix=fr" alt="Insérer une ligne"></span>\
                        <span class="editorWYSIAWYG" onclick="insertMetachars(\'<p class=\\\'dotbreak\\\'>***</p>\')"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/2/22/EditorWYSIAWYG_Dot.png/revision/latest?cb=20161126223721&path-prefix=fr" alt="Insérer une cassure"/></span>\
                        | <span class="editorWYSIAWYG" id="editorWYSIAWYG_recover" onclick="editorWYSIAWYG_recover()"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/7/7b/EditorWYSIAWYG_Cancel.png/revision/latest?cb=20161126224050&path-prefix=fr" alt="Annuler la dernière insertion de balise"/></span>\
                        <span class="editorWYSIAWYG" style="width:auto;" onclick="editorWYSIAWYG_preview()">\
                            <span style="vertical-align: sub; margin: 0 3px;">Prévisualiser</span>\
                        </span>\
                    </p>\
					<textarea id="editorWYSIAWYG_textarea" name="texte" tabindex="1" placeholder="Tapez le texte de votre fanfiction ici... (Nombre de caractère infini)"></textarea>\
				</fieldset>\
				<div id="editorWYSIAWYG_display" style="display:none">\
				    <span class="editorWYSIAWYG" style="float:right;" onclick="document.getElementById(\'editorWYSIAWYG_area\').style.display = \'block\'; document.getElementById(\'editorWYSIAWYG_display\').style.display = \'none\';"><img src="http://fr.fan-fiction.wikia.com/resources/wikia/ui_components/modal/images/close-dark.svg"/></span>\
				    <legend>Prévisualisation</legend>\
				    <div id="editorWYSIAWYG_previewarea"></div>\
				</div>\
			</div>\
		</div>\
		<footer style="text-align:right">&nbsp;<input type="button" value="<" onclick="$(\'#divtodisplaynone\').css(\'display\', \'block\')"/>&nbsp;<input type="button" value=">" onclick="$(\'#divtodisplaynone\').css(\'display\', \'none\')"/>&nbsp;<input type="button" value="Soumettre le formulaire" onclick="unicffprocessing()" /></footer>\
	</form>'
        $('#FormBoxSection').html(form_unicform);
    }
    if(targeT == 2){
        var form_multiform = '<form class="form" id="formwikifanfic" name="multifanfictionform">\
            <div style="height:300px;overflow:hidden">\
                <div id="divtodisplaynone" style="height:300px">\
                    <fieldset>\
                        <legend>Informations au sujet de la fanfiction</legend>\
                        <table>\
                            <tr>\
                                <td><label for="titre">Titre</label></td>\
                                <td><input id="titre" type="text" name="titre"/></td>\
                            </tr>\
                            <tr>\
                                <td><label for="image">Image</label></td>\
                                <td><input id="image" type="text" name="image" placeholder="Image.extension"/></td>\
                            </tr>\
                            <tr>\
                                <td><label for="livre">Livre</label></td>\
                                <td><input id="livre" type="text" name="livre"/></td>\
                            </tr>\
                            <tr>\
                                <td><label for="auteur">Auteur</label></td>\
                                <td><input id="auteur" type="text" name="auteur"/></td>\
                            </tr>\
                            <tr>\
                                <td><label for="age">Restriction d\'âge</label></td>\
                                <td>\
                                    <select id="age" name="age">\
                                        <option value="">aucune</option>\
                                        <option value="3">3+</option><option value="7+">7+</option>\
                                        <option value="10">10+</option>\
                                        <option value="12">12+</option><option value="14+">14+</option>\
                                        <option value="16">16+</option>\
                                    </select>\
                                </td>\
                            </tr>\
                        </table>\
                    </fieldset>\
                </div>\
                <div style="height:300px">\
                    <fieldset id="editorWYSIAWYG_area">\
                        <legend>Résumé : </legend>\
                        <p class="editorWYSIAWYG_options">\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;strong&gt\',\'&lt;\/strong&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/c/c0/EditorWYSIAWYG_Bold.png/revision/latest?cb=20161126221709&path-prefix=fr" alt="Texte en gras"/></span>\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;em&gt;\',\'&lt;\/em&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/a/a7/EditorWYSIAWYG_Italic.png/revision/latest?cb=20161126222742&path-prefix=fr" alt="Texte en italic"/></span>\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;h3&gt;\',\'&lt;\/h3&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/f/f6/EditorWYSIAWYG_Title.png/revision/latest?cb=20161126225350&path-prefix=fr" alt="Titre secondaire"/></span>	\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'<hr>\')"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/6/60/EditorWYSIAWYG_Line.png/revision/latest?cb=20161126223144&path-prefix=fr" alt="Insérer une ligne"></span>\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'<p class=\\\'dotbreak\\\'>***</p>\')"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/2/22/EditorWYSIAWYG_Dot.png/revision/latest?cb=20161126223721&path-prefix=fr" alt="Insérer une cassure"/></span>\
                            | <span class="editorWYSIAWYG" id="editorWYSIAWYG_recover" onclick="editorWYSIAWYG_recover()"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/7/7b/EditorWYSIAWYG_Cancel.png/revision/latest?cb=20161126224050&path-prefix=fr" alt="Annuler la dernière insertion de balise"/></span>\
                            <span class="editorWYSIAWYG" style="width:auto;" onclick="editorWYSIAWYG_preview()">\
                                <span style="vertical-align: sub; margin: 0 3px;">Prévisualiser</span>\
                            </span>\
                        </p>\
                        <textarea id="editorWYSIAWYG_textarea" name="resume" tabindex="1" maxlength="600" placeholder="Ajoutez un résumé de votre fanfiction ici. Ce résumé doit en plus de présenter la trame de votre oeuvre donner aux lecteurs envie de le lire en 600 caractères."></textarea>\
                    </fieldset>\
                    <div id="editorWYSIAWYG_display" style="display:none">\
				        <span class="editorWYSIAWYG" style="float:right;" onclick="document.getElementById(\'editorWYSIAWYG_area\').style.display = \'block\'; document.getElementById(\'editorWYSIAWYG_display\').style.display = \'none\';"><img src="http://fr.fan-fiction.wikia.com/resources/wikia/ui_components/modal/images/close-dark.svg"/></span>\
				        <legend>Prévisualisation</legend>\
				        <div id="editorWYSIAWYG_previewarea"></div>\
				    </div>\
                </div>\
            </div>\
            <footer style="text-align:right">&nbsp;<input type="button" value="<" onclick="$(\'#divtodisplaynone\').css(\'display\', \'block\')"/>&nbsp;<input type="button" value=">" onclick="$(\'#divtodisplaynone\').css(\'display\', \'none\')"/>&nbsp;<input type="button" value="Soumettre le formulaire" onclick="multiffprocessing()" /></footer>\
        </form>'
        $('#FormBoxSection').html(form_multiform);
    }
    if(targeT == 10){
        var form_newchapform = '\
        <form name="newchapterform" class="form" id="formwikifanfic">\
	        <div style="height:300px;overflow:hidden">\
    		    <div id="divtodisplaynone" style="height:300px">\
			        <fieldset>\
		    		    <legend><big>Informations au sujet du nouveau chapitre</big></legend>\
	    			    <table>\
    					    <tr>\
					    	    <td><label for="titre">Titre : </label></td>\
				    		    <td><input type="text" name="titre" id="titre"/></td>\
    			    		</tr>\
	    	    			<tr>\
	        					<td><label>Type : </label></td>\
    		    				<td><input type="radio" name="type" value="Prologue" id="Prologue" /> <label for="Prologue">Prologue</label><br/><input type="radio" name="type" value="Chapitre" id="Chapitre" /> <label for="Chapitre">Chapitre</label><br/><input type="radio" name="type" value="Epilogue" id="Epilogue" /> <label for="Epilogue">Epilogue</label></td>\
			        		</tr>\
		    		    </table>\
    	    		</fieldset>\
        		</div>\
		        <div style="height:300px">\
	    	    	<fieldset id="editorWYSIAWYG_area">\
    			    	<legend>Chapitre : </legend>\
				        <p class="editorWYSIAWYG_options">\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;strong&gt\',\'&lt;\/strong&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/c/c0/EditorWYSIAWYG_Bold.png/revision/latest?cb=20161126221709&path-prefix=fr" alt="Texte en gras"/></span>\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;em&gt;\',\'&lt;\/em&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/a/a7/EditorWYSIAWYG_Italic.png/revision/latest?cb=20161126222742&path-prefix=fr" alt="Texte en italic"/></span>\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'&lt;h3&gt;\',\'&lt;\/h3&gt;\');"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/f/f6/EditorWYSIAWYG_Title.png/revision/latest?cb=20161126225350&path-prefix=fr" alt="Titre secondaire"/></span>	\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'<hr>\')"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/6/60/EditorWYSIAWYG_Line.png/revision/latest?cb=20161126223144&path-prefix=fr" alt="Insérer une ligne"></span>\
                            <span class="editorWYSIAWYG" onclick="insertMetachars(\'<p class=\\\'dotbreak\\\'>***</p>\')"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/2/22/EditorWYSIAWYG_Dot.png/revision/latest?cb=20161126223721&path-prefix=fr" alt="Insérer une cassure"/></span>\
                            | <span class="editorWYSIAWYG" id="editorWYSIAWYG_recover" onclick="editorWYSIAWYG_recover()"><img src="https://vignette.wikia.nocookie.net/fan-fiction/images/7/7b/EditorWYSIAWYG_Cancel.png/revision/latest?cb=20161126224050&path-prefix=fr" alt="Annuler la dernière insertion de balise"/></span>\
                            <span class="editorWYSIAWYG" style="width:auto;" onclick="editorWYSIAWYG_preview()">\
                                <span style="vertical-align: sub; margin: 0 3px;">Prévisualiser</span>\
                            </span>\
                        </p>\
				        <textarea id="editorWYSIAWYG_textarea" name="texte" tabindex="1" maxlength="" placeholder="Inscrivez ici le contenu de votre chapitre"></textarea>\
			        </fieldset>\
                    <div id="editorWYSIAWYG_display" style="display:none">\
				        <span class="editorWYSIAWYG" style="float:right;" onclick="document.getElementById(\'editorWYSIAWYG_area\').style.display = \'block\'; document.getElementById(\'editorWYSIAWYG_display\').style.display = \'none\';"><img src="http://fr.fan-fiction.wikia.com/resources/wikia/ui_components/modal/images/close-dark.svg"/></span>\
				        <legend>Prévisualisation</legend>\
				        <div id="editorWYSIAWYG_previewarea"></div>\
				    </div>\
	        	</div>\
        	</div>\
        	<footer style="text-align:right">&nbsp;<input type="button" value="<" onclick="$(\'#divtodisplaynone\').css(\'display\', \'block\')"/>&nbsp;<input type="button" value=">" onclick="$(\'#divtodisplaynone\').css(\'display\', \'none\')"/>&nbsp;<input type="button" value="Soumettre le formulaire" onclick="newChapter()" /></footer>\
        </form>'
        $('#FormBoxSection').html(form_newchapform);
    }
    else {$('#FormBoxSectionp:not(.editorWYSIAWYG_options)').html('Erreur de chargement du formulaire')}
}

/*Création de la page de la fanfiction.*/
    //Recours à l'API de Mediawiki
    //Voir https://www.mediawiki.org/wiki/API:Edit
function postFanfic(pagename, content, summary) {
	var usertoken = mw.user.tokens.get( 'editToken' );
	var token_encode = encodeURIComponent(usertoken);
	if(token_encode != '%2B%5C') {
		$.ajax({
			url: mw.util.wikiScript( 'api' ),
			data: {
				format: 'json',
				action: 'edit',
				title: pagename,
				summary: summary,
				text: content,
				notminor:true,
				createonly:true,
				token: usertoken,
			},
			dataType: 'json',
			type: 'POST',
			success: function( data ) {
				if ( data && data.edit && data.edit.result == 'Success' ) {
				    $('#FormBoxSection').prepend('<div style="display: block; text-align: center; font-weight: bold; color: #E90000;">Votre fanfiction a bien été créée. Vous allez redirigé vers la page '+ pagename + '. \n Si rien n\'apparaît, vérifiez qu\'aucune fenêtre pop-up n\' a été bloquée par votre navigateur.</div>');
					window.open('/' + pagename, '_self'); // load page if edit was successful
				} else if (data.error.code == 'articleexists' ) {
				    $('#FormBoxSection').prepend('<div style="display: block; text-align: center; font-weight: bold; color: #E90000;">La fanfiction ' + pagename + ' existe déjà. La demande n\' a pu aboutir. Modifiez le titre de votre fanfiction, puis re-soumettez le formulaire</div>')
				} else if ( data && data.error ) {
				    $('#FormBoxSection').prepend('<div style="display: block; text-align: center; font-weight: bold; color: #E90000;">Error: API returned error code "' + data.error.code + '": ' + data.error.info +'</div>' );
				} else {
				    
				    $('#FormBoxSection').prepend('<div style="display: block; text-align: center; font-weight: bold; color: #E90000;">Error: Unknown result from API.</div>' );
				}
			},
			error: function( xhr ) {
			    
				    $('#FormBoxSection').prepend('<div style="display: block; text-align: center; font-weight: bold; color: #E90000;">Error: Request failed.</div>' );
			}
		});
	} else {$('#FormBoxSection').prepend('<div style="display: block; text-align: center; font-weight: bold; color: #E90000;">Vous devez être identifié pour poursuivre la procédure</div>')}
}

/*Traitement du formulaire pour les fanfictions uniques*/
function unicffprocessing() {
    /*Récupération des données*/
    var titre  = document.unicfanfictionform.titre.value; //titre de la fanfiction
    var image  = document.unicfanfictionform.image.value; //image
    var livre  = document.unicfanfictionform.livre.value; //livre d'inspiration
    var auteur = document.unicfanfictionform.auteur.value; //auteur d'inspiration
    var age    = document.unicfanfictionform.age.value; //âge minimum
    var fanfic = document.unicfanfictionform.texte.value; //Texte du textarea
    
    /*Traitement des données*/
    var modelefanfictionunique = '{{Fanfiction/Partie Unique\n|image     = '+ image + '\n |livre     = '+ livre + '\n|titre     = '+ titre + '\n|signature = '+ wgUserName + '\n|auteur    = '+ auteur + '\n|age       = '+ age + '\n}}\n' + fanfic;
    
    /*Envoi des données*/
    postFanfic(livre + ' : ' + titre, modelefanfictionunique, 'Nouvelle Fanfiction');
}

/*Traitement du formulaire pour les fanfictions en plusieurs parties*/
function multiffprocessing() {
    /*Récupération des données*/
    var titre  = document.multifanfictionform.titre.value; //titre de la fanfiction
    var image  = document.multifanfictionform.image.value; //image
    var livre  = document.multifanfictionform.livre.value; //livre d'inspiration
    var auteur = document.multifanfictionform.auteur.value; //auteur d'inspiration
    var age    = document.multifanfictionform.age.value; //âge minimum
    var resume = document.multifanfictionform.resume.value; //Texte du textarea
    
    /*Traitement des données*/
    var modelefanfictionmultiple = '{{Fanfiction/Parties Multiples \n|image     = '+ image + '\n|livre     = '+ livre + '\n|titre     = '+ titre + '\n|signature = '+ wgUserName + '\n|auteur    = '+ auteur + '\n|age       = '+ age + '\n}}\n'+ resume;
    
    /*Envoi des données*/
    postFanfic(livre + ' : ' + titre, modelefanfictionmultiple, 'Nouvelle Fanfiction');
}

/*Affichage des options de création sur les pages de fanfiction à plusieurs chapitres*/
function optionstools() {
	var auteur = $('#fanficauteur').html();
	if(wgUserName == auteur || wgUserName == 'Parandar') {
		$('#optionsauteur').css('display', 'block');
		$('#WikiaPageHeader .wikia-menu-button').css('visibility', 'visible');
		$('#NewChapter').click(function() {initform(10)});
	}
}
optionstools();


/*Traitement du formulaire pour les nouveaux chapitres*/
function newChapter() {
    //Récupération des données
    var livre     = $('#fanficoeuvre').html()
    var titreFf   = $('#fanficnom').html()
    var auteur    = $('#fanficauteur a').html();
    var type      = document.newchapterform.querySelector('input[name="type"]:checked').value;
    var titre     = document.newchapterform.titre.value;
    var texte     = document.newchapterform.texte.value;
    var numero = null ;
    if(type == 'Prologue') {numero = $('.mw-content-text p .Prologuelink').length}
    if(type == 'Chapitre') {numero = $('.mw-content-text p .Chapitrelink').length}
    if(type == 'Epilogue') {numero = $('.mw-content-text p .Epiloguelink').length}
    numero = numero + 1
    
    //Traitement des données
    var modelechapitrefanfiction= '{{Fanfiction/Parties Multiples/Chapitre \n|livre   = '+ livre + '\n|titreFf = '+ titreFf + '\n|auteur  = '+ auteur + '\n|type    = '+ type + '\n|numero  = '+ numero + '\n|titre   = '+ titre + '\n}}\n'+ texte;
        
    //Envoi des données
    postFanfic(livre + ' : ' + titreFf + '/' + type + ' ' + numero, modelechapitrefanfiction, 'Nouveau Chapitre');
    var usertoken = mw.user.tokens.get( 'editToken' );
    if(numero == 1) {
        $.ajax({
            url: mw.util.wikiScript( 'api' ),
            data: {
                format: 'json',
                action: 'edit',
                title: mw.config.get( 'wgPageName' ),
                section: 'new',
                sectiontitle : type,
                minor:true,
                text: '<span class="' + type + 'link">[[{{PAGENAME}}/' + type + ' ' + numero + '|' + type + ' ' + numero + ']]</span>',
                token: usertoken,
            },
            dataType: 'json',
            type: 'POST',
        });
    }else {
        $.ajax({
            url: mw.util.wikiScript( 'api' ),
            data: {
                format: 'json',
                action: 'edit',
                title: mw.config.get( 'wgPageName' ),
                minor:true,
                appendtext: '<span class="' + type + 'link">[[{{PAGENAME}}/' + type + ' ' + numero + '|' + type + ' ' + numero + ']]</span>',
                token: usertoken,
            },
            dataType: 'json',
            type: 'POST',
        });
        
    }
}
/*//////////////////////////////////////////
  /// Fin de la Création des Fanfictions ///
  //////////////////////////////////////////*/

/*#####################################################
  #### Automatisation des requêtes avec Javascript ####
  #####################################################*/

var requestcrossoverform = '\
    <form name="requestcrossoverform">\
        <table>\
			<tr>\
				<td><label for="titre">Titre : </label></td>\
				<td><input type="text" name="titre" id="titre"/></td>\
				<td><span style="font-style:italic">Nom de votre fanfiction</span></td>\
			</tr>\
			<tr>\
				<td><label for="lien">Lien : </label></td>\
				<td><input type="text" name="lien" id="lien"/></td>\
				<td><span style="font-style:italic">URL de votre fanfiction</span></td>\
			</tr>\
			<tr>\
				<td><label for="categories">Catégories : </label></td>\
				<td><input type="text" name="categories" id="c&tegories"/></td>\
				<td><span style="font-style:italic">Oeuvres originales (séparées par une virgule)</span></td>\
			</tr>\
		</table>\
		<input type="button" onClick="requestcrossover()" value="Envoyer la demande" >\
	</form>';

$('#requestcrossover').html(requestcrossoverform);

function requestcrossover() {
    /*Récupération des données du formulaire et de la page*/
    var titre = document.requestcrossoverform.titre.value;
    var lien  = document.requestcrossoverform.lien.value;
    var categories = document.requestcrossoverform.categories.value;
    
    var body = '{{REQUÊTE : Crossover/Modèle|titre=' + titre + '|lien=' + lien + '|categories=' + categories + '}}';
    var parent = $('#Wall .message-main').attr('data-id');
    
    /*Envoi des données*/
    $.nirvana.sendRequest(
	{
	controller: 'WallExternal',
	method:'replyToMessage',
	data:{
		body:body,
		parent:parent,
		pagetitle:wgPageName,
		pagenamespace:1201,
		token:window.mw.user.tokens.get('editToken')
		},
	});
	setTimeout(function(){
   window.location.reload(1);
}, 10000);
}






































/*#################
  #### Accueil ####
  #################*/
/*Slider*/
function Link(target) {
	var choix=document.getElementsByClassName('boite');
	for (i=0;i<choix.length;i++)
		{
		choix[i].style.display="none";
		}
	document.getElementById(target).style.display = 'block';
	};





/*######################################################################################
  ##### Catégorie : apparition des miniatures dans un ordre plus ou moins aléatoire ####
  ######################################################################################*/

$("div div.category-gallery-item").sort(function(){
    return Math.random()*10 > 5 ? 1 : -1;
}).each(function(){
    var $t = $(this),
        color = $t.attr("class");
    $t.css({backgroundColor: color}).appendTo( $t.parent() );
    
});