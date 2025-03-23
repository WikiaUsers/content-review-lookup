$(function(){
	var titles = {};
	var numberOfResults = 10;
	
	var myModal = $('<div id="myModal">')
		.append($('<label for="myModalResults">Ten longest titles</label>'))
		.append($('<textarea id="myModalResults" rows="4" disabled>'))
		.append($('<div class="wds-button wds-is-secondary" id="myModalClose">Close</div>'));
	
	var findLongestTitle = $('<li><a href="#">Longest titles</a></li>');
	$('#my-tools-menu').prepend(findLongestTitle);
	
	findLongestTitle.click(function(){
		titles.list = [];
		
		$('body').append(myModal);
		$('#myModalClose').click(function(){
			titles.status = 'canceled';
			myModal.remove();
		});
		
		if (titles.status === 'canceled'){
			return;
		}
		
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
			
			var limit = (
				mw.config.get('wgUserGroups').indexOf('bot') === -1 &&
				mw.config.get('wgUserGroups').indexOf('helper') === -1 &&
				mw.config.get('wgUserGroups').indexOf('soap') === -1 &&
				mw.config.get('wgUserGroups').indexOf('staff') === -1 &&
				mw.config.get('wgUserGroups').indexOf('sysop') === -1 &&
				mw.config.get('wgUserGroups').indexOf('wiki-specialist') === -1
			) ? '500' : '5000';
			
			function requestSome(continueParameter){
				new mw.Api().get({
					action: 'query',
					list: 'allpages',
					aplimit: limit,
					apcontinue: continueParameter,
				}).done(function(result){
					result.query.allpages.forEach(function(entry){
						titles.list.push(entry.title);
					});
					
					if (titles.status === 'canceled'){
						return;
					}
					
					if (result.continue){
						debounce(requestSome)(result.continue.apcontinue);
					} else {
						titles.list.sort(function(a, b){
							return b.length - a.length;
						});
						
						for (var i = 0; i < numberOfResults; i++){
							$('#myModalResults').append('# [['+titles.list[i]+']]\n');
						}
					}
				});
			}
			
			requestSome();
		});
	});
});