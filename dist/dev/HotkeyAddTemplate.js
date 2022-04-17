/***
 * <nowiki>
 * @title           HotkeyAddTemplate
 * @description     Allows users to add (prepend/append) templates to pages with the press of a key.
 * @docs            [[HotkeyAddTemplate]]
 * @author          Sidemen19
 * @version         1.0
 * @todo            Add support for custom {{Delete}} reasons
 * @todo            Add support for custom {{DISPLAYTITLE:}} titles
 ***/

//variables
var api = new mw.Api(), i18n;

/** 
 * main function
 * check for main (0), Template: (6) and File: (10) namespaces 
 */
(function addTemplate() {
    if (wgNamespaceNumber !== 0 && 6 && 10) {
        return;
    }

    /**
     * code for prepending template
     * default value for prompt is Stub
     * hotkey for prepending is Alt + T
     */
    function prependTemplate() {
        var templateName = prompt(i18n.msg('template-name').plain(), 'Stub');
        if (templateName === null) {
            return;
        }
        api.postWithEditToken({
            title: wgPageName,
            action: 'edit',
            prependtext: '{{' + templateName + '}} \n',
            summary: i18n.msg('summary').plain() + '[[Template:' + templateName + '|' + templateName + ']]'
        }).done(function (a) {
            if (a.error) {
                alert(i18n.msg('error-prepend').plain() + a.error.code);
            } else {
                location.reload();
            }
        });
    }

    /**
     * code for appending template
     * default value for prompt is Reflist
     * hotkey for appending is Alt + A
     */
    function appendTemplate() {
        var templateName = prompt(i18n.msg('template-name').plain(), 'Reflist');
        if (templateName === null) {
            return;
        }
        api.postWithEditToken({
            title: wgPageName,
            action: 'edit',
            appendtext: '{{' + templateName + '}} \n',
            summary: i18n.msg('summary').plain() + '[[Template:' + templateName + '|' + templateName + ']]'
        }).done(function (a) {
            if (a.error) {
                alert(i18n.msg('error-append').plain() + a.error.code);
            } else {
                location.reload();
            }
        });
    }

    /**
     * adds event listener for when users happen to click Alt and T/A at the same time
     */
    document.addEventListener('keyup', function (e) {
        //when key T is pressed
        if (e.altKey && e.keyCode === 84) {
            e.preventDefault(),
                prependTemplate();
        }
        // when key A is pressed
        if (e.altKey && e.keyCode === 65) {
            e.preventDefault(),
                appendTemplate();
        }
    }, {
        capture: false
    });
    mw.hook('dev.i18n').add(function (i18no) {
        $.when(
            i18no.loadMessages('HotkeyAddTemplate'),
            mw.loader.using('mediawiki.api')
        ).then(addTemplate());
    });

    //import i18n
    importArticle({
        type: 'script',
        article: 'u:dev:I18n-js/code.js'
    });
});