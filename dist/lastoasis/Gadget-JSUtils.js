document.utils = {}
/*
 * Gets categories of a specified page, or the page the function was called on
 * Returns a jQuery promise
 */
function getPageCategories(pageId) {
    var catPromise = new $.Deferred()
    var id = pageId || mw.config.get('wgArticleId')
    var api = new mw.Api()
    api.get({
        action: 'query',
        prop: 'categories',
        format: 'json',
        pageids: id
    }).done(function (res) {
        var resCategories = res.query.pages[parseInt(id)].categories
        if (resCategories) {
            catPromise.resolve(resCategories.map(function(el) {
                return el.title.split(':')[1]
            }))
        } else {
            catPromise.resolve([])
        }
    }).fail(function (err) {
        catPromise.reject(err)
    })
    return catPromise
}

document.utils.getPageCategories = getPageCategories


/*
 * Gets the wiki text for either the specificed page or the page the code was run on
 * Returns a jQuery promise
 */
function getWikiText(pageId) {
    var prom = new $.Deferred()
    var id = pageId || mw.config.get('wgArticleId')
    var api = new mw.Api()
    api.get({
        action: 'parse',
        pageid: id,
        prop: 'wikitext',
        format: 'json'
    }).done(function (res) {
        prom.resolve(res.parse.wikitext['*'])
    }).fail(function (err) {
        prom.reject(err)
    })
    return prom
}

document.utils.getWikiText = getWikiText

/*
 * Shows an error notification
 */
function notifyError(msg, tag) {
    tag = tag | 'errorTag'
    mw.notify(msg, {
        autoHide: true,
        autoHideSeconds: 6,
        title: 'Error',
        type: 'error',
        tag: tag
    })
}

document.utils.notifyError = notifyError

/*
 * Shows a success notification
 */
function notifySuccess(msg, tag) {
    tag = tag | 'successTag'
    mw.notify(msg, {
        autoHide: true,
        autoHideSeconds: 6,
        title: 'Success',
        type: 'info',
        tag: tag
    })
}

document.utils.notifySuccess = notifySuccess