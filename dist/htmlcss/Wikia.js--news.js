/***
 * This is the JavaScript page for the custom wiki
 * news widget created by Ultimate Dark Carnage
 ***/
 
const WikiNews = {
    config: {
        loaded: false,
        max: 5
    },
    actions: {
        advance: function($tab){
            var $parent = $tab.parent('.time-date'),
                $content = $('.news-content'),
                time = $tab.text();
                
            $('.time-date.selected').removeClass('selected');
            $parent.addClass('selected');
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: mw.util.wikiScript('api'),
                data: {
                    page: 'Project:News/' + time,
                    action: 'parse',
                    format: 'json'
                }
            }).done(function(data){
                var _html = data.parse.text['*'];
                $content.html(_html);
            });
        }
    },
    init: function(enabled){
        if (!enabled || WikiNews.config.loaded === true) return;
        var $nav = $('<nav class="WikiNews wiki-news" />'),
            $news_container = $('.news-container'),
            max = WikiNews.config.max,
            today = new Date(),
            target_month = new Date(today.getFullYear(), today.getMonth() - max, 1),
            html = [$('<ul class="wiki-news-tabs news-tabs" />'), $('<section class="wiki-news-content news-content content" />')],
            months = null, $months = null, today_s = '', target_month_s = '';
        today.setDate(1);
        today_s = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        target_month_s = target_month.getFullYear() + '-' + (target_month.getMonth() + 1) + '-' + target_month.getDate(); 
        function getDateRange(start_date, end_date){
            var start = start_date.split('-'),
                end = end_date.split('-'),
                start_year = parseInt(start[0]),
                end_year = parseInt(end[0]),
                dates = [];
            
            for (var i = start_year; i <= end_year; i++){
                var end_month = i != end_year ? 11 : parseInt(end[1]) - 1,
                    start_month = i === start_year ? parseInt(start[1]) - 1 : 0;
                for (var j = start_month; j <= end_month; j = j > 12 ? j % 12 || 11 : j+1){
                    var month = j,
                        month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    dates[dates.length] = [month_names[month], i].join(' ');
                }
            }
            return dates;
        }
        
        months = getDateRange(target_month_s, today_s);
        
        $months = Array.prototype.map.call(months, function(mmyy, index){
            var $tab = $('<li class="tab-item time-date" />'),
                $link = $('<a href="#" />');
            mmyy = 'string' == typeof mmyy ? mmyy : '';
            $tab.attr('data-mmyy', mmyy);
            if (index == months.length - 1){
                $tab.addClass('selected');
                $.ajax({
                    method: 'GET',
                    dataType: 'json',
                    url: mw.util.wikiScript('api'),
                    data: {
                        page: 'Project:News/' + mmyy,
                        action: 'parse',
                        format: 'json'
                    }
                }).done(function(data){
                    var _html = data.parse.text['*'];
                   html[1].html(_html);
                });
            }
            $link.on('click', function(event){
                event.preventDefault();
                event.stopPropagation();
                var $elem = $(event.target);
                WikiNews.actions.advance($elem);
            });
            $link.text(mmyy);
            $tab.html($link);
            return $tab;
        });
        
        html[0].html($months);
        $nav.html(html);
        
        $news_container.replaceWith($nav);
        WikiNews.config.loaded = true;
    }
};

if (!$('.WikiNews').length){
    $(document).ready(function(){
        WikiNews.init((typeof WIKI_NEWS_ENABLED == 'boolean') ? WIKI_NEWS_ENABLED : true);
    });
}