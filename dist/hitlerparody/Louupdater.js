/* List of Untergangers Updater
 * v0.1
 * by mfaizsyayhmi, 2017
 * another attempt at doing a data scraper, now that data have been separated from markup
 * still WIP, expect a lot of runtime errors!
 */

// namespace
window.lou = window.lou || {};

lou.cfg = {
	pagedesc: 'List of Untergangers Updater, v0.1 by mfaizsyahmi (2017)<br>\
				Released under MIT and CC-BY-SA Licenses. ',
	uiPage: 'Special:LoUUpdater',
	helpLink: '<a href="/wiki/Help:List of Untergangers">Help</a>',
	rs: '§',
	fs: '‖',
	dataUrl: '/wiki/List of Untergangers/data?action=render',
	map: ['name','reg','ctry','vids','views','subs','sbgrade','status','yt','notes'],
	widths: [ 25,    3,     2,     4,     10,     7,        2,       1],
	defProxyUrl: 'http://allorigins.us',
	key: "AIzaSyD8-62lEUulbGAFC7NtWNHW1kVvh6JLqq4" // for use on Hitler Parody Wiki only!
};

// working vars
lou.dataText = null;
lou.data = null;
lou.ajaxQueue = []; // holds all the ajax settings objects

// runs on page load
lou.init = function() {
	// abort if not on the correct page
	if (mw.config.get('wgPageName')!==lou.cfg.uiPage) return;
	
	// update title
	$('h1, title').text('List of Untergangers Updater');
	
	// build interface
	var content = $('#WikiaArticle'); // holds reference to the content element
	content.html(''); // clears it
	$('<p>').append(lou.cfg.pagedesc + lou.cfg.helpLink).appendTo(content); // description
	$('<h2>').text('Step 1: Load data').appendTo(content); // header
	$('<button>').text('Load data').on('click', function(){ // button to load data
		$('#s1stat').text('Loading data... (if it takes too long it might have failed)');
		$.get(lou.cfg.dataUrl, function(d) {
			lou.dataText = d;
			lou.data = lou.parseData(lou.dataText);
			$('#count').val(lou.data.length);
			$('#s1stat').text(lou.data.length + ' records loaded.');
		})
	}).appendTo(content);
	$('<div>').attr('id','s1stat').appendTo(content); // data loading status
	
	$('<h2>').text('Step 2: Update entries').appendTo(content); // header
	var p = $('<p>').append('Offset by ');
	$('<input>').prop({type:'text', id: 'offset', value: 0}).css('width','3em').appendTo(p); // offset
	p.append(' and update ');
	$('<input>').prop({type:'text', id: 'count', value: 0}).css('width','3em').appendTo(p); // count
	p.append(' entries.<br> Use the following CORS proxy server (an AnyOrigin clone): ')
	$('<input>').prop({type:'text', id: 'proxyUrl', value: lou.cfg.defProxyUrl}).appendTo(p); // proxy
	p.appendTo(content);
	$('<label>').append( $('<input>').prop({type:'checkbox', id:'addNoAjax'}) ) // add noAjax to problem entries
	            .append('Mark problem channels to exclude them in the future<br>')
				.appendTo(content);
	$('<label>').append( $('<input>').prop({type:'checkbox', id:'markSuicide'}) ) // change status for problem entries
	            .append('Mark problem channels as suicidal (a likely case for the problem, though it could be terminations)<br>')
	            .appendTo(content);
	$('<label>').append( $('<input>').prop({type:'checkbox', id:'ignoreNoAjax'}) ) // ignore noAjax
	            .append('Include entries marked for exclusion<br>')
	            .appendTo(content);
	
	$('<button>').prop('id', 'startBtn').text('Start').on('click', function(){
		lou.startUpdate();
		$(this).prop('disabled',true);
	}).appendTo(content);
	
	$('<button>').prop('id', 'pauseBtn').text('Pause').on('click', function(){
		$(this).addClass('pausing');
	}).appendTo(content);
	
	$('<button>').prop('id', 'resumeBtn').text('Resume').on('click', function(){
		lou.next();
		$(this).hide();
		$('#pauseBtn').show();
	}).css({display:'inline'}).hide().appendTo(content);
	
	$('<button>').prop('id', 'cancelBtn').text('Cancel').on('click', function(){
		$(this).addClass('cancelling');
	}).appendTo(content);
	
	$('<div>').attr('id','s2stat').text('Not started').appendTo(content);
	$('<progress>').prop({id: 'progress', value: 0})
				   .css({width: '100%'})
				   .appendTo(content);
	$('<div>').attr('id','s2log').appendTo(content);
	
	$('<h2>').text('Output').appendTo(content);
	$('<p>').text('The full list with updated parts below. Please check for any request errors (listed below the progress bar), and that the formatting is correct.').appendTo(content);
	$('<pre>').attr('id', 'output').css({'max-height': '30em', 'max-width':'100%'}).appendTo(content);
}
lou.init();

