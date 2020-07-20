function submitPageForReview(page) {
    $.nirvana.postJson('ContentReviewApi','submitPageForReview',{
        pageName: page,
        editToken: mw.user.tokens.get('editToken')
    },
    function(data) {
        console.log(data);
    }).fail(function(e,f,g) {
        responseJSON = JSON.parse(e.responseText);
        exceptionMessage = responseJSON.exception.message;
        if(e.status == 501 && g == 'Not Implemented' && exceptionMessage == 'The INSERT operation failed.') {
            throw new ReferenceError('Page is already submitted for request');
        }
        else if(e.status == 404 && g == 'Not Found' && responseJSON.exception.type == 'NotFoundApiException') {
            throw new ReferenceError(responseJSON.exception.message + ': ' + responseJSON.exception.details);
        }
    });
}

function enableTestMode() {
    $.nirvana.postJson('ContentReviewApi','enableTestMode',{
        editToken: mw.user.tokens.get('editToken')
    },function(data) {
        console.log('a');
    }).fail(function(e,f,g) {
        console.log(e,f,g);
    });
}

function disableTestMode() {
    $.nirvana.postJson('ContentReviewApi','disableTestMode',{
        editToken: mw.user.tokens.get('editToken')
    },function(data) {
        console.log('a');
    }).fail(function(e,f,g) {
        console.log(e,f,g);
    });
}

function isTestModeEnabled() {
    return window.hasOwnProperty('testmode') && testmode;
}

function toggleTestMode() {
    isTestModeEnabled() ? disableTestMode() : disableTestMode();
}

function getReviewData() {
    $.nirvana.getJson('ContentReviewApi','renderStatusModal',{
        pageName: 'MediaWiki:Wikia.js',
        editToken: mw.user.tokens.get('editToken')
    },function(data) {
        console.log(data);
    }).fail(function(e,f,g) {
            console.log(e,f,g);
    });
}