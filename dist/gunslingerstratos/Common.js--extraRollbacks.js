// <source lang="JavaScript">
 
//From Monchoman45
 
function CustomRollbacks() {
        var Buttons = [{
                text: '--spam',
                title: 'rollback spam',
                summary: 'Spam rollbacked',
                loadtalk: false
        }, {
                text: '--vandalism',
                title: 'rollback vandalism',
                summary: 'Vandalism rollbacked',
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

// From Monchoman45
/* Rollback with Ajax - stolen from Grunny (see above) */
function SetAjaxRollback() {
	$('.mw-rollback-link').click(function(e) {
		e.preventDefault();
		var $rblink = $(this);
		var href = this.getElementsByTagName('a')[0].href;
		this.innerHTML = ' <img src="" style="vertical-align: baseline;" border="0" alt="Rollbacking..." />';
		$.ajax({
			url: href,
			success: function() {
				$rblink.text(function (i, val) {return val + ' [success]';});
				loadPageData();
			},
			error: function() {
				$rblink.text(function (i, val) {return val + ' [failed]';});
				loadPageData();
			}
		});
	});
}
 
addOnloadHook(SetAjaxRollback);