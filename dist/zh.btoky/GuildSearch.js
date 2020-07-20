$('<input type="button" value="搜尋" id="guild_search_button" /><span id="guild_search_count"></span><table class="wikitable" id="guild_search_table" style="width:100%; font-size:9.5pt;"><thead><tr><th style="width:5%">編號</th><th style="width:15%">名稱</th><th style="width:5%">等級</th><th style="width:5%">人數</th><th style="width:6%">等級下限</th><th style="width:8%">每週捐獻(黃金)</th><th style="width:8%">最大離線日數</th><th style="width:24%">聯繫方式</th><th style="width:24%">簡介</th></tr></thead><tbody></tbody></table>').appendTo('#guildsearch_table');

    var table = $('#guild_search_table');
    var count = 0;
    
    /*functions*/
    
    function getRandom(max) {
        return Math.floor(Math.random()*(max + 1));
    }
    
    function getData() {
        var maxRow = 10;/**                     最大行數             */
        var query = new Parse.Query('GuildCount');
        query.get('fShFhFdbBO',{
            success: function(obj){
                count = obj.get('count');
                if(count <= maxRow){
                    var query = new Parse.Query('Guild');
                    query.limit(count);
                    query.find({
                        success: function(results){
                            showResults(results);
                        },
                        error: function(){
                            alert('查詢出錯');
                            $('#guild_search_button').attr('disabled',false);
                        }
                    });
                } else {
                    var list = [];
                    while (list.length < maxRow) {
                        var rand = getRandom(count - 1);
                        if (list.indexOf(rand) < 0) {
                            list.push(rand);
                        }
                    }
                    getRandomQuery(list, 0, []);
                }
            },
            error: function(){
                alert('查詢出錯');
                $('#guild_search_button').attr('disabled',false);
            }
        });
    }
    
    function getRandomQuery(list, index, results) {
        if (list[index] === undefined) {
            showResults(results);
            return;
        }
        var query = new Parse.Query('Guild');
        query.limit(1);
        query.skip(list[index]);
        query.find({
            success: function(r){
                if (r[0]) {
                    results.push(r[0]);
                }
                getRandomQuery(list, index + 1, results);
            },
            error: function(){
                alert('查詢出錯');
                $('#guild_search_button').attr('disabled',false);
            }
        });
    }
    
    function showResults(results) {
        $('#guild_search_count').text('目前總共有' + count + '個公會註冊');
        for (var i = 0; i < results.length; i++) {
            var newRow = $('<tr align="center"><td /><td /><td /><td /><td /><td /><td /><td style="word-break:break-all" /><td style="word-break:break-all" /></tr>');
            newRow.find('td:eq(0)').text(results[i].get('guildId'));
            newRow.find('td:eq(1)').text(results[i].get('name'));
            newRow.find('td:eq(2)').text(results[i].get('level'));
            newRow.find('td:eq(3)').text(results[i].get('people'));
            newRow.find('td:eq(4)').text(results[i].get('levelLimit'));
            newRow.find('td:eq(5)').text(results[i].get('donateLimit'));
            newRow.find('td:eq(6)').text(results[i].get('dayLimit'));
            newRow.find('td:eq(7)').text(results[i].get('contact'));
            newRow.find('td:eq(8)').text(results[i].get('summary'));
            newRow.appendTo(table.children('tbody'));
        }
        $('#guild_search_button').attr('disabled',false);
        $('#guild_search_table').width($('#WikiaPage').width());
    }
    
    /*start*/
    $.get('http://zh.tos.wikia.com/api.php', {
        format: 'json',
        action: 'query',
        list: 'blocks',
        bkprop: 'user'
    }, function (data) {
        var blockedUser = [];
        var tmp = data.query.blocks;
        for (var i = 0; i < tmp.length; i++) {
            blockedUser.push(tmp[i].user);
        }
        if ($.inArray(mw.user.name(), blockedUser) >= 0) { return; }
        $('#guild_search_button').click(function(){
            $('#guild_search_count').text('');
            $('#guild_search_button').attr('disabled','disable');
            table.children('tbody').children().remove();
            getData();
        });
    }, 'json');