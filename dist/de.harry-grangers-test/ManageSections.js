mw.util.$content.find(':header').each(function(key,val) {
	$(this).css('overflow','visible');
	$(this).find('.editsection').empty().append(
		$('<div />',{class: 'wds-dropdown'}).append(
            $('<div />',{class: 'push-dropdown-down wds-dropdown__toggle'}).append(				
            	$('<span  />').append(
					'&emsp;&emsp;',
					'<svg id="wds-icons-menu" viewBox="0 0 24 24" width="12px" height="12px"><path fill-rule="evenodd" d="M23 11H1a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2zm0-7H1a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2zm0 14H1a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2z"></path></svg>',
					'&emsp;',
					'Options'
				),
            	'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wds-icons-dropdown-tiny"></use></svg>',
            ),
            $('<div />',{class: 'wds-is-not-scrollable wds-dropdown__content'}).append(		
                $('<ul />',{class: 'wds-list wds-is-linked'}).css('margin-left','15px').append(
                	$('<li />').css({
						'margin-left': 0,
    					'list-style-type': 'none'
					}).append(
						$('<a />',{href: '/wiki/' + wgPageName + '?action=edit&section=' + key}).css({
							    'padding-top': 0,
                                'padding-bottom': 0,
                                'padding-left': 0
						}).append(
							'<svg id="wds-icons-pencil" viewBox="0 0 24 24" width="12px" height="12px"><path d="M1.293 16.293A1 1 0 0 0 1 17v5a1 1 0 0 0 1 1h5c.265 0 .52-.105.707-.293L19 11.414 12.586 5 1.293 16.293zm21.414-10l-5-5a.999.999 0 0 0-1.414 0L14 3.586 20.414 10l2.293-2.293a.999.999 0 0 0 0-1.414z" fill-rule="evenodd"></path></svg>',
							'&emsp;',
							'Edit'
						)
					),
                	$('<li />').css({
						'margin-left': 0,
    					'list-style-type': 'none'
					}).append(
						$('<a />').css({
							    'padding-top': 0,
                                'padding-bottom': 0,
                                'padding-left': 0
						}).append(
							'<svg id="wds-icons-trash" viewBox="0 0 24 24" width="12px" height="12px"><g fill-rule="evenodd"><path d="M18.417 21.167H5.583V6.5h12.834v14.667zM9.25 2.833h5.5v1.834h-5.5V2.833zm12.833 1.834h-5.5v-2.75A.916.916 0 0 0 15.667 1H8.333a.917.917 0 0 0-.916.917v2.75h-5.5a.917.917 0 0 0 0 1.833H3.75v15.583c0 .507.41.917.917.917h14.666c.507 0 .917-.41.917-.917V6.5h1.833a.916.916 0 1 0 0-1.833z"></path><path d="M12 9.25a.917.917 0 0 0-.917.917V17.5a.916.916 0 1 0 1.834 0v-7.333A.917.917 0 0 0 12 9.25m-3.667 0a.917.917 0 0 0-.916.917V17.5a.916.916 0 1 0 1.833 0v-7.333a.917.917 0 0 0-.917-.917m6.417.917V17.5a.916.916 0 1 0 1.833 0v-7.333a.916.916 0 1 0-1.833 0"></path></g></svg>',
							'&emsp;',
							'Delete'
						).click(deleteSection.bind(this,key))
					),
                	$('<li />').css({
						'margin-left': 0,
    					'list-style-type': 'none'
					}).append(
						$('<a />').css({
							    'padding-top': 0,
                                'padding-bottom': 0,
                                'padding-left': 0
						}).append(
							'<svg id="wds-icons-arrow" viewBox="0 0 24 24" width="12px" height="12px"><path fill-rule="evenodd" d="M22.999 12a1 1 0 0 0-1-1H4.413l5.293-5.293a.999.999 0 1 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.415l7 7a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.415L4.413 13h17.586a1 1 0 0 0 1-1"></path></svg>',
							'&emsp;',
							'Move'
						).click(moveSection.bind(this,key,'22. Juli'))
					)
				)
			)
		)
	);
});

function deleteSection(sectionNo) {
    getRevSection(sectionNo,saveDeleted.bind(this,pageContent,sectionNo));
}

function saveDeleted(pageContent,sectionNo,callback) {
    firstLine = pageContent.split('\n')[0];
    sectionTitle = firstLine.match(/^(?:=+)([^=]*)(?:=+)$/)[1];
    $.post('/api.php',{
        action: 'edit',
        title: wgPageName,
        section: sectionNo,
        summary: 'Delete section "' + sectionTitle + '"',
        text: '',
        token: mw.user.tokens.get('editToken'),
        format: 'json'
    },function(res) {
		if(arguments.length == 3 && typeof callback == 'function' && res.edit.result == 'Success') {
			callback(res);
        }
		else {
			console.log(arguments.length,typeof callback == 'function',res.edit.result);
        }
    },'json');
}

function moveSection(sectionNo,targetPage) {
	getRevSection(sectionNo,function(pageContent) {
		saveDeleted(pageContent,sectionNo,function(res) {
            firstLine = pageContent.split('\n')[0];
            sectionTitle = firstLine.match(/^(?:=+)([^=]*)(?:=+)$/)[1];
            $.post('/api.php',{
                action: 'edit',
                title: targetPage,
                section: 'new',
                sectiontitle: sectionTitle,
                summary: 'Move section "' + sectionTitle + '" from [[' + res.edit.title + ']] ([[Spezial:Diff/' + res.edit.oldrevid + '/' + res.edit.newrevid + '|Diff]]) ([{{fullurl:' + wgPageName + '|action=edit&undoafter=' + res.edit.oldrevid + '&undo=' + res.edit.newrevid + '}} undo])',
                text: pageContent,
                token: mw.user.tokens.get('editToken'),
                format: 'json'
            },function(res) {
                console.log(res);
            },'json');
        });
    });
}

function getRevSection(sectionNo,callback) {
    $.get('/api.php?action=query&prop=revisions&pageids=' + wgArticleId + '&rvprop=content&rvsection=' + sectionNo + '&indexpageids&format=json',function(res) {
		callback(res.query.pages[res.query.pageids[0]].revisions[0]['*']);
    });
}