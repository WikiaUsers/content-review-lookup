mw.hook('ve.toolbarSaveButton.stateChanged').add(function () {
    replaceAllTextDiacritics();
});

function replaceAllTextDiacritics() {
    replaceLetter("ș", "ş");
    replaceLetter("Ș", "Ş");
    replaceLetter("ț", "ţ");
    replaceLetter("Ț", "Ţ");
}

function replaceLetter(old, replace) {
    var surfaceModel = ve.init.target.getSurface().getModel();
    var documentModel = surfaceModel.getDocument();
    var query = new RegExp(old, "g");
    var fragments = [];
    if (!documentModel.getInternalList().getListNode())
    	return;
    var ranges = documentModel.findText(query, true, true);
    var i, l;
    for (i = 0, l = ranges.length; i < l; i++) {
        fragment = surfaceModel.getLinearFragment(ranges[i], true, true);
        annotations = fragment.getAnnotations(true);
        if (annotations.getLength() > 0)
        	annotations = annotations.getAnnotationsByName('meta/language');
        if (annotations.getLength() === 0)
        	fragments.push(fragment);
    }
    for (i = 0, l = fragments.length; i < l; i++) {
        replaceOne(fragments[i], query, replace);
    }
}

function replaceOne(fragment, query, replace) {
    if (query instanceof RegExp) {
        fragment.insertContent(
            fragment.getText().replace(query, replace),
            true);
    } else {
        fragment.insertContent(replace, true);
    }
}

//TODO: in order to replace the template elements, I need to find a relevant hook and call the following:
// $('.ve-ui-mwParameterPage-field > .oo-ui-textInputWidget > textarea')[i].val(sanitizeWikitext($('.ve-ui-mwParameterPage-field > .oo-ui-textInputWidget > textarea')[i].val()))

//TODO: skip sensitive templates

//TODO: galleries - the editor is similar to templates, so we can just ignore it for now; wa are at feature-parity with the normal editor