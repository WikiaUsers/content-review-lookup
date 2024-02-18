function impart(article) {
    importArticle({ type: 'script', article: article });
}

function getParamValue(param, url) {
	var re = new RegExp('^[^#]*[&?]' + param.replace(/([\\{}()|.?*+\-^$\[\]])/g, '\\$1') + '=([^&#]*)'),
		m = re.exec(url !== undefined ? url : location.href);
	if (m) {
		return decodeURIComponent(m[1].replace(/\+/g, '%20'));
	}
	return null;
}

if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !getParamValue('diff')
) {
    impart('MediaWiki:Common.js/LinkImagePopup.js');
}

var toolbarLabel = '中国全明星玩游戏联盟相关';
var toolbarLinks = [
    {link: 'https://space.bilibili.com/3546377892137707/', label: '凯尔·布罗夫洛夫斯基的Bilibili主页'},
    {link: 'https://space.bilibili.com/13015033', label: 'AngelDust_齐光（Wiki工程师）的Bilibili主页'},
    {link: 'https://space.bilibili.com/267690094/', label: 'Bilign16802的Bilibili主页'},
    {link: 'https://space.bilibili.com/41768545', label: '小鱼大人帅帅帅ii的Bilibili主页'},
];

// Auto-redirect on Special:Search for SXXEXX by Bobogoobo
$(function() {
    var search = getParamValue('query');
    if (
      mw.config.get('wgPageName') === 'Special:Search' &&
      search.length <= 6 &&
      /S\d+E\d+/i.test(search)
    ) {
        $('.results-wrapper p').html('Redirecting to episode...');

        var s, e;
        s = search.toLowerCase().split('e')[0].substr(1);
        e = search.toLowerCase().split('e')[1];
        $.getJSON('/zh/api.php?action=edit&action=parse&text={{nameconvert|' + 
          s + '|' + e + '}}&format=json', function(data) {
            var episode = (data.parse.text['*'].match(/\>(.*)\n\</) || [0, 0])[1];
            if (episode && episode !== 'TBA' && episode.indexOf('<span class="error">') === -1) {
                $('.results-wrapper p').append($('<a />', {
                    'href':'/wiki/' + encodeURIComponent(episode),
                    'text':episode
                }));

                window.location.href = window.location.href.substring(0, 
                  window.location.href.lastIndexOf('/') + 1) + episode;
            } else {
                $('.results-wrapper p').html('Episode not found.');
            }
        });
    }
});