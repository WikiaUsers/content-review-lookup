/* Any JavaScript here will be loaded for all users on every page load. */
console.log('Hello World from MediaWiki:Common.js! Document readyState: ' + document.readyState)

window.tooltips_config = {
    noCSS: true,
}

function data(e, dataKey) {
	return $(e).data(dataKey)
}

window.tooltips_list = [
    {
        classname: 'sm2-tooltip',
        parse: function(e) {
			return ('{{SM2Tooltip/box'
				+ '|title=' + data(e,'title')
				+ '|text=' + data(e,'text')
				+ '|subtitle=' + data(e,'subtitle')
				+ '|quality=' + data(e,'quality')
				+ '|criteria=' + data(e,'criteria')
				+ '|footer=' + data(e,'footer')
				+ '}}'
			)
        },
        onShow: function (element) {
            if (isCurrentlyPreloadingTooltips('sm2-tooltip')) return
            if (canPreloadTooltips('sm2-tooltip')) {
                /* Lazy preload all tooltips of same class when one is triggered. */
                /* TODO: make preload-groups and only preload tooltips of the same preload-group instead all tooltips of same class */
                preloadTooltips('sm2-tooltip', element)
            }
        }
    }
]

/* Migration from advanced-tooltip to custom tooltips; Removes advanced-tooltip class to avoid duplicate tooltips.*/
function migrateTooltips(customTooltipClass) {
	var tooltips = document.getElementsByClassName(customTooltipClass)
    for (var i = 0, l = tooltips.length; i < l; i++) {
		var e = tooltips[i]
		if (e.classList.contains('advanced-tooltip')) {
			e.classList.remove('advanced-tooltip')
			
			/* Housekeeping: Delete old tooltip contents to make the DOM more simple because we don't need it anymore. */
			var didDeleteContents = false
			var tooltipContents = e.getElementsByClassName('tooltip-contents')
			for (var j=0, numContents=tooltipContents.length; j<numContents; j++) {
				tooltipContents[j].remove()
				didDeleteContents = true
			}
			
			console.log('[' + customTooltipClass + ' migration] Removed class "advanced-tooltip"' + (didDeleteContents ? ' and tooltip contents' : '') + ' from', e)
		}
	}
}

function yesno(str) {
    if (typeof str === 'string') {
        switch (str.trim().toLowerCase()) {
            case 'false':
            case 'no':
            case '0':
            case '':
                return false
            default:
                return true
        }   
    }
    else {
        return Boolean(str)
    }
}

var nextFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {  window.setTimeout(callback, 1000 / 60) }

function doPreloadTooltips(tooltips, callback) {
    /* I really wish there was a better way to preload tooltips than this mouseover/mouseout hack,
       but dev:Tooltips.js doesn't expose any functions to do this. */
    var $wrapper = $('#tooltip-wrapper')    
    var wrapperWasShown = !$wrapper.is(':hidden')
    
    var $shownTooltips = $wrapper.find('.main-tooltip')

    var $tooltips = $(tooltips)
    $tooltips.trigger('mouseover')
    /* Move all preloaded tooltips to storage */
    $wrapper.find('.main-tooltip').not($shownTooltips).appendTo('#tooltip-storage')
    
    /* For the mouseover event to trigger we need to wait a frame before triggering mouseout */
    nextFrame(function () {
        /* Shown tooltips might have changed since previous frame */
        $shownTooltips = $wrapper.find('.main-tooltip')
        
        $tooltips.trigger('mouseout')
        
        /* dev:Tooltips.js's mouseout event handler moves all tooltips in the wrapper to storage and hides
        the wrapper, so make sure previously shown tooltips are back the wrapper and that the wrapper is shown. */
        $wrapper.prepend($shownTooltips)
        if (wrapperWasShown) {
            $wrapper.show()
        }
        
        if (typeof callback === 'function') callback()
    })
}

var preloadTooltipState = {
    /* Value meaning:
        undefined = not previously preloaded
        true = currently being preloaded
        false = preloaded in the past
    */
}
function isCurrentlyPreloadingTooltips(tooltipClass) {
    return preloadTooltipState[tooltipClass] === true
}
function canPreloadTooltips(tooltipClass) {
    return preloadTooltipState[tooltipClass] === undefined
}

