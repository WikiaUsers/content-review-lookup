/* Any JavaScript here will be loaded for all users on every page load. */

document.querySelectorAll('.base-stats-td').forEach(function(ele) {
    var width = ele.style.width;
    var numberWidth = Number(width.substr(0,2))

    var percent = Math.floor((numberWidth / 255) * 100)
    
    var r
	var g
	var b = 0
	
	if (percent < 50) {
		// red to yellow
		r = 255
		g = Math.floor(255 * percent / 50)
	} else {
		// yellow to green
		r = Math.floor(255 * ((50 - percent%50) / 50))
		g = 255
	}
	
	var rgb = 'rgb(' + r  + ',' + g + ',' + b + ')'
	
	ele.style.background = rgb
})