//OOUI-based tabber
mw.hook( "wikipage.content" ).add( function ($content) {
	var $tabberElements = $content.find( ".no-history-tabber" );
	if ($tabberElements.length > 0) { //Only load the modules and run the Javascript if there is a fehwiki-tabber in the page.
		mw.loader.using("oojs-ui-widgets").then(function() {
			var TABBER_HEADER_CLASS = "no-history-tab-header";
			var TABBER_HEADER_CLASS_SELECTOR = "."+TABBER_HEADER_CLASS;
			var CSS_END_REGEX = /;\s*$/;

			var uniqueNumber = 0;
			var INDEX_LAYOUT_OPTIONS = {
				expanded: false,
				autoFocus: false
			};

			$tabberElements.each( function(_, ele) {
				var tabPanelLayouts = [];
				var $rootTabberElement;
				var indexLayout = new OO.ui.IndexLayout(INDEX_LAYOUT_OPTIONS);
				$( ele ).children( TABBER_HEADER_CLASS_SELECTOR ).each( function (_, tabHeaderEle) {
					var contents = [];

					$( tabHeaderEle ).nextUntil( TABBER_HEADER_CLASS_SELECTOR ).each( function(_, node) {
						contents.push(node);
					} );

					tabPanelLayouts.push(new OO.ui.TabPanelLayout(tabHeaderEle.textContent + uniqueNumber++, {
						expanded: false,
						scrollable: false,
						label: new OO.ui.HtmlSnippet(tabHeaderEle.innerHTML),
						content: contents
					}));
				} );
                indexLayout.addTabPanels(tabPanelLayouts);
				if ($(ele).attr("data-tab-default") !== undefined) {
				    const activeTabIdx = parseInt($(ele).attr("data-tab-default")) - 1;
				    if (!isNaN(activeTabIdx) && activeTabIdx >= 0 && activeTabIdx < tabPanelLayouts.length) {
				        indexLayout.setTabPanel(tabPanelLayouts[activeTabIdx].name);
				    }
				}
				$rootTabberElement = (new OO.ui.PanelLayout( {
						expanded: false,
						classes: ["no-history-tabber"],
						content: [ indexLayout ]
					})).$element;
					
				//If it has one, adds the inline style the fehwiki-tabber div element has to the new tabber element
				$rootTabberElement.attr( "style", function(_, attr) {
					var s = $( ele ).attr( "style" );
					return attr ? s + (CSS_END_REGEX.test(attr) ? "" : ";") + attr : s;
				} );

				$( ele ).replaceWith( $rootTabberElement );
			});
		});
	}
} );
//End tabber