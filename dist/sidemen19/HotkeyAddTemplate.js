/***
 * @title           QuickAddTemplate
 * @description     Allows users to add (prepend/append) templates to pages with the press of a key.
 * @docs            [[HotkeyAddTemplate]]
 * @author          Sidemen19
 * @installation    @import url("/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:HotkeyAddTemplate.js"); 
 * @todo            Add support for custom {{Delete}} reasons
 * @todo            Add support for {{DISPLAYTITLE:}}
 ***/

//global variables
var api = new mw.Api(), i18n;

/** 
 * main function
 * check for main (0), template (6) and file (10) namespace 
 */
$(function addTemplate() {
    if (wgNamespaceNumber !== 0 && 6 && 10) {
        return;
    }

    /**
     * code for prepending template
     * default value for prompt is Stub
     * hotkey for prepending is Alt + T
     */
    var prependTemplate = function () {
        let templateName = prompt(i18n.msg('template-name').plain(), 'Stub');
        if (templateName === null) {
            return;
        }
        api.post({
            title: wgPageName,
            action: 'edit',
            prependtext: '{{' + templateName + '}} \n',
            summary: i18n.msg('summary').plain() + '[[Template:' + templateName + '|' + templateName + ']]',
            token: mw.user.tokens.get('editToken')
        }).done(function (a) {
            if (a.error) {
                alert(i18n.msg('error-prepend').plain() + a.error.code);
            } else {
                location.reload();
            }
        });
    };

    /**
     * code for appending template
     * default value for prompt is Reflist
     * hotkey for appending is Alt + A
     */
    var appendTemplate = function () {
        let templateName = prompt('Name of template:', 'Reflist');
        if (templateName === null) {
            return;
        }
        api.post({
            title: wgPageName,
            action: 'edit',
            appendtext: '{{' + templateName + '}} \n',
            summary: i18n.msg('summary').plain() + '[[Template:' + templateName + '|' + templateName + ']]',
            token: mw.user.tokens.get('editToken')
        }).done(function (a) {
            if (a.error) {
                alert(i18n.msg('error-append').plain() + a.error.code);
            } else {
                location.reload();
            }
        });
    };

    /**
     * adds event listener for when users happen to click Alt and T/A at the same time
     */
    document.addEventListener('keyup', function (e) {
        if (e.altKey && e.keyCode === 84 /* T */) {
            e.preventDefault(),
                prependTemplate();
        }
        if (e.altKey && e.keyCode === 65 /* A */) {
            e.preventDefault(),
                appendTemplate();
        }
    }, {
        capture: false
    });

    //import i18n
    if (!window.dev || !window.dev.i18n)
        importArticle({
            type: 'script',
            article: 'u:dev:I18n-js/code.js'
        });
    mw.hook('dev.i18n').add(function (i18np) {
        i18np.loadMessages('QuickAddTemplate').then(function (i18np) {
            i18n = i18np;
            i18n.useUserLang();
            addTemplate();
        });
    });
});