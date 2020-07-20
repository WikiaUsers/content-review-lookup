$('<form id="leader_finder_form"><p>請輸入召喚獸編號<input id ="leader_finder_input" type="number" min="1" max="9999" required="required" /><input type="submit" value="查詢" /><span id="leader_finder_image"></span><span id="leader_finder_status"></span></p></form><table class="wikitable sortable leader_finder_data_table" style="text-align:center; font-size:9.5pt; display: none" ><thead><tr><th>UID</th><th>召喚師<br />名稱</th><th>召喚師<br />等級</th><th>召喚獸<br />等級</th><th>技能等級</th><th>技能CD</th><th>昇華</th><th>主掛</th><th>副掛</th> <th>徵求</th><th>備註</th><th>最後更新時間</th></tr></thead><tbody> </tbody></table>').appendTo('div#leaderfinder_test');

(function LeaderFinder() {
    if (typeof jQuery == 'undefined') {
        setTimeout(LeaderFinder, 100);
        return;
    }
    if(typeof jQuery.tablesorter == 'undefined') {
        setTimeout(LeaderFinder, 100);
        return;
    }
    if (typeof mw == 'undefined') {
        setTimeout(LeaderFinder, 100);
        return;
    }
    if (typeof mw.user.anonymous == 'function');
    else {
        setTimeout(LeaderFinder, 100);
        return;
    }
    if(mw.user.anonymous()){$('#leader_finder_status').text('請先登入Wikia');return;}
    $.get('http://zh.btoky.wikia.com/api.php',{
        format: 'json',
        action: 'query',
        list: 'blocks',
        bkprop: 'user'
    },function(data){
        var blockedUser = [];
        var tmp = data.query.blocks;
        for (var i = 0; i < tmp.length; i++) {
            if (typeof tmp[i] == 'object')
                blockedUser.push(tmp[i].user);
        }
        if ($.inArray(mw.user.name(), blockedUser) >= 0) { $('#leader_finder_status').text('您的帳戶已被封禁，不可使用此功能'); return; }
        
        var functionArray = [];
        
        /**Parse.initialize("59TL9y0P8BtNlGiavLQ9qB0Wuhy0VrjCJEXv5Dgf", "MwHQhkkr07RoseRT1CAs9UDSICBseLsk9iCdpCMu"); */
        Parse.initialize("AJr5JYqb39199iUwCFwiPxi2vTAY3hDnjV6u5GwC", "JlifJSRkyGtZ4iKPHPXcCzduboWbtkwxqGFlgipx");
        function Count (level, maxLevel, base, max, race){
            var tmp = 1;
            switch (race) {
                case '神族':
                case '妖精類':
                    tmp = 1.5;
                    break;
                case '獸類':
                    tmp = 2/3;
                    break;
            }
            return Math.floor(base + (max - base) * Math.pow(level / maxLevel, tmp));
        }
        
        function MonsterIdToString(id){
            return (id<10)?('00'+id):((id<100)?('0'+id):(''+id));
        }
        
        function RefineLevelString(rlevel) {
            switch(rlevel){
            case 0:
                return '無';
            case 1:
                return 'I';
            case 2:
                return 'II';
            case 3:
                return 'III';
            case 4:
                return 'IV';
            }
        }
        
        function commafy(num){  
            num = num + '';
            var re = new RegExp(decodeURIComponent('(-%3F%5Cd%2B)(%5Cd%7B3%7D)'));
            while(re.test(num)){  
                num=num.replace(re,'$1,$2');
            }  
            return  num;  

        }
		
		function dateFormat(date){
			date.setTime(date.getTime() + 28800000);
			return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		}
        
        $.tablesorter.addParser({
            id:'rlevelparser',
            is:function(s){switch(s){case 'I':case 'II':case 'III':case 'IV':case '無':return true;} return false;},
            format:function(s){return s.replace(/無/,0).replace(/IV/,4).replace(/III/,3).replace(/II/,2).replace(/I/,1);},
            type:'numeric'
        });

        $('#leader_finder_form').submit(function (e) {
            e.preventDefault();
            $('#leader_finder_form input[type=submit]').attr('disabled', 'disabled');
            $('#leader_finder_status').text('查詢中');
            $('.leader_finder_data_table:eq(1)').remove();
            var Card = Parse.Object.extend('Card');
            var query = new Parse.Query(Card);
            var monsterId = parseInt($('#leader_finder_input').val());
            query.equalTo('monsterId', monsterId);
            query.descending('updatedAt');
            query.greaterThan('updatedAt',new Date(new Date() - 2592000000));
            query.limit(1000);
            query.find({
                success: function (cards) {
                    if (cards.length <= 0) {
                        $('#leader_finder_status').text('查無資料');
                        $('#leader_finder_form input[type=submit]').removeAttr('disabled');
                        return;
                    }
                    $.get('http://zh.btoky.wikia.com/api.php', {
                        format: 'json',
                        action: 'expandtemplates',
                        text: decodeURI('%7B%7B' + MonsterIdToString(monsterId) + '%7Cinfo2%7D%7D')
                    }, function (data) {
                        var arr = data.expandtemplates['*'].split(',');
                        var lvMax = parseInt(arr[0]);
                        var baseHP = parseInt(arr[1]);
                        var baseAtk = parseInt(arr[2]);
                        var baseRoc = parseInt(arr[3]);
                        var maxHP = parseInt(arr[4]);
                        var maxAtk = parseInt(arr[5]);
                        var maxRoc = parseInt(arr[6]);
                        var race = arr[7];
                        var skillCD = parseInt(arr[8]);
                        var template = $('.leader_finder_data_table:eq(0)');
                        var newTable = template.clone();
                        newTable.insertAfter(template);
                        for (var i = 0; i < cards.length; i++) {
                            var card = cards[i];
                            var newRow = $('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td width="150" style="word-break:break-all"></td><td></td></tr>');
                            var tds = newRow.children();
                            var area = $('<a />').attr('href','http://zh.btoky.wikia.com/wiki/User:' + card.get('user')).attr('target','_blank');
                            area.text(commafy(card.get('UID')));
                            var wantString = "";
                            var want = card.get("want");
                            if(want)
                            {
                                for(var j = 0; j < 5; j++)
                                    if(want[j])
                                        wantString += want[j] + ",";
                                if(wantString.length)
                                    wantString = wantString.slice(0, -1);
                            }
                            tds.eq(0).append(area);
                            tds.eq(1).text(card.get('name'));
                            tds.eq(2).text(card.get('playerLevel'));
                            var level = card.get('level');
                            tds.eq(3).text(level);
                            tds.eq(4).text(card.get('slevel'));
                            tds.eq(5).text(skillCD - card.get('slevel') + 1);
                            tds.eq(6).text(RefineLevelString(card.get('rlevel')));
                            tds.eq(7).text(card.get('main')?'○':'×');
                            tds.eq(8).text(card.get('main2')?'○':'×');
                            tds.eq(9).text(wantString);
                            tds.eq(10).text(card.get('remark'));
                            tds.eq(11).text(dateFormat(card.updatedAt));
                            newTable.children('tbody').append(newRow);
                        }
                        newTable.width(parseInt($('#mw-content-text').width()));
                        newTable.show();
                        newTable.removeClass('jquery-tablesorter');
                        newTable.tablesorter();
                        $('#leader_finder_status').text('查詢完成');
                        $('#leader_finder_form input[type=submit]').removeAttr('disabled');
                        
                    });
                    
                },
                error: function () {
                    alert('查詢出錯，請再次查詢');
                    $('#leader_finder_form input[type=submit]').attr('disabled', false);
                }
            });
        });
        
        $('#leader_finder_input').on('input',function(){
            if (functionArray.length === 0) {
                functionArray.push(0);
                onInput();
            } else {
                functionArray.push(onInput);
            }
        });
        
        var currentId;
        
        function onInput(){
            if (parseInt($('#leader_finder_input').val()) == currentId || isNaN(parseInt($('#leader_finder_input').val()))){
                functionArray = [];
                return;
            }
            currentId = parseInt($('#leader_finder_input').val());
            $.get('http://zh.btoky.wikia.com/api.php',{
                format:'json',
                action:'parse',
                text:decodeURI('%7B%7BMonsterIcon%7C' + MonsterIdToString(parseInt($('#leader_finder_input').val())) + '%7C50%7D%7D')
            },function(data){
                $('#leader_finder_image').children().remove();
                $(data.parse.text['*']).children().appendTo($('#leader_finder_image'));
                functionArray = functionArray.slice(1);
                if (functionArray.length === 0);
                else{
                    (functionArray[0])();
                }
            });
        }
    },'json');
})();