/**
 * Name:        ReportFormatter
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Formats contribution URLs to fit format of
 *              reports on VSTF Wiki
 */
// <nowiki>
(function() {
    'use strict';
    if (window.ReportFormatterLoaded) {
        return;
    }
    window.ReportFormatterLoaded = true;
    var ReportFormatter = {
        regex: /https?:\/\/([^:]+).(?:wikia|fandom).com\/(?:([a-z-]+)\/)?wiki\/[^\/]+\/([^?\n]+)(?:\?[^\n]+)?\n?/g,
        regex2: /\* \[\[w:(?:c:([^:]+):)Special:Contribs\/([^\]]+)\]\]/g,
        options: ['Biglist', 'ReportSpam'],
        init: function() {
            importArticle({
                type: 'style',
                article: 'u:kocka:MediaWiki:ReportFormatter.css'
            });
            $('#my-tools-menu').append(
                $('<li>').append(
                    $('<a>', {
                        text: 'Feelin\' lucky?'
                    }).click($.proxy(this.click, this))
                )
            );
        },
        click: function() {
            $.showCustomModal(
                'Report formatter',
                $('<div>').append(
                    $('<select>', {
                        id: 'ReportFormatterSelect'
                    }).append(this.options.map($.proxy(this.map, this))),
                    $('<div>', {
                        id: 'ReportFormatterUnique'
                    }).append(
                        $('<input>', {
                            checked: '',
                            id: 'ReportFormatterUniqueCheckbox',
                            name: 'ReportFormatterUniqueCheckbox',
                            type: 'checkbox'
                        }),
                        $('<label>', {
                            'for': 'ReportFormatterUniqueCheckbox',
                            id: 'ReportFormatterUniqueLabel',
                            text: 'Unique'
                        }),
                        $('<input>', {
                            id: 'ReportFormatterConvertCheckbox',
                            name: 'ReportFormatterConvertCheckbox',
                            type: 'checkbox'
                        }),
                        $('<label>', {
                            'for': 'ReportFormatterConvertCheckbox',
                            id: 'ReportFormatterConvertLabel',
                            text: 'Convert from biglist'
                        })
                    ),
                    $('<textarea>', {
                        id: 'ReportFormatterTextarea'
                    })
                ).html(),
                {
                    id: 'ReportFormatterModal',
                    buttons: [
                        {
                            id: 'ReportFormatterConvert',
                            defaultButton: true,
                            message: 'Convert',
                            handler: $.proxy(this.convert, this)
                        },
                        {
                            id: 'ReportFormatterClose',
                            message: 'Close',
                            handler: $.proxy(this.close, this)
                        }
                    ]
                }
            );
        },
        map: function(el) {
            return $('<option>', {
                text: el
            });
        },
        convert: function() {
            var $ta = $('#ReportFormatterTextarea');
            this.unique = $('#ReportFormatterUniqueCheckbox').prop('checked');
            this.convertFromBL = $('#ReportFormatterConvertCheckbox')
                .prop('checked');
            if (this.unique) {
                this.duplicates = [];
            }
            $ta.val(this['convert' + this.options[
                $('#ReportFormatterSelect').prop('selectedIndex')
            ]]($ta.val()));
        },
        convertBiglist: function(text) {
            return text.replace(
                this.regex,
                $.proxy(this.replaceBiglist, this)
            ).trim();
        },
        replaceBiglist: function(_, wiki, user) {
            if (this.unique) {
                if (this.duplicates.indexOf(user) === -1) {
                    this.duplicates.push(user);
                } else {
                    return '';
                }
            }
            if (wiki === 'c' || wiki === 'community') {
                return '* [[w:Special:Contribs/' + user + '|' + user + ']]\n';
            } else {
                return '* [[w:c:' + wiki + ':Special:Contribs/' + user + '|' + user + ']]\n';
            }
        },
        convertReportSpam: function(text) {
            this.reports = {};
            text.trim().split('\n').forEach(this.eachReportSpam, this);
            return $.map(this.reports, $.proxy(this.mapReportSpam, this))
                .join('').trim();
        },
        eachReportSpam: function(line) {
            var regex = this.convertFromBL ? this.regex2 : this.regex;
            var match = regex.exec(line);
            regex.lastIndex = 0;
            if (match === null) {
                return;
            }
            var wiki = match[1],
                user = match[2];
            if (!wiki && this.convertFromBL) {
                wiki = 'c';
            }
            if (!this.reports[wiki]) {
                this.reports[wiki] = [];
            }
            if (!this.unique || this.duplicates.indexOf(user) === -1) {
                this.reports[wiki].push(user);
                if (this.unique) {
                    this.duplicates.push(user);
                }
            }
        },
        mapReportSpam: function(arr, wiki) {
            if (!arr.length) {
                return '';
            }
            return '== ' + wiki + ' ==\n{{Report spam|' + wiki +
                 '|Spam|' + arr.join('|') + '|{{subst:REVISIONUSER}}|~~~~~}}\n';
        },
        close: function() {
            $('#ReportFormatterModal').closeModal();
        }
    };
    ReportFormatter.init();
})();