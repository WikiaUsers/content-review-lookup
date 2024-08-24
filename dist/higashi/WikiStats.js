function getWikiStats(wiki, attrs, groups, dwiki) {
    if (wiki.indexOf('http://') === -1) {
        wiki = 'http://' + wiki;
    }
    if (wiki.indexOf('.wikia.com') === -1) {
        wiki = wiki + '.wikia.com';
    }
 
    // Statistics wiki
    if (attrs.length) {
        $.ajax({
            url: wiki + '/api.php',
            data: {
                action: 'query',
                meta: 'siteinfo',
                siprop: 'statistics',
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            type: 'GET',
            success: function (data) {
                $.each(attrs, function(i,s) {
                    $('.WikiStats[data-wiki="'+dwiki+'"] .outwikistats-'+s).text(data.query.statistics[s]);
                });
            }
        });
    }
 
    // Users Group
    if (!groups.length) {
        return;
    }
    $.each(groups, function(index, group) {
        $.ajax({
            url: wiki+'/api.php',
            dataType: 'jsonp',
            crossDomain:true,
            jsonp: 'callback',
            type: 'GET',
            data: {
                action:'query',
                list:'allusers',
                aulimit:'50',
                format:'json',
                augroup:group
            },
            success: function(d) {
                var array = d.query.allusers,
                    listuser = [];
                $.each(array, function(i, user) {
                    if (user.id !== '0') {
                        listuser.push('<a href="/wiki/User:'+encodeURIComponent(user.name)+'">'+user.name+'</a>');
                    } else {
                        listuser.push('Không có');
                    }
                });
                $('.WikiStats[data-wiki="'+dwiki+'"] .outwikistats-list-'+group).append(listuser.join(', '));
            }
        });
    });
}
 
$(function() {
    if (!$('.WikiStats').length) {
        return;
    }
 
    var arrwikis = [];
 
    $('.WikiStats').each(function() {
        if ($.inArray($(this).attr('data-wiki'), arrwikis) != -1) {
            return;
        }
 
        var wiki = $(this).attr('data-wiki'),
            wGroups = [],
            wAttrs = [];
 
        arrwikis.push(wiki);
 
        if ($(this).attr('data-rights')) {
            var advRights = $(this).attr('data-rights').split(','),
                that = this;
            $.each(advRights, function(i,r) {
                $(that).find('.WSGroups').append('<tr>'+
                    '<td style="background-color:rgba(0,0,0,0.3); width:125px;">'+r.replace(/.*:(.+)/,'$1')+':</td>'+
                    '<td style="border:1px solid black;"><span class="outwikistats-list-'+r.replace(/(.+):.*/,'$1')+'"></span></td>'+
                '</tr>');
            });
        }
 
        $('.WikiStats[data-wiki="'+wiki+'"]').each(function() {
            $(this).find('span').each(function() {
                var prop = $(this).attr('class').replace('outwikistats-','');
                if (prop.indexOf('list') === -1) {
                    if($.inArray(prop, wAttrs) === -1) {
                        wAttrs.push(prop);
                    }
                } else {
                    prop = prop.replace('list-','');
                    if($.inArray(prop, wGroups) === -1) {
                        wGroups.push(prop);
                    }
                }
            });
        });
 
        getWikiStats(wiki, wAttrs, wGroups, wiki);
    });
});