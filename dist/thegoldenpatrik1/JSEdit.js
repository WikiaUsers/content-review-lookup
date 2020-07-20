/**
 * @name            JSEdit
 * @version         v1.1
 * @author          TheGoldenPatrik1
 * @protect         <nowiki>
 * @description     Configurable JS-based editing platform
 */
mw.loader.using(['mediawiki.util', 'mediawiki.api'], function () {
    // Load protection
    if (window.JSEditLoaded) {
      return;
    }
    window.JSEditLoaded = true;
    // Variables 
    var token = mw.user.tokens.get('editToken'),
    Api = new mw.Api(),
    JSEdit = $.extend({
        delay: 1000,
        find: '',
        content: '',
        summary: '',
        type: ''
    }, window.JSEdit);
    /**
     * @method closeModal
     * @description Closes the modal.
     */
    function closeModal () {
        $('#form-js-edit').closeModal();
    }
    /**
     * @method click
     * @description Shows the modal.
     */
    function click () {
        $.showCustomModal('JS Edit', FormHTML, {
            id: 'form-js-edit',
            width: 500,
            buttons: [{
                message: 'Cancel',
                handler: closeModal
            }, {
                id: 'startButton',
                message: 'Initiate',
                defaultButton: true,
                handler: init
            }]
        });
    }
    /**
     * @method init
     * @description Performs the process.
     */
    function init () {
        var txt = document.getElementById('text-js-edit'),
        pages = txt.value.split('\n'),
        currentPage = pages[0];
 
        document.getElementById('startButton').setAttribute('disabled', 'disabled');
 
        if (!currentPage) {
            document.getElementById('startButton').removeAttribute('disabled');
            $('#text-error-output').append(
                'Nothing left to do or the next line is blank!<br/>'
            );
        } else {
            process(currentPage);
        }
        pages = pages.slice(1, pages.length);
        txt.value = pages.join('\n');
    }
    /**
     * @method process
     * @description Analyzes the configuration and acts upon it
     * @param {String} page - The page to edit
     */
    function process (page) {
        if (JSEdit.type !== 'replace') {
            edit(JSEdit.type, JSEdit.content, page);
            setTimeout(init, JSEdit.delay);
            return;
        }
        Api.get({
            action: 'query',
            prop: 'info|revisions',
            intoken: 'edit',
            titles: page,
            rvprop: 'content',
            rvlimit: '1',
            indexpageids: 'true',
            format : 'json'
        }).done(function (data) {
            if (!data.error) {
                var newText;
                var result = data.query.pages[
                    Object.keys(data.query.pages)[0]
                ];
                var text = result.revisions[0]['*'];
                newText = text.split(JSEdit.find).join(JSEdit.content);
                if (newText === text) {
                    sendError(
                        JSEdit.find + ' could not be found in ' + page
                    );
                } else {
                    edit('text', newText, page);
                }
            }
        });
        setTimeout(init, JSEdit.delay);
    }
    /**
     * @method init
     * @description Edits the page
     * @param {String} type - The type of action
     * @param {String} content - The content to add
     * @param {String} page - The page to edit
     */
    function edit (type, content, page) {
        var params = {
            action: 'edit',
            watchlist: 'nochange',
            title: page,
            summary: JSEdit.summary,
            token: token
        };
        params[type] = content;
        Api.post(params)
        .done(function (d) {
            if (!d.error) {
                console.log(page + ' successfully edited!');
            } else {
                sendError(
                    'An error occured while editing ' + page + ': ' + d.error.code
                );
            }
        })
        .fail(function () {
            sendError(
                'An error occured while editing ' + page
            );
        });
    }
    /**
     * @method sendError
     * @description Outputs an error
     * @param {String} error - The error to output
     */
    function sendError (error) {
        console.log(error);
        $('#text-error-output').append(error + '<br/>');
 
    }
    // Form
    var FormHTML = 
        $('<form>', {
            'class': 'WikiaForm'
        }).append(
            $('<fieldset>').append(
                $('<p>', {
                    text: 'Enter a list of pages you would like to edit.'
                }),
                $('<textarea/>', {
                    id: 'text-js-edit',
                    style: 'height: 20em; width: 80%;'
                }),
                $('<hr/>'),
                $('<div>', {
                    id: 'text-error-output',
                    text: 'Any errors encountered will appear below.',
                    style: 'height:10em; width: 80%; margin: 5px auto 0px auto; color: #000; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll'
                }).append(
                    $('<br/>')
                )
            )
        );
    // Button
    $('#my-tools-menu').prepend(
        $('<li>', {
            'class': 'custom'
        }).append (
            $('<a>',{
                text: 'JS Edit',
                click: click
            })
        )
    );
});