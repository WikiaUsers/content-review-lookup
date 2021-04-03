if (document.readyState === 'loading') {
	$(document).ready(addAnonSidebar);
} else {
	addAnonSidebar();
}

function addAnonSidebar() {
    if(mw.config.get('wgUserName') === null) {
        var newSection = '<section id="sidebar" class="module"></section>';
        $('#WikiaRail').append(newSection);
        $.getJSON(mw.util.wikiScript('api') + '?action=parse&text={{Sidebar}}&format=json', function(data) {
            var code = data.parse.text['*'];
            $('section#sidebar').append(code);
        });
    }
}