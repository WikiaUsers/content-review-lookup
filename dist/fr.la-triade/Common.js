/*##################################################################################################
#                                                                                                  #
#                                       AVERTISSEMENT MODIFICATIONS    TEST                        #
#                                                                                                  #
#       @Auteur : Hulothe                                                                          #
#       @Usage : Averti des utilsateurs qui ne modifient que pour gagner des badges                #
#                                                                                                  #
###################################################################################################*/

var ug = wgUserGroups.join(' ');
if (ug.indexOf('helper') + ug.indexOf('sysop') + ug.indexOf('prefetenchef') > -3 && mw.config.get('wgNamespaceNumber') === 1200) {
    $( document ).ready(function() {
                if (wgCanonicalNamespace !== "Mur") {
                   return false;
                }
                $('.WikiaArticle').prepend('<input type="button" value="Avertir pour modifications inutiles" id="modif-badges-avert">');
            var avertissement = '<p>Bonjour ' + $('.UserProfileMasthead .masthead-info h1').text() + ',</p>' +
'<p>Merci pour tes récentes contributions sur le Wiki Harry Potter&nbsp;!</p>' +
'<p>Je dois cependant t\'informer que les modifications ayant pour but de gagner des badges sont interdites sur le wikia, et c\'est apparemment dans cette intention que tu as modifié des pages ou commenté des billets. Ne t\'en fais pas, tu gagneras des badges en modifiant, mais il ne faut pas que ça devienne un prétexte et une source de mauvaises contributions.</p>' +
'<p>Ce n\'est rien de grave, ne t\'inquiète pas, mais je te demande de tenir compte de ces recommandations à l\'avenir. + Si tu as des questions, n\'hésite pas à m\'en faire part&nbsp;!</p>' +
'<p>À bientôt&nbsp;:)</p>'
	    $('#modif-badges-avert').click(function() {
                var succès = "Message posté avec succès !";
	        $.post(mw.util.wikiScript('wikia'), {
                    controller   : 'WallExternal',
                    method       : 'postNewMessage',
                    pagenamespace: '1200',
                    pagetitle    : $('.UserProfileMasthead .masthead-info h1').text(),
                    messagetitle : 'Modifications pour les badges',
                    body         : avertissement + '\n\n~~' + '~',
                    format       : 'json'
                });
                alert(succès);
                window.location.reload();			
        });
    });
}

/* Activité du Wiki - rename edits */
function RwaMore() {
    $('.activity-feed-more').children('a').click();   
}
var numitemsrwa = $(".activityfeed li").length;
if (numitemsrwa < 30) {
    RwaMore();
}


//==============================================================================TESTS==============================================================================//

$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href;
});

//=================================
// Configuration for unified CC form
//===================================
// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: [
        'de',
        'en',
        'es',
        'id',
        'it',
        'ja',
        'nl',
        'pl',
        'pt',
        'pt-br',
        'ru',
        'zh',
        'zh-tw',
        'zh-hk'
    ],
    adoptionConfig: {
        activityDays: 14,
        adminsDays: 60,
        permissionTypes: [
            'sysop',
            'bureaucrat'
        ]
    },
    pageConfig: {
        namespace: 'Demande_adoption',
        namespaceId: 116,
        adoptionsPage: 'Centre_des_communautés:Adoption'
    },
    wikitextSchema: "{{bStart}}Demande adoption\n" +
        "| 0-Statut            = \n" +
        "| 1-Utilisateur       = {{userName}}\n" +
        "| 2-Lien              = {{{wikiURL}}}\n" +
        "| 3-Type              = {{permissionsType}}\n" +
        "| 4-Votre_activité    = {{numDays}}\n" +
        "| 5-Activité_admin    = {{numAdmins}}\n" +
        "| 6-Raisons           = {{comments}}\n" +
        "| 7-Discussion        = {{{communityVote}}}\n" +
    "{{bEnd}}"
};

//Configuration interwiki
window.interwikiInternational = {
        namespace: 'Demande_interwiki',
    	namespaceId: 120,
    	mainPage: 'Centre_des_communautés:Interwiki',
	interwikiSchema: '{{bStart}}LienInterwiki|{{from}}|{{to}}{{bEnd}}',
	pageSchema: '{{bStart}}Demande|interwiki{{bEnd}}\n\n' +
			'{{interwikis}}\n\n' +
			'~~' + '~~',
};

window.botFlagInternational = {
	pageConfig: {
		namespace: 'Demande_bot',
		namespaceId: 122,
		requestsPage: 'Centre_des_communautés:Bot'
	},
	titleSchema: '$1 sur $2',
	wikitextSchema: '{{bStart}}Demande|bot{{bEnd}}\n\n' +
		'{{bStart}}Demande bot\n' +
		'| 0-Statut        = \n' +
		'| 1-Nom_wiki      = {{wikiName}}\n' +
		'| 2-Lien_bot      = {{{botUrl}}}\n' +
		'| 3-Nom_bot       = {{botName}}\n' +
		'| 4-Nom_demandeur = {{requesterName}}\n' +
		'| 5-Discussion    = {{{communityVote}}}\n' +
		'| 6-Raisons       = {{comments}}\n' +
	'{{bEnd}}'
};

importArticles({
    type: "script",
    articles: [ 
       'MediaWiki:Common.js/Requests.js'
    ]
});


//Request filling system using popups by Gguigui1, Hulothe, Wyz, Fubuki風吹 and Celdrøn
// <nowiki>
var jqXHR;

