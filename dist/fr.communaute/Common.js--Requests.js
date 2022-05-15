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