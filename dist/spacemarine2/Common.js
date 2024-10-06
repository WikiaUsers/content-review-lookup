/* Any JavaScript here will be loaded for all users on every page load. */
console.log('Hello World from MediaWiki:Common.js! Document readyState: ' + document.readyState)

window.tooltips_config = {
    noCSS: true,
}

/* Not needed as of https://spacemarine2.fandom.com/wiki/Template:SM2Tooltip?oldid=1575 */
// function decodeData(str) {
// 	/* Reverse tooltip data encoding done by https://spacemarine2.fandom.com/wiki/Template:TooltipData */
// 	return (str
// 		.replace(/(^|[^\\])\\\)/g,'$1>')
// 		.replace(/(^|[^\\])\\\(/g,'$1<')
// 		.replace(/(^|[^\\])\\\./g,'$1\'')
// 		.replace(/(^|[^\\])\\,/g,'$1"')
// 		.replace(/\\\\/g,'\\')
// 	)
// }

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

function doPreloadTooltips(tooltips) {
    /* I really wish there was a better way to preload tooltips than this mouseover/mouseout hack */
    var $wrapper = $('#tooltip-wrapper')
    var wrapperOldVisibility = $wrapper.css('visibility')
    var wrapperWasShown = !$wrapper.is(':hidden')
    $wrapper.css('visibility', 'hidden') // Ensure none of the tooltips shows while preloading.
    
    var $tooltips = $(tooltips)
    $tooltips.trigger('mouseover')

    // tooltip's mouseover handler calls $wrapper.show(), so ensure it's hidden.
    $wrapper.hide()
    
    // For the mouseover event to trigger we need to wait a frame before triggering mouseout
    nextFrame(function() {
        $tooltips.trigger('mouseout')
        
        if ($wrapper.css('visibility') == 'hidden') {
            // Undo visibility:hidden if it's still hidden
        	$wrapper.css('visibility', wrapperOldVisibility)
        }
        if (wrapperWasShown) {
            // Show tooltip wrapper if it was shown before preloading
            $wrapper.show()
        }
    })
}

function preloadTooltips(tooltipClass) {
    var preloadTooltips = []
    var tooltips = document.getElementsByClassName(tooltipClass)
    for (var i = 0, l = tooltips.length; i < l; i++) {
        var tooltip = tooltips[i]
        var $tooltip = $(tooltip)
        if (yesno($tooltip.data('preload'))) {
            preloadTooltips.push(tooltip)
        }
    }
    if (preloadTooltips.length) {
    	console.log('[tooltip preload] Tooltips marked for preloading:', preloadTooltips)
        doPreloadTooltips(preloadTooltips)
    }
}

function onTooltipsReady(callback) {
    /* Wait until #tooltip-wrapper exists inside document body and then calls callback on next frame */
    if (document.getElementById('tooltip-wrapper')) {
        console.log('tooltips are now ready!')
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
                            console.log('tooltips are now ready!')
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
                    console.log('tooltips are now ready!')
                    callback() // Since we're using an interval we don't need to wait until next frame
                }
            }, 1000 / 20)
        }
    }
}

function init() {
    migrateTooltips('sm2-tooltip')
    onTooltipsReady(function() {
        preloadTooltips('sm2-tooltip')
    })
}

$(init) // run init on DOM ready