//ajax call for picture upload
function doApiCall(fileToUpload, fileName, ignoreWarnings) {
  var lFileName = fileName;
  
  formdata = new FormData(); //see https://developer.mozilla.org/en-US/docs/Web/Guide/Using_FormData_Objects?redirectlocale=en-US&redirectslug=Web%2FAPI%2FFormData%2FUsing_FormData_Objects
  formdata.append('action', 'upload');
  formdata.append('filename', lFileName);
  formdata.append('token', mw.user.tokens.get( 'editToken' ) );
  formdata.append('file', fileToUpload);
  formdata.append('format', 'json');
  
  if ( ignoreWarnings === true ){
      formdata.append('ignorewarnings', ignoreWarnings);
  }

  //as we now have created the data to send, we send it...
  $.ajax({ //http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
      url: mw.util.wikiScript( 'api' ), //url to api.php 
      contentType: false,
      processData: false,
      type:'POST',
      data: formdata, //the formdata object we created above
      dataType: 'json',
      async: false,
      success: function(data) {
//        console.log(data);
        if (data.upload.result == 'Warning') {
          if (data.upload.warnings.hasOwnProperty('duplicate')) {
             //if file is a duplicate, we use the name of the first existing file
             lFileName = data.upload.warnings.duplicate[0];

             alert('Un doublon a été trouvé, il sera utilisé.');
          } else if (data.upload.warnings.hasOwnProperty('exists')) {
             lFileName  = prompt('Une image porte déjà ce nom, merci d\'en choisir un autre', lFileName);
             if (lFileName !== null) {
                lFileName = doApiCall(fileToUpload, lFileName);
             }
          } else if (data.upload.warnings.hasOwnProperty('was-deleted')       || 
                     data.upload.warnings.hasOwnProperty('duplicate-archive')    ) {
                lFileName = doApiCall(fileToUpload, lFileName, true);
          }
        }
      },
      error: function(xhr,status, error) {
        console.log(error);
     }
  });

  return lFileName;
}
 
//magical function for handling any kind of request
function submit(type) {
  var name;
  var content;
  var message;
  var namespace;
  var url;

  var un = mw.config.get('wgUserName');
 
  switch (type) {
 
  case 'spotlights':
 
    if (!$('#Name').val() || !$('#Link').val() || !$('#Picture').val() ) { 
       alert('Vous devez remplir les champs obligatoires.');
       return false;
    }

    
    if (!$('#Link')[0].checkValidity() && !confirm($('#Link')[0].validationMessage + ".\nConfirmez-vous l'URL saisie ?")) {
        return false;
    }

    //namespace
    namespace = 'Demande_spotlight';

    //picture
    var file = $('#Picture')[0].files[0];
    var fileName = doApiCall(file, file.name);

    //if user cancelled the picture upload we stop
    if (fileName === null) {
      return false;
    }

    //shorten url
    url = shortUrl($('#Link').val());
    
    //content
    content = '{{' + 'Demande' + '}}<br />\n' +
              '<!-- Veuillez saisir votre demande sous cette ligne. Veuillez signer votre demande avec quatre tildes. -->\n' +
              '[[Fichier:' + fileName + '|thumb|Image pour le spotlight|right|250px' + ']]\n' +
              '*Nom d\'utilisateur : ' + '\'\'\'' + un + '\'\'\'\n' +
              '*Nom du wiki : ' + '\'\'\'' + $('#Name').val() + '\'\'\'\n' +
              '*Lien du wiki : ' + '\'\'\'' + '[[w:c:' + url + ']]\n' +
              'Merci d\'avance. ' + '~~' + '~~';
 
    //message
    message = 'Demande de spotlight postée avec succès.'; 
 
    break;
  }
 
  //we send the request
  name = $('#Name').val();
  $.get(mw.util.wikiScript('api'), {
    action: 'query',
    titles: namespace + ':' + name,
    format: 'json'
  }, function(data) {
//    console.log(data.query.pages);
    if (!data.query.pages['-1']) {
      alert('La page demandée existe déjà, merci de changer de nom. Ajoutez « (2) » (ou autre nombre en fonction des demandes existantes) à la fin du nom de votre wiki.');
      return false;
    } else {
      
      $('#startButton').attr('disabled','disabled').addClass( 'ui-state-disabled' );
 
      $.post(mw.util.wikiScript( 'api' ), {
          format: 'json',
          action: 'edit',
          summary: 'Nouvelle demande',
          title: namespace + ':' + name,
          text: content,
          token: mw.user.tokens.get('editToken')
    }, function( data ) {
          alert(message);
          $('#' + type).closeModal();
           window.location.href = wgServer + '/wiki/' + namespace + ':' + encodeURIComponent(name);
	});
     }
  });
}

