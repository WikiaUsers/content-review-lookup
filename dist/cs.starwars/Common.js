/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. 
   použito v nápovědě k odznakům */
/*
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html('<a href="Uživatel:'+wgUserName+'">profilové stránce</a>');
 }
 addOnloadHook(UserNameReplace);
*/
/* End of the {{USERNAME}} replacement */

/* Replaces {{USERNAME}} with the name of the user browsing the page. Requires copying [[Template:USERNAME]]. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

$(document).ready(function(){
 
        $(".slidingDiv").hide();
        $(".show_hide").show();
 
    $('.show_hide').click(function(){
    $(".slidingDiv").slideToggle();
    });
    if (location.pathname=='/wiki/Hlavn%C3%AD_strana'){
        $('#media-first').wrap('<a href="https://www.pinterest.com/csww/star-wars" />');
        $('#media-second').wrap('<a href="https://www.pinterest.com/csww/star-wars-infografiky-a-komiksy/" />');
        $('#media-third').wrap('<a href="https://www.youtube.com/playlist?list=PLCNQ3WKO6FXa_Y3Ntfg3f1p9vwJnUljwY" />');
        $('#media-fourth').wrap('<a href="https://www.youtube.com/playlist?list=PLCNQ3WKO6FXZUJK4WIkNUuxfzQT_P_lIx" />');
    }
    
});


/**
 * Collapsible tables
 *
 * Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]].
 * @maintainer [[User:R. Koot]] (on Wikipedia)
 */
 
var autoCollapse = 2;
var collapseCaption = 'skrýt';
var expandCaption = 'zobrazit';

 
function hasClass( element, className ) {
	var Classes = element.className.split( " " );
	for ( var i = 0; i < Classes.length; i++ ) {
		if ( Classes[i] == className ) {
			return true;
		}
	}
	return false;
}
 


function collapseTable( tableIndex ) {
	var i;
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.getElementsByTagName( 'tr' );
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}
 
function createCollapseButtons() {
	var i;
	var tableIndex = 0;
	var NavigationBoxes = {};
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
			NavigationBoxes[ tableIndex ] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.style.styleFloat = 'right';
			Button.style.cssFloat = 'right';
			Button.style.fontWeight = 'normal';
			Button.style.textAlign = 'right';
			Button.style.width = '6em';
 
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', 'javascript:collapseTable(' + tableIndex + ');' );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			var Header = Tables[i].getElementsByTagName( 'tr' )[0].getElementsByTagName( 'th' )[0];
			/* only add button and increment count if there is a header row to work with */
			if (Header) {
				Header.insertBefore( Button, Header.childNodes[0] );
				tableIndex++;
			}
		}
	}
 
	for ( i = 0; i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		}
	}
}
 
addOnloadHook( createCollapseButtons );

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

$(document).ready(function() {
$('.chybejici .mw-spcontent').each(function() {
    var html = '';
    $(this).children('a').each(function() {
        if ($(this).hasClass('new')) {
            html += '<li>' + this.outerHTML + '</li>';
        }
    });
    $(this).html('<ul class="dvasloupce">' + html + '</ul>');
});
});


/* TopEditors script by Bobogoobo
 * Please see for full documentation: http://dev.wikia.com/wiki/TopEditors
 */
