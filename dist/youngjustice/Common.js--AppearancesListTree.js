//********************************************************************************
// Start "Hidden appearances section/interactive tree" script; by [[User:Bp]] and modified by [[User:KettleMeetPot]]
//********************************************************************************

var tree = 0;
var pane = 0;
var paneListForThisTree = [];
var descriptionString = new String("This list contains %d items"); //%d is where the number of items is inserted

var smallTreeCount = 4; // less leaves than this, the tree will be open at first
var interactiveTrees = 1; // set this to 0 in user.js to turn this off

function $button(text,myClass,toggle) {
	var $b = $('<a>');
	$b.html(text).attr('class',myClass).css('cursor','pointer');
	if (toggle.length > 0) {
		$b.data('toggle',toggle.join(' '));
		$b.on('click.appear',function() {
			var tSplit = $(this).data('toggle').split(' ');
			for (var i in tSplit) $('#' + tSplit[i]).toggleClass('hiddenlist visiblelist');
		});
	}
	return $b;
}

function recursiveCountAndMark(e, depth, nocount) {
	var si = e.firstChild;
	var total = 0;
	while(si) {
		var tn = (si.tagName) ? si.tagName.toLowerCase() : '';
		if (tn == "li") { total++; }
		var subtotal = recursiveCountAndMark(si, depth+1, nocount);
		if (tn == "ul" || tn == "ol") {
			if (depth > 1) {
				var siID = 'Pane' + pane++;
				$(si).attr('id',siID);
				paneListForThisTree.push(siID);
				$(si).addClass('hiddenlist');
				$(si).before('(').before($button( (nocount) ? "+/-" : subtotal, 'listexpand-'+siID, [siID])).before(')');
				total--; // don't count the li that this ul/ol is in
			}
			else {
				// we are finished and this is the top ul/ol
				if (subtotal < smallTreeCount) { // this small enough they can be visible right away
					for (var i=0;i<paneListForThisTree.length;i++) {
						$('#'+paneListForThisTree[i]).toggleClass('hiddenlist visiblelist');
					}
				}
		        var ds = (nocount) ? "" : descriptionString.replace(/\%d/g, subtotal);
				
		        $(si).before($('<div>').attr('class','listTreeHeader').html(ds));

                var $currentButton = $button('show all', 'listAllButton', []);

				$(si).parent().children().eq(0).append(' (').append($currentButton).append(')');

				$currentButton.data('toggle',paneListForThisTree.join(' '));
				$currentButton.on('click.appear',function() {
					var tSplit = $(this).data('toggle').split(' ');
					for (var i in tSplit) $('#' + tSplit[i]).removeClass('hiddenlist').addClass('visiblelist');
		        });
				$currentButton.click(function () {
				    if ( $currentButton.html() === "show all") {
				        $currentButton.html("hide all");
				        $currentButton.off('click.appear');
				        $currentButton.on('click.appear',function() {
				        	var tSplit = $(this).data('toggle').split(' ');
							for (var i in tSplit) $('#' + tSplit[i]).removeClass('visiblelist').addClass('hiddenlist');
				        });
				    }
				    else {
				        $currentButton.html("show all");
				        $currentButton.off('click.appear');
				        $currentButton.on('click.appear',function() {
				        	var tSplit = $(this).data('toggle').split(' ');
							for (var i in tSplit) $('#' + tSplit[i]).removeClass('hiddenlist').addClass('visiblelist');
				        });
				    }
				});
			}
		}
		total += subtotal;
		si = si.nextSibling;
	}
	return total;
}

function doAppearancesTrees() {
	if (!interactiveTrees) { return; }

	$('div.appear').each(function() {
		recursiveCountAndMark(this, 0, $(this).hasClass('nocount') ? 1 : 0);
		paneListForThisTree = [];
		tree++;
	});
	
	// fix a bug noticed by renegade54
	// jump to the named anchor again
	if (window.location.hash && tree > 0) {
		// still won't work 100% in safari and khtml
		if (navigator.userAgent.indexOf("MSIE") != -1) {
			window.location = window.location.hash; // -- causes Firefox to fire onload events
		} else {
			window.location.hash = window.location.hash;
		}
	}

}

$(doAppearancesTrees);