//Check URL
function isValidURL(url) {
    
  if(jqXHR && jqXHR.readyState != 4)
     jqXHR.abort();
  
  var oValidationImage = $('<img id="ValidImage" alt="Validation image" style="vertical-align: middle; margin-left: 3px;" width="20px">'),
      linkElt = $("#Link"),
      validImage = "https://vignette.wikia.nocookie.net/frwikia/images/a/a1/Icon_Valid.svg/revision/latest?cb=20190324182024",
      errorImage = "https://vignette.wikia.nocookie.net/frwikia/images/e/eb/Icon_Invalid.svg/revision/latest?cb=20190324182231",
      protocol = "";
  
  if($("#ValidImage")[0])
    $("#ValidImage").remove();
  
  if(url === ""){
    linkElt[0].setCustomValidity("");
    return;
  } 
  
  if(!$("#loadingIcon")[0])
    linkElt.after(createLoadingIcon());  


  url = url.replace(/\/wiki\/(.*)/g, '');
  
  if(url.slice(url.length-1) === "/")
    url =  url.slice(0, url.length-1);

  if (!/^https?:\/{2}/g.test(url)) {

    if (/wikia.com/g.test(url))
      protocol = "http://";
    else
      protocol = "https://";

    url = protocol + url;
  }

  if (/\.(wikia|fandom)\.com/i.test(url)) {
    
    //Send a request to ping the URL
    jqXHR = $.ajax({
                url: url + '/api.php',
                data: {
                  action: 'query',
                  meta: 'siteinfo',
                  siprop: 'statistics',
                  format: 'json'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                type: 'GET'
              })
                .always(function(){
                  if($("#loadingIcon")[0])
                    $("#loadingIcon").remove();
                    
                  if ($("#ValidImage")[0])
                    $("#ValidImage").remove();
                })
                .done(function () {
                  linkElt.after(oValidationImage.attr({
                    src: validImage,
                    title: "L'adresse a pu être vérifiée"
                  }));
                  linkElt[0].setCustomValidity("");
                })
                .fail(function () {
                  linkElt.after(oValidationImage.attr({
                    src: errorImage,
                    title: "L'adresse ne semble correspondre à aucun wiki"
                  }));
                  linkElt[0].setCustomValidity("L'URL ne semble correspondre à aucun wiki");
                });
    
    //In case the Request was blocked
    setTimeout(function(){
            
      if(!$("#ValidImage")[0]){
        
        if($("#loadingIcon")[0])
            $("#loadingIcon").remove();
        
        linkElt.after(oValidationImage.attr({
              src: errorImage,
              title: "L'adresse ne semble correspondre à aucun wiki"
            }));
            linkElt[0].setCustomValidity("L'URL ne semble correspondre à aucun wiki");
      }
    }, 500)

   } else {
        
      if($("#loadingIcon")[0])
        $("#loadingIcon").remove();
    
      linkElt.after(oValidationImage.attr({
        src: errorImage,
        title: "L'adresse ne semble correspondre à aucun wiki"
      }));
  }
    
}

//Short url
function shortUrl(url) {
    
    var sUrl = "";
  
    // Delete protocol and not main community url
    url = url.replace(/https?:\/{2}/g, '').replace(/\/wiki\/(.*)/g, '');
  
    //Find parts: community name + language code
    var linkParts = /([\w.-]*)\.(?:wikia|fandom)?(?:\.(?:com|org)\/?)([\w-]{0,})/g.exec(url);
  
    // No parts found, maybe already short form "fr.community"
    if ( !linkParts ) {
      linkParts = /([\w.-]*)/.exec(url)
    }
  
    if ( linkParts[2] ) {
      sUrl = linkParts[2] + ".";
    }
  
    sUrl += linkParts[1];
  
    return sUrl;
}

function getURLPattern() {
    //mw.config.values.wgWikiaBaseDomainRegex = "((wikia\\.(com|org)|fandom\\.com)|(wikia|fandom)-dev\\.(com|us|pl))"
  	var fandomDomains = mw.config.values.wgWikiaBaseDomainRegex || "(wikia\\.(com|org)|fandom\\.com)";
  
    return "^(([^:/?#]+):)?(/{2})?(.*)\\." + fandomDomains + "([^?#]*)(\\?([^#]*))?(#(.*))?";

}

mw.hook('dev.showCustomModal').add(function(showCustomModal) {

	//function to show the form to fill the request
	function modal(title, form, type) {
	  showCustomModal(title, form, {
	    id: type,
	    width: 500,
	    buttons:
	    [{
	        id: 'startButton',
	        message: 'Envoyer',
	        defaultButton: true,
	        handler: function () {
	          submit(type);
	        }
	    },
	    {
	        message: 'Annuler',
	        handler: function() {
	            showCustomModal.closeModal($('#' + type));
	        }
	    }]
	  });
	}
	 
	//setting form to display for each button 
	$('#spotlight').click(function() {
	  if (wgUserName === null) {
	    alert('Vous devez être connecté pour créer une demande de spotlight.');
	    window.location.href = wgServer + '/wiki/Special:UserLogin';
	    return false;
	  }
	 
	  var popup_spotlight =
	    '<form method="" name="" class="WikiaForm">' +
	    '  <fieldset>' +
	    '      <p style="padding:5px; border:1px solid grey;">' +
	    'Pour faire une nouvelle demande, remplissez les champs ci-dessous. Les champs marqués d\'une astérisque (<span style="color:red">*</span>) sont obligatoires.</p><br />' +
	    '     <p><b><span style="color:red">*</span>Nom du wiki&nbsp;:</b></p>' + 
	    '     <input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Ex&nbsp;: Wiki Harry Potter"/>' +
	    '     <p><b><span style="color:red">*</span>Url du wiki&nbsp;:</b></p>' + 
	    '     https://<input type="text" id="Link" style="align:center;height:20px; width:400px" placeholder="Ex&nbsp;: &quot;harrypotter.fandom.com/fr&quot;" oninput="isValidURL(this.value.trim())" ' + 
	    '   title="Saisissez une adresse en fandom.com" pattern="' + getURLPattern() + '" />' +
	    '     <p><b><span style="color:red">*</span>Image pour le spotlight (format 16:9&nbsp;; ex&nbsp;: 640×360px)&nbsp;:</b><br/>' + 
	    '     <span style="font-size: 12px; font-style: italic;">(Veuillez vous assurer que l\'image ne comporte aucun texte)</span></p> <input type="file" style="height:23px; width:400px" id="Picture" onchange="controlPicture()"/>' +
	    '     <p id="message" style="color: red;"></p>' +
	    '  </fieldset>' +
	    '</form>';
	 
	  modal('Demande de spotlight', popup_spotlight, 'spotlights');
	});
});

function controlPicture(){
  
  var file;
  
  if ((file = $('#Picture')[0].files[0])) {
        
      var _URL = window.URL || window.webkitURL;
      img = new Image();
      img.onload = function () {
        
        var refRatio = 16 / 9;
        var ratio = parseInt(this.width, 10) / parseInt(this.height, 10);
        var tolerenceLevel = 10;
        var message = "";
        
        if ( ( ratio >= ( refRatio * ( 1 - tolerenceLevel / 100 ) ) ) && 
             ( ratio <= ( refRatio * ( 1 + tolerenceLevel / 100 ) ) )    ) {
          
          if($._data( $('#startButton')[0], "events" ) === undefined || 
             $._data( $('#startButton')[0], "events" ).click.length === undefined ){
          
              $('#startButton').click( function () {
                                          submit("spotlights");
                                       });
          }
          
          message = "";
        
        } else{
          
          $('#startButton').off("click");
          message = "Le format de l\'image est incorrect.";
        }
        
        $('#message').text(message);
      };
      img.src = _URL.createObjectURL(file);
           
    }
}

function createLoadingIcon() {

  return '<svg id="loadingIcon" style="vertical-align: middle;" width="5%" height="5%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="translate(80,50)">' +
        '<g transform="rotate(0)">' +
        '<circle cx="0" cy="0" r="10" fill="#0055a5" fill-opacity="1">' +
        '<animateTransform attributeName="transform" type="scale" begin="-0.875s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>' +
        '<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>' +
        '</circle>' +
        '</g>' +
        '</g><g transform="translate(71.21320343559643,71.21320343559643)">' +
        '<g transform="rotate(45)">' +
        '<circle cx="0" cy="0" r="10" fill="#0055a5" fill-opacity="0.875">' +
        '<animateTransform attributeName="transform" type="scale" begin="-0.75s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>' +
        '<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>' +
        '</circle>' +
        '</g>' +
        '</g><g transform="translate(50,80)">' +
        '<g transform="rotate(90)">' +
        '<circle cx="0" cy="0" r="10" fill="#0055a5" fill-opacity="0.75">' +
        '<animateTransform attributeName="transform" type="scale" begin="-0.625s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>' +
        '<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>' +
        '</circle>' +
        '</g>' +
        '</g><g transform="translate(28.786796564403577,71.21320343559643)">' +
        '<g transform="rotate(135)">' +
        '<circle cx="0" cy="0" r="10" fill="#0055a5" fill-opacity="0.625">' +
        '<animateTransform attributeName="transform" type="scale" begin="-0.5s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>' +
        '<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>' +
        '</circle>' +
        '</g>' +
        '</g><g transform="translate(20,50.00000000000001)">' +
        '<g transform="rotate(180)">' +
        '<circle cx="0" cy="0" r="10" fill="#0055a5" fill-opacity="0.5">' +
        '<animateTransform attributeName="transform" type="scale" begin="-0.375s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>' +
        '<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.375s"></animate>' +
        '</circle>' +
        '</g>' +
        '</g><g transform="translate(28.78679656440357,28.786796564403577)">' +
        '<g transform="rotate(225)">' +
        '<circle cx="0" cy="0" r="10" fill="#0055a5" fill-opacity="0.375">' +
        '<animateTransform attributeName="transform" type="scale" begin="-0.25s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>' +
        '<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.25s"></animate>' +
        '</circle>' +
        '</g>' +
        '</g><g transform="translate(49.99999999999999,20)">' +
        '<g transform="rotate(270)">' +
        '<circle cx="0" cy="0" r="10" fill="#0055a5" fill-opacity="0.25">' +
        '<animateTransform attributeName="transform" type="scale" begin="-0.125s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>' +
        '<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.125s"></animate>' +
        '</circle>' +
        '</g>' +
        '</g><g transform="translate(71.21320343559643,28.78679656440357)">' +
        '<g transform="rotate(315)">' +
        '<circle cx="0" cy="0" r="10" fill="#0055a5" fill-opacity="0.125">' +
        '<animateTransform attributeName="transform" type="scale" begin="0s" values="1.1 1.1;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>' +
        '<animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>' +
        '</circle>' +
        '</g>' +
        '</g></svg>';
}

// </nowiki>

/*** HYDRAREVIVED ***/

/*$(function() {
	var config = mw.config.get([
			'skin',
			/*'wgRailModuleParams',*/
/*			'wgSiteName',
			'wgUserLanguage',
			'wgWikiaBarSkinData',
			'wgArticlePath'
		]);
    
	if (window.HydraRevivedReady || config.skin !== 'fandomdesktop') return;
	window.HydraRevivedReady = true;
	
	function msg(key, params) {
		return new Promise(function(resolve) {
			if (mw.message(key, params).exists()) {
				resolve(mw.message(key, params).text());
			} else {
				var name = key + '__' + config.wgUserLanguage;
				var val = $.cookie(name);
				if (val) {
					mw.messages.set({key: val});
					resolve(val);
				} else {
					mw.loader.using('mediawiki.api').done(function() {
						new mw.Api().loadMessagesIfMissing([key]).done(function() {
							var msg = mw.message(key, params);
							if (msg.exists()) $.cookie(name, msg.text(), { 
								expires: 7, 
								domain: 'fandom.com', 
								path: '/'
							});
							resolve(msg.text());
						});
					});
				}
			}
		});
	}
	
    /* Append body class */
    $('body').addClass('hydra-revived-ready');

    /* Add fancy tooltips for wiki tools */
    $('.fandom-community-header .wiki-tools .wds-button').each(function(index, element) {
        var $element = $(element);
        $element.attr('data-title', $element.attr('title'));
        $element.removeAttr('title');
    });

    /* Add page head */
/*	var $head = $('<div class="page__head">'),
        $left = $('<div class="page-tabs__left">').appendTo($head),
        $right = $('<div class="page-tabs__right page-header__actions" id="p-views">').appendTo($head),
        $more = $('<div class="wds-dropdown more-actions">' + 
					'<div class="wds-dropdown__toggle"><span class="head-tab">More</span></div>' + 
					'<div class="wds-dropdown__content wds-is-not-scrollable"><ul class="wds-list wds-is-linked" id="p-cactions"></ul></div>' +
				'</div>'),
		$moreList = $more.find('.wds-list');
		
	msg('fd-community-header-more').then(function(text) {
		$more.find('.wds-dropdown__toggle span').text(text);
	});

	var actions = config.wgWikiaBarSkinData.contentActions,
		$views = $('#p-views');
		$cactions = $('#p-cactions');
		
	if (actions) {
		$.each(actions, function(key, action) {
			var $tab = $cactions.find('#' + action.id).removeClass().addClass(action.class);
			
			if (!$tab.length) {
				if (key == 'share') {
					$tab = $('<div class="wds-dropdown" id="ca-share">' + 
							'<div class="wds-dropdown__toggle"><span class="head-tab">Share</span></div>' + 
							'<div class="wds-dropdown__content wds-is-not-scrollable">' + action.html + '</div>' +
						'</div>');
						
					msg('sharing').then(function(text) {
						$tab.find('.wds-dropdown__toggle span').text(text);
					});
				} else {
					$tab = $('<a>', {
						class: action.class,
						id: action.id,
						accesskey: action.accesskey,
						href: action.href,
						text: action.text
					});
				}
			}
			
			if (key.indexOf('nstab') > -1 || key === 'talk' || key === 'share') {
				if (!$tab.hasClass('wds-dropdown')) $tab.addClass('head-tab');
				$tab.appendTo($left);
			} else if (action.primary || key === 'history') {
				if (!$tab.hasClass('wds-dropdown')) $tab.addClass('head-tab');
				$tab.addClass('head-tab').appendTo($right);
			} else {
				$('<li>').append($tab).appendTo($moreList);
			}
		});
	}
	
	/* Append remaining items from more dropdown */
	$cactions.find('.wds-list > li:not(:empty)').appendTo($moreList);
	
	/* Append more dropdown */
	if ($moreList.children().length) {
		$more.appendTo($right);
	}
	
	/* Remove old action area */
	$views.remove();

    /** Search **/
    var $form = $('<form>', {
            action: config.wgArticlePath.replace('$1', 'Special:Search'),
            id: 'searchform'
        }),
        $bar = $('<div>', {
            id: 'simpleSearch',
            append: [
                $('<input>', {
                    type: 'hidden',
                    value: 'Special:Search',
                    name: 'title'
                }),
                $('<input>', {
                    type: 'submit',
                    name: 'go',
                    value: 'Rechercher',
                    title: 'Rechercher',
                    id: 'searchButton',
                    class: 'searchButton'
                })
            ],
            appendTo: $form
        }),
        $box = $('<input>', {
            type: 'search',
            name: 'search',
            placeholder: 'Rechercher sur ' + config.wgSiteName,
            title: 'Rechercher sur ' + config.wgSiteName,
            id: 'searchInput',
            tabindex: '1',
            prependTo: $bar
        }).attr('autocomplete', 'off');

    $right.append($form);
    $('.resizable-container .page').prepend($head);

    /* Enable autocomplete */
    mw.loader.using('mediawiki.searchSuggest');
});

