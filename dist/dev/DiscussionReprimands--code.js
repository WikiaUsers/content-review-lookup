importArticle({
    type: "style",
    article: "MediaWiki:DiscussionReprimands/style.css"
});
 
if(!window.hasOwnProperty('dev')) {
    window.dev = {};
}
if(!window.dev.hasOwnProperty('discussions')) {
    window.dev.discussions = {};
}
if(!window.dev.discussions.hasOwnProperty('reprimands')) {
    window.dev.discussions.reprimands = {};
}
if(!window.dev.discussions.reprimands.hasOwnProperty('page')) {
    window.dev.discussions.reprimands.page = wgFormattedNamespaces[4] + ':Reprimands';
}
if(wgPageName === window.dev.discussions.reprimands.page && wgAction === 'view') {
    $.getJSON(mw.util.wikiScript('api'),{
    	action: 'query',
    	prop: 'revisions',
    	rvprop: 'content',
    	titles: 'MediaWiki:Custom-DiscussionReprimands.json',
    	format: 'json',
    	indexpageids: true,
    	q: Math.random()
    },function(res) {
    	displayReprimands(JSON.parse(res.query.pages[res.query.pageids[0]].revisions[0]['*']));
    });
 
    function displayReprimands(reprimands) {
        mw.util.$content.empty().append(
        	$('<table />',{class: 'wikitable'}).append(
        		$('<thead />').append(
        			$('<tr />').append(
                    	$('<th />',{text: 'Username'}),
                    	$('<th />',{text: 'Reprimands'}),
                    	$('<th />',{text: 'Date'}),
                    	$('<th />',{text: 'Reason'}),
                    	$('<th />',{text: 'Actions'})
        			)
        		),
        		$('<tbody />',{class: 'reprimand-list'})
        	)
        );
    	reprimands.forEach(function(reprimand, idx) {
    	    var count = reprimand.reprimands.length;
    	    var sum = reprimand.reprimands.reduce(function(a,b) {
    	        return a + b.level;
    	    },0);
    	    var tr = $('<tr />').append(
	            $('<td />',{rowspan: count}).append(
	                $('<a />',{
	                    href: mw.util.getUrl(reprimand.name),
	                    text: reprimand.name
                    })    
                ),
                $('<td />',{rowspan: count, text: sum}),
                $('<td />'),
                $('<td />'),
                $('<td />',{rowspan: count})
            ).appendTo($('.reprimand-list'));
            if(count >= 1) {
                tr.find(':nth-child(3)').text(reprimand.reprimands[0].date);
                tr.find(':nth-child(4)').text(reprimand.reprimands[0].reason);
                reprimand.reprimands.shift();
            } 
            if(count > 1) {
                reprimand.reprimands.forEach(function(entry, ids) {
                    $('<tr />').append(
                        $('<td />',{text: entry.date}),
                        $('<td />',{text: entry.reason})
                    ).appendTo($('.reprimand-list'));
                });
            }
        });
        $('.faq .answer').hide();
        $('.faq .question').click(function() {
            $(this).next().toggle();
        });
    }
}