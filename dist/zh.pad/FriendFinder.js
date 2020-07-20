$("span.FF_JS").html('<p>JavaScript已載入。</p>');

// build HTML form using jQuery
$("div.FriendFinderInput").wrap("<form id='friend_finder_form'></form>");

var user_info_wrapper = $("<div id='ff_user_info_fields'/>");
user_info_wrapper.append('<label for="friend_finder_id">遊戲ID*:</label>');
user_info_wrapper.append('<input id="friend_finder_id" name="user[gungho_id]" type="number" class="friend_finder_integer" maxlength="9" size="9" min="100000000" max="399999999" required><span>(9個位數字)</span>');
user_info_wrapper.append('<label for="friend_finder_name">遊戲名字*:</label>');
user_info_wrapper.append('<input id="friend_finder_name" name="user[name]" type="text" required>');
user_info_wrapper.append('<label for="friend_finder_rank">等級*:</label>');
user_info_wrapper.append('<input id="friend_finder_rank" name="user[rank]" type="number" class="friend_finder_integer" min="1" max="999" maxlength="3" size="3" required>');
user_info_wrapper.append('<label for="friend_finder_note">備註:</label>');
user_info_wrapper.append('<input id="friend_finder_note" name="user[note]" type="text" style="width:400px">');
user_info_wrapper.append('<label for="friend_finder_linkup_wiki_user">連結Wikia:</label>');
user_info_wrapper.append('<input type="checkbox" id="friend_finder_linkup_wiki_user" name="user[linkup_wiki_user]" value="true" class="friend_finder_boolean"><span>(在隊長列表，你的遊戲ID將會連去你的Wikia信息墙。)</span>');
$(".FriendFinderInput").prepend(user_info_wrapper);

$("table.T1").after('<input name="user[server]" type="hidden" value="jp">');

var op99='<option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option><option value="96">96</option><option value="97">97</option><option value="98">98</option><option value="99">99</option>';

$("table.T2 tr:eq(0) th:eq(10)").html('<a href="#" id="friend_finder_add_monster_row">新增隊長</a>');
$("table.T2 tr:eq(1) td:eq(0)").html('<input name="monster[monster_id]" type="number" min="1" max="9999" maxlength="4" size="4" disabled class="friend_finder_integer"></input>');
$("table.T2 tr:eq(1) td:eq(1)").html('<img src="https://vignette.wikia.nocookie.net/pad/images/8/83/000i.png/revision/latest?cb=20130420141925&path-prefix=zh" width="50" height="50"/>');
$("table.T2 tr:eq(1) td:eq(2)").html('<select name="monster[level]" disabled class="friend_finder_integer"><option value="1">1</option></select>');
$("table.T2 tr:eq(1) td:eq(3)").html('<select name="monster[hp_add]" disabled class="friend_finder_integer">'+op99+'</select>');
$("table.T2 tr:eq(1) td:eq(4)").html('<select name="monster[atk_add]" disabled class="friend_finder_integer">'+op99+'</select>');
$("table.T2 tr:eq(1) td:eq(5)").html('<select name="monster[rec_add]" disabled class="friend_finder_integer">'+op99+'</select>');
$("table.T2 tr:eq(1) td:eq(6)").html('<select name="monster[skill_level]" disabled class="friend_finder_integer"><option value="0">無</option></select>');
$("table.T2 tr:eq(1) td:eq(7)").html('<select name="monster[number_of_awoken_skill]" disabled class="friend_finder_integer"><option value="0">0</option></select>');
$("table.T2 tr:eq(1) td:eq(8)").html('<input name="monster[main]" disabled type="radio" value="true" class="friend_finder_boolean">');
$("table.T2 tr:eq(1) td:eq(9)").html('<input name="monster[main2]" disabled type="radio" value="true" class="friend_finder_boolean">');
$("table.T2 tr:eq(1) td:eq(10)").html('<input name="monster[object_id]" type="hidden" disabled><a href="#" class="friend_finder_delete_monster_row">刪除</a>');

$("table.T2").after('<input type="submit" id="friend_finder_submit" value="儲存">');