// Variable pour PreloadTemplates
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
 
// Variables pour Standard Edit Summary
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
}; 
 
// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Standard Edit Summary/code.js',
        'u:dev:Mediawiki:PreloadTemplates.js',
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

/* subtitle */
// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
 
// add the original english title as a subtitle.
  showEnTitle();

function showEnTitle()
{
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv == null || enTitleDiv == undefined)
    return;
 
  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;
 
  //check if the header exists
  var header = document.getElementById('firstHeading');  
  if(header == null || header == undefined)
    return;
 
  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}

  
// Copied from http://starwars.wikia.com/wiki/MediaWiki:Wikia.js
$( function eraIconsOasis() {
    if ( $( '#title-eraicons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#title-eraicons' ).show() );
    	}
    }
} );

/**
 * Show/hide for media timeline -- Grunny
 **/
$( function () {
	if( !$( '.timeline-toggles' ).length ) {
		return;
	}
	$( '.timeline-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle();
		if ( $( this ).text().indexOf( 'cacher' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'cacher', 'afficher' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'afficher', 'cacher' ) );
		}
	} );
} );

/* Stuff for add HideButton/Hide stuff */

$(function() {
	window.pageName = mw.config.get('wgPageName');
    window.storagePresent = (typeof(localStorage) != 'undefined');

    addHideButtons();
    
    if( window.storagePresent ) {
		initVisibility();
	}
});

