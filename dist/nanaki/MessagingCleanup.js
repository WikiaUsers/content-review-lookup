// Previously on http://messaging.wikia.com/wiki/MessagingCleanup/code.js

var JSdiff = {
    /*
     * Javascript Diff Algorithm
     *  By John Resig (http://ejohn.org/)
     *  Modified by Chu Alan "sprite"
     *
     * Released under the MIT license.
     *
     * More Info:
     *  http://ejohn.org/projects/javascript-diff-algorithm/
     */
    escape: function(s) {
        return s.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");
    },
    unescape: function(s) {
        return s.replace(/&quot;/g, "\"")
                .replace(/&gt;/g, ">")
                .replace(/&lt;/g, "<")
                .replace(/&amp;/g, "&");
    },
    diffString: function(o, n) {
        o = o.replace(/\s+$/, '');
        n = n.replace(/\s+$/, '');
        var out = JSdiff.diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
        var oSpace = o.match(/\s+/g);
        if (oSpace == null) {
            oSpace = ["\n"];
        } else {
            oSpace.push("\n");
        }
        var nSpace = n.match(/\s+/g);
        if (nSpace == null) {
            nSpace = ["\n"];
        } else {
            nSpace.push("\n");
        }
        var os = "";
        for (var i = 0; i < out.o.length; i++) {
            if (out.o[i].text != null) {
                os += JSdiff.escape(out.o[i].text) + oSpace[i];
            } else {
                os += "<span>" + JSdiff.escape(out.o[i]) + oSpace[i] + "</span>";
            }
        }
        var ns = "";
        for (var i = 0; i < out.n.length; i++) {
            if (out.n[i].text != null) {
                ns += JSdiff.escape(out.n[i].text) + nSpace[i];
            } else {
                ns += "<span>" + JSdiff.escape(out.n[i]) + nSpace[i] + "</span>";
            }
        }
        os = os.replace(/(\s*)<\/span>(\s*)<span>(\s*)/g, '$1$2$3').replace(/(\s*)(<\/span>)/g, '$2$1')
        ns = ns.replace(/(\s*)<\/span>(\s*)<span>(\s*)/g, '$1$2$3').replace(/(\s*)(<\/span>)/g, '$2$1')
        return { o : os , n : ns };
    },
    diff: function(o, n) {
        var ns = new Object();
        var os = new Object();
        for ( var i = 0; i < n.length; i++ ) {
            if ( ns[ n[i] ] == null )
                ns[ n[i] ] = { rows: new Array(), o: null };
            ns[ n[i] ].rows.push( i );
        }
        for ( var i = 0; i < o.length; i++ ) {
            if ( os[ o[i] ] == null )
                os[ o[i] ] = { rows: new Array(), n: null };
            os[ o[i] ].rows.push( i );
        }
        for ( var i in ns ) {
            if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
                n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
                o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
            }
        }
        for ( var i = 0; i < n.length - 1; i++ ) {
            if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && n[i+1] == o[ n[i].row + 1 ] ) {
                n[i+1] = { text: n[i+1], row: n[i].row + 1 };
                o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
            }
        }
        for ( var i = n.length - 1; i > 0; i-- ) {
            if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && n[i-1] == o[ n[i].row - 1 ] ) {
                n[i-1] = { text: n[i-1], row: n[i].row - 1 };
                o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
            }
        }
        return { o: o, n: n };
    }
}
var MsgCleanup = {
    init: function() {
        if(!$(document.body).hasClass('mw-special-Allmessages') || $('#mw-allmessagestable .allmessages-customised').length == 0) return
        MsgCleanup.css()
        MsgCleanup.column()
        MsgCleanup.checkboxes()
        MsgCleanup.check()
        MsgCleanup.diffs()
    },
    css: function() {
        $(document.head).append('<style type="text/css">.am_title > div { position:relative;background-color:inherit; } .am_title .wikiaThrobber { background-color:inherit; } .am_delete { text-align:center; } .am_title .error { font-size:12px; font-weight:bold; line-height:120%; } .am_default span { font-weight:bold; color:red; background-color:#faa; border-radius: 3px; padding:0 2px; } .am_actual span { font-weight:bold; color:green; background-color:#afa; border-radius: 3px; padding:0 2px; }</style>')
    },
    diffs: function() {
        $('#mw-allmessagestable .allmessages-different').each(function() {
            var def = $(this).find('.am_default')
            var act = $(this).next().find('.am_actual')
            
            var res = JSdiff.diffString(JSdiff.unescape(def.html()), JSdiff.unescape(act.html()))
            def.html(res.o)
            act.html(res.n)
        })
    },
    check: function() {
        $('#mw-allmessagestable .allmessages-customised:has(.am_default)').each(function() {
            var def = $(this).find('.am_default')
            var act = $(this).next().find('.am_actual')
            
            if(def.html() == act.html()) {
                $(this).find('.am_delete').css('background-color', '#bfb').find('input').prop('checked', true)
            } else {
                $(this).addClass('allmessages-different').find('.am_delete').css('background-color', '#fbb')
            }
        })
    },
    checkboxes: function() {
        $('#mw-allmessagestable .allmessages-customised .am_delete').append('<input type="checkbox" />').find('input').attr('data-id', function() {
            return $(this).closest('tr').attr('id')
        })
    },
    column: function() {
        $('#mw-allmessagestable thead tr:first-child th:first-child').after('<th rowspan="2">Del</th>').next().css('padding', '0 3px')
        $('#mw-allmessagestable tbody .am_title').after('<td class="am_delete"></th>').next().attr('rowspan', function() {
            return $(this).prev().attr('rowspan')
        }).css('padding', '0 3px 0 4px')
        $('#mw-allmessagestable').append('<tfoot><th></th><th colspan="2" class="aw_del_button" style="text-align:left;padding:4px"><input type="button" /></th></tfoot>').find('input').val('Delete selected messages')
            .click(function() {
                $(this).prop('disabled', true)
                $('#aw_del_reason').prop('disabled', true)
                MsgCleanup.deleteMessages()
            }).after('<input type="text" id="aw_del_reason" value="Cleaning up redundant messages" style="width:50%;"/>').after('&nbsp; Reason: ')
    },
    deleteMessages: function() {
        var token = mw.user.tokens.get("editToken")
        var url = wgServer + wgScriptPath + '/api.php'
        var reason = $('#aw_del_reason').val()
        var defs = []
        var links = $('#mw-allmessagestable input:checked').closest('tr').find('.am_title a:first').each(function(i) {
            var msg = $(this).attr('href').replace(/.*?\/(MediaWiki:[^\?^&^#]+)/i, '$1')
            var td = $(this).parent()
            td.prepend('<div class="wikiaThrobber" />').wrapInner('<div />')
            var def = $.Deferred();
            defs.push(def)
            $.ajax({
                url: url,
                data: {
                    format: 'json',
                    action: 'delete',
                    token: token,
                    title: msg,
                    reason: reason,
                },
                type: 'POST',
                success: function(data){
                    console.log(data)
                    if('error' in data) {
                        td.addClass('finished')
                        td.append('<div class="error">API error: '+ data.error.info +'</div>')
                        td.find('.wikiaThrobber').remove()
                    } else {
                        td.addClass('finished')
                        td.find('.wikiaThrobber').remove()
                        td.find('a:first').css({'color': '#aaa', 'text-decoration': 'line-through'})
                    }
                },
                error: function(xhr, status, error){
                    td.addClass('finished')
                    td.append('<div class="error">XHR '+status+': '+ error +'</div>')
                    td.find('.wikiaThrobber').remove()
                },
                complete: function() {
                    def.resolve()
                }
            })
        })
        $.when.apply($, defs).then(function() {
            var finished = $('#mw-allmessagestable .am_title.finished')
            var errors = $('#mw-allmessagestable .am_title.finished:has(.error)')
            if(errors.length == 0) {
                alert('All selected messages ('+finished.length+') deleted successfully.')
                location.reload()
            } else {
                if(confirm('Deleting '+errors.length+' out of '+finished.length+' messages failed.\n\nWant to review?')) {
                    var tr = $('#mw-allmessagestable .am_title:not(.finished)').closest('tr')
                    tr.next().remove()
                    tr.remove()
                } else
                    location.reload()
            }
        })
    },
}
addOnloadHook(MsgCleanup.init)