$(document.defaultView || window).on('DOMContentLoaded', function(event){
    if (mw.config.get('wgPageName') == 'Special:ReportWiki'){
        document.title = 'Report a Wiki!';
        $('#mw-content-text').html(function(){
            var form = $('<form />', { 
                'class': 'WikiaForm report-wiki-form ReportWiki',
                'id': 'report-wiki-form',
                'method': 'POST',
                'target': '_blank',
                'name': 'ReportWiki',
                html: [
                    $('<header />', {
                        'class': 'form-header',
                        html: $('<h3 class="form-heading">Report Wiki</h3>')
                    }),
                    $('<section />', { 
                        'class': 'form-section',
                        html: $('<label for="wiki-to-report">Wiki:</label><input id="wiki-to-report" type="text" placeholder="Wiki to report" />')
                    }),
                    $('<section />', {
                        'class': 'form-section',
                        html: $('<label for="report-wiki-reason">Reason:</label><textarea id="report-wiki-reason" placeholder="Reason" rows="4" cols="45"></textarea>')
                    }),
                    $('<footer />', {
                        'class': 'form-section form-footer',
                        html: $('<button type="submit" id="submit-button">Submit</button>')
                    })
                ]
            });
            return form;
        });
        
        $('#wiki-to-report').on('keypress', function(event){
            var f = $('form.ReportWiki');
            localStorage.setItem('wikiToReport', f.find('#wiki-to-report').val());
            var v = localStorage.getItem('wikiToReport'),
                r = localStorage.getItem('reportWikiReason'),
                t = '{{Badwiki|' + v + '|' + r + '}}';
            f.attr('action', 'http://vstf.wikia.com/api.php?action=edit&title=' + encodeURIComponent('Report:Wiki') + '&section=new&text=' + encodeURIComponent(t) + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken));
        });
        
        $('#report-wiki-reason').on('keypress', function(event){
            var f = $('form.ReportWiki');
            localStorage.setItem('reportWikiReason', f.find('#report-wiki-reason').val());
            var v = localStorage.getItem('wikiToReport'),
                r = localStorage.getItem('reportWikiReason'),
                t = '{{Badwiki|' + v + '|' + r + '}}';
            f.attr('action', 'http://vstf.wikia.com/api.php?action=edit&title=' + encodeURIComponent('Report:Wiki') + '&section=new&text=' + encodeURIComponent(t) + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken));
        });
    } else {
        $('.WikiaPageHeader').append(
            $('<a />', {
                'class': 'wikia-button',
                'href': '/wiki/Special:ReportWiki',
                text: 'Report a Wiki'
            })
        );
    }
});