/* @author Grunny */
function addHideButtons() {
    var hidables = document.querySelectorAll('.hidable');

    if (hidables !== null){
    	for( var i = 0; i < hidables.length; i++ ) {
    		var box = hidables[i];
    		var button = box.querySelector('span.hidable-button');
     
    		if( button !== null ) {
    			button.onclick = toggleHidable;
    			button.appendChild( document.createTextNode('[masquer]') );
    
                var regex = new RegExp("(^|\\s)" + 'start-hidden' + "(\\s|$)")
    			if( isMatch(regex ,'start-hidden', box) )
    				button.onclick('bypass');
    		}
    	}
    }
}
 
/* @author Grunny */
function toggleHidable(bypassStorage) {
	var parent = this.closest('.hidable');
	
	var content = parent.querySelectorAll('.hidable-content');
	var nowShown;
 
	if( content !== null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[masquer]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[afficher]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = document.querySelectorAll('.hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
    var hidables = document.querySelector('.hidable');

    if (hidables !== null){
        for(var i = 0; i < hidables.length; i++) {
            var box = hidables[i];
    		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
    		
    		var content = box.querySelector('.hidable-content');
    		var button = box.querySelector('.hidable-button');
    
    		if( show == 'false' ) {
    			if( content !== null &&	button !== null && content[0].style.display != 'none' )	{
    				button[0].onclick('bypass');
    			}
    		} else if( show == 'true' ) {
    			if( content !== null && button !== null && content[0].style.display == 'none' )	{
    				button[0].onclick('bypass');
    			}
    		}
    	}
    }
}

function isMatch(regex, className, element) {
	return regex.test(element.className);
}
 

/* Actualisation automatique - [[w:c:dev:AjaxRC]] */
/*window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */


// Variable pour PreloadTemplates
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
 
// Variables pour Standard Edit Summary
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
}; 
 
// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Standard Edit Summary/code.js',
        'u:dev:Mediawiki:PreloadTemplates.js',
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

/* subtitle */
// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
 
// add the original english title as a subtitle.
  showEnTitle();

function showEnTitle()
{
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv == null || enTitleDiv == undefined)
    return;
 
  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;
 
  //check if the header exists
  var header = document.getElementById('firstHeading');  
  if(header == null || header == undefined)
    return;
 
  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}

  
