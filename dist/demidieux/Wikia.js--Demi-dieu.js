/*!---------------------------------------------------------------------------------------------------------------!
  ! Ton demi-dieu                                                                                                 !
  ! Code       : http://demidieux.fandom.com/wiki/MediaWiki:Wikia.js/Demi-dieu.js                          !
  ! Descriptif : http://demidieux.fandom.com/wiki/Aide:Créer son demi-dieu
  ! Version    : 4.0                                                                                              !
  ! By         : [[Utilisateur:Parandar]]                                                                         !
  !---------------------------------------------------------------------------------------------------------!*/
  
function ExternalImageLoader() {
    //Image externe à Fandom
    if ($('#tdd-infobox-image #ExternalImageStock a').html() !== undefined) {
        console.log("internal image");
        $('#tdd-infobox-image #ExternalImageStock').html('\
        <img width="250" src="' + $('#tdd-infobox-image #ExternalImageStock a').html() + '"/>');
    }
    //Image interne à Fandom
    else {
        console.log("external image");
        $('#tdd-infobox-image #ExternalImageStock img').attr("width", "250");
    }
}

function DisplayDemigodLinks(Username) {
	//Ajout de l'onglet demi-dieu dans le bandeau
	$ ('#WikiaUserPagesHeader .tabs-container .tabs li[data-id="profile"]').after('<li data-id="demidieu"><a href="/wiki/Utilisateur:' + Username + '/Demi-dieu" title="Demi-dieu">Demi-dieu</a></li>') ;
}

function DisplayUserHeader(Username) {
	//Suppression des liens morts à cause du clonage
	$( '.user-identity-box-edit').remove() ;
	
	//Ajout de l'onglet demi-dieu dans le bandeau
	$ ('#WikiaUserPagesHeader .tabs-container li[data-id="profile"]').after('<li data-id="demidieu"><a href="/wiki/Utilisateur:' + Username + '/Demi-dieu" title="Demi-dieu">Demi-dieu</a></li>') ;
	
	//Sélection de l'onglet Demi-dieu
	$ ('#WikiaUserPagesHeader .tabs-container li[data-id="profile"]').removeClass() ;
	$ ('#WikiaUserPagesHeader .tabs-container li[data-id="demidieu"]').addClass("selected");
	
	//Importation du script css pour le bandeau
	$("head").append("<link rel='stylesheet' href='https://slot1-images.wikia.nocookie.net/__am/1562610326132/sasses/background-dynamic%3Dtrue%26background-image%3Dhttps%253A%252F%252Fvignette3.wikia.nocookie.net%252Fpercy-jackson%252Fimages%252F5%252F50%252FWiki-background%252Frevision%252Flatest%253Fcb%253D20170129074829%2526path-prefix%253Dfr%26background-image-height%3D1615%26background-image-width%3D1700%26color-body%3D%252305021f%26color-body-middle%3D%252305021f%26color-buttons%3D%2523d8971f%26color-community-header%3D%2523d5a339%26color-header%3D%2523d09632%26color-links%3D%2523006cb0%26color-page%3D%2523ffffff%26oasisTypography%3D1%26page-opacity%3D70%26widthType%3D0%26wordmark-font%3Dyanone/skins/oasis/css/oasis.scss,extensions/wikia/UserProfilePageV3/css/UserProfilePage.scss' />") ;
}

var tdd_options_parent = '\
    	<select id="tdd-edit-input-parent">\
    		<optgroup label="Grecs" id="ddformoptgroup1">\
    			<option value="Zeus">Zeus</option>\
    			<option value="Poséidon">Poséidon</option>\
    			<option value="Hadès">Hadès</option>\
    			<option value="Apollon">Apollon</option>\
    			<option value="Héphaïstos">Héphaïstos</option>\
    			<option value="Dionysos">Dionysos</option>\
    			<option value="Hermès">Hermès</option>\
    			<option value="Arès">Arès</option>\
    			<option value="Déméter">Déméter</option>\
    			<option value="Aphrodite">Aphrodite</option>\
    			<option value="Athéna">Athéna</option>\
    		</optgroup>\
    		<optgroup label="Romains" id="ddformoptgroup2">\
    			<option value="Jupiter">Jupiter</option>\
    			<option value="Neptune">Neptune</option>\
    			<option value="Pluton">Pluton</option>\
    			<option value="Apollon">Apollon</option>\
    			<option value="Vulcain">Vulcain</option>\
    			<option value="Bacchus">Bacchus</option>\
    			<option value="Mercure">Mercure</option>\
    			<option value="Mars">Mars</option>\
    			<option value="Cérès">Cérès</option>\
    			<option value="Vénus">Vénus</option>\
    			<option value="Minerve">Minerve</option>\
    		</optgroup>\
    	</select>';

