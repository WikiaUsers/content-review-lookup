if(!!$("[data-dpl-value]").length) {
    getRank($("[data-dpl-value]"));
}

function DPLAPI(instructions) {
    this.url = '/api.php?' + $.param({
        action: 'parse',
        format: 'json',
        disablepp: true,
        text: '{{#dpl:' + obj2Params(instructions) + '}}'
    });
}

function getRank(el) {
    $(el).each(function(key,val) {
        title = $(val).data('dpl-value');
        url = getInfoboxParam(title,'WiedervorkommendeCharacter','Rang');
        
        $.getJSON(url,function(res) {
            $(val).text($(res.parse.text['*']).text());
        });
    });
}

function getInfoboxParam(page,template,param) {
    return new DPLAPI({
        titlematch: $(val).data('dpl-value'),
        count: 1,
        include: '{' + template + '}:' + param,
        format:','
    }).url;
}

function obj2Params(obj) {
    return _.pairs(obj).map(function(pair) {
        return pair.join('=');
    }).join('|');
}