// Copied from http://starwars.wikia.com/wiki/MediaWiki:Wikia.js
$( function eraIconsOasis() {
    if ( $( '#title-eraicons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#title-eraicons' ).show() );
    	}
    }
} );

/**
 * Show/hide for media timeline -- Grunny
 **/
$( function () {
	if( !$( '.timeline-toggles' ).length ) {
		return;
	}
	$( '.timeline-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle();
		if ( $( this ).text().indexOf( 'cacher' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'cacher', 'afficher' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'afficher', 'cacher' ) );
		}
	} );
} );

/* Stuff for add HideButton/Hide stuff */

$(function() {
	window.pageName = mw.config.get('wgPageName');
    window.storagePresent = (typeof(localStorage) != 'undefined');

    addHideButtons();
    
    if( window.storagePresent ) {
		initVisibility();
	}
});

/* @author Grunny */
function addHideButtons() {
    var hidables = document.querySelectorAll('.hidable');

    if (hidables !== null){
    	for( var i = 0; i < hidables.length; i++ ) {
    		var box = hidables[i];
    		var button = box.querySelector('span.hidable-button');
     
    		if( button !== null ) {
    			button.onclick = toggleHidable;
    			button.appendChild( document.createTextNode('[masquer]') );
    
                var regex = new RegExp("(^|\\s)" + 'start-hidden' + "(\\s|$)")
    			if( isMatch(regex ,'start-hidden', box) )
    				button.onclick('bypass');
    		}
    	}
    }
}
 
