/*// Imported scripts*/
/*importScript('MediaWiki:Wikia.js/CollapseElements.js');*/
EditIntroButtonText = 'Ред. вступл.';
importScriptPage('EditIntroButton/code.js', 'dev');

var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '25px'
};
importScriptPage('SocialIcons/code.js','dev');

/* Any JavaScript here will be loaded for all users on every page load. */


//<source lang="javascript">
// Faster Collapsible Containers
// Maintainer: [[User:Darklama]]
 
// images to use for hide/show states
var collapse_action_hide = 'http://upload.wikimedia.org/wikipedia/commons/1/10/MediaWiki_Vector_skin_action_arrow.png';
var collapse_action_show = 'http://upload.wikimedia.org/wikipedia/commons/4/41/MediaWiki_Vector_skin_right_arrow.png';
 
// toggle state of collapsible boxes
function collapsible_boxes()
{
	$('div.collapsible').each( function() {
		var $that = $(this), css_width = $that.css('width'), attr_width = $that.attr('width');
		var which = $that.hasClass('selected') ? collapse_action_show : collapse_action_hide;
 
		if ( (!css_width || css_width == 'auto') && (!attr_width || attr_width == 'auto') ) {
			$that.css('width', $that.width() );
		}
 
		$(this).children('.title').each( function() {
			$(this).prepend('<span class="action"><a><img src="'+which+'" /></a></span>').click( function() {
				var which = $that.toggleClass('selected').hasClass('selected')
					? collapse_action_show : collapse_action_hide;
				$(this).find('span.action img').attr('src', which);
				if ( which == collapse_action_show ) {
					$(this).siblings(':not(.title)').stop(true, true).fadeOut();
				} else {
					$(this).siblings(':not(.title)').stop(true, true).fadeIn();
				}
			}).click();
		});
	});
 
	$( "table.collapsible" ).each( function() {
		var $table = $(this), rows = this.rows, cell = rows.item(0).cells.item(0);
		var which = $table.hasClass('selected') ? collapse_action_show : collapse_action_hide;
		var css_width = $table.css('width'), attr_width = $table.attr('width');
 
		if ( (!css_width || css_width == 'auto') && (!attr_width || attr_width == 'auto') ) {
			$table.css('width', $table.width() );
		}
 
		$(cell).prepend('<span class="action"><a><img src="'+which+'" /></a></span>');
		$(rows.item(0)).click( function() {
			var which = $table.toggleClass('selected').hasClass('selected')
				? collapse_action_show : collapse_action_hide;
			$(cell).find('span.action img').attr('src', which);
			if ( which == collapse_action_show ) {
				$(rows).next().stop(true, true).fadeOut();
			} else {
				$(rows).next().stop(true, true).fadeIn();
			}
		}).click();
	});
}
 
$(document).ready( collapsible_boxes );
 
//</source>



//<source lang="javascript">
// Faster Collapsible Containers 2
// 
 
// images to use for hide/show states
var collapse_action_hide2 = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Chess_oot45.svg/10px-Chess_oot45.svg.png';
var collapse_action_show2 = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Chess_oot45.svg/10px-Chess_oot45.svg.png';
 
// toggle state of collapsible boxes
function collapsible_boxes2()
{
	$( "table.collapsible2" ).each( function() {
		var $table = $(this), rows = this.rows, cell = rows.item(0).cells.item(0);
		var which2 = $table.hasClass('selected') ? collapse_action_show2 : collapse_action_hide2;
		var css_width = $table.css('width'), attr_width = $table.attr('width');
 
		if ( (!css_width || css_width == 'auto') && (!attr_width || attr_width == 'auto') ) {
			$table.css('width', $table.width() );
		}
 
		$(cell).prepend('<span class="action"><a><img src="'+which2+'" /></a></span>');
		$(rows.item(0)).click( function() {
			var which2 = $table.toggleClass('selected').hasClass('selected')
				? collapse_action_show2 : collapse_action_hide2;
			$(cell).find('span.action img').attr('src', which2);
			if ( which2 == collapse_action_show2 ) {
				$(rows).next().stop(true, true).fadeOut();
			} else {
				$(rows).next().stop(true, true).fadeIn();
			}
		}).click();
	});
}
 
$(document).ready( collapsible_boxes2 );
 
//</source>


function addWikifButton() {
        var toolbar = document.getElementById('toolbar')
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}



//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
  
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:-25px; border:none;"><button style=" font-size: 100%; height: 35px; line-height: 34px; width: 100px;" type="button" value="Наверх" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper > .wikia-bar > .toolbar >  .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( addBackToTop );
}
 
var BackToTop = true; // prevent duplication
 
if( typeof Start == "number" ) {
	ButtonStart = Start;
}
 
if( typeof Speed == "number" ) {
	ScrollSpeed = Speed;
}	
//
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}



function H2style() {
    $('#WikiaArticle h2').prepend('<a style="padding-right:5px;"><img src="https://images.wikia.nocookie.net/__cb20140318092401/lesbianfilms/ru/images/8/8d/Filigree-right.svg"></a>');
    $('#WikiaArticle h2').append('<a style="padding-left:5px;"><img src="https://images.wikia.nocookie.net/__cb20140318092310/lesbianfilms/ru/images/d/da/Filigree-left.svg"></a>');
}
addOnloadHook(H2style);

function collapstyle() {
    $('#table.collapsible th').prepend('<a style="padding-right:5px;"><img src="https://vignette.wikia.nocookie.net/lesbianfilms/images/4/47/Horizont-zig-right.svg"></a>');
    $('#table.collapsible th').append('<a style="padding-left:5px;"><img src="https://vignette.wikia.nocookie.net/lesbianfilms/images/4/47/Horizont-zig-right.svg"></a>');
}
addOnloadHook(collapstyle);