function getUserContribs(user, timestamp, options, callback) {
    console.log('users',user,'options',options);
    api.get({
		action: 'query',
		list: 'usercontribs',
		ucuser: typeof user == 'array' ? user.join('|') : user,
		ucprop: 'title|flags',
		uclimit: 'max',
		ucstart: timestamp,
		ucdir: 'newer',
		format: 'json'
    }).then(function(data) {
        callback(data.query.usercontribs,options);
    });
}
 
if(isUserpage()) {
    newpages_created = window.hasOwnProperty('config') && config.hasOwnProperty('newpages_created') ? config.newpages_created : 'new pages created';
    $.getJSON('/api.php', {
        action: 'parse',
        text: '{{#dpl:\
            |uses=Vorlage:BPcode\
            |namespace=0\
            |createdby=' + getUserByPage() + '\
            |resultsfooter=%PAGES%\
            |oneresultfooter=1\
            |noresultsfooter=0\
            |mode=userformat\
        }}',
        format: 'json',
        disablepp: 1
    }).then(function(res) {
        $('.masthead-info-lower .contributions-details.tally').after(
            $('<div />', { class: 'tally' }).append(
                $('<em />', { text: $(res.parse.text['*']).text() }),
                $('<span />', { text: newpages_created })
            )
        );
    });
}