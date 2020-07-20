$( function() {
   if ( $.inArray( mw.config.get( 'wgPageName' ), [ 'Testpage' ] ) !== -1 ) {
      $.showModal( '', '<div style="font-size:200%"><b>You need to log in with your Wookieepedia Pro account to continue reading this page.</b></div><br /><p>In April, Wookieepedia will become a subscription service. While we regret this move, it is a necessary step due to rising maintenance costs. See <a href="http://starwars.wikia.com/wiki/Forum:SH:Announcing Wookieepedia Pro">this page</a> for more information.</p><table style="margin: 0 auto; width: 100%;"><tbody><tr><td style="vertical-align: top; width: 33%;background: #e6e600; padding: 1em"><div style="text-align: center;"><b>Wookieepedia Pro Plus</b></div><ul><li>Unlimited articles</li><li>No ads</li><li><b>$9.99</b>/month</li><li><a href="http://starwars.wikia.com/wiki/Wookieepedia:Subscription"><b>Read more&hellip;</b></a></li></ul></td><td style="vertical-align: top; width: 34%; background: #33cc33; padding: 1em"><div style="text-align: center;"><b>Wookieepedia Pro</b></div><ul><li>Unlimited articles</li><li><b>$4.99</b>/month</li><li><a href="http://starwars.wikia.com/wiki/Wookieepedia:Subscription"><b>Read more&hellip;</b></a></li></ul></td><td style="vertical-align: top; width: 33%; background: #b8b8b8; padding: 1em"><div style="text-align: center;"><b>No thanks, ask me later</b></div><ul><li>You will only be able to read 10 articles per month</li></ul>', { width: 600 } );
    }
} );

$( function() {
   if ( $( '#wook-pro' ).length ) {
      var $labelA = $( '<span class="pro-label">Enter your email to receive updates about Pro: </span>' );
      var $inputB = $( '<input class="pro-input" type="text">' );
      var $buttonR = $( '<button class="pro-signup">Sign up</button>' ).on( 'click', function() {
         $( this ).siblings( '.pro-label' ).text( 'Thank you for your interest! ' );
         $( this ).siblings( '.pro-input' ).remove();
         $( this ).prop( 'disabled', true )
       } );
       $( '#wook-pro' ).append( $labelA, $inputB, $buttonR );
   }
} );

function initVisibility() {
	var page = window.pageName.replace(/\W/g,'_');
	var show = localStorage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
	var hidables = getElementsByClass('hidable');
 
	for(var i = 0; i < hidables.length; i++) {
		show = localStorage.getItem('hidableshow-' + i  + '_' + page);
 
		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}
 
function onArticleNavClick() {
	var div = document.getElementById('mp3-nav');
 
	if( div.style.display == 'block' )
		div.style.display = 'none';
	else
		div.style.display = 'block';
}
 
function addAlternatingRowColors() {
	var infoboxes = getElementsByClass('infobox', document.getElementById('content'));
 
	if( infoboxes.length == 0 )
		return;
 
	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];
 
		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;
 
		for( var i = 0; i < rows.length; i++ ) {
			if(rows[i].className.indexOf('infoboxstopalt') != -1)
			break;
 
			var ths = rows[i].getElementsByTagName('th');
 
			if( ths.length > 0 ) {
				continue;
			}
 
			if(changeColor)
				rows[i].style.backgroundColor = '#f9f9f9';
			changeColor = !changeColor;
		}
	}
}
 
function addHideButtons() {
	var hidables = getElementsByClass('hidable');
 
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
 
		if( button != null && button.length > 0 ) {
			button = button[0];
 
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );
 
			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}
 
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
 
	if( content != null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}