function DemigodEdition() {
    //Affichage des champs
    $('#tdd-infobox-prenom').html('<input type="text" style="display:block;width:242px;" value="'+$('#tdd-infobox-prenom').html()+'" id="tdd-edit-input-prenom" placeholder="Prénom">');
	$('#tdd-infobox-nom').html('<input type="text" style="display:block;width:242px;" value="'+$('#tdd-infobox-nom').html()+'" id="tdd-edit-input-nom" placeholder="Nom">');
	$('#tdd-infobox-image').prepend('<input placeholder="URL de l\'image" onchange="$(\'#tdd-infobox-image img\').attr(\'src\', $(\'#tdd-edit-input-image\').attr(\'value\'))" type="text" style="display:block;width:242px;margin: 0 0 7px 3px;" value="'+ $('#tdd-infobox-image img').attr("src") +'" id="tdd-edit-input-image">');
	$('#tdd-infobox-age').html('<input type="text" style="display:inline-block;width:50px;" value="'+$('#tdd-infobox-age').html()+'" id="tdd-edit-input-age" placeholder="Age">');
	$('#tdd-infobox-cheveux').html('<input type="text" style="width:160px;" value="'+$('#tdd-infobox-cheveux').html()+'" id="tdd-edit-input-cheveux" placeholder="Couleur des cheveux">');
	$('#tdd-infobox-yeux').html('<input type="text" style="width:160px;" value="'+$('#tdd-infobox-yeux').html()+'" id="tdd-edit-input-yeux" placeholder="Couleur des yeux">');
	$('#tdd-infobox-armes').html('<input type="text" style="width:160px;" value="'+$('#tdd-infobox-armes').html()+'" id="tdd-edit-input-armes" placeholder="Armes">');
	$('#tdd-infobox-relations').html('<input type="text" style="width:160px;" value="'+$('#tdd-infobox-relations').html()+'" id="tdd-edit-input-relations" placeholder="Relations">');
	$('#tdd-bio-histoire').html('<textarea rows="10" cols="55" id="tdd-edit-input-histoire" placeholder="Histoire du demi-dieu">' + $('#tdd-bio-histoire').html() + '</textarea>');
	$('#tdd-bio-personnalite').html('<textarea rows="10" cols="55" id="tdd-edit-input-personnalite" placeholder="Personnalité du personnage">' + $('#tdd-bio-personnalite').html() + '</textarea>');
	if($('#tdd-infobox-sexe').html()=='Fils') {
		$('#tdd-infobox-sexe').html('<select id="tdd-edit-input-sexe"><option value="Homme">Fils</option><option value="Femme">Fille</option></select>');
	}else{
		if($('#tdd-infobox-sexe').html()=='Fille') {
			$('#tdd-infobox-sexe').html('<select id="tdd-edit-input-sexe"><option value="Femme">Fille</option><option value="Homme">Fils</option></select>');
		}else
			{$('#tdd-infobox-sexe').html('<select id="tdd-edit-input-sexe"><option value="">...</option><option value="Homme">Fils</option><option value="Femme">Fille</option></select>');
		}
	}
	var tdd_actual_parent = $('#tdd-infobox-parentdivin').html();
	$('#tdd-infobox-parentdivin').html('<select id="tdd-edit-input-parent" onchange="$(\'#tdd-infobox-parentdivin\').html(tdd_options_parent)"><option value="'+ tdd_actual_parent + '">' + tdd_actual_parent + '</option><option>Autre</option></select>');
	
	//Affichage des options d'édition
	$('#tdd-options').html('<a href="#tdd-infobox" onclick="DemigodSubmit()" title="Enregistrer les modifications"><img src="http://image.flaticon.com/icons/svg/127/127914.svg" height="20" width="20" style="background-color:rgba(0,139,227,0.5);"/></a>&nbsp;<a href="#" onclick="location.reload()" title="Abandonner les modifications"><img src="http://image.flaticon.com/icons/svg/127/127799.svg" height=20" width="20" style="background-color:rgba(255, 97, 97, 0.5)"/></a>&nbsp;<a href="?action=delete" title="Supprimer le demi-dieu" ><img src="https://image.flaticon.com/icons/svg/68/68606.svg" height=20" width="20"/></a>&nbsp;<a href="/wiki/Aide:Créer son demi-dieu" title="Aide et informations"><img src="https://image.flaticon.com/icons/svg/131/131917.svg" height=20" width="20"/></a>');
	$('#tdd-options').css('display', 'block');
}

