$(function(){
	var rights = mw.config.get('wgUserGroups');
	var pagename = 'BlankPage/UnpatrolledEdits';
	var wrongRights =
		rights.indexOf('content-moderator') === -1 &&
		rights.indexOf('helper') === -1 &&
		rights.indexOf('staff') === -1 &&
		rights.indexOf('sysop') === -1 &&
		rights.indexOf('wiki-specialist') === -1;
	
	if (mw.config.get('wgNamespaceNumber') !== -1 || mw.config.get('wgTitle') !== pagename || wrongRights){
		return;
	}
	
	var api = new mw.Api();
	var changes = [];
	var messages = [
		'pagetitle',
		'custom-UnpatrolledEdits-title',
		'custom-UnpatrolledEdits-summary',
		'showingresultsinrange',
		'viewprevnext',
		'prevn',
		'nextn',
		'pipe-separator',
		'specialpage-empty'
	];
	
	api.loadMessagesIfMissing(messages).done(function(){
		var validNamespaces = Object.keys(mw.config.get('wgFormattedNamespaces')).filter(function(x){
			return x >= 0;
		});
		
		var opening = $('#mw-content-text p');
		var searchParams = new URLSearchParams(location.search);
		var limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 1000;
		var offset = searchParams.get('offset') ? Number(searchParams.get('offset')) : 0;
		var namespace = searchParams.get('namespace') ? searchParams.get('namespace') : validNamespaces.join('|');
		var user = searchParams.get('user') ? searchParams.get('user') : '';
		var start = offset + 1;
		var end = offset + limit;
		var list = $('<ol start="' + String(start) + '">');
		var title = mw.message('custom-UnpatrolledEdits-title').text();
		var myModal = $('<div class="oo-ui-panelLayout-padded oo-ui-panelLayout-framed">')
			.append($('<label for="myModalNamespaces">Namespaces</label>'))
			.append($('<textarea id="myModalNamespaces" rows="4" style="display:block;">'+namespace.split('|').join('\n')+'</textarea>'))
			.append($('<label for="myModalUser">User</label>'))
			.append($('<input type="text" value="'+user+'" id="myModalUser" style="display:block;"/>'))
			.append($('<button class="wds-button" id="myModalGo">Go</button>'));
		
		document.title = mw.message('pagetitle', title).text();
		$('#firstHeading').html(title);
		opening.html(mw.message('custom-UnpatrolledEdits-summary').text());
		opening.after(myModal);
		
		$('#myModalGo').click(function(){
			user = $('#myModalUser').val();
			namespace = $('#myModalNamespaces').val().split('\n').filter(function(x){
				return x >= 0;
			}).join('|');
			
			location.href = mw.util.getUrl('Special:' + pagename, {limit:limit, offset:offset, namespace:namespace, user:user});
		});
		
		mw.loader.using(['mediawiki.api'], function(){
			var debounce = (function(){
				var queue = [];
					
				setInterval(function(){
					if (queue.length){
						var func = queue.shift();
						func();
					}
				}, 0);
				
				return function(functionToDebounce){
					function debouncer(){
						var storedArguments = arguments;
						
						function debouncedFunction(){
							functionToDebounce.apply(this, storedArguments);
						}
						
						queue.push(debouncedFunction);
					}
					
					return debouncer;
				};
			}());
			
			requestSome();
			
			function requestSome(continueParameter){
				var params = {
					action:'query',
					list:'recentchanges',
					rcprop:'title|ids',
					rcshow:'!patrolled',
					rclimit:'5000',
					rcnamespace:namespace,
					rccontinue:continueParameter,
				};
				
				if (user){
					params.rcuser = user;
				}
				
				api.get(params).done(function(result){
					if (result.query){
						result.query.recentchanges.forEach(function(edit){
							changes.push(edit);
						});
					}
					
					if (result.continue){
						debounce(requestSome)(result.continue.rccontinue);
					} else {
						renderList();
					}
				}).fail(function(code, data){
					if (code === 'http'){
						log('Error: ' + code + ': ' + JSON.stringify(data), 'error');
					} else {
						log('Error: ' + code + ': ' + typeof data, 'error');
					}
				});
			}
		});
		
		function renderList(){
			if (changes.length === 0){
				myModal.after(mw.message('specialpage-empty').text());
				return;
			}
			
			for (var i = offset; i < ((end > changes.length) ? changes.length : end); i++){
				list.append($('<li><a href="' + mw.util.getUrl(changes[i].title) + '">' + mw.html.escape(changes[i].title) + '</a> (<a href="' + mw.util.getUrl('Special:Diff/' + changes[i].revid) + '">diff</a>)</li>'));
			}
			
			var prev = (offset === 0) ? mw.message('prevn', limit).text() : '<a href="' + mw.util.getUrl('Special:' + pagename, {limit:limit, offset:offset - limit, namespace:namespace, user:user}) + '">' + mw.message('prevn', limit).text() + '</a>';
			var next = (end >= changes.length) ? mw.message('nextn', limit).text() : '<a href="' + mw.util.getUrl('Special:' + pagename, {limit:limit, offset:offset + limit, namespace:namespace, user:user}) + '">' + mw.message('nextn', limit).text() + '</a>';
			
			var range = mw.message('showingresultsinrange', ((end > changes.length) ? changes.length : end) - offset, start, ((end > changes.length) ? changes.length : end)).text();
			var nav = mw.message(
				'viewprevnext',
				prev,
				next,
				((limit === 20) ? '20' : '<a href="' + mw.util.getUrl('Special:' + pagename, {limit:20, offset:offset, namespace:namespace, user:user}) + '">20</a>') + mw.message('pipe-separator').text() +
				((limit === 50) ? '50' : '<a href="' + mw.util.getUrl('Special:' + pagename, {limit:50, offset:offset, namespace:namespace, user:user}) + '">50</a>') + mw.message('pipe-separator').text() +
				((limit === 100) ? '100' : '<a href="' + mw.util.getUrl('Special:' + pagename, {limit:100, offset:offset, namespace:namespace, user:user}) + '">100</a>') + mw.message('pipe-separator').text() +
				((limit === 250) ? '250' : '<a href="' + mw.util.getUrl('Special:' + pagename, {limit:250, offset:offset, namespace:namespace, user:user}) + '">250</a>') + mw.message('pipe-separator').text() +
				((limit === 500) ? '500' : '<a href="' + mw.util.getUrl('Special:' + pagename, {limit:500, offset:offset, namespace:namespace, user:user}) + '">500</a>')
			).text();
			
			myModal
				.after($('<p>' + nav + '</p>'))
				.after($(list))
				.after($('<p>' + nav + '</p>'))
				.after($('<p>' + range + '</p>'));
		}
	});
});