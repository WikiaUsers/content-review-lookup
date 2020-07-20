$( '.cioCompareLink' ).each( function () {
    var props = ( $( this ).attr( 'title' ) || '').split( '|' ),
        linkText = (props[0] !== '') ? props[0] : 'Compare items',
        items = (props.length >= 2) ? props.slice(1) : [ mw.config.get( 'wgPageName' ) ],
        $link = $( '<a>' ).attr( {
            href: '#',
            title: 'Compare this item with other items.'
        } ).click( function ( e ) {
            // I'm like 90% sure if you don't specify a href attribute, you don't need a preventDefault
            e.preventDefault();
            cioOpen( items );
        } ).text( linkText );
 
    $( this ).empty().append( $link );
});
 
// @todo upload these to the wiki
var $cioImgDelete = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20140913213446/runescapefanfiction/images/d/d1/Close_icon.png',
        width: 14,
        height: 13,
        alt: '[X]'
    } ),
    $cioImgLoading = $( '<img>' ).attr( {
        src: 'http://www.tomtom.com/mapshare/tools/img/progress-wheel.gif',
        width: 16,
        height: 16,
        alt: '...'
    } ),
    $cioImgError = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20140222133434/runescapefanfiction/images/4/49/Error.png',
        width: 16,
        height: 16,
        alt: '!!'
    } ),
    $cioImgAttack = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20131219201257/runescapefanfiction/images/5/51/Attack-icon.png',
        width: 16,
        height: 16,
        alt: 'Attack',
		title: 'Attack'
    } ),
    $cioImgDefence = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20131219201346/runescapefanfiction/images/d/d8/Defence-icon.png',
        width: 16,
        height: 16,
        alt: 'Defence',
		title: 'Defence'
    } ),
    $cioImgStrength = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20131219201332/runescapefanfiction/images/3/3e/Strength-icon.png',
        width: 16,
        height: 16,
        alt: 'Strength',
		title: 'Strength'
    } ),
    $cioImgRanged = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20131219201216/runescapefanfiction/images/7/72/Ranged-icon.png',
        width: 16,
        height: 16,
        alt: 'Ranged',
		title: 'Ranged'
    } ),
    $cioImgMagic = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20131219201728/runescapefanfiction/images/7/77/Magic-icon.png',
        width: 16,
        height: 16,
        alt: 'Magic',
		title: 'Magic'
    } ),
    $cioImgSummoning = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20131219201740/runescapefanfiction/images/e/e3/Summoning-icon.png',
        width: 16,
        height: 16,
        alt: 'Summoning',
		title: 'Summoning'
    } );
	$cioImgSlayer = $( '<img>' ).attr( {
        src: 'https://images.wikia.nocookie.net/__cb20131219201850/runescapefanfiction/images/c/cf/Slayer-icon.png',
        width: 16,
        height: 16,
        alt: 'Slayer',
		title: 'Slayer'
    } );

//returns the image for a stat
function getStatsImage( str )
{
	switch(str)
	{
		case 'attack':return $cioImgAttack.clone();
		case 'defence':return $cioImgDefence.clone();
		case 'strength':return $cioImgStrength.clone();
		case 'magic':return $cioImgMagic.clone();
		case 'ranged':return $cioImgRanged.clone();
		case 'summoning':return $cioImgSummoning.clone();
		case 'slayer':return $cioImgSlayer.clone();
		default: return ' ';
	}
}
	
