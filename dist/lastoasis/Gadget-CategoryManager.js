// <nowiki>
var api = new mw.Api()

var getPageCategories = document.utils.getPageCategories
var getWikiText = document.utils.getWikiText
var notifySuccess = document.utils.notifySuccess
var notifyError = document.utils.notifyError

// add a category
var addWrapper = $('<span></span>')
addWrapper.append(' (')
var addBtn = $('<span class="add-cat">+</span>')
addWrapper.append(addBtn)
addWrapper.append(')')
addWrapper.insertAfter('#catlinks > div > a')

addBtn.on('click', function(event) {
    event.preventDefault();
    OO.ui.prompt('What category do you want to add to '+mw.config.get('wgPageName')+'?', {
        textInput: { placeholder: 'Category name' }
    }).done(function(toAdd) {
        if (toAdd) {
            getPageCategories().then(function(categories) {
                if (categories.indexOf(toAdd) < 0) {
                    api.postWithToken('csrf', {
                        action: 'edit',
                        pageid: mw.config.get('wgArticleId'),
                        appendtext: '[[Category:'+toAdd+']]',
                        minor: true
                    }).then(function(res) {
                        notifySuccess("Added "+mw.config.get('wgPageName')+' to Cateogry:'+toAdd+'.')
                        setTimeout(function() {
                            window.location.reload()
                        }, 700)
                    }).fail(function(err) { console.error(err) })
                }
                else {
                    notifyError(mw.config.get('wgPageName')+' already is a member of Category:'+toAdd+'.')
                }
            }).fail(function(err) { console.error(err) })
        }
    })
});

    // remove a category
getWikiText().done(function (wikiText) {
    $("#catlinks ul > li > a").each(function(i, el) {
        var cat = $(el).text()
        var regex = new RegExp("\\[\\[[Cc]ategory:\\s?"+cat+"\\]\\]", "g")
        if (regex.test(wikiText)) {
            var wrapper = $('<span></span>')
            wrapper.append(' (')
            var rmBtn = $('<span class="rm-cat">-</span>')
            wrapper.append(rmBtn)
            wrapper.append(')')
            wrapper.insertAfter(el)
            rmBtn.on('click', function(event) {
                event.preventDefault()
                OO.ui.confirm("Do you want to remove Category:"+cat+"?").done(function(confirmed) {
                    if (confirmed) {
                        getWikiText().then(function(pgTxt) {
                            var newPgTxt = pgTxt.replace(regex, "")
                            api.postWithToken('csrf', {
                                action: 'edit',
                                pageid: mw.config.get('wgArticleId'),
                                text: newPgTxt,
                                minor: true
                            }).then(function(res) {
                                notifySuccess('Successfully removed '+mw.config.get('wgPageName')+' from Category:'+cat+'.')
                                setTimeout(function() {
                                    window.location.reload()
                                }, 700)
                            }).fail(function(err) { console.error(err) })
                        }).fail(function(err) { console.error(err) })
                    }
                })
            });
        }
    })
})
// </nowiki>