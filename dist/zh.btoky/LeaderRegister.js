$('<div class="attr-l" id="leader_register_status_bar" style="text-align:center; font-weight:bold; line-height:25px; font-size:15px">載入中</div><form id="leader_register_form" style="display:none"><table><tr><th align="right"><label for="leader_register_player_id">遊戲ID:</label></th><td align="left"><input type="number" id="leader_register_player_id" size="9" min="1" max="999999999" required="required"></td></tr><tr><th align="right"><label for="leader_register_player_name">遊戲用戶名稱:</label></th><td align="left"><input type="text" id="leader_register_player_name" required="required" maxlength="34"></td></tr><tr><th align="right"><label for="leader_register_player_level">用戶等級:</label></th><td align="left"><input type="number" id="leader_register_player_level" min="1" max="500" required="required"></td></tr><tr><th align="right"><label for="leader_register_player_level">徵求代表(可不填):</label></th><td align="left"><input id="leader_register_player_want_1" min="1" max="9999" type="number" /> <input id="leader_register_player_want_2" min="1" max="9999" type="number" /> <input id="leader_register_player_want_3" min="1" max="9999" type="number" /> <input id="leader_register_player_want_4" min="1" max="9999" type="number" /> <input id="leader_register_player_want_5" min="1" max="9999" type="number" /></td></tr><tr><th align="right"><label for="leader_register_player_remark">備註:</label></th><td align="left"><input type="text" id="leader_register_player_remark" maxlength="20"></td></tr></table><table class="wikitable" id="leader_register_monster_data_table" align="center"><thead><tr><th width="80px">召喚獸編號</th><th width="80px">召喚獸圖示</th><th width="80px">等級</th><th width="80px">技能等級</th><th width="80px">昇華階段</th><th width="80px">主要代表</th><th width="80px">常用隊長</th><th width="80px"><a href="#" id="leader_register_add_monster_row">新增召喚獸</a></th></tr></thead><tbody></tbody></table><input type="submit" value="儲存" /></form>').appendTo("div#leaderregister_test");
$('<form id="leader_finder_form"><p>請輸入召喚獸編號<input id ="leader_finder_input" type="number" min="1" max="9999" required="required" /><input type="submit" value="查詢" /><span id="leader_finder_image"></span><span id="leader_finder_status"></span></p></form><table class="wikitable sortable leader_finder_data_table" style="text-align:center; font-size:9.5pt; display: none" ><thead><tr><th>UID</th><th>召喚師<br />名稱</th><th>召喚師<br />等級</th><th>召喚獸<br />等級</th><th>技能等級</th><th>技能CD</th><th>昇華</th><th>主掛</th><th>副掛</th> <th>徵求</th><th>備註</th><th>最後更新時間</th></tr></thead><tbody> </tbody></table>').appendTo('div#leaderfinder_test');


$.getScript('http://www.parsecdn.com/js/parse-1.2.19.min.js');