/* @author Grunny */
function toggleHidable(bypassStorage) {
	var parent = this.closest('.hidable');
	
	var content = parent.querySelectorAll('.hidable-content');
	var nowShown;
 
	if( content !== null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[masquer]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[afficher]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = document.querySelectorAll('.hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}

function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
    var hidables = document.querySelector('.hidable');

    if (hidables !== null){
        for(var i = 0; i < hidables.length; i++) {
            var box = hidables[i];
    		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
    		
    		var content = box.querySelector('.hidable-content');
    		var button = box.querySelector('.hidable-button');
    
    		if( show == 'false' ) {
    			if( content !== null &&	button !== null && content[0].style.display != 'none' )	{
    				button[0].onclick('bypass');
    			}
    		} else if( show == 'true' ) {
    			if( content !== null && button !== null && content[0].style.display == 'none' )	{
    				button[0].onclick('bypass');
    			}
    		}
    	}
    }
}

function isMatch(regex, className, element) {
	return regex.test(element.className);
}
 

/* Actualisation automatique - [[w:c:dev:AjaxRC]] */
/*window.AjaxRCRefreshText = 'Actualisation automatique';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying [[Template:USERNAME]]. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */


/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */


/* Stuff for add HideButton/Hide stuff */

$(function() {
	window.pageName = mw.config.get('wgPageName');
    window.storagePresent = (typeof(localStorage) != 'undefined');

    addHideButtons();
    
    if( window.storagePresent ) {
		initVisibility();
	}
});

/***** Customisation *****/
/*** AddRailModule (Dev Wiki) ***/
window.AddRailModule = [{prepend: true}];

/*** Modification de la page d'import de fichier ***/
$(function() {
	if (mw.config.get('wgPageName') != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("{{Fichier\r\n|description=\r\n|licence=\r\n|source=\r\n|autre=}}");
	$('.mw-htmlform-field-HTMLTextAreaField .mw-input').append('<img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png" alt="Tèxte en gras" title="Tèxte en gras" id="button-bold" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png" alt="Tèxte en italica" title="Tèxte en italica" id="button-italic" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Button_link.png" alt="Ligam intèrne" title="Ligam intèrne" id="button-link" style="width: 23px; height: 22px;">');
	$('#button-italic').click(function() {
		richEditor("\'\'", "\'\'");
	});
	$('#button-bold').click(function() {
		richEditor("\'\'\'", "\'\'\'");
	});
	$('#button-link').click(function() {
		richEditor("[[", "]]");
	});

	function richEditor(primier, segond) {
		var textarea = document.getElementById("wpUploadDescription");
		if ('selectionStart' in textarea) {
			if (textarea.selectionStart != textarea.selectionEnd) {
				var newText = textarea.value.substring (0, textarea.selectionStart) + 
								primier + textarea.value.substring  (textarea.selectionStart, textarea.selectionEnd) + segond +
								textarea.value.substring (textarea.selectionEnd);
				textarea.value = newText;
			}
		}
		else {
			var textRange = document.selection.createRange ();
			var rangeParent = textRange.parentElement ();
			if (rangeParent === textarea) {
				textRange.text = primier + textRange.text + segond;
			}
		}
	}
});

/*** Forcer le favicon à s'afficher lors de bugs ***/

(function () {
 // Remettre le favicon s'il n'est pas chargé
 var headTitle = document.querySelector('head'), 
  favIcons = [{ rel: 'apple-touch-icon' }, { rel: 'apple-touch-startup-image' }, { rel: 'shortcut icon' }];
 favIcons.forEach(function (favIcon) {
    var setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel', favIcon.rel);
    setFavicon.setAttribute('href', 'https://static.wikia.nocookie.net/gardiens-des-cites-perdue/images/6/64/Favicon.ico/revision/latest?cb=20201126084739&path-prefix=fr');
    headTitle.appendChild(setFavicon);
 });
 //headTitle.appendChild(setFavicon);
})();

/***** Modèles *****/

/*** USERNAME ***/
 
function substUsername() {
        $('.insertusername').text('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + mw.config.get('wgUserName') + '</a>');
        $('.insertusername:hover').css('text-decoration', 'none');
}
 
 function substUsernameTOC() {
        var toc = document.getElementById('toc');
        var userpage = document.getElementById('pt-userpage');
 
        if( !userpage || !toc )
                return;
 
        var username = userpage.firstChild.firstChild.nodeValue;
        var elements = getElementsByClass('toctext', toc, 'span');
 
        for( var i = 0; i < elements.length; i++ )
                elements[i].firstChild.nodeValue = elements  [i].firstChild.nodeValue.replace('<insert name here>', username);
}
$(function() { $('.insertusername').text(mw.config.get('wgUserName'))});

/*** Slider ***/

mw.loader.using(["jquery.cookie"]);

mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");

  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });

  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});

// Retrait des [GDCP] dans les sommaires

