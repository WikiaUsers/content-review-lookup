$(function () {
                mw.loader.using('jquery.tablesorter', function () {
                    $('.sortable[class*="autosort="]').each(function () {
                        var $this = $(this),
                            matched = (' ' + $this.attr( 'class') + ' ')
                                .match(/autosort=(\d+)[,-]{1}(a|d)/),
                            $sortCol = $this
                                .find('> thead th:nth-child(' + matched[1] + ')');

                        if (matched[2] === 'd') {
                            // descending
                            $sortCol.click().click();
                        } else {
                            // ascending
                            $sortCol.click();
                        }
                    });
                });
});