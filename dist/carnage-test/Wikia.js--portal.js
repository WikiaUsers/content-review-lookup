(function(_portal_, mw, $){
    var _page_ = $('div.portal-body').attr('data-page') || mw.config.get('wgPageName', wgPageName) + '/portal',
        _user_ = mw.config.get('wgUserName', wgPageName),
        _portalEnabled_ = false,
        _editedDate_ = new Date(),
        _monthName_ = (function(){
            return function(month){
                if (month > 11) return false;
                else {
                    var month_arr = [
                        "january",
                        "february",
                        "march",
                        "april",
                        "may",
                        "june",
                        "july",
                        "august",
                        "september",
                        "october",
                        "november",
                        "december"
                        ],
                        m = month_arr[month],
                        first_letter = m[0];
                    m = first_letter.toUpperCase() + m.substr(1, m.length);
                    return m;
                }
            };
        })();
    if (_portalEnabled_ instanceof Boolean && _portalEnabled_ === false){
        _portal_(_page_);
    }
})(function portal(source){
    var $portal = $('div.portal-body'),
        $portal_row = $portal.children('div.portal-row'),
        $portal_items = $portal_row.children('div.portal-items');
    $.getJSON('/api.php?action=parse&text={{' + encodeURIComponent(source) + '}}&format=json',
        function insertPortalData(){
            
        }
    )
}, this.mediaWiki, this.jQuery);