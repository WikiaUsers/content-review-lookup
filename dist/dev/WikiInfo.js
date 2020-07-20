/**
 * @name            WikiInfo
 * @description     Provides wiki information from user inputs
 * @author          KhangND
 */
(function() {
    if(window.WikiInfoLoaded) { // double load protections
        return;
    } window.WikiInfoLoaded = true;

    function formatDate(dateString, format) {
        if(!format || !/dd|mm|yyyy/g.test(format)) return '';

        var date = new Date(dateString),
            d = date.getUTCDate(),
            m = date.getUTCMonth(),
            y = date.getUTCFullYear();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        d = d < 10 ? '0' + d : d;
        format = format.indexOf('mmm') >= 0
            ? format.replace('mmm', months[m])
            : format.replace('mm', m < 10 ? '0' + (m + 1) : m + 1);
        format = format
            .replace('yyyy', y)
            .replace('dd', d);
        return format;
    }

    function showUser(url, elem) {
        $.get(url).done(function(data) {
            var user = data.items[0];
            $(elem).html(
                $(elem).data('type') === 'link'
                    ? $('<a>', { href: user.url, text: user.name })
                    : user.name
            );
        });
    }

    mw.hook('wikipage.content').add(function(content){
        var target = content.find('.wi');
        if(!target.length) return;

        var id = mw.config.get('wgCityId'),
            alias = {
                creation_date: 'created',
                founding_user_id: 'founder',
                wam_score: 'wam'
            };

        $.get('https://community.fandom.com/api/v1/Wikis/Details', {
            ids: id,
            dataType: 'jsonp'
        }).done(function(data){
            var items = data.items[id];
    
            target.each(function() {
                var info = $(this).attr('class').split(/\s/g)[1];
    
                for(var a in alias) {
                    if(info === alias[a]) {
    
                        if(info === 'created' && $(this).data('format')) {
                            $(this).text(formatDate(items[a], $(this).data('format')));
                            return;
                        }
    
                        if(info === 'founder') {
                            showUser(
                                items.url + '/api/v1/User/Details?ids=' + items[a],
                                this
                            );
                            return;
                        }
    
                        $(this).text(items[a]);
                        return;
                    }
                }
                $(this).text(items[info] || items.stats[info] || '');
            });
        }); 
    });
})();