/**
 * Find new pages created by the supplied user
 * Looks for an element with ID "js-newpagesuser"
 */
(function(mw, $) {
    'use strict';

    var i18n,
        PREFIX = 'js-newpagesuser',
        urlAPI = mw.config.get('wgScriptPath') + '/api.php',
        ns = [],
        pages, user, count;

    // get the parent IDs of selected revisions
    // output revision info if there is no parent
    function getParents() {
        $.post(urlAPI, {
            format: 'json',
            action: 'query',
            prop: 'revisions',
            rvprop: 'ids|timestamp',
            revids: pages.slice(0, 50).join('|')
        }, function(data) {
            var output = '',
                a = [],
                t, i;

            if (data.query) {
                t = data.query.pages;
                // make it an array to sort it
                // because the query unsorts it
                for (i in t) {
                    if (t.hasOwnProperty(i)) a.push(t[i]);
                }
                a.sort(function(x, y) {
                    return (x.revisions[0].revid < y.revisions[0].revid) ? 1 : -1;
                });
                for (i = 0; i < a.length; ++i) {
                    // new pages are pages without a parent
                    t = a[i].revisions[0];
                    if (t.parentid === 0) {
                        t = new Date(t.timestamp).toUTCString();
                        output += String.prototype.concat(
                            '<span style="font-family: monospace;">',
                                t.substr(5, 11).replace(/^0/, '&nbsp;') + ', ',
                                t.substr(17, 8).replace(/^0/, '&nbsp;') + ': ',
                            '</span>',
                            '<a href="',
                                mw.util.getUrl(a[i].title, {redirect: 'no'}),
                                '">',
                                mw.html.escape(a[i].title),
                             '</a><br/>'
                        );
                    }
                }
                $('#' + PREFIX + '-list').append(output);
                if (pages.length) {
                    // there's more data to get
                    getParents();
                    return;
                }
                $('#' + PREFIX + '-list').append(i18n.msg('statDone').escape());
            } else if (data.error) {
                $('#' + PREFIX + '-list').append(
                    data.error.code + ': ' + data.error.info
                );
            }
            // re-enable Go, error or not
            $('#' + PREFIX + '-go').prop('disabled', false);
        });
        pages = pages.slice(50);
    }

    // get all the user contributions
    // keep only the earliest contribution for each page
    // c (optional) = continuation
    function getPages(c) {
        var o = {
                format: 'json',
                action: 'query',
                list: 'usercontribs',
                uclimit: 500,
                ucprop: 'ids',
                ucuser: user
            },
            ucns = [],
            all = true,
            i;

        for (i = 0; i < ns.length; ++i) {
            all = all && ns[i].checked;
            if (ns[i].checked) {
                ucns.push(ns[i].id);
            }
        }
        // don't bother defining ucnamespace if they're all checked
        if (!all) o.ucnamespace = ucns.join('|');
        // first time or continuation ?
        if (c) {
            for (i in c) {
                if (c.hasOwnProperty(i)) o[i] = c[i];
            }
            ++count;
        } else {
            pages = {};
            count = 1;
        }
        $('#' + PREFIX + '-list').empty()
            .append(i18n.msg('statQuery', count).escape());
        $.post(urlAPI, o, function(data) {
            var a, i;

            if (data.query) {
                a = data.query.usercontribs;
                for (i = 0; i < a.length; ++i) {
                    // keep only the earliest contribution for each page
                    if ((pages[a[i].pageid] === undefined) ||
                        (a[i].revid < pages[a[i].pageid])) {
                        pages[a[i].pageid] = a[i].revid;
                    }
                }
                // find the continuation data, if it exists
                // continue is a reserved word, so quote it
                a = data['continue'] ||
                    ((a = (data['query-continue'] || data.rawcontinue)) && a.usercontribs);
                if (a) {
                    // there's more data to get
                    getPages(a);
                    return;
                }
                // make an array of rev IDs for sorting
                a = [];
                for (i in pages) {
                    if (pages.hasOwnProperty(i)) {
                        a.push(pages[i]);
                    }
                }
                if (a.length === 0) {
                    $('#' + PREFIX + '-list').empty()
                        .append(i18n.msg('statNone', user).escape());
                    // re-enable Go for error exit
                    $('#' + PREFIX + '-go').prop('disabled', false);
                    return;
                }
                a.sort(function(x, y) {
                    // descending rev IDs
                    return (x < y) ? 1 : -1;
                });
                pages = a;
                $('#' + PREFIX + '-list').empty();
                getParents();
            } else if (data.error) {
                $('#' + PREFIX + '-list').empty().append(
                    data.error.code + ': ' + data.error.info
                );
                // re-enable Go for error exit
                $('#' + PREFIX + '-go').prop('disabled', false);
            }
        });
    }

    // make and display the control field
    function makeControls() {
        var fieldset = $(String.prototype.concat(
            '<fieldset>',
                '<legend>' + i18n.msg('legendTop').escape() + '</legend>',
                '<table><tbody>',
                    '<tr>',
                        '<td class="mw-label" style="vertical-align: middle;">',
                            '<label for="' + PREFIX + '-user">',
                                i18n.msg('labelUser').escape() + ':',
                            '</label>',
                        '</td>',
                        '<td class="mw-input">',
                            '<input id="' + PREFIX,
                                '-user" type="text" size="20" maxlength="85"/>',
                            ' ',
                            '<input id="' + PREFIX,
                                '-go" type="button" value="' + i18n.msg('inputGo').escape() + '"/>',
                        '</td>',
                    '</tr>',
                    '<tr>',
                        '<td colspan="2">',
                            '<fieldset>',
                                '<legend>' + i18n.msg('legendSub').escape() + '</legend>',
                                '<small><table><tbody id="' + PREFIX + '-nspaces">',
                                    '<tr>',
                                        '<td colspan="4" class="mw-label">',
                                            '<input id="' + PREFIX,
                                                '-nsall" type="button" value="' + i18n.msg('inputAll').escape(),
                                                '"/>',
                                            ' ',
                                            '<input id="' + PREFIX,
                                                '-nsnone" type="button" value="' + i18n.msg('inputNone').escape(),
                                                '"/>',
                                            ' ',
                                            '<input id="' + PREFIX,
                                                '-nsflip" type="button" value="' + i18n.msg('inputFlip').escape(),
                                                '"/>',
                                        '</td>',
                                    '</tr>',
                                '</tbody></table></small>',
                            '</fieldset>',
                        '</td>',
                    '</tr>',
                '</tbody></table>',
            '</fieldset>',
            '<div id="' + PREFIX + '-list"></div>'
        )), i, j, s;

        // make a 4-column table of namespaces
        j = 4 * Math.ceil(ns.length / 4);
        s = '';
        for (i = 0; i < j; ++i) {
            if (4 * Math.floor(i / 4) === i) {
                s += '<tr>';
            }
            if (i < ns.length) {
                s += String.prototype.concat(
                    '<td class="mw-submit">',
                        '<input type="checkbox" id="' + PREFIX + '-ns-' + ns[i].id,
                            '" checked="" style="vertical-align: middle;"/>',
                        '<label for="' + PREFIX + '-ns-' + ns[i].id + '">',
                            mw.html.escape(ns[i].name),
                        '</label>',
                    '</td>'
                );
            } else {
                s += '<td></td>';
            }
            if (4 * Math.floor(i / 4) === i - 3) {
                s += '</tr>';
            }
        }
        fieldset.find('#' + PREFIX + '-nspaces').prepend(s);
        // define the button actions
        fieldset.find('#' + PREFIX + '-go').click(function() {
            var any = false,
                i;

            this.disabled = true; // no double-clicking
            user = $('#' + PREFIX + '-user').val()
                .replace(/^\s+/, '').replace(/\s+$/, '');
            if (user === '') {
                $('#' + PREFIX + '-list').empty()
                    .append(i18n.msg('errUser').escape());
                // re-enable for error exit
                this.disabled = false;
                return;
            }
            for (i = 0; i < ns.length; ++i) {
                ns[i].checked = $('#' + PREFIX + '-ns-' + ns[i].id).prop('checked');
                any = any || ns[i].checked;
            }
            if (!any) {
                $('#' + PREFIX + '-list').empty()
                    .append(i18n.msg('errNamespace').escape());
                // re-enable for error exit
                this.disabled = false;
                return;
            }
            getPages();
        });
        fieldset.find('#' + PREFIX + '-nsall').click(function() {
            $('[id^=' + PREFIX + '-ns-]').prop('checked', true);
        });
        fieldset.find('#' + PREFIX + '-nsnone').click(function() {
            $('[id^=' + PREFIX + '-ns-]').prop('checked', false);
        });
        fieldset.find('#' + PREFIX + '-nsflip').click(function() {
            $('[id^=' + PREFIX + '-ns-]').each(function() {
                this.checked = !this.checked;
            });
        });
        $('#' + PREFIX).empty().append(fieldset);
    }

    // check for the signature ID & exit if not found
    // otherwise, crank it up
    function init() {
        $(function() {
            $.post(urlAPI, {
                format: 'json',
                action: 'query',
                meta: 'siteinfo|allmessages',
                siprop: 'namespaces',
                ammessages: 'blanknamespace',
                amlang: mw.config.get('wgContentLanguage')
            }, function(data) {
                var i, o, n;

                if (data.query) {
                    o = data.query.namespaces;
                    o['0']['*'] = data.query.allmessages[0]['*'];
                    for (i in o) {
                        // make an array of namespace IDs and names
                        // skip Media: and Special:
                        if (o.hasOwnProperty(i) && (o[i].id > -1)) {
                            n = o[i]['*'];
                            ns.push({
                                id: o[i].id,
                                name: n
                            });
                        }
                    }
                    makeControls();
                }
            });
        })
    }

    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' })
    mw.hook('dev.i18n').add(function(i18np) {
        i18np.loadMessages('NewPagesUser').then(function(i18np) {
            i18n = i18np;
            i18n.useUserLang();
            init()
        })
    })
} (mediaWiki, jQuery));