// parses the formatted data into array of objects
lou.parseData = function(dataText) {
	var rawArray = dataText.split(lou.cfg.rs);
	rawArray.pop();
	rawArray.shift();
	var outArray = [];
	
	for (var i=0; i<rawArray.length; i++) {
		var fieldArr = rawArray[i].replace('\n','').split(lou.cfg.fs);
		var recordObj = {};
		for (var j=0, n=0; j<fieldArr.length; j++) {
			var kv = fieldArr[j].trim().split('=');
			if (kv.length>1) { // field is named
				recordObj[kv[0]] = kv[kv.length-1];
			} else if (lou.cfg.map[n]){ // not named but mappable to associated named field
				recordObj[lou.cfg.map[n]] = kv[0];
				n++;
			} else { // not mappable, use position as key
				recordObj[n] = kv[0];
				n++;
			}
		}
		outArray.push(recordObj);
	}
	return outArray;
}

// takes the object notation and format it
lou.formatData = function(dataArray) {
	var strArr = [];
	for (var i=0; i<dataArray.length; i++) {
		var recordArr = [];
		for (var prop in dataArray[i]) {
			delete dataArray[i]._yt;
			if (dataArray[i].hasOwnProperty(prop) && lou.cfg.map.indexOf(prop)>-1) {
				// property mapped to index
				recordArr[lou.cfg.map.indexOf(prop)] = lou.pad(dataArray[i][prop], prop);
			} else if (dataArray[i].hasOwnProperty(prop)) {
				// prop not mapped to index
				recordArr.push(prop+'='+dataArray[i][prop]);
			} 
		}
		strArr.push(recordArr.join(lou.cfg.fs));
	}
	strArr.unshift('');
	return strArr.join('\n' + lou.cfg.rs);
}
// padding subroutine for the formatting function
lou.pad = function(str, prop) {
	if(typeof str==='undefined') return;
	var width = lou.cfg.widths[lou.cfg.map.indexOf(prop)];
	if (prop==='name' && str.length>width) {
		return str + '\n' + ' '.repeat(width+1);
	} else if ( isNaN(str.replace(/,/g,'')) ) {
		return str.padEnd(width);
	} else {
		return str.padStart(width);
	}
}

// starts an uodate
lou.startUpdate = function() {
	lou.ajaxQueue = []; // clear the queue
	// retrieves settings
	var offset = parseInt($('#offset').val()),
		count = parseInt($('#count').val()),
		proxyUrl = $('#proxyUrl').val(),
		watdo = {
			addNoAjax: $('#addNoAjax').is(':checked'), 
			markSuicide: $('#markSuicide').is(':checked')
		},
		ignoreNoAjax = $('#ignoreNoAjax').is(':checked'),
		limit = offset + count,
		idList = [];
	
	// reset some ui stuff
	$('#s2log').text('');
	lou.s2log('Preparing requests');
	document.getElementById('progress').max = 0
	document.getElementById('progress').value = 0
	
	// go through the records and push ajax objects to a queue
	for (var i=offset; i<lou.data.length && i<limit; i++) {
		var recordObj = lou.data[i],
			skip = false,
			u;
		if (!recordObj.hasOwnProperty('yt')) {
			// no yt channel given, nothing can be done
			skip = true;
		} else if (!ignoreNoAjax && recordObj.hasOwnProperty('noajax')) {
			// not ignoring noajax and noajax set; skip
			skip = true;
		} else if (recordObj.yt==='~') {
			// yt containing the tilde shortcut, retrieve from name
			// add temp property for sb grade
			recordObj._yt = recordObj.name.match(/\[\[([^|\]]+).*\]\]/)[1];
			u = recordObj._yt;
			lou.pushYtAjax(false, u, watdo);
		} else if (lou.isChanId(recordObj.yt)) {
			// yt is channel id
			u = recordObj.yt;
			// channel ids are collected
			idList.push(u);
		} else {
			// other cases. most likely yt usernames
			// duplicated since the original is going to be replaced with channel id and SB still uses username
			recordObj._yt = recordObj.yt; 
			u = recordObj.yt;
			lou.pushYtAjax(false, u, watdo);
		}
		
		if (!skip) lou.pushSbAjax(proxyUrl, u);
		// if enough channel ids collected, push an ajax
		if (idList.length===50) {
			lou.pushYtAjax(true, idList, watdo);
			idList = [];
		}
	}
	
	// start the queue processing
	lou.next(0);
}

