/* Any JavaScript here will be loaded for all users on every page load. */

/*<pre><nowiki>*/
/* Next Article Button script
 * requires: YUI Connection Manager
 * written by JSharp (http://www.wikia.com/wiki/User:JSharp)
 */

/* Debug */
var nextArticleButtonDebugAJAX = false;
var nextArticleButtonDebug = false;

/* Configuration */
var wikiImagePrefix = "https://images.wikia.nocookie.net/common/skins-1.12/common/images/";
var nextButtonActiveImageURL = wikiImagePrefix+"arrow_right_25.png";
var nextButtonDisabledImageURL = wikiImagePrefix+"arrow_disabled_right_25.png";
var getNextArticleURL = '../api.php?action=query&list=allpages&aplimit=2&format=xml&apfrom='+wgPageName;

/* Button Insertion Logic */

function createImage(status){
  var imageElement = document.createElement('img');
  imageElement.alt = '';/*accessibility*/
  switch(status){
   case 'active':
     var imageURL = nextButtonActiveImageURL;
     break;
   case 'disabled':
     var imageURL = nextButtonDisabledImageURL;
     break;
  };
  imageElement.id = 'nextArticleButtonImage';
  imageElement.src = imageURL;
  if(nextArticleButtonDebug) {
    console.log('Created Image: ' + imageURL);
  };
  return imageElement;
};

function createLabel(status, title){
  var labelElement = document.createElement('span');
  var pageTitle = document.createElement('span');
  pageTitle.id = 'nextArticleButtonArticleTitle';
  pageTitle.appendChild(document.createTextNode(title));
  labelElement.id = 'nextArticleButtonLabel';
  labelElement.appendChild(document.createTextNode('Next Page: '));
  labelElement.appendChild(pageTitle);
  if(nextArticleButtonDebug) {
    console.log('Created Label: ' + title + ', Status: ' + status);
    console.log('label:' + labelElement);
  };
  return labelElement
};

function createButton(status, title){
  /* create button hyperlink */
  var link = document.createElement('a');
  link.href = wgServer+'/wiki/'+title;

  /* create button set container */
  var container = document.createElement('div');
  container.id = 'nextArticleButtonContainer';

  if(status == 'active') {
    container.appendChild(link);
    /* compose child objects into container and then into link */
    link.appendChild(createImage(status));
    link.appendChild(createLabel(status, title));
    if(nextArticleButtonDebug) {
      console.log('Created Composed Button; Link: ' + link.href);
      console.log('link: ' + link );
    };
    return container;
  } else {
    container.appendChild(createImage(status));
    container.appendchild(createLabel(status,title));
    return container;
  };
}

function addButtonToPage(status, title){
  var button = createButton(status, title);
  switch(skin){
    case 'monobook': 
      var content = (window.document.getElementById('content')); 
      var insertBeforeNode = 4;
      break;
    case 'monaco':
    case 'quartz':
      var content = (window.document.getElementById('article'));
      var insertBeforeNode = 6;
      break;
  };
  content.insertBefore(button, content.childNodes[insertBeforeNode]);
  if(nextArticleButtonDebug){
    console.log('addButtonToPage: retrived content:: ' + content);
  };
}

function setArticleButton(status, title){
  switch(status){
   case 'ok':
     addButtonToPage('active', title);
     break;
   case 'failed':
     addButtonToPage('disabled', title);
     break;
  };
};

function getTitleFromXMLData(o){
  var data = o.responseXML;
  if(nextArticleButtonDebugAJAX){
    console.log('XML data parsed: ' + data );
  }
  var title = data.childNodes[0].childNodes[1].childNodes[0].childNodes[1].attributes[2].nodeValue;
  return title;
};

/* AJAX request logic for grabbing the next page */
var NextArticleData = {
  handleSuccess:function(o,x){
    var title = getTitleFromXMLData(o);
    setArticleButton('ok', title);
  },
  handleFailure:function(o){
    setArticleButton('failed', 'unavailable');
  },
  addButton:function(){
    if(nextArticleButtonDebugAJAX == true) {
      console.log("nextArticleButtonDebug: addButton called:");
      console.log("URL: " + getNextArticleURL);
    };
    jQuery.ajax({
      type: "GET",
      url: getNextArticleURL,
      success: NextArticleData.handleSuccess,
      error: NextArticledata.handleFailure
    });
  }
};


/* have to do this to get around YUI not being loaded until after our script is parsed */
function initAttemptAfterLoaded() {
  NextArticleData.addButton();
};

/* "NextArticledata is not defined" and "error: NextArticledata.handleFailure" says firebug
if (wgNamespaceNumber == 0 && wgPageName != "Main_Page" && wgIsArticle) {
  addOnloadHook(initAttemptAfterLoaded);
};
*/

/* Cat Intersection - "Temporary" fix for {{#dpl:execandexit=geturlargs}} */
/* Credit and thanks go to MarkusRost */
/* Source: https://forgottenrealms.fandom.com/wiki/MediaWiki:Common.js */
$( function() {
	/* Make the confirmation on action=purge keep DPL arguments */
	if ( mw.config.get('wgAction') === 'purge' ) {
	     var purgeForm = $('#mw-content-text form.mw-htmlform');
	     var purgeParams = purgeForm.find('input[name="redirectparams"]').val().split('&').filter( function (param) {
	         return param.startsWith('DPL_');
	     } );
	     if ( purgeParams.length ) {
	         purgeForm.attr('action', purgeForm.attr('action') + '&' + purgeParams.join('&') );
	     }
	 }
	/* Avoid the purge confirmation all together, restoring legacy behaviour until extension is fixed */
	 $('.DPL-purge a.external').on( 'click', function( e ) {
		var $form = $( '<form>' ).attr( {
			method: 'POST',
			action: this.href,
		} ).appendTo( document.body );
		$form.submit();
		e.preventDefault();
	} );
} );

/*</nowiki></pre>*/