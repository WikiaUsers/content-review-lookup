/* See also:
https://gerrit.wikimedia.org/r/plugins/gitiles/mediawiki/core/+/refs/tags/1.39.7/resources/src/jquery/jquery.makeCollapsible.js
*/
	
function init() {
	console.log('[customtoggle-sync] init')
	
	$('.customtoggle-sync').each(function() {
		var $this = $(this)
		var collapsed = Boolean($this.data('collapsed'))
		var $toggleText = $this.find(".customtoggle-sync-text")
	
		var updateToggleText = function() {} // NOOP
		if ($toggleText.length) {
			var expandText = $this.data('expandtext') || mw.msg( 'collapsible-expand' )
			var collapseText = $this.data('collapsetext') || mw.msg( 'collapsible-collapse' )
	
			updateToggleText = function() {
				$toggleText.text(collapsed ? expandText : collapseText)
			}
		}
	
		var expandFuncs = []
		var collapseFuncs = []
		var classList = this.classList
		for(var i=0, l=classList.length; i<l; i++) {
			var className = classList[i]
			if(className.indexOf('mw-customtoggle-') !== 0) continue
			var id = className.replace('mw-customtoggle', 'mw-customcollapsible')
			var collapsible = document.getElementById(id)
			if (collapsible) {
				var methods = $(collapsible).data('mw-collapsible')
				expandFuncs.push(methods.expand)
				collapseFuncs.push(methods.collapse)
			}
		}
	
		function expand() {
			for(i=0, l=expandFuncs.length; i<l; i++) {
				expandFuncs[i]()
			}
		}
		function collapse() {
			for(i=0, l=collapseFuncs.length; i<l; i++) {
				collapseFuncs[i]()
			}
		}
	
		$this.off('click.mw-collapsible keydown.mw-collapsible') // Turn off default toggle behavior
		$this.off('click.collapsible-sync keydown.collapsible-sync')
		$this.on('click.collapsible-sync keydown.collapsible-sync', function (e) {
			if (e) {
				// Mimick jquery.makeCollapsible.js
				if (
					e.type === 'click' &&
					e.target.nodeName.toLowerCase() === 'a' &&
					$( e.target ).attr( 'href' )
				) {
					// Don't fire if a link was clicked (for premade togglers)
					return
				} else if ( e.type === 'keydown' && e.which !== 13 && e.which !== 32 ) {
					// Only handle the "Enter" or "Space" keys
					return
				} else {
					e.preventDefault()
					e.stopPropagation()
				}
			}
			
			
			if (collapsed) {
				expand()
			}
			else {
				collapse()
			}
			collapsed = !collapsed
			$this.data('collapsed', collapsed)
			$this.attr('aria-expanded', collapsed ? 'false' : 'true' )
			updateToggleText()
		})
		
		updateToggleText()
		
		console.log('[customtoggle-sync] patched:', this)
	})
}

mw.hook('wikipage.collapsibleContent').add(init)