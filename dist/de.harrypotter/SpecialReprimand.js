if(mw.config.get('wgNamespaceNumber') == -1 && mw.config.get('wgTitle') == 'Reprimand') {
    $('.page-header h1').text(mw.config.get('wgTitle'));
    //default page get
    var params = {
        action: 'query',
        prop: 'revisions',
        rvprop: 'content',
        format: 'json',
        indexpageids: true,
        v: Math.floor(Math.random() * 10)
    };
    
    //get URLs
    var mustacheParams = Object.assign({}, params);
    mustacheParams.titles = 'MediaWiki:Custom-SpecialReprimand.mustache';
    var mustacheURL = '/api.php?' + $.param(mustacheParams);
    var tomlParams =  Object.assign({}, params);
    tomlParams.titles = 'Harry-Potter-Lexikon:Diskussionen Verwarnungen/store.toml';
    var tomlURL = '/api.php?' + $.param(tomlParams);
    
    //toml functions
    var mustacheFunctions = {
        acutenessColor: function() {
            switch(this.count) {
                case 0:
                    return 'muted';
                case 1:
                    return 'success';
                case 2:
                    return 'warning';
                case 3:
                    return 'danger';
                default:
                    return 'info';
            }
        },
        i: 0,
        currentIndex: function() {
            return mustacheFunctions.i++;
        },
        ulTmpl: '<ul>{{#list}}<li>{{value}}</li>{{/list}}</ul>',
        list: function() {
            return function(v, render) {
                val = render(v);
                if(val.includes('|')) {
                    console.log('list',this.ulTmpl,mustacheFunctions.ulTmpl);
                    return Mustache.render(mustacheFunctions.ulTmpl,{list: [{value: 1},{value: 'a'},{value: '42'}]});
                    return val.split('|').join(', ');
                }
                else {
                    return val;
                }
            };
        }
    };
    
    $.get(tomlURL, function(data) {
        var dataset = data.query.pages[data.query.pageids[0]].revisions[0]['*'];
        var reprimands = TOML.parse(dataset);
        reprimands = Object.assign(reprimands, mustacheFunctions);
        $.get(mustacheURL, function(res) {
            var template = res.query.pages[res.query.pageids[0]].revisions[0]['*'];
            Mustache.parse(template);
            console.log('dataset',reprimands);
            console.log('template',template);
            console.log('output',$(Mustache.render(template, reprimands)).find('table'));
            $(mw.util.$content).html(
                $(Mustache.render(template, reprimands)).find('table')
            );
        });
    });
}