function DemigodCreationPanel() {
    DemigodCreationPanelNodes = '\
        <div id="blackout_DemigodCreationPanel" class="modal-blackout visible" style="z-index:5000200;">\
        	<div id="DemigodCreationPanel" class="modal large ">\
        		<header>\
        			<a href="#" class="close" title="close" onclick="$(\'#blackout_DemigodCreationPanel\').remove()">close</a>\
        				<h3>Création du demi-dieu</h3>\
        		</header>\
        		<section>\
        			<div class="full-width">\
        			    <div style="float:right;" id="tdd-cadre-infobox"></div>\
        			    <div id="tdd-cadre-bio"></div>\
                    </div>\
        		</section>\
        		<footer>\
        		    <span class="wikia-menu-button" style="float:right;height:auto;">\
        		        <a href="#" title="Submit" onclick="DemigodSubmit()">Créer mon demi-dieu</a>\
        		    </span>\
        		</footer>\
        	</div>\
        </div>';
    $('body').append(DemigodCreationPanelNodes);
    $('#tdd-cadre-infobox').load(
        '/wiki/Modèle:Demi-dieu/Modèle #tdd-infobox', 
        function() {
            ExternalImageLoader();
            $('#tdd-cadre-bio').load(
                '/wiki/Modèle:Demi-dieu/Modèle #tdd-bio', 
                function() {
                    DemigodEdition() ;
                    $("#tdd-options").css("display", "none");
                }
            );
        }
    );
}

function DemigodSubmit() {
	$('#tdd-progress-bar').css('display', 'block');
	var dd_prenom        = $('#tdd-edit-input-prenom').attr('value'),
        dd_nom           = $('#tdd-edit-input-nom').attr('value'),
        dd_image         = $('#tdd-edit-input-image').attr('value'),
        dd_age           = $('#tdd-edit-input-age').attr('value'),
        dd_cheveux       = $('#tdd-edit-input-cheveux').attr('value'),
        dd_yeux          = $('#tdd-edit-input-yeux').attr('value'),
        dd_armes         = $('#tdd-edit-input-armes').attr('value'),
        dd_relations     = $('#tdd-edit-input-relations').attr('value'),
        dd_personnalite  = $('#tdd-edit-input-personnalite').attr('value'),
        dd_histoire      = $('#tdd-edit-input-histoire').attr('value'),
        dd_sexe          = $('#tdd-edit-input-sexe').attr('value'),
        dd_parent        = $('#tdd-edit-input-parent').attr('value'),
        dd_auteur        = $('h1[itemprop=name]').html();
 
	$('#tdd-progress-bar span').css('width', '25%');
	var dd_new_template  = '\
		{{Demi-dieu\
		|prénom = ' + dd_prenom + '\
		|nom = ' + dd_nom + '\
		|sexe = ' + dd_sexe + '\
		|parent divin = ' + dd_parent + '\
		|âge = ' + dd_age + '\
		|cheveux = ' + dd_cheveux + '\
		|yeux = ' + dd_yeux + '\
		|armes = ' + dd_armes + '\
		|relations = ' + dd_relations + '\
		|histoire = ' + dd_histoire + '\
		|personnalité = ' + dd_personnalite + '\
		|image = ' + dd_image + '\
		|auteur = ' + dd_auteur + '\
		}}';
	$('#tdd-progress-bar span').css('width', '50%');
	$('#tdd-progress-bar span').css('width', '75%');
 
	var usertoken = mw.user.tokens.get( 'editToken' );
	var token_encode = encodeURIComponent(usertoken);
	var pagename = 'Utilisateur:' + dd_auteur + '/Demi-dieu';
 
	if(token_encode != '%2B%5C') {
		$.ajax({
			url: mw.util.wikiScript( 'api' ),
			data: {
				format: 'json',
				action: 'edit',
				title: pagename,
				summary: 'Demi-dieu : création ou modification',
				text: dd_new_template,
				notminor:true,
				token: usertoken,
			},
			dataType: 'json',
			type: 'POST',
			success: function( data ) {
				if ( data && data.edit && data.edit.result == 'Success' ) {
                    $('#tdd-progress-bar span').css('width', '100%');
					window.location.reload(); // reload page if edit was successful
				} else if (data.error.code == 'articleexists' ) {
                    alert('Le demi-dieu existe déjà');
				} else if ( data && data.error ) {
                    alert('Error: API returned error code "' + data.error.code + '": ' + data.error.info);
				} else {
                     alert('Error: Unknown result from API.');
				}
			},
			error: function( xhr ) {
                alert('Error: Request failed.');
			}
		});
	} else {alert('Vous devez être identifié pour poursuivre la procédure')}
}

