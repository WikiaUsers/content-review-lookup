/* Any JavaScript here will be loaded for all users on every page load. */
/* Please don't change without Admin's permission. That means another Admin, not just you. */

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100820192443/htmlcss/images/3/38/Code.png",
     "speedTip": "Coded Content",
     "tagOpen": "<code>",
     "tagClose": "</code>",
     "sampleText": "Coded Content"};

}

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100820192625/htmlcss/images/2/26/Favicon.png",
     "speedTip": "Nowiki Content",
     "tagOpen": "<nowiki>",
     "tagClose": "</nowiki>",
     "sampleText": "Nowiki Content"};

}

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20101102032913/htmlcss/images/e/ed/HTML_source_button.png",
     "speedTip": "HTML Source Code Content",
     "tagOpen": "<source lang=\"html4strict\">",
     "tagClose": "</source>",
     "sampleText": "HTML Code"};

}

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20101102033107/htmlcss/images/f/f3/CSS_source_button.png",
     "speedTip": "CSS Source Code Content",
     "tagOpen": "<source lang=\"css\">",
     "tagClose": "</source>",
     "sampleText": "CSS Code"};

}


$(window).ready(function (){
        var nobr = $('#nobr'); // Use jQuery CSS-selector feature to find all elements with id="nobr".
        if(nobr.length > 0){ // If there are any...
            nobr.each(function (){ // call this function as a method of each one:
                    var that = $(this); // Get jQuery's representation of the element (needed within the click handler).
                    var contents = that.contents() // The contents are in jQuery representation too.
                        .replaceWith($(document.createElement('a')) // Replace them with a link...
                            .attr('href', '#') // that doesn't really point anywhere and says...
                            .append(document.createTextNode('Click here, but note that this will mess up the page\'s layout.'))
                            .click(function (event){ // When the link is clicked...
                                    that.contents().replaceWith(contents); // replace it with the original contents.
                                    event.preventDefault() // And make sure that # isn't added to the URL so the Back button still works.
                                    return false; // Ignored by jQuery, but doesn't hurt; this is the non-standard way to preventDefault.
                                        // It's necessary for cross-browser compatibility when jQuery is absent.
                                }));
                });
        }
    });

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

function showEras(className) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
// END JavaScript title rewrite

addOnloadHook(rewriteTitle);


function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=151981424827777&amp;connections=5" align="top" frameborder="0" width="300" height="175" scrolling="no" />');
}

$(fBox);


function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent'));
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);



// Start of SSgtGriffin's personal YouTube widget 
function SSgtGriffinYouTubeBox() {
        $('#SSgtGriffinYouTubeBox').append('<iframe id="fr" src="http://www.youtube.com/subscribe_widget?p=SSgtGriffin" style="overflow: hidden; height: 105px; width: 300px; border: 0;" scrolling="no" frameBorder="0" />');
}

$(SSgtGriffinYouTubeBox);

// End of SSgtGriffin's personal YouTube widget


// Start of the SSgtGriffin Facebook like box
function SSgtGriffinFacebookBox() {
	$('#SSgtGriffinFacebookBox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=176961448998164&amp;connections=5" align="top" frameborder="0" width="300" height="175" scrolling="no" />');
}

$(SSgtGriffinFacebookBox);
// End of SSgtGriffin Facebook like box


function SSGfbButton() {
        $('#SSGfbButton').append('<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FSSgtGriffin%2F176961448998164&amp;layout=button_count&amp;show_faces=false&amp;width=450&amp;action=like&amp;font=arial&amp;colorscheme=dark&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"></iframe>');
}

$(SSGfbButton);

// Start of SSgtGriffin's Twitter button
function SSgtGriffinTwitter() {
	$('#SSgtGriffinTwitter').append('<a href="http://www.twitter.com/SSgtGriffin"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-c.png" alt="Follow SSgtGriffin on Twitter"/></a>');
}

$(SSgtGriffinTwitter);
// End of SSgtGriffin Twitter button

/*
// SSgtGriffin Twitter Widget
function SSGTwitterBox() {
	$('#SSGTwitterBox').append('<script src="http://widgets.twimg.com/j/2/widget.js"></script>
<script>
new TWTR.Widget({
  version: 2,
  type: 'profile',
  rpp: 4,
  interval: 6000,
  width: 250,
  height: 300,
  theme: {
    shell: {
      background: '#333333',
      color: '#ffffff'
    },
    tweets: {
      background: '#000000',
      color: '#ffffff',
      links: '#4aed05'
    }
  },
  features: {
    scrollbar: false,
    loop: false,
    live: false,
    hashtags: true,
    timestamp: true,
    avatars: false,
    behavior: 'all'
  }
}).render().setUser('SSgtGriffin').start();
</script>');
}

$(SSGTwitterBox);
// End of SSgtGriffin Twitter Widget
*/

<script type="text/javascript">
function open_close(id_spol) {
var obj = "";
if (document.getElementById) obj = document.getElementById(id_spol).style;
else if (document.all) obj = document.all[id_spol];
else if (document.layers) obj = document.layers[id_spol];
else return 1;

if (obj.display == "") obj.display = "none";
else if (obj.display != "none") obj.display = "none";
else obj.display = "block";
}
</script>