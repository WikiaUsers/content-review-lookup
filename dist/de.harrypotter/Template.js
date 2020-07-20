function insertTemplateParams(template, params) {
    tmpl = "{{" + template + '\r\n';
    for (i in params) {
        tmpl += '|' + params[i] + '=\r\n';
    }
    tmpl += "}}";
    return tmpl;
}
function insertTemplate(template) {
    $.get('/api.php?action=parse&prop=sections&page=Vorlage:' + template + '&format=json', function(data) {
        if(_.findWhere(data.parse.sections,{line:'Anwendung'}) !== 'undefined') {
            section = _.findWhere(data.parse.sections,{line:'Anwendung'}).index;
            $.get('/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=Vorlage:' + template + '&rvsection=' + section + '&format=json', function(result) {
               content = $.parseHTML(result.query.pages[Object.keys(result.query.pages)[0]].revisions[0]['*']);
               for (i in content) {
                   if(typeof content[i].tagName !== 'undefined') {
                       if(content[i].tagName.toLowerCase() == 'pre') {
                           console.log($(content[i]).html());
                       }
                   }
               }
            });
        }
    });
}