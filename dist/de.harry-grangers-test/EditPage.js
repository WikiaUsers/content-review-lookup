function editPage(title,content,summary) {
    /*callAPI({
        'action': 'query',
        'prop': 'info|revisions',
        'intoken': 'edit',
        'titles': title,
        'rvprop': 'content',
        'rvlimit': '1'
    }, 'GET', function (response) {
            */callAPI({
                'minor': 'yes',
                'summary': summary,
                'action': 'edit',
                'title': title,
                'startimestamp': Date.now(),
                'token': mw.user.tokens.get('editToken'), //response.query.pages[Object.keys(response.query.pages)[0]].edittoken,
                'watchlist': 'unwatch',
                'text': content
            }, 'POST', function (response) {
                if (response.edit.result == 'Success') {
                    console.log('success:',response);
                }
                else {
                    console.log('error:',response);
                }
           });
   //});
}
function addCustomEditButton(button) {
    if (mwCustomEditButtons) {
        console.log(button,$.type(button));
        switch($.type(button)) {
            case 'array':
                mwCustomEditButtons.push({
                    "imageFile": button[0],
                    "speedTip": button[1],
                    "tagOpen": button[2],
                    "tagClose": button[3],
                    "sampleText": button[4] || button[1]
                });
                break;
            case 'object':
                mwCustomEditButtons.push(button);
                break;
            default:
                console.error('TypeError: parameter"button" have to be of type object or array');
                break;
        }
    }
}
 
function addCustomEditButtons(buttons) {
    if (mwCustomEditButtons) {
        console.log(buttons);
        for(i in buttons) {
            addCustomEditButton(buttons[i]);
        }
    }
}

wgIsWYSIWYG = !!$('.mode-wysiwyg').length;
wgIsCodeEditor = !!$('.mode-source').length;
wgIsEditModeWidescreen = !!$('.editpage-visualwidemode').length;
wgEditor = wgIsCodeEditor ? 'Code-Ansicht' : (wgIsWYSIWYG ? 'Grafischer Editor' : null);