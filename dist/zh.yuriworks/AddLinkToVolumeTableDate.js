$(function() {
    $(".volume-table tr > td").each(function() {
        var tdContent = $(this).html();
        
        // 改进后的正则表达式，能匹配单独的年月或年月日
        var replacedContent = tdContent.replace(/(\d{4})年(\d{1,2})月(?:(\d{1,2})日)?/g, 
            function(match, year, month, day) {
                var paddedMonth = month.padStart(2, '0');
                var displayText = year + '年' + paddedMonth + '月';
                var href = 'https://yuriworks.fandom.com/zh/wiki/Project:%E6%95%B0%E6%8D%AE%E5%AD%98%E6%A1%A3/%E4%B9%A6%E7%B1%8D%E5%8F%91%E5%94%AE%E8%A1%A8/' + year + '-' + paddedMonth;
                
                var result = '<code><a href="' + href + '">' + displayText + '</a>';
                
                // 如果有日，则添加补零后的日
                if (day) {
                    var paddedDay = day.padStart(2, '0');
                    result += paddedDay + '日';
                }
                
                return result + '</code>';
            }
        );
        
        $(this).html(replacedContent);
    });
});