$('.topeditors').each(function() {
    //Variables and retrieving settings
    var myDate = new Date(), end = myDate.toJSON(), start = '', 
      $te = $(this), userlist = {}, html = '',
      namespace = ($te.attr('data-te-namespace') || ''),
      type = ($te.attr('data-te-type') || 'edit|new'),
      show = ($te.attr('data-te-show') || ''),
      user = $te.attr('data-te-user') ? '&rcuser=' + $te.attr('data-te-user') : '',
      limit = (Number($te.attr('data-te-limit')) || 25),
      dateoffset = (Number($te.attr('data-te-offset')) || 7);
    limit = user ? 1 : limit;
    myDate.setDate(myDate.getDate() - dateoffset);
    start = myDate.toJSON();
 
    //Get and parse API data
    function requestLoop(strt, callback) {
        var request = '/api.php?action=query&list=recentchanges&rcstart=' + strt + 
          '&rcend=' + end + '&rcnamespace=' + namespace + '&rcshow=' + show + 
          '&rctype=' + type + user + '&rcdir=newer&rcprop=user&rclimit=500&format=json';
        $.getJSON(request, function(data) {
            for (var change in data.query.recentchanges) {
                var username = data.query.recentchanges[change].user;
                if (userlist[username] !== undefined) {
                    userlist[username] += 1;
                } else {
                    userlist[username] = 1;
                }
            }
            start = data['query-continue']; // JS needs hyphenated values in bracket notation
            if (start !== undefined) {
                requestLoop(start.recentchanges.rcstart, callback);
            } else {
                callback();
            }
        });
    }
    requestLoop(start, function() {
 
    //Create list in necessary structure and sort
    var userslist = [];
    for (var x in userlist) {
        userslist.push({'user':x, 'count':userlist[x]});
    }
    userslist.sort(function(a, b) {
        if (a.count > b.count) {
            return -1;
        } else if (a.count < b.count) {
            return 1;
        } else {
            if (a.user < b.user) {
                return -1;
            } else if (a.user > b.user) {
                return 1;
            } else {
                return 0;
            }
        }
    });
 
    //Create html and append to page
    for (var i = 0; i < userslist.length && i < limit; i++) {
        if (user) {
            html += userslist[i].count;
        } else {
            html += '<li><a href="/wiki/User:' + encodeURIComponent(userslist[i].user) + 
              '">' + userslist[i].user + '</a>: ' + userslist[i].count + ' úprav</li>';
        }
    }
    user ? $te.html(html) : $te.html('<ol>' + html + '</ol>');
    });
});


document.write('<img src="https://toplist.cz/dot.asp?id=1244425&http='+
escape(document.referrer)+'&t='+escape(document.title)+
'&wi='+escape(window.screen.width)+'&he='+escape(window.screen.height)+'&cd='+
escape(window.screen.colorDepth)+'" width="1" height="1" border=0 alt="TOPlist" />');

/**
 * Hides the link to parent pages from subpages if {{HideContentSub}} is included
 **/
function hideContentSub() {
	if ( mw.config.get( 'wgNamespaceNumber' ) === 0 || $( '#hideContentSub' ).length > 0 ) {	
		if ( mw.config.get( 'skin' ) === 'oasis' ) {
			if ($( '#WikiaPageHeader h2' ).text().substring(0, 1) === "<") {
				var	$wikiaHeader = $( '#WikiaPageHeader h2' ),
					$backToPageLink;
				if ( mw.config.get( 'wgNamespaceNumber' ) % 2 === 1 ) {
					// ugly hack to only leave back to page link on talk pages
					$backToPageLink = $wikiaHeader.find( 'a[accesskey="c"]' );
					$wikiaHeader.html( '' ).append( $backToPageLink );
				} else {
					$wikiaHeader.hide();
				}
			}
		} else {
			if ( $( '#contentSub span.subpages' ).text().substring(0, 1) === "<" ) {
				$( '#contentSub span.subpages' ).hide();
			}
		}
	}
}
 
// </nowiki></pre>
addOnloadHook( hideContentSub );

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=430321870322833&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$('.mw-customtoggle-galerie').click(function(){
    var $this = $(this);
    $this.toggleClass('mw-customtoggle-galerie');
    if($this.hasClass('mw-customtoggle-galerie')){
        $this.text('Galerie');         
    } else {
        $this.text('Skrýt galerii');
    }
});

$("#popupgalerie").show();
$.getScript("//assets.pinterest.com/js/pinit.js", function(){

   $('#pinterestBoard').html('<a data-pin-do="embedBoard" href="http://www.pinterest.com/csww/star-wars/" data-pin-scale-width="150" data-pin-scale-height="372"></a>');
});


window.setTimeout(function (){
        $('a[data-pin-href]').each(function(){
            var newurl = $(this).attr('data-pin-href').replace('repin/x/','');
            $(this).attr('data-pin-href', newurl);
        });
    }, 1500);
window.AjaxRCRefreshText = 'Automatická aktualizace';
window.AjaxRCRefreshHoverText = 'Automaticky obnovit stránku';
window.ajaxPages = ["Recentchanges","WikiActivity"];