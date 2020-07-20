//<syntaxhighlight lang="javascript">
/*
 * Adds a button next to the regular edit button which links to the Talk page for an article. Useful for Wikis that have Comments extension.
 * Modified from [[w:User:Grunny|Grunny's]] [[w:c:dev:EditIntroButton]] by [[User:FishTank]]
 * Uses PurgeButton/code.js as a basis for jQuery layout
 *
 */
if ( wgNamespaceNumber == 0 && !window.AddTalkButtonLoaded ) {
	addOnloadHook( addTalkButton );
}

var AddTalkButtonLoaded = true;

function addTalkButton () {
	var theText = 'Talk';
	
	if ( typeof AddTalkButtonText == "string" ) {
		theText = AddTalkButtonText;
	}

	switch( skin ) {
		case 'answers':
		case 'awesome':
		case 'monaco_old':
		case 'monaco':
			$('#page_controls > #control_edit').after('<li><img src="/skins/common/blank.gif" class="sprite edit" /><a id="ca-talk-0" href="/index.php?title=Talk:'+encodeURIComponent(wgPageName)+'" rel="nofollow" title="Talk">'+ theText + '</a></li>');
			break;


		case 'uncyclopedia':
		case 'wowwiki':
		case 'lostbook':
		case 'monobook':
			$('#p-cactions > .pBody > ul > #ca-edit').after('<li id="ca-talk-0"><a href="/index.php?title=Talk:'+encodeURIComponent(wgPageName)+'" title="Talk">'+ theText + '</a></li>');
			break;

		case 'oasis':
		case 'wikia':
			$((( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) && $( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader' ) + ' > .wikia-menu-button > ul').prepend('<li><a href="/index.php?title=Talk:'+encodeURIComponent(wgPageName)+'" title="Talk">'+ theText + '</a></li>');
			break;

	}
}
 
//</syntaxhighlight>