//Page demi-dieu : La page existe donc le demi-dieu existe
if ( wgCategories.indexOf("Demi-dieu d\'utilisateur") != -1 && wgNamespaceNumber==2) {
    //Affichage de l'image de l'infobox : 
    ExternalImageLoader();
	//Récupération du nom de l'utilisateur
	UserpageName = wgPageName.substring(wgPageName.indexOf(':')+1, wgPageName.indexOf('/')) ;
	//Suppression de l'ancienne entête ; ajout d'une zone de stockage de l'import
	$( "#PageHeader" ).replaceWith('<div id="PageHeader_Stock"></div>') ;
	//Chargement du bandeau
	$('#PageHeader_Stock').load('/wiki/Utilisateur:' + UserpageName + ' #WikiaUserPagesHeader', function() {DisplayUserHeader(UserpageName)});
	if (UserpageName == wgUserName || wgUserGroups.indexOf('sysop') !== -1 || wgUserGroups.indexOf('rollback') !== -1 || wgUserGroups.indexOf('threadmoderator') !== -1 || wgUserGroups.indexOf('content-moderator') !== -1) {
	    $ ('#WikiaArticle').prepend('<div style="text-align:right;"> <span class="wikia-menu-button" style="display:inline-block; height:auto;"> <a href="#" title="Editer" onclick="DemigodEdition()"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Editer le demi-dieu</a> </span> </div>') ;
    }
}

//Sur les autres pages (Utilisateur, Mur, Contribution, Suivi, Blog)
if ((wgNamespaceNumber == 2 && wgPageName.indexOf("/") == -1) || wgNamespaceNumber == 1200  || wgNamespaceNumber == 500 || wgPageName.substring(wgPageName.indexOf(":")+1) == "Following" || wgPageName.substring(wgPageName.indexOf(":")+1, 	wgPageName.indexOf("/")) == "Contributions") {
    
    //Détection du nom utilisateur
    UserpageName = $(" #UserProfileMasthead h1[itemprop='name'] ").html();
    
    //Vérification de l'existence du demi-dieu et affichage des liens
    $.get( "/wiki/User:"+ UserpageName +"/Demi-dieu")
    	.done(function() {
    	    //Le demi-dieu existe
    		DisplayDemigodLinks(UserpageName);
    	})
    	.fail(function() {
    	    //Si l'utilisateur est le détenteur de la page ou un admin
            if (UserpageName == wgUserName || wgUserGroups.indexOf('sysop') !== -1 || wgUserGroups.indexOf('rollback') !== -1 || wgUserGroups.indexOf('threadmoderator') !== -1 || wgUserGroups.indexOf('content-moderator') !== -1) {
                    $ ('#WikiaUserPagesHeader .tabs-container .tabs li:last-child').after('<li class="wikia-menu-button" style="float:right;height:auto;" data-id="creer_demidieu"><a href="#" title="Demi-dieu" onclick="DemigodCreationPanel()">Créer mon demi-dieu</a></li>') ;
            }
        });

}