$(function () {
  /**
   * @type {HTMLElement}
   */
  var LISTE = document.getElementById('toc');
  var content = String(LISTE.innerHTML);
  content = content
    .replace(
      /(?:<sup>)?\[(?:(?:GDCP\d)|(?:GDCP8\.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))[^\]]*\]?(?:<\/sup>)?/g,
      ''
    )
    .replace(
      /\[(?:(?:GDCP\d)|(?:GDCP8.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))\]/g,
      ''
    );
  document.getElementById('toc').innerHTML = content;
});
/*** Module de progression ***/
setTimeout(function () {
  document.querySelectorAll('.progressmodifs').forEach(function (item) {
    var modifs = parseInt(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', '')),
      palier;
      console.log(item.textContent.replace(' ', '').replace('\n', '').replace(' ', '').replace('&nbsp;', ''));
    if (modifs < 20) {
      palier = 20;
    } else if (modifs < 50) {
      palier = 50;
    } else if (modifs < 100) {
      palier = 100;
    } else if (modifs < 200) {
      palier = 200;
    } else if (modifs < 350) {
      palier = 350;
    } else if (modifs < 500) {
      palier = 500;
    } else if (modifs < 750) {
      palier = 750;
    } else if (modifs < 1000) {
      palier = 1000;
    } else if (modifs < 1500) {
      palier = 1500;
    } else if (modifs < 2000) {
      palier = 2000;
    } else if (modifs < 2500) {
      palier = 2500;
    } else if (modifs < 3000) {
      palier = 3000;
    } else if (modifs < 4000) {
      palier = 4000;
    } else {
      palier = 10000;
    }
    var calc = (modifs / palier) * 100,
      color;
    if (calc <= 25) {
      color = 'red';
    } else if (calc <= 50) {
      color = 'orange';
    } else if (calc <= 75) {
      color = 'yellow';
    } else {
      color = 'green';
    }
    item.innerHTML =
      '<center>' +
      Math.round(calc) +
      '% de ' +
      palier +
      '</center>\n<center><div style="width: 75%; height: 20px; background-image: linear-gradient(to right, ' +
      color +
      ' ' +
      calc +
      '%, #FFF 0%); border: 3px solid #3A3A3A"></div></center>';
  });
}, 5000);

// empêcher les balises existantes d'être masquées
(window.dev = window.dev [[:Template:!!]] {}).profileTags = { noHideTags: true };


$(function() {
	var config = mw.config.get([
			'skin',
			'wgRailModuleParams',
			'wgSiteName',
			'wgUserLanguage',
			'wgWikiaBarSkinData',
			'wgArticlePath'
		]);
    
	if (window.HydraRevivedReady || config.skin !== 'fandomdesktop') return;
	window.HydraRevivedReady = true;
	
	function msg(key, params) {
		return new Promise(function(resolve) {
			if (mw.message(key, params).exists()) {
				resolve(mw.message(key, params).text());
			} else {
				var name = key + '__' + config.wgUserLanguage;
				var val = $.cookie(name);
				if (val) {
					mw.messages.set({key: val});
					resolve(val);
				} else {
					mw.loader.using('mediawiki.api').done(function() {
						new mw.Api().loadMessagesIfMissing([key]).done(function() {
							var msg = mw.message(key, params);
							if (msg.exists()) $.cookie(name, msg.text(), { 
								expires: 7, 
								domain: 'fandom.com', 
								path: '/'
							});
							resolve(msg.text());
						});
					});
				}
			}
		});
	}
	
    /* Append body class */
    $('body').addClass('hydra-revived-ready');

    /* Add fancy tooltips for wiki tools */
    $('.fandom-community-header .wiki-tools .wds-button').each(function(index, element) {
        var $element = $(element);
        $element.attr('data-title', $element.attr('title'));
        $element.removeAttr('title');
    });

    /* Add page head */
	var $head = $('<div class="page__head">'),
        $left = $('<div class="page-tabs__left">').appendTo($head),
        $right = $('<div class="page-tabs__right page-header__actions" id="p-views">').appendTo($head),
        $more = $('<div class="wds-dropdown more-actions">' + 
					'<div class="wds-dropdown__toggle"><span class="head-tab">More</span></div>' + 
					'<div class="wds-dropdown__content wds-is-not-scrollable"><ul class="wds-list wds-is-linked" id="p-cactions"></ul></div>' +
				'</div>'),
		$moreList = $more.find('.wds-list');
		
	msg('fd-community-header-more').then(function(text) {
		$more.find('.wds-dropdown__toggle span').text(text);
	});

	var actions = config.wgWikiaBarSkinData.contentActions,
		$views = $('#p-views');
		$cactions = $('#p-cactions');
		
	if (actions) {
		$.each(actions, function(key, action) {
			var $tab = $cactions.find('#' + action.id).removeClass().addClass(action.class);
			
			if (!$tab.length) {
				if (key == 'share') {
					$tab = $('<div class="wds-dropdown" id="ca-share">' + 
							'<div class="wds-dropdown__toggle"><span class="head-tab">Share</span></div>' + 
							'<div class="wds-dropdown__content wds-is-not-scrollable">' + action.html + '</div>' +
						'</div>');
						
					msg('sharing').then(function(text) {
						$tab.find('.wds-dropdown__toggle span').text(text);
					});
				} else {
					$tab = $('<a>', {
						class: action.class,
						id: action.id,
						accesskey: action.accesskey,
						href: action.href,
						text: action.text
					});
				}
			}
			
			if (key.indexOf('nstab') > -1 || key === 'talk' || key === 'share') {
				if (!$tab.hasClass('wds-dropdown')) $tab.addClass('head-tab');
				$tab.appendTo($left);
			} else if (action.primary || key === 'history') {
				if (!$tab.hasClass('wds-dropdown')) $tab.addClass('head-tab');
				$tab.addClass('head-tab').appendTo($right);
			} else {
				$('<li>').append($tab).appendTo($moreList);
			}
		});
	}
	
	/* Append remaining items from more dropdown */
	$cactions.find('.wds-list > li:not(:empty)').appendTo($moreList);
	
	/* Append more dropdown */
	if ($moreList.children().length) {
		$more.appendTo($right);
	}
	
	/* Remove old action area */
	$views.remove();

    /** Search **/
    var $form = $('<form>', {
            action: config.wgArticlePath.replace('$1', 'Special:Search'),
            id: 'searchform'
        }),
        $bar = $('<div>', {
            id: 'simpleSearch',
            append: [
                $('<input>', {
                    type: 'hidden',
                    value: 'Special:Search',
                    name: 'title'
                }),
                $('<input>', {
                    type: 'submit',
                    name: 'go',
                    value: 'Rechercher',
                    title: 'Rechercher',
                    id: 'searchButton',
                    class: 'searchButton'
                })
            ],
            appendTo: $form
        }),
        $box = $('<input>', {
            type: 'search',
            name: 'search',
            placeholder: 'Rechercher sur ' + config.wgSiteName,
            title: 'Rechercher sur ' + config.wgSiteName,
            id: 'searchInput',
            tabindex: '1',
            prependTo: $bar
        }).attr('autocomplete', 'off');

    $right.append($form);
    $('.resizable-container .page').prepend($head);

    /* Enable autocomplete */
    mw.loader.using('mediawiki.searchSuggest');
});