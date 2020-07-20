
$('<div class="attr-l" id="guild_register_status_bar" style="text-align:center; font-weight:bold; line-height:25px; font-size:15px">載入中</div><form id="guild_register_form" style="display:none"><table><tbody><tr><td align="right"><b>*編號</b>：</td><td><input type="number" required="required" max="999999" min="1" /></td></tr><tr><td align="right"><b>*名稱</b>：</td><td><input type="text" required="required" maxlength="20" /></td></tr><tr><td align="right"><b>*等級</b>：</td><td><select><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option></select></td></tr><tr><td align="right"><b>*人數</b>：</td><td><input type="number" required="required" max="100" min="1" /></td></tr><tr><td align="right">加入等級下限：</td><td><input type="number" max="500" min="1" /></td></tr><tr><td align="right">每週捐獻限制(黃金)：</td><td><input type="number" min="0" /></td></tr><tr><td align="right">最大離線日數：</td><td><input type="number" min="0" /></td></tr><tr><td align="right">會長聯繫方式：</td><td><textarea style="resize:none" maxlength="50" required="required" wrap="physical" cols="50" rows="10"></textarea></td></tr><tr><td align="right"><b>*簡介</b>：</td><td><textarea style="resize:none" maxlength="50" required="required" wrap="physical" cols="50" rows="10"></textarea></td></tr></tbody></table><input type="submit" value="提交" /><input id="guild_register_delete" type="button" value="刪除" /></form>').appendTo('#guildregister_table');
$.getScript('http://www.parsecdn.com/js/parse-1.2.19.min.js');
        Parse.initialize('VnDhS3WyA3EtGcIweisPYWbDKPb5XK4KZxxF8JAE','a8iJGp8RUY0Jwj1S0XCS0irksHsILPOfbnHWFRVc');
        var user = null;
        var guild = null;
        var form = $('#guild_register_form');
        var Guild = Parse.Object.extend('Guild');
        
        /*function*/
        
        function showStatus (text, type) {
            var bar = $('#guild_register_status_bar');
            var clazz = '';
            switch (type) {
                case 0:
                    clazz = 'attr-w';
                    break;
                case 1:
                    clazz = 'attr-l';
                    break;
                case 2:
                    clazz = 'attr-f';
                    break;
            }
            bar.text(text).removeClass('attr-w attr-f attr-l').addClass(clazz);
        }
        
        function getMaxPeople (level) {
            return 25 + 5 * level;
        }
        
        function createUser (u, p) {
            user = new Parse.User();
            user.set('username', u);
            user.set('password', p);
            user.signUp(null, {
                success: function(u){
                    showStatus('成功創建用戶數據', 0);
                    user = u;
                    form.show('slow');
                },
                error: function(){
                    showStatus('創建用戶數據失敗，請聯絡管理員', 2);
                }
            });
        }
        
        function loadGuildData () {
            var query = new Parse.Query('Guild');
            query.equalTo('user', user.getUsername());
            query.find({
                success: function(result) {
                    showStatus('成功載入公會數據', 0);
                    if(result.length > 0) {
                        guild = result[0];
                        form.find('input:eq(0)').val(guild.get('guildId'));
                        form.find('input:eq(1)').val(guild.get('name'));
                        form.find('select:eq(0)').val(guild.get('level'));
                        form.find('input:eq(2)').attr('max', getMaxPeople(guild.get('level'))).val(guild.get('people'));
                        form.find('input:eq(3)').val(guild.get('levelLimit'));
                        form.find('input:eq(4)').val(guild.get('donateLimit'));
                        form.find('input:eq(5)').val(guild.get('dayLimit'));
                        form.find('textarea:eq(0)').val(guild.get('contact'));
                        form.find('textarea:eq(1)').val(guild.get('summary'));
                    }
                    form.show('slow');
                },
                error: function() {
                    showStatus('載入公會數據失敗', 2);
                }
            });
        }
        
        function saveGuildData () {
            showStatus('正在儲存公會數據', 1);
            form.find('input,textarea,select').attr('disabled','disabled');
            if(guild === null)guild = new Guild();
            var acl = new Parse.ACL(user);
            acl.setRoleWriteAccess('Administrator', true);
            acl.setPublicReadAccess(true);
            guild.setACL(acl);
            guild.save({
                guildId: parseInt(form.find('input:eq(0)').val()),
                name: form.find('input:eq(1)').val(),
                level: parseInt(form.find('select:eq(0)').val()),
                people: parseInt(form.find('input:eq(2)').val()),
                levelLimit: parseInt(form.find('input:eq(3)').val()),
                donateLimit: parseInt(form.find('input:eq(4)').val()),
                dayLimit: parseInt(form.find('input:eq(5)').val()),
                contact: form.find('textarea:eq(0)').val(),
                summary: form.find('textarea:eq(1)').val(),
                user: user.getUsername()
            },
            {
                success: function(){
                    showStatus('成功儲存公會數據', 0);
                    form.find('input,textarea,select').attr('disabled',false);
                },
                error: function(o, e){
                    if (e.message == '已存在相同的公會') showStatus('已存在相同的公會', 2);
                    else showStatus('儲存公會數據失敗', 2);
                    form.find('input,textarea,select').attr('disabled',false);
                }
            });
        }
        
        function deleteGuildData () {
            if(guild === null){
                showStatus('您尚未有任何公會記錄', 2);
                return;
            }
            showStatus('正在刪除公會記錄', 1);
            guild.destroy({
                success: function() {
                    showStatus('成功刪除公會記錄', 0);
                    guild = null;
                    form.find('input,textarea,select').attr('disabled',false);
                    form.children('table').find('input,textarea').val('');
                },
                error: function() {
                    showStatus('刪除公會記錄失敗', 2);
                    form.find('input,textarea,select').attr('disabled',false);
                }
            });
        }
        
        function verify () {
            if (form.find('textarea:eq(0)').val() > 50) {
                showStatus('聯繫方式最大限制五十字，目前字數為' + form.find('textarea:eq(0)').val(), 2);
                alert('聯繫方式最大限制五十字，目前字數為' + form.find('textarea:eq(0)').val());
                return false;
            }
            
            if (form.find('textarea:eq(1)').val() > 50) {
                showStatus('簡介最大限制五十字，目前字數為' + form.find('textarea:eq(1)').val(), 2);
                alert('簡介最大限制五十字，目前字數為' + form.find('textarea:eq(1)').val());
                return false;
            }
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
                    loadGuildData();
                },
                error: function () {
                    showStatus('未找到任何記錄，正在創建用戶資料', 1);
                    createUser(u, p);
                }
            });
        }, 'json');

        $('#guild_register_form').submit(function(e){
            e.preventDefault();
            saveGuildData();
        });

        $('#guild_register_delete').click(function(){
            deleteGuildData();
        });


        form.find('select:eq(0)').on('change', function(){
            var max = getMaxPeople(parseInt($(this).val()));
            form.find('input:eq(2)').attr('max', max);
        });