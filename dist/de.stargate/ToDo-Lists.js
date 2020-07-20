if(wgPageName == wgFormattedNamespaces[-1] + ':ToDo') {
	$('.page-header__title').text(wgTitle);
	mw.util.$content.empty().append(
		$('<span />',{text: 'Here you can see all your todos'}),
		$('<div />',{class: 'todo-lists'})
	);

	$.getJSON(mw.util.wikiScript('api'),{
        action: 'query',
        prop: 'revisions',
        rvprop: 'content',
        titles: 'MediaWiki:Custom-ToDo-Lists.json',
        format: 'json',
        indexpageids: true,
        v: Math.round(Math.random() * 1000) / 100
    },function(res) {
        lists = JSON.parse(res.query.pages[res.query.pageids[0]].revisions[0]['*']);

		lists.forEach(function(list, key) {
			table = $('<table />',{class: 'wikitable'}).css({width: '50%'}).append(
				$('<caption />',{text: list.name})
			).appendTo('.todo-lists');

			if(list.hasOwnProperty('todos') && !!list.todos.length) {
				list.todos.forEach(function(todo, id) {
                    tr = $('<tr />').append(
                        $('<td />',{html: '&hellip;'}),
                        $('<td />',{text: todo.title}),
                        $('<td />',{class: 'list-item-related'})
                    ).appendTo(table);
                
                    if(todo.hasOwnProperty('related') && !!todo.related.length) {
                        tr.find('.list-item-related').append(
                            $('<strong />',{text: 'related'}),
                            $('<ul />',{class: 'related-list'})
                        );
                        
                        todo.related.forEach(function(related, rid) {
                            tr.find('.related-list').append(
                                $('<li />').append(
                                    $('<a />',{
                                        href: mw.util.wikiGetlink(related),
                                        text: related
                                    })  
                                )  
                            );
                        });
                    }
                });
            }
        });
    });
}