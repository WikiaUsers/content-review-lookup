/* <pre> */

/* Taken from wookieepedia, for documentation, see http://starwars.wikia.com/wiki/Wookieepedia:API */

/*
    Returns the parameter as it appears in the query string. Equivalent to $_GET[p] in PHP.
*/
function queryString(p) {
    var re = RegExp('[&?]' + p + '=([^&]*)');
    var matches;

    if(matches = re.exec(document.location)) {
        try {
            return decodeURI(matches[1]);
        }
        catch(e) { }
    }

    return null;
}

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if(myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    }
    else {
        myField.value += myValue;
    }
}

/* </pre> */