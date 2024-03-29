/* Content put here is loaded for everything, all skins, mobile or desktop. */
(function() {
	"use strict";

	//OOUI-based tabber
	mw.hook( "wikipage.content" ).add( function ($content) {
		var $tabberElements = $content.find( ".fehwiki-tabber" );
		if ($tabberElements.length > 0) { //Only load the modules and run the Javascript if there is a fehwiki-tabber in the page.
			mw.loader.using("oojs-ui-widgets").then(function() {
				var CSS_END_REGEX = /;\s*$/;
				var ALLOWED_MW_ATTRIBUTES_TO_ADD = ["dir","id","lang","title","itemid","itemprop","itemref","itemscope","itemtype"];
				var uniqueNumber = 0;
				var INDEX_LAYOUT_OPTIONS = {
					expanded: false,
					autoFocus: false
				};

				function isNotWhitespaceOnly(_, ele) {
					var $ele = $( ele );
					return (ele.nodeType !== 3 && ( !$ele.is( "p" ) )) || /\S/.test( $ele.text() );
				}

				var convertToOOUITabber = function(_, ele) {
					var $ele = $( ele );
					var tabPanelLayouts = [];
					var $rootTabberElement;
					var indexLayout = new OO.ui.IndexLayout(INDEX_LAYOUT_OPTIONS);
					var $tabberContents = ( $ele.is( "noscript" ) ? $( $ele.text() ) : $ele.contents() );

					var $currentNode;
					var i = $tabberContents.length-1;
					var j = i+1;
					while (i >= 0) {
						$currentNode = $( $tabberContents.get( i ) );
						if ($currentNode.is( ".fehwiki-tab-header" )) {
							tabPanelLayouts.push(new OO.ui.TabPanelLayout("TB" + uniqueNumber++, {
								expanded: false,
								label: $currentNode.contents(),
								$content: $tabberContents.slice(i+1,j)
							}));
							j = i;
						}
						i--;
					}
					if (j !== 0) { //Add nodes that come before the first tab header into an unlabeled tab
						var $nodesWithoutHeader = $tabberContents.slice(i+1,j);
						if ($nodesWithoutHeader.is( isNotWhitespaceOnly )) { //But only if it's not completely whitespace
							tabPanelLayouts.push(new OO.ui.TabPanelLayout(uniqueNumber++, {
								expanded: false,
								$content: $nodesWithoutHeader
							}));
						}
					}
					i = null;
					j = null;

					tabPanelLayouts.reverse();
					indexLayout.addTabPanels(tabPanelLayouts);
					$rootTabberElement = (new OO.ui.PanelLayout( {
							expanded: false,
							framed: true,
							classes: $ele.attr("class").split(/\s+/).filter(function(clas) { return clas !== "fehwiki-tabber"; }),
							content: [ indexLayout ]
						})).$element;

					//If it has one, adds the inline style the non-transformed element has to the new tabber element. Concatenates to the default OOUI style attribute if it exists.
					$rootTabberElement.attr( "style", function(_, attr) {
						var s = $ele.attr( "style" );
						return attr ? s + (CSS_END_REGEX.test(attr) ? "" : ";") + attr : s;
					} );
					//If it has one, add single-value attributes from the non-transformed element to the new tabber element. Completely replaces the default OOUI ones if they exist.
					var attributeToCheck;
					for (i = 0; i < ALLOWED_MW_ATTRIBUTES_TO_ADD.length; i++) {
						attributeToCheck = ALLOWED_MW_ATTRIBUTES_TO_ADD[i];
						$rootTabberElement.attr( attributeToCheck, $ele.attr( attributeToCheck ) );
					}
					i = null;

					$ele.replaceWith( $rootTabberElement );
				};
				do {
					$tabberElements.each( convertToOOUITabber );
					$tabberElements = $content.find( ".fehwiki-tabber" );
				} while ($tabberElements.length > 0);
				convertToOOUITabber = null; //Preventing closure memory leak? Hard to tell since OOUI has memory leaks of its own
				if (location.hash !== "") { // Re-jump to anchor after creating all tabber elements, since the insertion of elements does not accordingly scroll the browser view
					var temp = location.hash;
					location.hash = "";
					location.hash = temp;
				}
			});
		}
	} );
})();