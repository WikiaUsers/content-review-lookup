// codes from FR CC
//Request filling system using popups by Gguigui1, Hulothe, Wyz, Fubuki風吹 and Celdrøn
// <nowiki>

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:ShowCustomModal.js'
});


var jqXHR;

//magical function for handling interwiki links requests
function submit(type) {
  var name;
  var content;
  var message;
  var namespace;
  var url;
  var un = mw.config.get('wgUserName');
 


	if(!$('#Name').val() || !$('#Names').val()) {
		// Alert user to fill needed inputs.
		alert('You must fill in the required fields.');
		return false;
	}
 
	//namespace     
	namespace = 'Interwiki_request';
 
	//content without empty lines
	var lines = $('#Names').val().split('\n').filter(function(line){ return line.trim().length > 0; });
 
	content = '{{' + 'Interwiki request' + '}}\n\n';
	for (var i = 0; i < lines.length; i++) {
		var links = lines[i].split(' -> ');
        
	//check the line could be splitted previously
		if ( !links[0] || !links[1]) {
			alert('The list of interwiki links seems to have been incorrectly filled in. Please correct your entry.');
			return false;
		}
        
		content = content + '{{Interwiki request|' + 
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
	message = 'Request for interwiki links successfully posted.';
 

 
	  //we send the request
	name = $('#Name').val();
	$.get(mw.util.wikiScript('api'), {
	action: 'query',
	titles: namespace + ':' + name,
	format: 'json'
	}, function(data) {
	//console.log(data.query.pages);
	if (!data.query.pages['-1']) {
		alert('The requested page already exists, please change the name. For example, add a number like "(2)" to the end of the wiki name.');
		return false;
	} else {
      
		$('#startButton').attr('disabled','disabled').addClass( 'ui-state-disabled' );
 
		$.post(mw.util.wikiScript( 'api' ), {
			format: 'json',
			action: 'edit',
			summary: 'New request',
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
	        message: 'Send',
	        defaultButton: true,
	        handler: function () {
	          submit(type);
	        }
	    },
	    {
	        message: 'Cancel',
	        handler: function() {
	            showCustomModal.closeModal($('#' + type));
	        }
	    }]
	  });
	}
	 
	//setting form to display for each button 
	$('#interwiki').click(function() {
	  if (wgUserName === null) {
	    alert('You must be logged in to create an interwiki link request.');
	    window.location.href = wgServer + '/wiki/Special:UserLogin';
	    return false;
	  }
	 
	  var popup_interwiki =
	    '<form method="" name="" class="WikiaForm">' +
	    '  <fieldset>' +
	    '      <p style="padding:5px; border:1px solid grey;">' +
	    'To make a new request, fill in the fields below. Fields marked with an asterisk (<span style="color:red">*</span>) are mandatory.<br>' + 
	    '       For example, to link <b>onepiece.fandom.com/it</b> and <b>onepiece.fandom.com</b>, fill in the text box "Interwiki links" with:<br><code>onepiece.fandom.com/it -> onepiece.fandom.com</code>. <br>' + 
	    '       To make several requests simultaneously, write one request per line. For example, to link <b>onepiece.fandom.com/it</b> to <b>onepiece.fandom.com</b> and <b>onepiece.fandom.com/fr</b>, ' + 
	    '       write: <br><code>onepiece.fandom.com/it -> onepiece.fandom.com</code><br><code>onepiece.fandom.com/it -> onepiece.fandom.com/fr</code><br>' + 
	    '       This will generate a link easy to use by any <a title="Staff" class="extiw" href="https://community.fandom.com/wiki/Staff">staff member</a> or ' + 
	    '       <a title="Helpers" href="/wiki/Help:Helpers">Helper</a> which will create the link between the two wikis very quickly.<br></p><br> '+
	    '       <p><b><span style="color:red">*</span>Wiki name:</b></p> <input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Ex&nbsp;: One Piece Wiki"/>' +
	    '       <p><b><span style="color:red">*</span>Interwiki links:</b></p>' +
	    '           <textarea style="width:500px; height:150px" id="Names" placeholder="Ex&nbsp;: wiki.fandom.com/it -> wiki.fandom.com/fr"></textarea>' +
	    '       <p><b>Description / Comments:</b></p> <input type="text" style="height:20px; width:400px" id="Comments" placeholder="Ex&nbsp;: Thanks in advance!"/>' +
	    '   </fieldset>' +
	    '</form>';
	 
	  modal('Request interwiki links', popup_interwiki, 'interwikis');
	});
});

$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href;
});

// </nowiki>