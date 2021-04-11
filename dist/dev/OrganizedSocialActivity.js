// Rewrite in progress, please don't submit for review

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
	    $origFeed,
	    $lists,
	    tree = {
	    	__keys: []
	    },
	    keys = tree.__keys,
	    threads = {
	    	merged: {
	    		__keys: []
	    	}
	    },
	    groupThreadsActive, groupAllActive,
	    i18n;

	// Extracts thread data out of a log entry, and stores it with jQuery .data()
	//     place: posts / messages / comments
	//     subplace: Discussions category ID / wall name / page name
	//     thread: thread ID
	//     href: the link to the thread (not the specific reply)
	//     $dateList: The original <li> which the entry belongs to. Date-based
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
					// Stripping the part prior to the username and the query
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
					// Stripping the part prior to the page name and the query
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
		
		data.$dateList = $e.parent('.social-activity-list');
		data.date = data.$dateList.prev('h4').text() || 'Unknown date';
		
		$e.data(data);
		return $e.data();
	}
	
	// 1. Extracting and attaching data for each entry
	// 2. Creating a sorted object with references to all entries
	// Shouldn't have any visible effect on the page
	function preProcess() {
        $feed.find('li[data-content-type]').each(function() {
        	var myData = extractData(this),
	    	    place = myData.place,
	    	    subplace = myData.subplace,
	    	    thread = myData.thread,
	    	    date = myData.date,
	    	    // A pointer to browse through the tree
	    	    a;
	    	    
    	    a  = tree[date];
        	if (a) {
        		a = a[place];
	        	if (a) {
	        		a = a[subplace];
	        		if (a) {
	        			a = a[thread];
	        			if (a) {
	        				a.push(this);
	        			} else {
	        				a = tree[date][place][subplace];
	        				a[thread] = [this];
	        				a.__keys.push(thread);
	        			}
	        		} else {
	        			a = tree[date][place];
	        			(a[subplace] = {
	        				__keys: [thread]
	        			})[thread] = [this];
	        			a.__keys.push(subplace);
	        		}
	        	} else {
	        		a = tree[date];
	        		((a[place] = {
	        			__keys: [subplace]
	        		})[subplace] = {
	        			__keys: [thread]
	        		})[thread] = [this];
	        		a.__keys.push(place);
	        	}
        	} else {
        		a = tree;
        		(((a[date] = {
        			__keys: [place]
        		})[place] = {
        			__keys: [subplace]
        		})[subplace] = {
        			__keys: [thread]
        		})[thread] = [this];
        		keys.push(date);
        	}
        	
        	a = threads[date];
        	if (a) {
        		a.push(tree[date][place][subplace][thread]);
        	} else {
        		threads[date] = [ tree[date][place][subplace][thread] ];
        	}
        	
        	a = threads.merged[place + '__' + subplace + '__' + thread];
        	if (a) {
        		if (!a.indexOf(date)) {
        			a.push(date);
        		}
        	} else {
        		threads.merged[place + '__' + subplace + '__' + thread] = [date];
        	}
        	threads.merged.__keys.push(place + '__' + subplace + '__' + thread);
        });
	}

	// Creates a thread header based on the most recent entry of the thread
	function makeHeader(e, o) {
		var $e, data;
		
		switch (typeof e) {
		case 'object':
			$e = $(e);
		    data = $e.data();
		    break;
		    
		case 'string':
			o = e;
			break;
			
		default:
		    return '';
		}
		
		if ($e && !data.title) {
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
			
			// Making subplace header requires a social entry element to retrive
			// the information from
			if (!$e) { return ''; }
			
			switch (o.replace(/__.*/, '')) {
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
    	var mergeDates = $('#social-activity-filters__merge-dates-checkbox')
    		    .prop('checked'),
    	    i, i1, i2, i3, keys1, keys2, keys3,
            date, place, subplace, thread,
            dateUl, placeUl, subplaceUl,
            a, b;

        // Resetting the feed if it was previously altered
        // If not - keeping a backup for future reset
        if ($origFeed) {
        	$feed.before($feed = $origFeed.clone()).remove();
        	if (groupAllActive) {
        		groupAllActive = false;
        		$feed.removeClass('social-activity-feed-group-all');
        	}
        } else {
        	$origFeed = $feed.clone();
        }
    	
        groupThreadsActive = true;
	    $feed.addClass('social-activity-feed-grouped');
	    
	    for (i = 0; i < keys.length; i++) {
	    	date = keys[i];
	    	for (i1 = 0; i1 < threads[date].length; i1++) {
	    		
	    	}
	    }

	    makeCollapsibles();
    }
	    
    function groupAll() {
    	var mergeDates = $('#social-activity-filters__merge-dates-checkbox')
    		    .prop('checked'),
    	    i, i1, i2, i3, keys1, keys2, keys3,
            date, place, subplace, thread,
            dateUl, placeUl, subplaceUl,
            a, b;

        // Resetting the feed if it was previously altered
        // If not - keeping a backup for future reset
        if ($origFeed) {
        	$feed.before($feed = $origFeed.clone()).remove();
        	groupThreadsActive = false;
        } else {
        	$origFeed = $feed.clone();
        }
    	
        groupAllActive = true;
	    $feed.addClass([
	    	'social-activity-feed-grouped',
	    	'social-activity-feed-group-all'
	    	]);
    	
        if (mergeDates) {
	        var places = [], subplaces = {};
	        
	        // Iterating trough dates
	        for (i = 0; i < keys.length; i++) {
	        	date = keys[i];
	        	
	        	//  Iterating through social places
	        	for (i1 = 0, keys1 = tree[date].__keys;
	        	    i1 < keys1.length; i1++) {
		        	
		        	place = keys1[i1];
		        	if (places.indexOf(place) !== -1) {
		        		placeUl = $('.social-activity__' + place + ' > ul');
		        	} else {
		        		places.push(place);
			        	placeUl = $('<ul>')
			        	    .appendTo(
			        		$('<li class="social-activity__' + place + '">')
			        		    .appendTo(
			        		    	$('<ul class="social-activity-list">')
			        		    	    .appendTo($feed)
			        		    	)
			        		)
			        		.before(makeHeader(place));
		        	}
		        	
		        	// Iterating through subplaces
		        	for (i2 = 0, keys2 = tree[date][place].__keys;
		        	        i2 < keys2.length; i2++) {
		        		
		        		subplace = keys2[i2];
		        		// Those are not identified by a class so they need an
		        		// object to keep track on
		        		if (subplaces[place + '__' + subplace]) {
		        			subplaceUl = $(subplaces[place + '__' + subplace]);
		        		} else {
		        			subplaces[place + '__' + subplace] = subplaceUl =
		        			    $('<ul>').appendTo(
		        			    $('<li class="social-activity-subplace">')
		        			    	.appendTo(placeUl)
		        			    )
		        			    .before(makeHeader(
			        	    	    tree[date][place][subplace][
			        	    	    	tree[date][place][subplace].__keys[0]
			        	    	    ][0],
			        	    	    place + '__' + subplace)
			        	    	);
		        		}
	
		        		//  Iterating thorugh threads
		        		for (i3 = 0, keys3 = tree[date][place][subplace].__keys;
		        		        i3 < keys3.length; i3++) {
		        			thread = keys3[i3];
		        			a = tree[date][place][subplace][thread];
		        			
		        			if ((b = threads[place + '__' + subplace + '__' + thread])[0] !==
		        			date) {
		        				// Concating threads when needed
		        				$(tree[b[0]][place][subplace][thread][0]
		        				.parentElement.parentElement).append(
		        					$('<h5>').text($(a[0]).data('date')),
		        					$('<ul>').append(a)
		        				);
		        			} else {
			        			subplaceUl.append(
			        				$('<li class="social-activity-thread">').append(
			        					makeHeader(a[0]),
			        					$('<h5>').text($(a[0]).data('date')),
			        					$('<ul>').append(a)
			        				)
			        			);
		        			}
		        		}
		        	}
	        	}
	        	$feed.children('h4:not(:last-of-type), .social-activity-list:not(:last-of-type)').remove();
	        }
        } else {
        	
        	// Iterating through dates
	        for (i = 0; i < keys.length; i++) {
	        	date = keys[i];
	        	dateUl = $('.social-activity-list').filter(function() {
	        		return $(this).prev('h4').text() === date;
	        	});
	        	
	        	// Iterating through social places (features)
	        	for (i1 = 0, keys1 = tree[date].__keys;
	        	    i1 < keys1.length; i1++) {
		        	place = keys1[i1];
		        	placeUl = $('<ul>').appendTo(
		        		    $('<li class="social-activity__' + place + '">')
		        		        .appendTo(dateUl)
		        		)
		        		.before(makeHeader(place));
		        	
		        	// Iterating through subplaces
		        	for (i2 = 0, keys2 = tree[date][place].__keys;
		        	        i2 < keys2.length; i2++) {
		        		subplace = keys2[i2];
		        		subplaceUl = $('<ul>').appendTo(
		        			$('<li class="social-activity-subplace">')
		        			    .appendTo(placeUl)
		        			)
	        			    .before(makeHeader(
		        	    	    tree[date][place][subplace][
		        	    	    	tree[date][place][subplace].__keys[0]
		        	    	    ][0],
		        	    	    place + '__' + subplace)
		        	    	);

		        		// Iterating through threads
		        		for (i3 = 0, keys3 = tree[date][place][subplace].__keys;
		        		        i3 < keys3.length; i3++) {
		        			thread = keys3[i3];
		        			a = tree[date][place][subplace][thread];
		        			
			        		subplaceUl.append(
			        			$('<li class="social-activity-thread">').append(
			        				makeHeader(a[0]),
			        				$('<ul>').append(a)
			        			)
			        		);
		        		}
		        	}
	        	}
	        }
        }

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
	    // Activation controls
	    $('.social-activity-filters').append(
		    $('<button>')
	        .addClass([
	        	'social-activity-filters__group-threads-button',
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
	        .click(groupThreads),
		
		    $('<button>')
	        .addClass([
	        	'social-activity-filters__group-all-button',
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
	        .click(groupAll),
	        
	        $('<form> \
		        <input type="checkbox" \
		        class="social-activity-filters__merge-dates-checkbox" \
		        id="social-activity-filters__merge-dates-checkbox" \
		        checked> \
	        	Merge all dates \
	        </form>'),
	        
	        '{{subst:RepSubst|&nbsp;2021 Apr 08, 00:21:12&nbsp;}}'.split('&nbsp;')[1] // Embedding saving timestamp
	    );
    }
    
	preProcess();
	// i18n
	mw.hook('dev.i18n').add(function (_i18n) {
		i18n = _i18n;
		init();
	});
    
}) (this, jQuery, mediaWiki);