// builds an ajax request object for YT usernames/channels
// retrieves: id, vids, views, subs
lou.pushYtAjax = function(isIdList, data, watdo) {
	var dataObj = {part: 'id,statistics', key: lou.cfg.key};
	var progressworth = 1; // how much to increment progressbar
	if(isIdList) {
		dataObj.id = data.join(',');
		dataObj.maxResults = 50;
		progressworth = data.length;
	} else {
		dataObj.forUsername = data;
	}
	
	lou.ajaxQueue.push({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/channels',
		data: dataObj,
		dataType: 'json',
		success: function(d, s, xhr) {
			if(dataObj.forUsername) {
				// find the record
				var recordObj = lou.data.find( function(obj) {
					if(obj.yt===dataObj.forUsername || obj._yt===dataObj.forUsername) return obj;
				})
				if (recordObj && d.items.length) { // record and response exist
					recordObj.yt = d.items[0].id,
					recordObj.vids = d.items[0].statistics.videoCount,
					recordObj.views = d.items[0].statistics.viewCount,
					recordObj.subs = d.items[0].statistics.subscriberCount;
				} else {
					// record mismatch or response returns nothing
					// strongly points to channel having been deleted
					lou.s2log('Error - username mismatch for YT: ' +dataObj.forUsername+ '. Channel might have been deleted.', true);
					if (recordObj && watdo.addNoAjax) {
						recordObj.noajax = 'no';
						lou.s2log('-> marked noajax', true);
					}
					if (recordObj && watdo.markSuicide) {
						recordObj.status ='s';
						lou.s2log('-> changed status to suicide', true);
					}
				}
			} else {
				for(var i=0; i<d.items.length; i++) {
					var recordObj = lou.data.find( function(obj) {
						if(obj.yt===d.items[i].id) return obj;
					});
					if(recordObj) {
						recordObj.yt = d.items[i].id,
						recordObj.vids = d.items[i].statistics.videoCount,
						recordObj.views = d.items[i].statistics.viewCount,
						recordObj.subs = d.items[i].statistics.subscriberCount;
					}
				}
			}
		},
		error: function(xhr, type, stat) {
			if (isIdList) {
				lou.s2log('Error requesting YT for batch user data.', true);
			} else {
				lou.s2log('Error requesting YT for user ' +data+ '.', true);
			}
		},
		complete: function() {
			lou.next(progressworth);
		}
	});
	
	document.getElementById('progress').max +=progressworth;
}

// YT API call for playlist items
// used to determine the status
lou.pushPlAjax = function(pl, c) {
	var dataObj = {part: 'id,statistics', key: lou.cfg.key};
	// WIP
}

// loads the SB widget to get the SB grade
lou.pushSbAjax = function(proxyUrl, u) {
	console.log(u)//debug
	lou.ajaxQueue.push({
		type: 'GET',
		url: proxyUrl + '/get?url=' + encodeURIComponent('http://widget.socialblade.com/widget?v=2&u='+u),
		dataType: 'json',
		success: function(d) {
			var recordObj = lou.data.find( function(obj) {
				if(obj.yt===u || obj._yt===u) return obj;
			})
			if (recordObj) {
				recordObj.sbgrade = $('.widgetGrade span', d.contents).text();
			} else {
				lou.s2log('Error - username mismatch for SB: ' + dataObj.forUsername);
			}
		}, 
		error: function(xhr, type, stat) {
			lou.s2log('Error requesting SB for user ' +u+ '.', true);
		},
		complete: function() {
			lou.next(1);
		}
	});
	
	document.getElementById('progress').max +=1;
}

lou.next = function(progress) {
	// update progressbar
	if (!progress) progress = 1;
	document.getElementById('progress').value +=progress;
	
	if ($('#pauseBtn').is('.pausing')) {
		$('#pauseBtn').removeClass('pausing').text('Pause').hide();
		$('#resumeBtn').show();
		lou.s2log('Paused.');
	} else if ($('#cancelBtn').is('.cancelling')) {
		$('#cancelBtn').removeClass('cancelling').text('Cancel');
		$('#startBtn').prop('disabled', false);
		lou.s2log('Cancelled.');
		lou.formatData(lou.data);
	} else if (lou.ajaxQueue.length===0) {
		lou.s2log('Completed.');
		$('#startBtn').prop('disabled', false);
		$('#output').text(lou.formatData(lou.data));
	} else {
		lou.s2log('Processing request (' +lou.ajaxQueue.length+ ' remaining)');
		setTimeout( function() {
			$.ajax(lou.ajaxQueue.shift());
		}, 20);
	}
}

lou.s2log = function(str, log) {
	$('#s2stat').text(str);
	if (log) $('#s2log').append(str + '<br />');
}

lou.isChanId = function(str) {
	return (str!== undefined && str.length===24 && str.substr(0,2)==='UC');
}