;(function(mw, $, ReportMod){
    ReportMod = $.extend(ReportMod, {
        findUsersByGroup: function(group, callback, options){
            var aliases = {
                'sysop': ['admin']
            };
            for (var i = 0, a = Object.keys(aliases); i < a.length; i++){
                var k = a[i], b = aliases[k];
                if (b.indexOf(group) > -1){
                    group = k;
                    break;
                }
            }
            var p = new Promise(function(resolve, reject){
                $.ajax({
                    method: 'GET',
                    dataType: 'json',
                    url: mw.util.wikiScript('api'),
                    data: {
                        action: 'query',
                        list: 'allusers',
                        augroup: group,
                        format: 'json'
                    }
                }).done(function(data){
                    if (data.error) reject();
                    else {
                        resolve(data.query.allusers);
                    }
                }).fail(function(error){
                    reject();
                });
            });
            if (typeof callback !== 'undefined') p.then(callback);
            else return p;
        }
    });
})(
    this.mediaWiki,
    this.jQuery,
    this.ReportMod = this.ReportMod || Object.apply(null, {})
);