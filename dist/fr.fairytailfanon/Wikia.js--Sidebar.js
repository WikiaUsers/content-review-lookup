mw.hook('dev.wds').add(function(wds) {
	$(document).ready(function() {
	    var newSection = '<section id="sidebar-mdm" class="rail-module">' +
	    					'<h2 class="rail-module__header">' + 
	    						'<div class="wds-icon-small" id="dev-wds-icons-user"></div>' +
	    						'Mage du moment' + 
	    					'</h2>' + 
	    				 '</section>';
	    $('#WikiaRail').append(newSection);
	    $.getJSON('/fr/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
	        var code = data.parse.text['*'];
	        $('section#sidebar-mdm').append(code);
	    });
	wds.render('#sidebar-mdm');
	});
});
importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });