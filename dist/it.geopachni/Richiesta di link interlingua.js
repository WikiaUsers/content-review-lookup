// codes from FR CC
// Request filling system using popups by Gguigui1, Hulothe, Wyz, Fubuki風吹 and Celdrøn - slightly changed by KuroUrufu to fit international
// <nowiki>

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:ShowCustomModal.js'
});

// Export global configuration
		window.interwikiInternational = (window.interwikiInternational || {});

		// Configuration for adopts mainpage and namespace
		window.interwikiInternational.pageConfig = (window.interwikiInternational.pageConfig || {
			namespace: 'Interwiki_request',
			namespaceId: 119,
		});

// I18n for international form
		window.interwikiInternational.i18n = (window.interwikiInternational.i18n || {
			interwikiFillRequiredFields: 'You must fill in the required fields.',
			interwikiChosenNamespace: 'Interwiki_request',
			interwikiTemplateName: 'Interwiki_request',
			interwikiIncorrectlyFilled: 'The list of interwiki links seems to have been incorrectly filled in. Please correct your entry.',
			interwikiSuccessfullyPosted: 'Request for interwiki links successfully posted.',
			interwikiAlreadyExists: 'The requested page already exists, please change the name. For example, add a number like "(2)" to the end of the wiki name.',
			interwikiSummaryText: 'New request',
			interwikiUnloggedAlert: 'You must be logged in to create an interwiki link request.',
			interwikiMessage1: 'To make a new request, fill in the fields below. Fields marked with an asterisk (<span style="color:red">*</span>) are mandatory.',
			interwikiMessage2: 'For example, to link <b>onepiece.fandom.com/it</b> and <b>onepiece.fandom.com</b>, fill in the text box "Interwiki links" with:<br><code>onepiece.fandom.com/it -> onepiece.fandom.com</code>.',
			interwikiMessage3: 'To make several requests simultaneously, write one request per line. For example, to link <b>onepiece.fandom.com/it</b> to <b>onepiece.fandom.com</b> and <b>onepiece.fandom.com/fr</b>, write: <br><code>onepiece.fandom.com/it -> onepiece.fandom.com</code><br><code>onepiece.fandom.com/it -> onepiece.fandom.com/fr</code>',
			interwikiMessage4: 'This will generate a link easy to use by any <a title="Staff" class="extiw" href="https://community.fandom.com/wiki/Staff">staff member</a> or <a title="IWR" href="/wiki/Help:IWR">IWR member</a> which will create the link between the two wikis very quickly.',
			wikiName: 'Wiki name',
			interwikiLinks: 'Interwiki links',
			interwikiDescription: 'Description / Comments',
			requestInterwiki: 'Request interwiki links',
			interwikis: 'interwikis',
			interwikiCommentEx: 'Ex: Thanks in advance!',
			interwikiSend: 'Send',
			interwikiCancel: 'Cancel',
		});

var interlanguageRequest;

// function for handling interwiki links requests
function submit(type) {
  var name;
  var content;
  var message;
  var namespace;
  var url;
  var un = mw.config.get('wgUserName');
 


	if(!$('#Name').val() || !$('#Names').val()) {
		// Alert user to fill needed inputs.
		alert(interwikiFillRequiredFields);
		return false;
	}
 
	//namespace     
	namespace = interwikiChosenNamespace;
 
	//content without empty lines
	var lines = $('#Names').val().split('\n').filter(function(line){ return line.trim().length > 0; });
 
	content = '{{' + interwikiTemplateName + '}}\n\n';
	for (var i = 0; i < lines.length; i++) {
		var links = lines[i].split(' -> ');
        
	//check the line could be splitted previously
		if ( !links[0] || !links[1]) {
			alert(interwikiIncorrectlyFilled);
			return false;
		}
        
		content = content + '{{' + interwikiTemplateName + '|' + 
			shortUrl( links[0] ) + 
                  '|' + 
                  shortUrl( links[1] ) + 
                  '}}\n';
		}
    
 
	//adding comment if provided
	if ($('#Comments').val())
	{
		content = content + $('#Comments').val() + '\n';
	}

	//adding signature
	content = content + '~~' + '~~';
 
	//message
	message = interwikiSuccessfullyPosted;
 

 
	//we send the request
	name = $('#Name').val();
	$.get(mw.util.wikiScript('api'), {
	action: 'query',
	titles: namespace + ':' + name,
	format: 'json'
	}, function(data) {
	//console.log(data.query.pages);
	if (!data.query.pages['-1']) {
		alert(interwikiAlreadyExists);
		return false;
	} else {
      
		$('#startButton').attr('disabled','disabled').addClass( 'ui-state-disabled' );
 
		$.post(mw.util.wikiScript( 'api' ), {
			format: 'json',
			action: 'edit',
			summary: interwikiSummaryText,
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
    
  if(interlanguageRequest && interlanguageRequest.readyState != 4)
     interlanguageRequest.abort();
  
  if(url === ""){
    linkElt[0].setCustomValidity("");
    return;
  } 
  

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
    interlanguageRequest = $.ajax({
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
              });
    
    //In case the Request was blocked
    setTimeout(function(){}, 500);
  }
}

//Short url
function shortUrl(url) {
    
    var sUrl = "";
  
    // Delete protocol and not main community url
    url = url.replace(/https?:\/{2}/g, '').replace(/\/wiki\/(.*)/g, '');
  
    //Find parts: community name + language code
    var linkParts = /([\w.-]*)\.(?:wikia|fandom)?(?:\.(?:com|org)\/?)([\w-]{0,})/g.exec(url);
  
    // No parts found, maybe already short form "it.community"
    if ( !linkParts ) {
      linkParts = /([\w.-]*)/.exec(url);
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
	        message: interwikiSend,
	        defaultButton: true,
	        handler: function () {
	          submit(type);
	        }
	    },
	    {
	        message: interwikiCancel,
	        handler: function() {
	            showCustomModal.closeModal($('#' + type));
	        }
	    }]
	  });
	}
	 
	//setting form to display for each button 
	$('#interwiki').click(function() {
	  if (wgUserName === null) {
	    alert(interwikiUnloggedAlert);
	    window.location.href = wgServer + '/wiki/Special:UserLogin';
	    return false;
	  }
	 
	  var popup_interwiki =
	    '<form method="" name="" class="WikiaForm">' +
	    '  <fieldset>' +
	    '      <p style="padding:5px; border:1px solid grey;">' +
	    interwikiMessage1 + '<br>' + 
	    interwikiMessage2 + '<br>' +
	    interwikiMessage3 + '<br>' +
	    interwikiMessage4 + '</p><br>' +
	    '<p><b><span style="color:red">*</span>' + wikiName + ':</b></p> <input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Ex&nbsp;: One Piece Wiki"/>' + '<br>' +
	    '<p><b><span style="color:red">*</span>' + interwikiLinks + ':</b></p> <textarea style="width:500px; height:150px" id="Names" placeholder="Ex&nbsp;: wiki.fandom.com/it -> wiki.fandom.com/fr"></textarea>' + '<br>' +
	    '<p><b>' + interwikiDescription + ':</b></p> <input type="text" style="height:20px; width:400px" id="Comments" placeholder="' + interwikiCommentEx + '"/>' + '<br>' +
	    '   </fieldset>' +
	    '</form>';
	 
	  modal(requestInterwiki, popup_interwiki, interwikis);
	});
});

$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href;
});

// </nowiki>