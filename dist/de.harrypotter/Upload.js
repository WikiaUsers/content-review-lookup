/* Substitute Template:Information into upload page */
if(mw.config.get('wgCanonicalSpecialPageName') == 'Upload') {
    $('#wpUploadDescription').val(
        '== Zusammenfassung ==\r\n' +
        insertTemplateParams(
            'Information',
            ['Beachten', 'Beschreibung', 'Quelle', 'Autor', 'Dateispezis', 'Lizenz', 'Andere Versionen', 'Kategorien']
        )
    );
}

function insertTemplateParams(template, params) {
    var tmpl = "{{" + template + '\r\n';
    for (var i in params) {
        tmpl += '|' + params[i] + '=\r\n';
    }
    tmpl += "}}";
    return tmpl;
}