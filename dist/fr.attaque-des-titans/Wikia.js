

( function ( mw ) {
'use strict';
	// Adds a button linking to the talk page.
	if ( document.getElementsByClassName( 'comments' ) &&
		mw.config.get( 'wgNamespaceNumber' ) === 0
	) {
		var tpbutton = document.createElement( 'a' );
		tpbutton.accessKey = 't';
		tpbutton.href = mw.config.get( 'wgServer' ) + '/wiki/Talk:' +
			mw.config.get( 'wgPageName' );
		tpbutton.className = 'wikia-button secondary talk';
		tpbutton.rel = 'nofollow';
		tpbutton.setAttribute( 'data-id', 'comment' );
		tpbutton.textContent = 'Talk page';
		document.getElementById( 'WikiaPageHeader' ).insertBefore( tpbutton,
			document.getElementsByClassName( 'tally' )[0] );		
	}
}( mediaWiki ) );
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	userLang: "true"
};
importScriptPage('SocialIcons/code.js','dev');
// 09:53, December 22, 2013 (UTC)
// <source lang="JavaScript">
 
// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
importScript('MediaWiki:Wikia.js/accountNavigation.js');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

$(function() {
	 $( '.WikiHeader nav ul li.marked ul' )
                .append(
                    $( '<li>' )
                        .attr( 'class', 'subnav-2-item' )
                        .append(
                            $( '<a>' )
                                .attr( {
                                    'class': 'subnav-2a',
                                    'href': '/wiki/Shingeki_No_Kyojin'
                                } )
                                .text( 'SNK' )
                        ),
 
                    $( '<li>' )
                        .attr( 'class', 'subnav-2-item' )
                        .append(
                            $( '<a>' )
                                .attr( {
                                    'class': 'subnav-2a',
                                    'href': '/wiki/'
                                } )
                                .text( '' )
                        )
                );
});

//cvu

$(function() {
 
	function showSuccess() {
		alert('Merci!');
		document.location.replace(wgArticlePath.replace('$1', wgPageName));
	}
 
	function showError(msg) {
		alert(msg);
		$('#cvuSubmit').removeAttr('disabled').val('Soumettre');
	}
 
	function callAPI(data, method, callback) {
		data['format'] = 'json';
		$.ajax({
			data: data,
			dataType: 'json',
			url: wgScriptPath + '/api.php',
			type: method,
			success: function(response) {
				if (response.error)
					showError('API error: ' + response.error.info);
				else 
					callback(response);
			},
			error: function(xhr, error) { showError('AJAX error: ' + error); }
		});
	}
 
	function cvuSubmit() {
		var editor = $.trim($('#cvuEditor').val());
 
		$('#cvuSubmit').attr('disabled', 'disabled').val('Chargement...');
 
		if(editor == '')
                {
		        showError('Entrer un nom.');
                        return false;
                }
 
		callAPI({
			'action': 'query',
			'prop': 'info|revisions',
			'intoken': 'edit',
			'titles': wgPageName,
			'rvprop': 'content',
			'rvlimit': '1',
			'indexpageids': 'true',
		}, 'GET', function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			var content = page.revisions[0]['*'];
                        var template = '\{\{cvuid\|insert vandal\}\}';
 
			if (content.match(template) == null) 
				showError('Erreur.');
                        content = content.replace(template, '{' + '{cvuid|' + editor + '}' + '}');
 
			callAPI({
				'minor': 'yes',
				'summary': 'Nouveau signalement: [' + '[Special:Contributions/' + editor + '|' + editor + ']' + ']',
				'action': 'edit',
				'title': wgPageName,
				'basetimestamp': page.revisions[0].timestamp,
				'startimestamp': page.starttimestamp,
				'token': page.edittoken,
				'text': content
			}, 'POST', function(response) {
				if (response.edit.result == 'Success')
					showSuccess();
				else 
					showError('Erreur.');
			});
		});
		return false;
	}
 
	if(wgPageName=='Wiki_Shingekinokyojin:CVU') {
		var $div = $('#cvu_guide');
		var $form = $('<form />');
 
		var ppLink = 'Page <a href="' + wgArticlePath.replace('$1', 'RS:PP') + '">protégée </a> dû au vandalisme.';
 
		if ($.inArray('sysop', wgRestrictionEdit) > -1 && $.inArray('sysop', wgUserGroups) == -1)
			$form.append(ppLink + ' <a href="' + wgArticlePath.replace('$1', 'RS:AR') + '">contactez un administrateur</a> afin de mettre à jour.');
		else if ($.inArray('autoconfirmed', wgRestrictionEdit) > -1 && $.inArray('autoconfirmed', wgUserGroups) == -1)
			$form.append(ppLink + '<a href="' + wgScript + '?title=Special:UserLogin&returnto=' + wgPageName + '">connectez vous</a> pour modifier cette page.');
		else {
			$form.submit(cvuSubmit);
			$form.append($('<h4 />').text('Signaler un vandale:'));
 
			var $p1 = $('<p />').append('Pseudo ou adresse IP.');
			$form.append($p1);
 
			var $p2 = $('<p />');
			$p2.append($('<label />').attr({'for': 'cvuEditor'}).text('Pseudo ou IP:'));
			$p2.append($('<input />').attr({'id': 'cvuEditor', 'type': 'text', 'size': 9}));
			$p2.append($('<input />').css({'margin': '0 1em 0 1em'}).attr({'id': 'cvuSubmit', 'type': 'submit'}).val('Soumettre'));
			$form.append($p2);
		}
 
		if ($div != null)
			$div.empty().append($form);
 
                $("span").each(function() {
                    var name = this.className;
                    if(this.id == 'cvu_remove' && this.className != 'insert vandal') {
                        var $img1 = $("<img>").attr('src', 'https://images.wikia.nocookie.net/__cb20100503233735/runescape/images/f/fb/Yes_check.svg');
                        $img1.attr('width', '15').attr('height', '16').attr('title', 'Remove this user as blocked').css('cursor', 'pointer');
                        $img1.click(function() {
                            removeUser(name.replace(/ /g,"_").replace(/-/g,"."), "blocked");
                        });
 
                        var $img2 = $("<img>").attr('src', 'https://images.wikia.nocookie.net/__cb20100514174733/runescape/images/a/a2/X_mark.svg')
                        $img2.attr('width', '15').attr('height', '16').attr('title', 'Refuser').css('cursor', 'pointer');
                        $img2.click(function() {
                            removeUser(name.replace(/ /g,"_").replace(/-/g,"."), "");
                        });
 
                        $(this).append("&nbsp;").append($img1).append($img2);
                    }
                });
        }
 
        function removeUser(user, state) {
                var template = '\{\{cvuid\|' + user.split("_").join(" ") + '(\|.*?)?\}\}';
 
		callAPI({
			'action': 'query',
			'prop': 'info|revisions',
			'intoken': 'edit',
			'titles': wgPageName,
			'rvprop': 'content',
			'rvlimit': '1',
			'indexpageids': 'true'
		}, 'GET', function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			var content = page.revisions[0]['*'];
 
			if (content.match(template) == null) {
				showError('Erreur.');
                                return;
			}
 
                        content = content.replace('{' + '{cvuid|' + user.split("_").join(" "), '{' + '{cvuid|insert vandal}' + '}');
                        content = content.replace(/\}\}(\|.*?)?\}\}/, '}' + '}');
 
                        var summary = '[' + '[Special:Contributions/' + user + '|' + user.split("_").join(" ") + ']' + ']';
                        if(state == "blocked")
                                summary += ' Banni.';
                        else
                                summary += ' Non banni.';
 
			callAPI({
				'minor': 'yes',
				'summary': summary,
				'action': 'edit',
				'title': wgPageName,
				'basetimestamp': page.revisions[0].timestamp,
				'startimestamp': page.starttimestamp,
				'token': page.edittoken,
				'text': content
			}, 'POST', function(response) {
				if (response.edit.result != 'Success') 
					showError('Erreur.');
                                else 
                                        document.location.replace(wgArticlePath.replace('$1', wgPageName));
			});
		});
        }
});
 

 
/* WikiaNotifications */
var WikiaNotificationMessage = "";
 
 
/* Import d'articles */
importArticles({
    type: 'script',
    articles: [
        'u:dev:WikiaNotification/code.js'
    ]
});

