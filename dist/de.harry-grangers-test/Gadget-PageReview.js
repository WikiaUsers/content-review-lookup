function pageExists(title, success, error) {
    $.getJSON(mw.util.wikiScript('api') + '?action=query&titles=' + title + '&indexpageids=1&format=json').then(function(result) {
        if(result.query.pages[result.query.pageids[0]].missing == null) {
            success();
        } else {
            error();
        }
    })
}
function pageContent(title, callback) {
    $.getJSON(mw.util.wikiScript('api') + '?action=query&prop=revisions&titles=' + title + '&indexpageids=1&rvslots=*&rvprop=content&format=json').then(function(result) {
        callback(result.query.pages[result.query.pageids[0]].revisions[0]['*'])
    })
}
function addButtonToButtonBar(text, fn) {    
    var buttonBar = document.querySelector('.page-header__contribution-buttons')
    var reviewBtn = document.createElement('a')
    var reviewBtnContent = document.createElement('span')
    reviewBtn.classList.add('wds-button', 'wds-is-secondary')
    reviewBtnContent.innerHTML = text;
    reviewBtn.appendChild(reviewBtnContent)
    buttonBar.appendChild(reviewBtn)
    reviewBtn.addEventListener('click', fn)
}
function showBlackoutModal(title, content, buttons) {
    var modalBlackout = document.createElement('div')
    var modal = document.createElement('div')
    var header = document.createElement('header')
    var closeBtn = document.createElement('a')
    var headline = document.createElement('h3')
    var section = document.createElement('section')
    var footer = document.createElement('footer')
    
    modalBlackout.classList.add('modal-blackout', 'visible')
    modal.classList.add('modal', 'content-size')
    closeBtn.classList.add('close')
    closeBtn.setAttribute('title', 'close')
    closeBtn.innerHTML = 'close'
    headline.innerHTML = title
    section.innerHTML = content

    header.appendChild(closeBtn)
    header.appendChild(headline)
    footer.appendChild(buttons)
    modal.appendChild(header)
    modal.appendChild(section)
    modal.appendChild(footer)
    modalBlackout.appendChild(modal)
    document.body.appendChild(modalBlackout)
    return modalBlackout
}
if (wgNamespaceNumber === 0) {
    pageExists(wgPageName, function() {
        // page exists
        pageExists('MediaWiki:Custom-pagereview-' + wgPageName + '-json', function() {
            // Page review exists
            pageContent(wgPageName, function(content) {
                var content = JSON.parse(content)
                console.log('review', content)
            })
        }, function() {
            // Page is currently unreviewed
            addButtonToButtonBar('Add review', function() {
                var fragment = new DocumentFragment()
                var createBtn = document.createElement('button')
                var closeBtn = document.createElement('button')

                createBtn.innerHTML = 'Create'
                closeBtn.innerHTML = 'Close'

                createBtn.addEventListener('click', function() {
                    console.log('create review')
                })
                closeBtn.addEventListener('click', function() {
                    console.log('close')
                })

                fragment.appendChild(createBtn)
                fragment.appendChild(closeBtn)

                showBlackoutModal('Create review', 'form', fragment)
            })
        })
    }, function() {
        // page doesn't exist
        pageExists('MediaWiki:Custom-pagereview-' + wgPageName + '-json', function() {
            // Draft exists
            console.log('Draft exists')
        }, function() {
            // Draft doesn't exist
            addButtonToButtonBar('Create draft', function() {
                var fragment = new DocumentFragment()
                var createBtn = document.createElement('button')
                var closeBtn = document.createElement('button')

                createBtn.innerHTML = 'Create'
                closeBtn.innerHTML = 'Close'

                createBtn.addEventListener('click', function() {
                    console.log('create review')
                })
                closeBtn.addEventListener('click', function() {
                    console.log('close')
                })

                fragment.appendChild(createBtn)
                fragment.appendChild(closeBtn)

                showBlackoutModal('Create draft', 'form', fragment)
            })
        })
    });
}