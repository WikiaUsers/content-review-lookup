/* Any JavaScript here will be loaded for all users on every page load. */

// <source lang="JavaScript">
 
//From Monchoman45
 
function CustomRollbacks() {
        var Buttons = [{
                text: '--spam',
                title: 'Revert spam',
                summary: 'Reverted [[w:c:help:Help:Spam|spam]]',
                loadtalk: false
        }, {
                text: '--vandalism',
                title: 'Revert vandalism',
                summary: 'Reverted [[w:c:help:Help:Vandalism|vandalism]]',
                loadtalk: false
        }, {
                text: '--null',
                title: 'Revert with no summary',
                summary: ' &bot=1', //This one has no summary, and flags it as a bot edit
                loadtalk: false
        }];
 
        var list = document.getElementsByTagName('span');
        for(i in list) {
                if(list[i].className == 'mw-rollback-link') {
                        var link = list[i];
                        var rollback = link.innerHTML;
                        for(j in Buttons) {
                                var customlink = document.createElement('span');
                                customlink.innerHTML = rollback;
                                customlink.className = 'customrollback'; //we do this to avoid an infinite loop, because when we insert a <span> into the DOM, the list variable includes it
                                customlink.getElementsByTagName('a')[0].title = Buttons[j].title;
                                customlink.getElementsByTagName('a')[0].href += '&summary=' + Buttons[j].summary;
                                customlink.getElementsByTagName('a')[0].innerHTML = Buttons[j].text;
                                if(Buttons[j].loadtalk == true) {customlink.getElementsByTagName('a')[0].className = 'loadtalk';}
                                if(urlQuery('action') == 'history') {
                                        link.parentNode.insertBefore(customlink, link.nextSibling);
                                        customlink.outerHTML = ' | ' + customlink.outerHTML;
                                }
                                else {
                                        link.parentNode.appendChild(customlink);
                                        customlink.outerHTML = ' ' + customlink.outerHTML;
                                }
                        }
                }
        }
        for(i in list) { //why another one of these? we're fixing the class that we set to avoid an infinite loop
                if(list[i].className == 'customrollback') {
                        list[i].className = 'mw-rollback-link';
                }
        }
 
        /* Grunny's function for opening up a user's talkpage when rollbacking (http://community.wikia.com/wiki/User:Grunny) */
        $( '.mw-rollback-link .loadtalk' ).click( function (e) {
                e.preventDefault();
                var $rblink = $( this );
                $.ajax( {
                        url: $rblink.attr( 'href' ),
                        success: function () {
                                var     user = $rblink.attr( 'href' ).replace( /.*[&?]from=([^&]*).*/, '$1' ).replace( /\+/g, '_' ),
                                        newurl = wgServer + wgArticlePath.replace( '$1', 'User_talk:' + user + '?action=edit&section=new' );
                                location.href = newurl;
                        },
                        error: function () {
                                $rblink.text( function ( i, val ) {
                                        return val + ' [failed]';
                                } );           
                        }
                } );
        } );
}
 
addOnloadHook(CustomRollbacks);
 
/* Monchoman's function for fixing error that was occuring in Monobook */
function urlQuery(quer) {
	for(i in location.href.split('?')) {
		for(j in location.href.split('?')[i].split('&')) {
			if(location.href.split('?')[i].split('&')[j].split('=')[0] == quer) {
				return location.href.split('?')[i].split('&')[j].split('=')[1];
			}
		}
	}
	return undefined;
}
 
// </source>