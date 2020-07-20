/* Последние изменения */
$(function() {
    if (mw.config.get('wgNamespaceNumber') === 0 && !$.getUrlVar('diff') && !$.getUrlVar('oldid')) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user',
            rvdiffto: 'prev',
            format: 'json'
        }, function(data) {
            console.log(data);
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0];
            var week = new Date(rv.timestamp).toUTCString().slice(0, 3);
            switch (week.toString())
            {
                case "Mon":
                    week = "Пн";
                    break;
                case "Tue":
                    week = "Вт";
                    break;
                case "Wed":
                    week = "Ср";
                    break;
                case "Thu":
                    week = "Чт";
                    break;
                case "Fri":
                    week = "Пт";
                    break;
                case "Sat":
                    week = "Сб";
                    break;
                case "Sun":
                    week = "Вс";
                    break;
                default:
                    week = "Хз";
            }
            var month = new Date(rv.timestamp).toUTCString().slice(8, 11);
            switch (month.toString())
            {
                case "Jan":
                    month = "Января";
                    break;
                case "Feb":
                    month = "Февраля";
                    break;
                case "Mar":
                    month = "Марта";
                    break;
                case "Apr":
                    month = "Апреля";
                    break;
                case "May":
                    month = "Мая";
                    break;
                case "Jun":
                    month = "Июня";
                    break;
                case "Jul":
                    month = "Июля";
                    break;
                case "Aug":
                    month = "Августа";
                    break;
                case "Sep":
                    month = "Сентября";
                    break;
                case "Oct":
                    month = "Октября";
                    break;
                case "Nov":
                    month = "Ноября";
                    break;
                case "Dec":
                    month = "Декабря";
                    break;
                default:
                    month = "Хз";
            }
            var date = week + ', ' + new Date(rv.timestamp).toUTCString().slice(5, 7) + ' ' + month + ' ' + new Date(rv.timestamp).toUTCString().slice(11, 16) + ' ' + new Date(rv.timestamp).toTimeString().slice(0, 8) + ' ' + new Date(rv.timestamp).toTimeString().slice(18);
            var html = '<div class="lastEdited">Последняя правка: <a href="/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> (' + date + ')</a>, ' + ' (<a class="lastEdited-diff">разн.</a>)</div>';
            $('#PageHeader').after(html);
            mw.loader.using(['mediawiki.action.history.diff'], function() {
                $('.lastEdited-diff').on('click', function() {
                    $.showCustomModal('Изменения: ' + mw.config.get('wgPageName').replace(/_/g, ' '), rv.diff['*'], {
                        id: 'lastEdited-diff',
                        width: 650,
                        buttons: [{
                            message: 'Link',
                            defaultButton: true,
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/?diff=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: 'Undo',
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: 'Cancel',
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                            }
                        }]
                    });
                });
            });
        });
    }
});