/** Open the compare items overlay */
function cioOpen( items ) {
    // Darken the page
    if ( !$( '#overlay' ).length ) {
        $( '<div>' ).attr( 'id', 'overlay' )
                    .appendTo( 'body' )
                    .show()
                    .unbind( 'click' )
                    .click( cioClose );
    } else {
        $( '#overlay' ).show()
                       .unbind( 'click' )
                       .click( cioClose );
    }
 
    $( document ).keydown( function ( e ) {
        if (e.which == 27) {
            cioClose();
        }
    } );
 
 
    // Build the initial table
    var html = ' \
<div id="cioTitle"> \
 <div id="modalClose" onclick="cioClose();" title="Close this overlay."><img src="https://images.wikia.nocookie.net/__cb20140913213446/runescapefanfiction/images/d/d1/Close_icon.png" width="48" height="24" alt="[X]" /></div> \
 Compare Items \
</div> \
<form name="cioCompare" id="cioCompare" onsubmit="cioSubmit(this.cioItem.value); return false;" action="#"> \
    <table> \
        <tr> \
            <td><label for="cioItem">Compare <b>' + mw.config.get( 'wgTitle' ) + '</b> with:</label></td> \
            <td><input type="input" type="text" name="cioItem" id="cioItem" value="" /> <input type="submit" value="Add" /></td> \
        </tr> \
        <tr> \
            <td>&nbsp;</td> \
            <td id="cioStatus"></td> \
        </tr> \
    </table> \
</form> \
<table class="wikitable" id="cioItems"> \
    <thead> \
        <tr> \
            <th rowspan="2">Name</th> \
            <th rowspan="2">Requirements</th> \
                <th colspan="3">Mainhand Info</th> \
                <th colspan="3">Offhand Info</th> \
                <th colspan="3">Attributes</th> \
                <th colspan="3"><span style="font-size:80%">Critical Bonuses</span></th> \
                <th width="30">Speed</th> \
                <th width="30">Weight</th> \
            <th width="30">GE</th> \
        </tr> \
        <tr> \
            <th width="35">Style</th> \
            <th width="35"><span style="font-size:80%">Damage</span></th> \
            <th width="35"><span style="font-size:80%">Accuracy</span></th> \
            <th width="35">Style</th> \
            <th width="35"><span style="font-size:80%">Damage</span></th> \
            <th width="35"><span style="font-size:80%">Accuracy</span></th> \
            <th width="35" title="Armour rating"><img src="https://images.wikia.nocookie.net/runescape/images/thumb/d/d8/Defence-icon.png/18px-Defence-icon.png"" alt="Arm" /></th> \
            <th width="35" title="Life bonus"><img src="https://images.wikia.nocookie.net/runescape/images/thumb/1/1d/Constitution-icon.png/21px-Constitution-icon.png" alt="Lif" /></th> \
            <th width="35" title="Prayer bonus"><img src="https://images.wikia.nocookie.net/runescape/images/2/24/Prayer-icon.png" width="20" height="20" alt="Pra" /></th> \
            <th width="35" title="Melee critical"><img src="https://images.wikia.nocookie.net/runescape/images/9/90/Stab_Attack_Style.png" width="11" height="20" alt="Dam" /></th> \
            <th width="35" title="Ranged critical"><img src="https://images.wikia.nocookie.net/runescape/images/7/72/Ranged-icon.png" width="20" height="20" alt="Rng" /></th> \
            <th width="35" title="Magic critical"><img src="https://images.wikia.nocookie.net/runescape/images/7/77/Magic-icon.png" width="20" height="19" alt="Mag" /></th> \
            <th title="Speed"><img src="https://images.wikia.nocookie.net/runescape/images/a/a9/Energy.png" width="17" height="20" alt="Spd" /></th> \
            <th title="Weight (kg)"><img src="https://images.wikia.nocookie.net/runescape/images/f/fc/Weight-icon.png" width="20" height="20" alt="Wgt" /></th> \
            <th title="Grand Exchange Price"><img src="https://images.wikia.nocookie.net/runescape/images/6/65/Coins_25.png" width="20" height="15" alt="GE" /></th> \
        </tr> \
    </thead> \
    <tbody> \
        <tr id="cioTotals"> \
        </tr> \
    </tbody> \
</table>';
 
    // Create the modal box
    $('<div />').html(html).attr('id', 'modal').appendTo('body');
 
    // Center
    $('#modal').css('left', $(window).width() / 2 - ($('#modal').width() / 2));
 
    //os_enableSuggestionsOn('cioItem', 'cioCompare');
 
    // Initial item(s)
    // TODO: Fold multiple item calls into one API query
    for (var i = 0; i < items.length && i < 5; i++) {
        cioSubmit(items[i]);
    }
}
 
/** Close the overlay. */
function cioClose() {
        //os_disableSuggestionsOn('cioItem');
        $('#modal').fadeOut('normal', function () {
                $('#modal').remove();
                $('#overlay').hide();
        });
        $(document).unbind('keydown');
}
 