function preloadTooltips(tooltipClass, excludedTooltips, callback) {
    preloadTooltipState[tooltipClass] = true
    if (!(excludedTooltips instanceof Array)) excludedTooltips = [excludedTooltips]
    
    var preloadTooltips = []
    var tooltips = document.getElementsByClassName(tooltipClass)
    for (var i = 0, l = tooltips.length; i < l; i++) {
        var tooltip = tooltips[i]
        if (excludedTooltips.indexOf(tooltip) >= 0) {
            console.log('[' + tooltipClass +' preload] Skipping preloading toolip:', tooltip)
            continue
        }
        var $tooltip = $(tooltip)
        // Only preload if it's enabled and hasn't already been loaded.
        if (yesno($tooltip.data('preload')) && !$tooltip.data('tooltip-id-' + tooltipClass)) {
            preloadTooltips.push(tooltip)
        }
    }
    var numPreloadTooltips = preloadTooltips.length
    if (numPreloadTooltips) {
        console.log('[' + tooltipClass +' preload] Tooltips marked for preloading:', preloadTooltips)
        var preloadComplete = function() {
            preloadTooltipState[tooltipClass] = false
        	if (typeof callback === 'function') callback()
        }
        
        if (typeof doPreloadTooltipsBulk === 'function' && doPreloadTooltipsBulk.isReady()) {
        	/* If we have doPreloadTooltipsBulk.js available via ImportJS and it's ready, then use it */
	        console.log('[' + tooltipClass +' preload] Bulk preloading tooltips...')
	        
        	doPreloadTooltipsBulk(tooltipClass, preloadTooltips, function() {
            	console.log('[' + tooltipClass +' preload] Bulk preloading tooltips complete!')
        		preloadComplete()
        	})
        }
        else {
	        /* Gradually preload the tooltips with a small delay between each preload */
	        console.log('[' + tooltipClass +' preload] Gradually preloading tooltips...')
	        
	        var i = 0
	        var lastIndex = numPreloadTooltips - 1
	        var preloadNextTooltip = function () {
	            if (i > lastIndex) return
	            if (i === lastIndex) {
	                doPreloadTooltips(preloadTooltips[i], function() {
		            	console.log('[' + tooltipClass +' preload] Gradually preloading tooltips complete!')
		        		preloadComplete()
		        	})
	            }
	            else {
	                doPreloadTooltips(preloadTooltips[i])
	                i++
	                setTimeout(preloadNextTooltip, 1000 / 10)
	            }
	        }
	        preloadNextTooltip()
        } 
    }
}

function onTooltipsReady(callback) {
    /* Wait until #tooltip-wrapper exists inside document body and then calls callback on next frame. */
    /* The callback call on next frame is to make sure we're not racing against dev:Tooltips.js's init. */
    if (document.getElementById('tooltip-wrapper')) {
        console.log('Tooltips are now ready!')
        if (typeof callback !== 'function') return
        nextFrame(callback)
    }
    else {
        if (MutationObserver) {
            console.log('Waiting for tooltip wrapper via MutationObserver')
            var handler = function (records, observer) {
                for (var i = 0, numRecords = records.length; i < numRecords; i++) {
                    var addedNodes = records[i].addedNodes
                    for (var j = 0, numNodes = addedNodes.length; j < numNodes; j++) {
                        if (addedNodes[j].id === 'tooltip-wrapper') {
                            observer.disconnect()
                            console.log('Tooltips are now ready!')
                            if (typeof callback !== 'function') return
                            nextFrame(callback)
                            return
                        }
                    }
                }
                
            }
            var observer = new MutationObserver(handler)
            observer.observe(document.body, {
                childList: true
            })
        }
        else {
            console.log('Waiting for tooltip wrapper via interval')
            var interval = setInterval(function () {
                if (document.getElementById('tooltip-wrapper')) {
                    clearInterval(interval)
                    console.log('Tooltips are now ready!')
                    if (typeof callback !== 'function') return
                    /* Since we're using an interval we don't really need to wait until next frame, because
                       we're already delayed at detecting the wrapper. But do it anyway for consistency. */
                    nextFrame(callback)
                }
            }, 1000 / 20)
        }
    }
}

function init() {
    migrateTooltips('sm2-tooltip')
    if (typeof doPreloadTooltipsBulk === 'function') {
    	/* If we have doPreloadTooltipsBulk.js available via ImportJS, then initialize it */
    	doPreloadTooltipsBulk.init()
    }
    // onTooltipsReady(function() {
    //     preloadTooltips('sm2-tooltip')
    // })
}

$(init) // run init on DOM ready