/*<pre><nowiki>*/
 
// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIconsOasis() {
	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
	$( '#title-eraicons' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
} );
/*<pre><nowiki>*/
/**
 *
 * Custom preload templates for the new Wikia editor
 *
 * @author Grunny
 * @version 0.2
 *
 */
 
function customPreloadTemplates() {
 
	if ( ( mw.config.get( 'wgAction' ) !== 'edit' && mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'CreatePage' ) || !$( 'div.module_content' ).length ) {
		return;
	}
 
	var preloadBaseHtml = '<div id="lf-preload" class="edit-widemode-hide" style="padding: 10px;">Standard preloads:<br /></div>' +
			'<div class="edit-widemode-hide" style="padding: 10px;">Custom preload pagename:<br /><span id="lf-preload-pagename-w"></span><span id="lf-preload-button-w"></span></div>';
 
	$( 'div.module_content:first' ).append( preloadBaseHtml );
 
	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdpreloads', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$preloadOptionsList,
			lines = data.split( '\n' );
 
		$preloadOptionsList = $( '<select />' ).attr( 'id', 'stdSummaries' ).change( function() {
			var templateName = $( this ).val();
			if ( templateName !== '' ) {
				templateName = 'Template:' + templateName + '/preload';
				templateName = templateName.replace( ' ', '_' );
				$.get( mw.config.get( 'wgScript' ), { title: templateName, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
					insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
				} );
			}
		} );
 
		for ( var i = 0; i < lines.length; i++ ) {
			var templateText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$preloadOptionsList.append( $( '<option>' ).val( templateText ).text( lines[i] ) );
		}
 
		$( 'div#lf-preload' ).append( $preloadOptionsList );
	} );
 
	$( '#lf-preload-pagename-w' ).html( '<input type="text" class="textbox" />' );
	$( '#lf-preload-button-w' ).html( '<input type="button" class="button" value="Insert" onclick="doCustomPreloadOasis()" />' );
 
}
 
$( customPreloadTemplates );
 
function doCustomPreloadOasis() {
	var value = $( '#lf-preload-pagename-w > input' ).val();
	value = value.replace( ' ', '_' );
	$.get( mw.config.get( 'wgScript' ), { title: value, action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		insertAtCursor( document.getElementById( 'wpTextbox1' ), data );
	} );
}
 
// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIconsOasis() {
	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
	$( '#title-eraicons' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
} );
/*</nowiki></pre>*/