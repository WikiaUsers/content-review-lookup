/* Substitute Template:Information into upload page */
if(wgCanonicalSpecialPageName == 'Upload') {
    $('#wpUploadDescription').val(
        '== Zusammenfassung ==\r\n' +
        insertTemplateParams(
            'Information',
            ['Beachten','Beschreibung','Quelle','Autor','Dateispezis','Lizenz','Andere Versionen','Kategorien']
        )
    );
}

function insertTemplateParams(template, params) {
    tmpl = "{{" + template + '\r\n';
    for (i in params) {
        tmpl += '|' + params[i] + '=\r\n';
    }
    tmpl += "}}";
    return tmpl;
}