(function LeaderRegister() {
    if (typeof jQuery == 'undefined') {
        setTimeout(LeaderRegister, 100);
        return;
    }

    if (typeof mw == 'undefined') {
        setTimeout(LeaderRegister, 100);
        return;
    }

    if (typeof mw.user.anonymous == 'function');
    else {
        setTimeout(LeaderRegister, 100);
        return;
    }

    if (typeof Parse == 'undefined') {
        setTimeout(LeaderRegister, 100);
        return;
    }
    /**    Variable   */

    Parse.initialize("AJr5JYqb39199iUwCFwiPxi2vTAY3hDnjV6u5GwC", "JlifJSRkyGtZ4iKPHPXcCzduboWbtkwxqGFlgipx");
    /** Parse.initialize("59TL9y0P8BtNlGiavLQ9qB0Wuhy0VrjCJEXv5Dgf", "MwHQhkkr07RoseRT1CAs9UDSICBseLsk9iCdpCMu"); */
    var Card = Parse.Object.extend('Card');
    var user = null;
    var form = $('#leader_register_form');
    var status_bar = $('#leader_register_status_bar');
    var userData = {};
    var savedCards = [];
    var oldCards = [];
    var newCardsData = [];
    var rowCount = 0;


    /**    Function   */
    function showStatus(text, type) {
        status_bar.text(text);
        status_bar.removeClass('attr-w attr-l attr-f');
        switch (type) { case 0: status_bar.addClass('attr-w'); return; case 1: status_bar.addClass('attr-l'); return; case 2: status_bar.addClass('attr-f'); return; }
    }

    function createUser(u, p) {
        user = new Parse.User();
        user.set('username', u);
        user.set('password', p);
        user.signUp(null, {
            success: function () {
                showStatus('成功創建用戶記錄', 0);
                form.show('slow');
            },
            error: function () {
                showStatus('創建用戶記錄失敗，請聯絡管理員', 2);
            }
        });
    }

    function loadData() {
        loadUser();
        loadCard();
    }

    function loadUser() {
        $('#leader_register_player_id').val(user.get('UID'));
        $('#leader_register_player_name').val(user.get('name'));
        $('#leader_register_player_level').val(user.get('level'));
        $('#leader_register_player_remark').val(user.get('remark'));
        if(user.has('want'))
        {
            $('#leader_register_player_want_1').val(user.get('want')[0]);
            $('#leader_register_player_want_2').val(user.get('want')[1]);
            $('#leader_register_player_want_3').val(user.get('want')[2]);
            $('#leader_register_player_want_4').val(user.get('want')[3]);
            $('#leader_register_player_want_5').val(user.get('want')[4]);
        }
    }

    function loadCard() {
        var query = new Parse.Query(Card);
        query.equalTo('user', user.getUsername());
        query.ascending('monsterId');
        query.find({
            success: function (results) {
                showStatus('載入代表數據成功', 0);
                oldCards = results.slice(0);
                for (var i = 0; i < results.length; i++) {
                    addCardRow(results[i]);
                }
                form.show('slow');
            },
            error: function () {
                showStatus('載入代表數據失敗，請聯絡管理員', 2);
            }
        });
    }

    function refineLabel(rlevel) {
        switch (rlevel) {
            case 0: return '無';
            case 1: return 'I';
            case 2: return 'II';
            case 3: return 'III';
            case 4: return 'IV';
            default: return rlevel + '';
        }
    }

    function addCardRow(card) {
        if ($('#leader_register_monster_data_table>tbody>tr').length > 4) {
            showStatus('最多只能登錄五隻代表',2);
            alert('最多只能登錄五隻代表');
            return;
        }
        var newRow = $('<tr class="leader_register_monster_row" height="80px"><td><input type="number" min="1" max="9999" required="required" /></td><td></td><td><select /></td><td><select /></td><td><select /></td><td><input type="radio" value="true"  required="requied" name="main"/></td><td><input type="radio" value="true"  required="requied" name="main2"/></td><td><a href="#">刪除</a></td></tr>');
        if (!card) newRow.css('display', 'none');
        newRow.find('td').attr('align', 'center');
        newRow.find('input[type=radio]').attr('required', 'required').css('cursor','pointer').click(function(){
			$('#leader_register_monster_data_table').find('input[name='+$(this).attr('name')+']').parent().css('background-color', '');
			$(this).parent().css('background-color', 'gray');
		}).parent().css('cursor','pointer').click(function(){
			form.find('input[name='+$(this).children().attr('name')+']').parent().css('background-color','');
			$(this).css('background-color','gray').children().attr('checked','checked');
		});
        newRow.find('a').click(function (e) {
            e.preventDefault();
            newRow.hide('fast', function () {
                newRow.remove();
            });
        });
        
        var imageChangeArray = [];
        var dataChangeArray = [];
        var imageCurrentId;
        var dataCurrentId;
        
        function imageChange (){
            var monsterId = parseInt(newRow.find('input:eq(0)').val());
            if(imageCurrentId == monsterId) {
                imageChangeArray = [];
                form.find('input[type=submit]').attr('disabled',false);
                return;
            }
            imageCurrentId = monsterId;
            if (monsterId < 10) monsterId = '00' + monsterId; else if (monsterId < 100) monsterId = '0' + monsterId; else monsterId += '';
            $.get('http://zh.btoky.wikia.com/api.php', {
                format: 'json',
                action: 'parse',
                text: decodeURI('%7B%7BMonsterIcon2%7C' + monsterId + '%7C60%7D%7D')
            }, function (data) {
                newRow.children('td:eq(1)').children().remove();
                $(data.parse.text['*']).children().attr('target', '_blank').appendTo(newRow.children('td:eq(1)'));
                texttip();
                imageChangeArray = imageChangeArray.slice(1);
                if (imageChangeArray.length == 0) {
                    form.find('input[type=submit]').attr('disabled',false);
                } else {
                    (imageChangeArray[0])();
                }
            }, 'json');
        }
        
        function dataChange (){
            var monsterId = parseInt(newRow.find('input:eq(0)').val());
            if(dataCurrentId == monsterId) {
                dataChangeArray = [];
                return;
            }
            dataCurrentId = monsterId;
            if (monsterId < 10) monsterId = '00' + monsterId; else if (monsterId < 100) monsterId = '0' + monsterId; else monsterId += '';
            $.get('http://zh.btoky.wikia.com/api.php', {
                format: 'json',
                action: 'expandtemplates',
                text: decodeURI('%7B%7B' + monsterId + '%7Cinfo%7D%7D')
            }, function (data) {
                var arr = data.expandtemplates['*'].split(',');
                var lvMax = parseInt(arr[1]);
                var sLvMax = parseInt(arr[2]);
                var rLvMax = parseInt(arr[3]);
                var levelSelect = newRow.find('select:eq(0)');
                levelSelect.children().remove();
                for (var i = lvMax; i >= 1; i--) {
                    $('<option value="' + i + '">' + i + '</option>').appendTo(levelSelect);
                }
                var sLevelSelect = newRow.find('select:eq(1)');
                sLevelSelect.children().remove();
                for (var i = sLvMax; i >= 1; i--) {
                    $('<option value="' + i + '">' + i + '</option>').appendTo(sLevelSelect);
                }
                var rLevelSelect = newRow.find('select:eq(2)');
                rLevelSelect.children().remove();
                for (var i = rLvMax; i >= 0; i--) {
                    $('<option value="' + i + '">' + refineLabel(i) + '</option>').appendTo(rLevelSelect);
                }
                dataChangeArray = dataChangeArray.slice(1);
                if(dataChangeArray.length == 0);
                else {
                    (dataChangeArray[0])();
                }
            }, 'json');
        }
        
        newRow.find('input:eq(0)').on('input', function () {
			form.find('input[type=submit]').attr('disabled','disabled');
            if (dataChangeArray.length == 0) {
                dataChangeArray.push(0);
                dataChange();
            } else {
                dataChangeArray.push(dataChange);
            }
            if (imageChangeArray.length == 0) {
                imageChangeArray.push(0);
                imageChange();
            } else {
                imageChangeArray.push(imageChange);
            }
        });
        newRow.appendTo($('#leader_register_monster_data_table').children('tbody'));
        if (card) {
            var monsterId = card.get('monsterId');
            if (monsterId < 10) monsterId = '00' + monsterId; else if (monsterId < 100) monsterId = '0' + monsterId; else monsterId += '';
            var level = card.get('level');
            var slevel = card.get('slevel');
            var rlevel = card.get('rlevel');
            $.get('http://zh.btoky.wikia.com/api.php', {
                format: 'json',
                action: 'expandtemplates',
                text: decodeURI('%7B%7B' + monsterId + '%7Cinfo%7D%7D')
            }, function (data) {
                var arr = data.expandtemplates['*'].split(',');
                var lvMax = parseInt(arr[1]);
                var sLvMax = parseInt(arr[2]);
                var rLvMax = parseInt(arr[3]);
                newRow.find('input:eq(0)').val(parseInt(monsterId));
				if(card.get('main')) {
					newRow.find('input[type=radio]:eq(0)').attr('checked',true).parent().css('background-color', 'gray');
				}
				if(card.get('main2')) {
					newRow.find('input[type=radio]:eq(1)').attr('checked',true).parent().css('background-color', 'gray');
				}
                var levelSelect = newRow.find('select:eq(0)');
                for (var i = lvMax; i >= 1; i--) {
                    $('<option value="' + i + '">' + i + '</option>').appendTo(levelSelect);
                }
                levelSelect.val(level);
                var sLevelSelect = newRow.find('select:eq(1)');
                for (var i = sLvMax; i >= 1; i--) {
                    $('<option value="' + i + '">' + i + '</option>').appendTo(sLevelSelect);
                }
                sLevelSelect.val(slevel);
                var rLevelSelect = newRow.find('select:eq(2)');
                for (var i = rLvMax; i >= 0; i--) {
                    $('<option value="' + i + '">' + refineLabel(i) + '</option>').appendTo(rLevelSelect);
                }
                rLevelSelect.val(rlevel);
            }, 'json');
            $.get('http://zh.btoky.wikia.com/api.php', {
                format: 'json',
                action: 'parse',
                text: decodeURI('%7B%7BMonsterIcon2%7C' + monsterId + '%7C60%7D%7D')
            }, function (data) {
                $(data.parse.text['*']).children().attr('target', '_blank').appendTo(newRow.children('td:eq(1)'));
            }, 'json');
        } else {
            newRow.show('fast');
        }
    }

    function saveUserData() {
        showStatus('正在儲存用戶記錄', 1);
        user.save(userData, {
            success: function () {
                saveCardData(0);
            },
            error: function () {
                showStatus('儲存用戶記錄失敗', 2);
                savedCards = [];
                newCardsData = [];
                form.find('input,select').attr('disabled', false);
            }
        });
    }



    function saveCardData(i) {
        var extra = '';
        for (var n = -1; n < i; n++) {
            extra += '.';
        }
        showStatus('正在儲存代表數據' + extra, 1);
        if (newCardsData[i] || oldCards[i]) {
            var card = null;
            if (oldCards[i]) {
                card = oldCards[i];
                if (newCardsData[i]) {
                    var acl = new Parse.ACL(user);
                    acl.setPublicReadAccess(true);
                    acl.setRoleWriteAccess("Administrator", true);
                    card.setACL(acl);
                    card.save(newCardsData[i],
                    {
                        success: function (obj) {
                            savedCards.push(obj);
                            saveCardData(i + 1);
                        },
                        error: function () {
                            showStatus('儲存代表數據失敗', 2);
                            savedCards = [];
                            newCardsData = [];
                            form.find('input,select').attr('disabled', false);
                        }
                    });
                } else {
                    card.destroy({
                        success: function () {
                            saveCardData(i + 1);
                        },
                        error: function () {
                            showStatus('儲存代表數據失敗', 2);
                            savedCards = [];
                            newCardsData = [];
                            form.find('input,select').attr('disabled', false);
                        }
                    });
                }
            } else {
                card = new Card();
                var acl = new Parse.ACL(user);
                acl.setPublicReadAccess(true);
                acl.setRoleWriteAccess("Administrator", true);
                card.setACL(acl);
                card.save(newCardsData[i],
                {
                    success: function (obj) {
                        savedCards.push(obj);
                        saveCardData(i + 1);
                    },
                    error: function () {
                        showStatus('儲存代表數據失敗', 2);
                        savedCards = [];
                        newCardsData = [];
                        form.find('input,select').attr('disabled', false);
                    }
                });
            }

        } else {
            showStatus('成功儲存代表數據', 0);
            oldCards = savedCards.slice(0);
            savedCards = [];
            newCardsData = [];
            form.find('input,select').attr('disabled', false);
        }
    }

    function verify() {
        var inputs = $('#leader_register_monster_data_table input');
        var monsterIds = [];
        for (var i = 0; i < inputs.length; i++) {
            var monsterId = parseInt(inputs.eq(i).val());
            if ($.inArray(monsterId, monsterIds) >= 0) {
                showStatus('偵測到相同的召喚獸', 2);
                alert('偵測到相同的召喚獸');
                return false;
            }
            monsterIds.push(monsterId);
        }

        return true;
    }
	
    /************* Start *************/
    if (mw.user.anonymous()) {
        showStatus('請先登入Wikia', 2);
        return;
    }
    $.get('http://zh.btoky.wikia.com/api.php', {
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
        if ($.inArray(mw.user.name(), blockedUser) >= 0) { showStatus('您的帳戶已被封禁，不可使用此功能', 2); return; }
        
        var u = mw.user.name();
        var p = mw.config.get('wgTrackID') + '';
        Parse.User.logIn(u, p, {
            success: function (u) {
                if (u.has('forbidden')) {
                    showStatus('您的帳戶已被封禁，不可使用此功能', 2);
                    return;
                }
                user = u;
                showStatus('成功載入用戶記錄', 1);
                loadData();
            },
            error: function () {
                showStatus('未找到任何記錄，正在創建用戶資料', 1);
                createUser(u, p);
            }
        });
        
    }, 'json');
    
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

    $('#leader_register_form').on('submit', function (e) {
        e.preventDefault();
        if (!verify()) return;
        $('#leader_register_form').find('input,select').attr('disabled', 'disabled');
        userData.UID = parseInt($('#leader_register_player_id').val());
        userData.name = $('#leader_register_player_name').val();
        userData.level = parseInt($('#leader_register_player_level').val());
        userData.remark = $('#leader_register_player_remark').val();
        userData.want = [parseInt($("#leader_register_player_want_1").val()),parseInt($("#leader_register_player_want_2").val()),parseInt($("#leader_register_player_want_3").val()),parseInt($("#leader_register_player_want_4").val()),parseInt($("#leader_register_player_want_5").val())];
        var rows = $('#leader_register_monster_data_table>tbody>tr');
        for (var i = 0; i < rows.length; i++) {
            var row = rows.eq(i);
            newCardsData.push({
                monsterId: parseInt(row.find('input:eq(0)').val()),
                level: parseInt(row.find('select:eq(0)').val()),
                slevel: parseInt(row.find('select:eq(1)').val()),
                rlevel: parseInt(row.find('select:eq(2)').val()),
                main: row.find('input[type=radio]:eq(0)').attr('checked')?true:false,
                main2: row.find('input[type=radio]:eq(1)').attr('checked')?true:false,

                user: user.getUsername(),
                UID: userData.UID,
                name: userData.name,
                playerLevel: userData.level,
                remark: userData.remark,
                want: userData.want
            });
        }
        saveUserData();
    });

    $('#leader_register_add_monster_row').on('click', function (e) {
        e.preventDefault();
        addCardRow();
    });
	
	$('#leader_register_new_fri').click(function() {
		
	});

})();