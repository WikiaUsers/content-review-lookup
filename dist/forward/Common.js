// JS for the table with both "fandom-table" and "mw-collapsible" class: makes it jump to the table's first row when the collapse button is clicked
$(function() {
    $('table.fandom-table.mw-collapsible').each(function(){
        var t = $(this);
        t.find($('a.mw-collapsible-text')).click(function() {
            if ($(this).parent().hasClass('mw-collapsible-toggle-expanded')) {
            	var top = t[0].getBoundingClientRect().top; // position of table.
            	var fandomHeaderHeight = 46; // floating Fandom header height.
            	var y = top + window.pageYOffset - fandomHeaderHeight;
            	if (top < 46) { // Don't scroll into view if already in view.
                	window.scrollTo({top: y});
            	}
            }
        });
    });
});


//Turns redirects to the current page into selflinks
$(function() {
	var list_of_redirects = [];
	var link;
	var txt;
    new mw.Api().get({
		action: "query",
		prop: "redirects",
		titles: mw.config.get("wgPageName"),
		rdlimit: '50',
		format: "json",
		formatversion: 2
	}).done(function(data){
		data.query.pages[0].redirects.forEach(function(rpage) {
			list_of_redirects.push(rpage.title);
		});
		$('.mw-parser-output a.mw-redirect').each(function() {
			link = $(this).attr('href').replace('/wiki/', '').trim();
			for (i = 0; i < list_of_redirects.length; i++) {
				if (list_of_redirects[i] == link) {
					txt = $(this).text();
					$(this).replaceWith( 
						$('<strong>',{
							'class': 'mw-selflink selflink',
							text: txt
						})
					);
					break;
				}
			}
		});
	});
});