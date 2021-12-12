// OrganizedSocialActivity

(function organizedSocialActivity(window, $, mw) {
	"use strict";
	
	// Checking the page and double-run prevention
	if (mw.config.get('wgCanonicalSpecialPageName') !== 'SocialActivity' ||
	    window.organizedSocialActivity ) {
	    	return;
	    }
	window.organizedSocialActivity = { loaded: true };
	
    // CSS
    importArticles({
    	type: 'style',
    	articles: [
    		'u:dev:MediaWiki:OrganizedSocialActivity.css'
    		]
    });
    
    // Dependencies
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js'
			]
	});
    
    // Script-level values and variables
	var $feed = $('.social-activity-feed'),
	    $lists,
	    $origFeed,
	    groupThreadsActive, groupAllActive,
	    i18n;

    // Dealing with a bug that when someone puts {{TemplateName}} in a Feeds
    // post, the template is actually transcluded into Special:SocialActivity,
    // ending up breaking the HTML structure if the template contains
    // unclosed or extra-closed tags.
    function fixBug() {
    	$lists = $feed.find('.social-activity-list');
		$lists.each(function (index) {
			var $list = $(this);
			$list.find(':not(ul.social-activity-list) > li[data-content-type]')
			    .appendTo($list);
			if (index === ($lists.length - 1)) {
				$(':not(ul) > li[data-content-type]')
				.appendTo($list);
			}
			if ($list.parent('section.social-activity-feed').length === 0) {
				$('section.social-activity-feed')
				    .append($list.prev('h4'), $list);
			}
		});
		$origFeed = $feed.clone(true);
    }

	// Extracts thread data from a log entry, and stores it with jQuery .data()
	//     place: posts / messages / comments
	//     subplace: Discussions category ID / wall name / page name
	//     thread: thread ID
	//     href: the link to the thread (not the specific reply)
	function extractData(e) {
		var $e = $(e);
		var data, href;

		switch ($e.attr('data-content-type')) {
			case 'post':
				href = $e.find('a[data-tracking="action-post__post"]')
				        .attr('href');
				data = {
					place: 'posts',
					subplace: $e.find('a[data-tracking="action-category__post"]')
					    .attr('href')
						.replace('/f?catId=', '') || ' ',
					thread: href.replace('/f/p/', '') || ' ',
					href:  href
				};
				break;
				
			case 'post-reply':
				href = $e.find('a[data-tracking="action-post-reply__post-reply"]')
				        .attr('href');
				data = {
					place: 'posts',
					subplace: $e.find('a[data-tracking="action-post-reply-category__post-reply"]')
					    .attr('href')
						.replace('/f?catId=', '') || ' ',
					thread: href.replace('/f/p/', '') || ' ',
					href: href
				};
				break;

			case 'message':
				href = $e.find('a[data-tracking="action-wall-message__message"]')
				    .attr('href') || ' ';
				data = {
					place: 'messages',
					subplace: href.replace(/.*:/, '').replace(/\?.*/, ''),
					thread: href.replace(/.*\?threadId=/, ''),
					href: href
				};
				break;
				
			case 'message-reply':
				href = $e.find('a[data-tracking="action-reply-message-wall-parent__message-reply"]')
					.attr('href') || ' ';
				data = {
					place: 'messages',
					subplace: href.replace(/.*:/, '').replace(/\?.*/, ''),
					thread: href.replace(/.*\?threadId=/, ''),
					href: href
				};
				break;

			case 'comment':
				href = $e.find('a[data-tracking="action-view__comment"]')
					.attr('href') || ' ';
				data = {
					place: 'comments',
					subplace: href.replace('/wiki/', '').replace(/\?.*/, ''),
					thread: href.replace(/.*\?commentId=/, ''),
					href: href
				};
				break;
				
			case 'comment-reply':
				href = $e.find('a[data-tracking="action-reply-parent__comment-reply"]')
					.attr('href') || ' ';
				data = {
					place: 'comments',
					subplace: href.replace('/wiki/', '').replace(/\?.*/, ''),
					thread: href.replace(/.*\?commentId=/, ''),
					href: href
				};
				break;
		}
		$e.data(data);
		return $e.data();
	}

	// Creates a thread header based on the most recent entry of the thread
	function makeHeader(e, o) {
		var $e = $(e),
		    data = $e.data();
		
		if (!data.title) {
			switch ($e.attr('data-content-type')) {
				case 'post':
					data = {
						icon: 'comment',
						title: $e.find('a[data-tracking="action-post__post"]')
						    .text() || ' ',
						on: $e.find('a[data-tracking="action-category__post"]')
						    .text() || ' ',
						on_href: $e.find('a[data-tracking="action-category__post"]')
						    .attr('href') || ' ',
						prefix: ' on the category ',
						suffix: ''
					};
					break;
					
				case 'post-reply':
					data = {
						icon: 'comment',
						title: $e.find('a[data-tracking="action-post-reply__post-reply"]')
							.text() || ' ',
						on: $e.find('a[data-tracking="action-post-reply-category__post-reply"]')
							.text() || ' ',
						on_href: $e.find('a[data-tracking="action-post-reply-category__post-reply"]')
							.attr('href') || ' ',
						prefix: ' on the category ',
						suffix: ''
					};
					break;
	
				case 'message':
					data = {
						icon: 'envelope',
						title: $e.find('a[data-tracking="action-wall-message__message"]')
							.text() || ' ',
						on: mw.Uri.decode(data.subplace).replace(/_/g, ' '),
						on_href: data.href.replace(/\?.*/, ''),
						prefix: ' on ',
						suffix: '\'s wall'
					};
					break;
					
				case 'message-reply':
					data = {
						icon: 'envelope',
						title: $e.find('a[data-tracking="action-reply-message-wall-parent__message-reply"]')
							.text() || ' ',
						on: mw.Uri.decode(data.subplace).replace(/_/g, ' '),
						on_href: data.href.replace(/\?.*/, ''),
						prefix: ' on ',
						suffix: '\'s wall'
					};
					break;
	
				case 'comment':
					data = {
						icon: 'page',
						title: $e.find('.activity-data em')
							.text() || ' ',
						on: mw.Uri.decode(data.subplace).replace(/_/g, ' '),
						on_href: data.href.replace(/\?.*/, ''),
						prefix: ' on the page ',
						suffix: ''
					};
					break;
					
				case 'comment-reply':
					data = {
						icon: 'page',
					    title: $e.find('a[data-tracking="action-reply-parent__comment-reply"]')
							.text() || ' ',
						on: mw.Uri.decode(data.subplace).replace(/_/g, ' '),
						on_href: data.href.replace(/\?.*/, ''),
						prefix: ' on the page ',
						suffix: ''
					};
					break;
			}
			data.lastTime = $e.find('.activity-time').text();

			$e.data(data);
			data = $e.data();
		}
		
		if (typeof o === 'string') {
			switch (o) {
				case 'posts':
					return $('<h4>Posts on <a href="/f">Discussions</a></h4>');
				case 'messages':
					return $('<h4>Messages on users\' message walls</h4>');
				case 'comments':
					return $('<h4>Comments on article and user blog pages</h4>');
			}
			
			switch (o.replace(/_.*/, '')) {
				case 'posts':
					return $('<h4>Category </h4>').append(
						$('<a>')
						    .attr('href', data.on_href)
						    .text(data.on)
						);
				case 'messages':
					return $('<h4>').append(
						$('<a>')
						    .attr('href', data.on_href)
						    .text(data.on + data.suffix)
						);
				case 'comments':
					return $('<h4>Page </h4>').append(
						$('<a>')
						    .attr('href', data.on_href)
						    .text(data.on)
						);
			}
		}
		
		return $('<h4>').append(
			$('<span class="activity-time">').text(data.lastTime),
            $('<span class="activity-icon">\
		         <svg class="wds-icon wds-icon-small">\
		         <use xlink:href="#wds-icons-' + data.icon + '-small">\
		         </use>\
		         </svg>\
		         </span>'),
			$('<a>').attr('href', data.href).text(data.title),
			groupAllActive ? '' : [
				data.prefix,
				$('<a>').attr('href', data.on_href).text(data.on + data.suffix)
			]
		);
	}
    
    function groupThreads() {
        if (groupThreadsActive || groupAllActive) {
        	$feed.before($feed = $origFeed.clone(true)).remove();
        	$lists = $feed.find('.social-activity-list');
        	groupAllActive = false;
        } else {
            fixBug();
        }
        
        groupThreadsActive = true;
	    $feed.addClass('social-activity-feed-grouped');

	    $lists.each(function() {
	        var threads = {},
	    	      $list = $(this),
	    	      $listE = $list.children('li[data-content-type]');
	            
	        var keys = [],
	            key;
	        
	        $listE.each(function() {
	        	var myData = extractData(this),
	        	    threadKey = myData.place + '_' +
	        	                myData.subplace + '_' +
	        	                myData.thread;
	        	                
	        	if (threads[threadKey]) {
	        		threads[threadKey].push(this);
	        	} else {
	        		threads[threadKey] = [this];
	        		// Needed to keep track on the order of threads, since
	        		// object keys won't necessarily keep the order.
	        		keys.push(threadKey);
	        	}
	        });
	        
	        keys.forEach(function(key) {
	        	$('<li class="social-activity-thread">')
	        	    .appendTo($list)
	        	    .append(
	        	    	makeHeader(threads[key][0]),
	        	    	$('<ul>').append(threads[key])
	        	    );
	        });
	    });
	    makeCollapsibles();
    }
	    
    function groupAll() {
        if (groupThreadsActive || groupAllActive) {
        	$feed.before($feed = $origFeed.clone(true)).remove();
        	$lists = $feed.find('.social-activity-list');
        	groupThreadsActive = false;
        } else {
        	fixBug();
        }
        
        groupAllActive = true;
	    $feed.addClass([
	    	'social-activity-feed-grouped',
	    	'social-activity-feed-group-all'
	    	]);
	    	
	    $lists.each(function() {
	        var $list = $(this),
	    	    $listE = $list.children('li[data-content-type]'),
	    	    threads = {},
	    	    keys = [],
	    	    i, i2, i3, keys2, keys3,
	            placeKey, subplaceKey, threadKey,
	            placeE, subplaceE;
	
	        $listE.each(function() {
	        	var myData = extractData(this);
	        	    
        	    placeKey = myData.place;
        	    subplaceKey = myData.place + '_' + myData.subplace;
        	    threadKey = myData.subplace + '_' + myData.thread;
	        	
	        	if (threads[placeKey]) {
	        		if (threads[placeKey][subplaceKey]) {
	        			if (threads[placeKey][subplaceKey][threadKey]) {
	        				threads[placeKey][subplaceKey][threadKey].push(this);
	        			} else {
	        				threads[placeKey][subplaceKey][threadKey] = [this];
	        				threads[placeKey][subplaceKey].__keys.push(threadKey);
	        			}
	        		} else {
	        			threads[placeKey][subplaceKey] = {
	        				__keys: [threadKey]
	        			};
	        			threads[placeKey][subplaceKey][threadKey] = [this];
	        			threads[placeKey].__keys.push(subplaceKey);
	        		}
	        	} else {
	        		threads[placeKey] = {
	        			__keys: [subplaceKey]
	        		};
	        		threads[placeKey][subplaceKey] = {
	        			__keys: [threadKey]
	        		};
	        		threads[placeKey][subplaceKey][threadKey] = [this];
	        		keys.push(placeKey);
	        	}
	        	
	        });
	        
	        for (i = 0; i < keys.length; i++) {
	        	placeKey = keys[i];
	        	placeE = $('<li class="social-activity__' + placeKey + '">')
	        	    .appendTo($list);
	        	placeE = ($('<ul>')).appendTo(placeE);
	        	for (i2 = 0, keys2 = threads[placeKey].__keys;
	        	        i2 < keys2.length; i2++) {
	        		subplaceKey = keys2[i2];
	        		subplaceE = $('<li class="social-activity-subplace">')
	        		    .appendTo(placeE);
	        		subplaceE = ($('<ul>')).appendTo(subplaceE);
	        		for (i3 = 0, keys3 = threads[placeKey][subplaceKey].__keys;
	        		        i3 < keys3.length; i3++) {
	        			threadKey = keys3[i3];
	        			subplaceE.append(
	        				$('<li class="social-activity-thread">').append(
	        					makeHeader(
	        					    threads[placeKey][subplaceKey][threadKey][0]
	        				    ),
	        				    $('<ul>').append(
	        					    threads[placeKey][subplaceKey][threadKey]
	        				    )
	        				)
	        			);
	        		}
	        		subplaceE.before(makeHeader(
	        	    	threads[placeKey][subplaceKey][threadKey][0],
	        	    	subplaceKey));

	        	}
	        	placeE.before(makeHeader(
	        	    	threads[placeKey][subplaceKey][threadKey][0],
	        	    	placeKey));
	        }
	    });
	    makeCollapsibles();
    }
    
    function makeCollapsibles() {
		$feed.find('.social-activity-thread > ul,\
	    .social-activity-subplace > ul,\
	    .social-activity__posts > ul,\
	    .social-activity__messages > ul,\
	    .social-activity__comments > ul')
		    .addClass('mw-collapsible mw-collapsed');
		mw.hook('wikipage.content').fire($feed);
		if (!$feed.find('.social-activity-expand-all-button').length) {
			$feed.prepend(
				$('<button>')
				    .addClass([
				    	'social-activity-expand-all-button',
				    	'wds-button',
				    	])
				    .text('Expand All')
				    .click(function () {
				    	$feed.find('.mw-collapsible-toggle-collapsed').click();
				    }),
				$('<button>')
				    .addClass([
				    	'social-activity-expand-all-button',
				    	'wds-button',
				    	])
				    .text('Collapse All')
				    .click(function () {
				    	$feed.find('.mw-collapsible-toggle-expanded').click();
				    })
			);
		}
    }
    
    function init() {
	    // Activation buttons
	    $('<button>')
	        .addClass([
	        	'social-activity-filters__live-group-threads-button',
	            'wds-button',
	            'wds-is-secondary'
	        ])
	        .append(
	            $('<svg class=\
	            "wds-icon wds-icon-small social-activity-filters__group-icon">\
			         <use xlink:href="#wds-icons-bullet-list-small">\
			         </use>\
			     </svg>'),
			    $('<span>Group Threads</span>')
			)
	        .click(groupThreads)
	        .appendTo($('.social-activity-filters'));
	
	    $('<button>')
	        .addClass([
	        	'social-activity-filters__live-group-all-button',
	            'wds-button',
	            'wds-is-secondary'
	        ])
	        .append(
	            $('<svg class=\
	            "wds-icon wds-icon-small social-activity-filters__group-icon">\
			         <use xlink:href="#wds-icons-bullet-list-small">\
			         </use>\
			     </svg>'),
			    $('<span>Group All</span>')
			)
	        .click(groupAll)
	        .appendTo($('.social-activity-filters'));
    }
    
	// i18n
	mw.hook('dev.i18n').add(function (_i18n) {
		i18n = _i18n;
		init();
	});
    
}) (this, jQuery, mediaWiki);