/** Submit an AJAX request to add a new item */
function cioSubmit(itemName) {
        // http://www.mredkj.com/javascript/numberFormat.html#addcommas
        function addCommas(nStr) {
                nStr += '';
                x = nStr.split('.');
                x1 = x[0];
                x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
        }
 
        /** Calculate bonus totals */
        function calcTotals() {
			var totals = [];
			for (var i = 0; i < 16; i++) {
					totals[i] = 0;
			}
			
			// Iterate over each row and col
			$('#cioItems tbody tr').not('#cioTotals').each(function() {
					var i = 0;
					$(this).children('td').each(function() {
							var num = $(this).text().replace(/,/g, '');
							if($(this).html().indexOf('<img') != -1)
								i++;
							else
								totals[i++] += (isNaN(num) ? 0 : parseInt(num));
					});
			});

			$('#cioTotals').empty().append($('<th />').text('Total'));
			for (var i in totals) {
				// Don't total weapon speeds
				if(i==0 || i==1 || i==4 || i==13)
					$('#cioTotals').append($('<td />').text('--'));
				else
					$('#cioTotals').append(format(addCommas(totals[i]) + ''));
			}
    }
 
        /** Format a template number and return a (jQuery) table cell */
        function format(str) {
			if (str == null || /no|^\s*<!--.*-->\s$/i.test(str)) {
					return $('<td />').attr('class', 'cioEmpty').text('--');
			} else {
					// Prepend + sign to numbers without any sign
					str = str.replace(/<!--.*?-->/g); //remove comments
					if (/\d/.test(str.substring(0, 1))) {
							str = '+' + str;
					}

					if(/\w/.test(str.substring(0, 1))) return $('<td />').text(str);
					else return $('<td />').attr('class', (str.substring(0, 1) == '-') ? 'cioNeg' : 'cioPos').text(str);
			}
        }
		
		function formatReq(str) {
			var statsArray = [], statsValueArray = [];
			if (str == null || /no|^\s*<!--.*-->\s$/i.test(str)) {
					return $('<td />').attr('class', 'cioEmpty').text('--');
			} else {
					str = str.replace(/<!--.*?-->/g); //remove comments
					str = str.replace(/,/g,' ');
					var splits = str.split(' ');
					for(var i in splits)
					{
						if(/\d/.test(splits[i]))
							statsValueArray.push(splits[i]);
						else
							statsArray.push(splits[i].toLowerCase());
					}
					
					var $returnedRow = $('<td />');
					for(var i in statsArray)
					{
						$returnedRow.append(statsValueArray[i]);
						$returnedRow.append(getStatsImage(statsArray[i]));
					}
					
					return $returnedRow;
			}
		}

		/** Parse the parameters in a given template.  */
		function parseTemplate(text, tpl) {
			tpl = tpl.replace(/[_ ]/g, '[_ ]');
			if(tpl == 'infobox[_ ]bonuses')
			{
				var skillClickPicTemplate = new RegExp('{{\\s*(template:)?skill clickpic\\s*\\|([\\w\\W]+?[^!])}}','gi');
				var skillClickPicFinder;
				var removingText=[], replacingText=[];
				//removing the skill clickpic templates
				while(skillClickPicFinder = skillClickPicTemplate.exec(text))
				{
					removingText.push(skillClickPicFinder[0]);
					replacingText.push(skillClickPicFinder[2]);
				}
				
				for(var i in removingText)
				{
					text=text.replace(removingText[i],replacingText[i]);
				}
			}
			else if(tpl == 'infobox[_ ]item')
			{
				var GEPriceTemplate = new RegExp('{{\\s*(template:)?geprice\\s*\\|([\\w\\W]+?[^!])}}','gi');
				var GEPTFinder;
				var removingText=[]
				//removing the skill clickpic templates
				while(GEPTFinder = GEPriceTemplate.exec(text))
				{
					removingText.push(GEPTFinder[0]);
				}
				
				for(var i in removingText)
				{
					text=text.replace(removingText[i],'');
				}
			}
			
			var re = new RegExp('{{\\s*(template:)?' + tpl + '\\s*\\|([\\w\\W]+?[^!])}}', 'gi');

			var data = [];
			var match;
			while (match = re.exec(text)) {
					var params = match[2].split('|');
					var j = 1; // Unnamed parameter index
					var tplData = [];
					for (var k in params) {
							var t = params[k].split('=');
							var name = null;
							var value = null;
							if (t.length == 1) { // Unnamed params
									name = (j++) + ''; // Cast to string
									value = t[0];
							} else {
									name = t[0];
									value = t[1];
							}

							tplData[$.trim(name)] = $.trim(value);
					}
					data.push(tplData);
			}

			return data;
        }
 
        /** Error message */
        function showError( str ) {
                $( '#cioStatus' ).empty()
                                 .attr( 'class', 'cioError' )
                                 .append( $cioImgError.clone() )
                                 .append( ' ' + str );
        }
 
        /** Ajax error handler */
        function ajaxError( xhr, error ) {
                showError( 'Error: ' + error );
        }
 
        /** Ajax success handler */
        function ajaxSuccess( data ) {
                // @todo Handle error messages from the API
 
                // List of template params to display within each column.
                var bonusCols = [
                        'requirements',
						'mainType', 'mainDamage', 'mainAccuracy',
                        'offType', 'offDamage', 'offAccuracy',
                        'defence', 'life', 'prayer',
                        'meleecrit', 'rangedcrit', 'magiccrit', 'aspeed'
                ];
 
        var pages = data.query.pages,
            exchangePageId = null,
            pageId = null;
 
        for ( var i in pages ) {
            if ( pages[i].title.substring(0,9) == 'Exchange:' ) {
                exchangePageId = pages[i].pageid;
            } else {
                pageId = pages[i].pageid;
            }
        }
 
        if ( pageId == null ) {
            showError( 'Could not find that item.' );
        } else {
            var page = data.query.pages[pageId],
                exchangePage = data.query.pages[exchangePageId],
                pageTitle = page.title,
                pageContent = page.revisions[0]['*'],
                bonusData = parseTemplate(pageContent, 'infobox bonuses'),
                itemData = parseTemplate(pageContent, 'infobox item'),
                exchangeData = [];
 
            if ( exchangePage ) {
                var exchangeContent = exchangePage.revisions[0]['*'].replace( '{{{View}}}', '' );
                exchangeData = parseTemplate( exchangeContent, 'exchangeitem' );
            }
 
            for ( var i in bonusData ) {
                var $row = $( '<tr>' ),
                    $th = $( '<th>' ),
                    $delLink = $( '<a>' ).attr( {
                        href: '#',
                        title: 'Remove this row.'
                    } ).click( function () {
                        $( this ).closest( 'tr' ).fadeOut( 'slow', function () {
                            $( this ).remove();
                            calcTotals();
                        } );
                    } ),
                    $itemLink = $( '<a>' ).attr( {
                        href: mw.config.get( 'wgArticlePath' ).replace( '$1', encodeURI( pageTitle ) ),
                        title: pageTitle
                    } ).text( pageTitle );
 
                $delLink.append( $cioImgDelete.clone() );
                $th.append( $delLink )
                   .append( ' ' )
                   .append( $itemLink );
                $row.append( $th );
 
                for (var j in bonusCols) {
                    if(bonusCols[j] == 'requirements')
						$row.append( formatReq( bonusData[i][bonusCols[j]] ) )
					else
						$row.append( format( bonusData[i][bonusCols[j]] ) );
                }
 
                $row.append( format( itemData.length ? itemData[0]['weight'] : null ) );
                $row.append( format( exchangeData.length ? exchangeData[0]['Price'] : null ) );
 
                $( '#cioTotals' ).before( $row );
            }
 
            if ( !bonusData.length ) {
                showError( 'No bonus data found for the item.' );
            } else {
                calcTotals();
                $( '#cioStatus' ).empty();
            }
        }
    }
 
    $( '#cioStatus' ).empty()
                     .attr( 'class', 'cioLoading' )
                     .append( $cioImgLoading.clone() )
                     .append( ' Loading...' );
 
    $.ajax( {
        /*creates a reference to the url http://runescapefanfiction.wikia.com/api.php?action=query&prop=revisions&titles=itemName+'|Exchange:'+itemName&rvprop=content&redirects=
        */
        data: {
            'action': 'query',
            'prop': 'revisions',
            'titles': itemName + '|Exchange:' + itemName,
            'rvprop': 'content',
            'redirects': '',
            'format': 'json'
        },
        dataType: 'json',
        success: ajaxSuccess,
        error: ajaxError,
        url: mw.config.get( 'wgScriptPath' ) + '/api.php',
        timeout: 10000 // millisec
    });
}