/* Top Custom Games Script */
$(document).ready(function() {
    var $container = $('#trending-games-auto');
    if (!$container.length) return;

    var apiUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://bloxd.io/api/custom-games');
    $.getJSON(apiUrl, function(response) {
        var games = response.games || response;
        var html = '';
        if (Array.isArray(games)) {
            games.slice(0, 5).forEach(function(game) {
                var name = game.name || 'Custom Game';
                var players = game.players || 0;
                var thumb = game.icon || 'https://bloxd.io/favicon.ico';
                var url = 'https://bloxd.io/index.html?g=' + encodeURIComponent(name);

                html += '<div style="display:flex; align-items:center; gap:10px; margin-top:8px;">' +
                    '<img src="' + thumb + '" style="width:40px; height:40px; border-radius:4px;">' +
                    '<div>' +
                        '<a href="' + url + '" target="_blank" style="font-weight:bold; color:#fff;">' + name + '</a><br>' +
                        '<span style="font-size:12px; color:#38bdf8;">' + players + ' players</span>' +
                    '</div>' +
                '</div>';
            });
            $container.find('.trending-games-list').html(html);
        }
    });
});