$(function friendFinder(){
    /**********make sure JS library are ready**********/
    if (typeof mw=="undefined") {
        setTimeout(friendFinder,100);
        return;
    }
    if (typeof mw.user=="object") {} else {
        setTimeout(friendFinder,100);
        return;
    }
    if (typeof mw.user.anonymous=="function") {} else {
        setTimeout(friendFinder,100);
        return;
    }
    if (typeof jQuery=="undefined") {
        setTimeout(friendFinder,100);
        return;
    }
    if (typeof Parse=="undefined") {
        setTimeout(friendFinder,100);
        return;
    }
    /**********variable/config**********/
    Parse.initialize("OHHKZWDQ5DGsXqLycNkYuo59gmz39sYdcDX9U2XI", "KNCWwFTmuCdiKlHve1sPKmKhnGCVxSk8WTbT4FfW");
    var f = $("#friend_finder_form");
    var pu = null;
    var Monster = Parse.Object.extend("Monster");
    var max_monster = 8;
    var delete_ids = [];
    var monster_data_cache = {};
    /*************functions*************/
    function monsterId2MonsterIdString(id){
        if (id<10) { id = "00"+id; } else if (id<100) { id = "0"+id;}
        return id.toString();
    }
    function refreshRow(row, database_object){
        var monster_id;
        if (database_object) {
            monster_id = database_object.get("monster_id");
            $('input[name=monster\\[monster_id\\]]', row).val(monster_id);
        } else {
            monster_id = $('input[name=monster\\[monster_id\\]]', row).val();
        }
        var string = monsterId2MonsterIdString(monster_id);
        if (monster_data_cache[string] === null){
            // ignore, no monster data for this ID.
        } else {
            if (monster_data_cache[string]['icon'] && row.data('icon-uptodate') !== true) {
                // icon ready, update it.
                $('.friend_finder_monster_icon img', row).attr('src', monster_data_cache[string].icon);
                // mark as uptodate.
                row.data('icon-uptodate', true);
            }
            if (monster_data_cache[string]['data'] && row.data('data-uptodate') !== true) {
                // data ready, update it.
                /*reset*/
                $("[name=monster\\[skill_level\\]] option,[name=monster\\[number_of_awoken_skill\\]] option,[name=monster\\[level\\]] option", row).remove();
                $("[name=monster\\[skill_level\\]]", row).append("<option value='0'>無</option>");
                $("[name=monster\\[number_of_awoken_skill\\]]", row).append("<option value='0'>0</option>");
                /*level*/
                for (var i=1; i <= parseInt(monster_data_cache[string]['data']['lvMax']); i++) {
                    var option = $("<option value='"+i+"'>"+i+"</option>");
                    if (database_object && database_object.get("level") == i) {
                        option.prop("selected", true);
                    }
                    $("[name=monster\\[level\\]]", row).append(option);
                }
                /*skill level*/
                if (monster_data_cache[string]['data']['skillMaxLv']) {
                    var max_lvl = parseInt(monster_data_cache[string]['data']['skillMaxLv']);
                    $("[name=monster\\[skill_level\\]] option", row).remove();
                    for (var i=1;i<=max_lvl;i++) {
                        var text = i;
                        if (max_lvl == i) text = "最大";
                        var option = $("<option value='"+i+"'>"+text+"</option>");
                        if (database_object && database_object.get("skill_level") == i) {
                            option.prop("selected", true);
                        }
                        $("[name=monster\\[skill_level\\]]", row).append(option);
                    }
                }
                /*awoken skill*/
                if (monster_data_cache[string]['data']['awokenSkill']) {
                    for (var i=1;i<=monster_data_cache[string]['data']['awokenSkill'].split(",").length;i++) {
                        var option = $("<option value='"+i+"'>"+i+"</option>");
                        if (database_object && database_object.get("number_of_awoken_skill") == i) {
                            option.prop("selected", true);
                        }
                        $("[name=monster\\[number_of_awoken_skill\\]]", row).append(option);
                    }
                }
                if (database_object) {
                    $("[name=monster\\[object_id\\]]", row).val(database_object.id);
                    $("[name=monster\\[hp_add\\]]", row).val(database_object.get("hp_add"));
                    $("[name=monster\\[atk_add\\]]", row).val(database_object.get("atk_add"));
                    $("[name=monster\\[rec_add\\]]", row).val(database_object.get("rec_add"));
                    $("[name=monster\\[main\\]]", row).attr("checked", database_object.get("main"));
                    $("[name=monster\\[main2\\]]", row).attr("checked", database_object.get("main2"));
                }
                // mark as uptodate.
                row.data('data-uptodate', true);
            }
        }
    }
    function ajaxGetMonsterData(row, monster_id, database_obj) {
        if (monster_data_cache[monster_id] != null) {
            refreshRow(row, database_obj);
            return; // cached, no need trigger API call again.
        }
        // not cached, call API for data.
        // API call for monster data
        ajaxWikiaAPI("Template:"+monster_id, function(response){
            if (monster_data_cache[monster_id] == null) { monster_data_cache[monster_id] = {}; }
            monster_data_cache[monster_id]['data'] = monsterTemplateParser(response);
            refreshRow(row, database_obj);
        });
        // API call for monster image url.
        getMonsterIconUrlUsingWikiaAPI(monster_id, function(data, url){
            if (monster_data_cache[monster_id] == null) { monster_data_cache[monster_id] = {}; }
            monster_data_cache[monster_id]['icon'] = url;
            refreshRow(row, database_obj);
        });
    }
    function findMonsterData(row, id, database_obj){
        id = monsterId2MonsterIdString(id);
        ajaxGetMonsterData(row, id, database_obj);
    }
    function updateStatus(text, success){
        var c = "a-fire";
        if (success) c = "a-wood";
        $("#friend_finder_status").text(text).removeClass("a-fire a-wood").addClass(c);
    }
    function createUser(u,p){
        var user = new Parse.User();
        user.set("username", u);
        user.set("password", p);
        user.signUp(null, {
            success: function(user) {
                updateStatus("成功創建用戶記錄",1);
                load();
            },
            error: function(user, error) {
                updateStatus("創建用戶記錄失敗...請向管理員回報...",0);
            }
        });
    }
    function loadUser() {
        pu = Parse.User.current();
        $("#friend_finder_name").val(pu.attributes.name);
        $("#friend_finder_note").val(pu.attributes.note);
        $("#friend_finder_id").val(pu.attributes.gungho_id);
        $("#friend_finder_rank").val(pu.attributes.rank);
        $("#friend_finder_linkup_wiki_user").attr("checked", pu.attributes.linkup_wiki_user);
    }
    function loadMonster(){
        updateStatus("載入隊長數據中...",0);
        var query = new Parse.Query(Monster);
        query.equalTo("user", pu);
        query.find({
            success: function(user_monsters) {
                for (var i=0;i<user_monsters.length;i++) {
                    addMonsterRow(user_monsters[i]);
                }
                if ($(".friend_finder_monster_row").not("#friend_finder_monster_row").length == 0) {
                    $("#friend_finder_add_monster_row").click();
                }
                updateStatus("成功載入隊長數據",1);
                $("#friend_finder_form").show(1000);
            },
            error:function(){
                updateStatus("載入隊長數據失敗",0);
            }
        });
    }
    function destroyMonster(pid, next_index){
        var monster = new Monster();
        monster.id = pid;
        monster.destroy({
            success: function(m) {
                saveMonster(next_index);
            },
            error: function(m, error) {
                updateStatus("儲存隊長數據失敗，請重新載入頁面.",0);
            }
        });
    }
    function createOrUpdateMonster(jobj, next_index){
        var obj_id_field = $("[name=monster\\[object_id\\]]", jobj);
        var monster = new Monster();
        if (obj_id_field.val() == "") {} else {
            monster.id = obj_id_field.val();
        }
        $("[name^=monster\\[]", jobj).each(function(){
            var _key, _value;
            _key = $(this).attr("name").substring(8,$(this).attr("name").length-1);
            if (_key=="object_id") {} else {
                if ($(this).hasClass("friend_finder_integer")) {
                    _value = parseInt($(this).val());
                } else if ($(this).hasClass("friend_finder_boolean")) {
                    if ($(this).is(":checked")) {
                        _value = true;
                    } else {
                        _value = false;
                    }
                } else {
                    _value = $(this).val();
                }
            monster.set(_key,_value);
            }
        });
        monster.set("user", pu);
        monster.setACL(new Parse.ACL(pu));
        monster.save(null,{success:function(m){
            obj_id_field.val(m.id);
            saveMonster(next_index);
        },error:function(m,e){
            updateStatus("儲存隊長數據失敗，請重新載入頁面.",0);
        }});
    }
    function saveMonster(index){
        var status_text = "儲存隊長數據中，請耐心等候";
        for(var i=0;i<=index;i++){
            status_text += ".";
        }
        updateStatus(status_text,0);
        var queue = [];
        $(".friend_finder_monster_row:visible", f).each(function(){
            queue.push($(this));
        });
        for(var i=0;i<delete_ids.length;i++){
            queue.push(delete_ids[i]);
        }
        if (index>=queue.length) {
            delete_ids = [];/*reset*/
            updateStatus("成功儲存隊長數據",1);
            $("input,select", f).prop("disabled", false);
        } else if (typeof queue[index]=="object") {
            createOrUpdateMonster(queue[index],index+1);
        } else {
            destroyMonster(queue[index],index+1);
        }
    }
    function load(){
        loadUser();
        loadMonster();
    }
    function saveUser(){
        $("[name^=user\\[]", f).each(function(){
            var _key, _value;
            _key = $(this).attr("name").substring(5,$(this).attr("name").length-1);
            if ($(this).hasClass("friend_finder_integer")) {
                _value = parseInt($(this).val());
            } else if ($(this).hasClass("friend_finder_boolean")) {
                if ($(this).is(":checked")) {
                    _value = true;
                } else {
                    _value = false;
                }
            } else {
                _value = $(this).val();
            }
            pu.set(_key,_value);
        });
        pu.save(null, {success: function(u){
            updateStatus("成功儲存用戶數據",1);
            saveMonster(0);
        }, error: function(u,e){
            updateStatus("儲存用戶數據失敗",0);
            $("input,select", f).attr("disabled", false);
        }});
    }
    function addMonsterRow(obj){
        var row = $("#friend_finder_monster_row").clone().attr("id","").show();
        $("input,select", row).attr("disabled", false).attr("required", true);
        if (obj) {
            findMonsterData(row,obj.get("monster_id"), obj);
        }
        row.insertBefore($("#friend_finder_monster_row"));
    }

    /************monitor*************/
    $("#friend_finder_add_monster_row").click(function(e){
        e.preventDefault();
        if ($(".friend_finder_monster_row:visible").length >= max_monster) {
            alert("最多"+max_monster+"個隊長記錄");
            return;
        }
        addMonsterRow();
    });
    $(document).on('click', ".friend_finder_delete_monster_row", function(e){
        e.preventDefault();
        var obj_id = $("[name=monster\\[object_id\\]]", $(this).parents(".friend_finder_monster_row")).val();
        if (obj_id=="") {} else {
            delete_ids.push(obj_id);
        }
        $(this).parents(".friend_finder_monster_row").remove();
    }).on('input', "[name=monster\\[monster_id\\]]", function(e){
        // user modify monster_id field.
        var tr = $(this).parents('.friend_finder_monster_row');
        tr.data('data-uptodate', false);
        tr.data('icon-uptodate', false)
        findMonsterData($(this).parents(".friend_finder_monster_row"), parseInt($(this).val()));
    });
    
    f.submit(function(e){
        e.preventDefault();
        $("input,select", f).attr("disabled", true);
        updateStatus("儲存用戶數據中…",0);
        saveUser();
        return false; /* prevent form submit */
    });
    
    /*************main logic*************/
    if (mw.user.anonymous()) {
        updateStatus("請先登入 Wikia.");
    } else {
        updateStatus("正在尋找你的用戶記錄…",0);
        var u = mw.user.name();
        var p = mw.config.get('wgTrackID')+"";
        Parse.User.logIn(u, p, {
            success: function(user) {
                load();
            },
            error: function(user, error) {
                updateStatus("沒有找到你的用戶記錄。創建新用戶中…",0);
                createUser(u,p);
            }
        });
    }
})();