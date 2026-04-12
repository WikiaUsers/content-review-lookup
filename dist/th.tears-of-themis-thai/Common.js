/* จาวาสคริปต์ใด ๆ ในหน้านี้จะถูกโหลดให้แก่ผู้ใช้ทุกคนในทุกหน้า */

/*
 * @name: WdsTooltips
 * @author: KhangND (idea by 机智的小鱼君)
 * @refactoring: Suggon
 * @description: documented at https://dev.fandom.com/WdsTooltips
 */
(function () {
    var $container = $('#mw-content-text');

    if (window.WdsTLoaded || $container.length === 0) {
        return;
    }
    window.WdsTLoaded = true;

    var containerBound = {
        left:   $container.offset().left,
        right:  $container.offset().left + $container.width(),
        bottom: $container.offset().top  + $container.height()
    };
    
    var align = {
        left:  'wds-is-right-aligned',
        right: 'wds-is-left-aligned',
        top:   'wds-is-flipped'
    };

    $('.custom-tooltip > *').on('mouseenter focusin', adjustBounds);

    function adjustBounds() {
        var tip = $(this).parent().children('.wds-dropdown__content')[0];
        var $tip = $(tip);

        //fix for short pages
        if($container.height() < $tip.height()) {
            $('#content').css('overflow', 'unset');
            return;
        }
        
        //fix for tooltips clipped inside portable infobox
        var $piData = $(this).parents('.pi-data');
        if ($piData) {
            $piData.css('overflow', 'unset');
        }

        //check bounds
        var tipBound = {
            left:   $tip.offset().left,
            right:  $tip.offset().left + $tip.width(),
            bottom: $tip.offset().top  + $tip.height()
        };

        //check overflow
        var overflow = {
            left:   tipBound.left   < containerBound.left,
            right:  tipBound.right  > containerBound.right,
            bottom: tipBound.bottom > containerBound.bottom
        };

        //adjust bounds as necessary
        if (overflow.left)   $tip.addClass(align.right);
        if (overflow.right)  $tip.addClass(align.left).removeClass(align.right);
        if (overflow.bottom) $tip.parent().addClass(align.top);

        //trigger scroll to display lazy loading images
        $(window).trigger('scroll');
    }
})();

/* ==========================================================
   No History Tabber system (for Template:Tab)
   ========================================================== */
;(function(mw, $) {
	$(document).ready(function() {
		//OOUI-based tabber
		mw.hook( "wikipage.content" ).add( function ($content) {
			var $tabberElements = $content.find( ".no-history-tabber" );
			if ($tabberElements.length > 0) { //ทำงานเฉพาะหน้าที่มีคลาสนี้
				mw.loader.using("oojs-ui-widgets").then(function() {
					var TABBER_HEADER_CLASS = "no-history-tab-header";
					var TABBER_HEADER_CLASS_SELECTOR = "."+TABBER_HEADER_CLASS;
					var CSS_END_REGEX = /;\s*$/;
		
					var uniqueNumber = 0;
					var INDEX_LAYOUT_OPTIONS = {
						classes: ['no-history-tabber-index'],
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
								classes: ['no-history-tabber-tab'],
								expanded: false,
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
								classes: ['no-history-tabber-panel'],
								expanded: false,
								content: [ indexLayout ]
							})).$element;
							
						//ดึงสไตล์ที่เขียนแทรกมาใส่
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
	});
})(mediaWiki, jQuery);