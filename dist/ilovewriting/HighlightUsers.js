/* Work in progress, still more to do */

window.highlightUsers = function () {
    // Highlight Admins:
    $.getJSON('/api.php?action=query&list=allusers&augroup=sysop&aulimit=max&format=json',
        function (data) {
            for (var i = 0; i < data.query.allusers.length; i++) {
                $('a[href$="User:' + data.query.allusers[i].name + '"]').css({
                    color: '#FF6347',
                    fontWeight: 'bold',
                    fontFamily: 'Lucida Handwriting'
                });
            }
        });
    // Highlight WikiaStaff:
    $.getJSON('/api.php?action=query&list=allusers&augroup=staff&aulimit=max&format=json',
        function (data) {
            for (var i = 0; i < data.query.allusers.length; i++) {
                $('a[href$="User:' + data.query.allusers[i].name + '"]').css({
                    color: '#DAA520',
                    fontWeight: 'bold',
                    fontSize: '14px'
                });
            }
        });
    // Highlight Founder:
    setTimeout(function () {
        $('a[href$="User:Bloody18"]').css({
            color: '#FF0F4F',
            fontSize: '15px'
        });
    }, 1000);
}();