/* Any JavaScript here will be loaded for all users on every page load. */

// Import Scripts
mw.loader.load('https://apis.google.com/js/platform.js');
window.wwImportArticles = {
  type: 'script',
  debug: false,
  articles: [
    'MediaWiki:UserTags/inactiveUsers.js',    // MediaWiki:Wikia.js/userRightsIcons.js appears to override, needs merg
    'MediaWiki:UserTags/userRightsIcons.js',  // puts things like "ADMINISTRATOR" or "CRAZY PERSON" tags on talk pages
    'MediaWiki:UserTags/code.js',             // user tags like "INACTIVE", "ADMINISTRATOR" or "CRAZY PERSON" on talk pages
  ]
};

importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('ExternalImageLoader/code.js', 'dev');
importScriptPage('ContribsLink/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('SearchSuggest/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');

//USERNAME template
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S (UTC) - %{January;February;March;April;May;June;July;August;September;October;November;December}m %2d, %Y (%{Sun;Mon;Tue;Wed;Thu;Fri;Sat}w)';
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/Time.js",
    ]
});

//User tags
window.UserTagsJS = {
	modules: {},
	tags: {
		honor: { u: 'Honorary Member', order: 100 },
		guest: { u: 'Special Guest', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'TheDoctorTenGrinch': ['guest'],
	'Raniero R': ['guest'],
	'Octobarian': ['guest'],
	'AutoCon8411': ['honor'],
	'Epic gammer': ['honor'],
	'Tobivator': ['honor'],
	'Superwayawolfman99': ['honor'],
	'Doggymarkiplier': ['honor'],
	'Neocarleen': ['honor'],
	'NewGenTV': ['honor'],
	'Кримера': ['honor'],
	'SorcererSupreme21': ['honor'],
	'Japesh.': ['honor'],
	'UltraUser78': ['honor'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/**
 * YouTube.js
 * Fetches data of YouTube channels
 * @author sqm
 * @author UltimateSupreme (Youtube v3)
 * @author KurwaAntics
 */
$(function() {
    'use strict';
    if (!$('.youtube').length) return;
 
    function formatNum(n) { // Original source: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
 
    $('.youtube').each(function() {
        var $this = $(this),
            channel = $this.data('channel');
        $.when(
            $.getJSON('https://www.googleapis.com/youtube/v3/search', {
                part: "snippet",
                channelId: channel,
                maxResults: 1,
                order: "date",
                key: "AIzaSyBCmXEOU17UYNUjbOK7lHtIpM-zDTllp6w"
            }),
            $.getJSON('https://www.googleapis.com/youtube/v3/channels', {
                part: "statistics",
                id: channel,
                key: "AIzaSyBCmXEOU17UYNUjbOK7lHtIpM-zDTllp6w"
            })
        ).then(function(a, b) {
            var latest = a[0].items[0],
                stats = b[0].items[0].statistics;
 
            $this
                .find('.subscribers').text(formatNum(stats.subscriberCount)).end()
                .find('.videos').text(formatNum(stats.videoCount)).end()
                .find('.total-views').text(formatNum(stats.viewCount)).end();
        }, function() {
            $this.html('<td style="text-align:center">' + channel + ' doesn\'t exist on YouTube.</td>');
        });
    });
});
console.log( wgPageName + ' loaded.' );

//Youtube video feed
 
var htmlString = "";
var apiKey = 'AIzaSyDDBk8tAkod1VRRNyFZF09fgQyMpnSe5HI'; //https://console.developers.google.com
var channelID = 'UC7_YxT-KID8kRbqZo7MyscQ';
var maxResults = 4;
 
$.getJSON('https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&channelId=' + channelID + '&part=snippet,id&order=date&type=video&maxResults=' + (maxResults > 5 ? 5 : maxResults), function(data) {
	$.each(data.items, function(i, item) {
		var videoID = item['id']['videoId'];
		var title = item['snippet']['title'];
		htmlString += '<hr width="200"><div class="video"><a href="https://www.youtube.com/watch?v=' + videoID + '"><img src="https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg" width="200"></a><a href="https://www.youtube.com/watch?v=' + videoID + '"><br>' + title + '</a></div>';
    });
    $('#youtube-channel-feed').html(htmlString);
});