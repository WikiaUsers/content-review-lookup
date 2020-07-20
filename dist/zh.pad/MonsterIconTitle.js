/* Author: Leonardo
** Description:
**   Dynamic update 'title' attribute of monster icon link tag, to display Monster ID/JPName/CNName.
**
** Why?
**   Was using something like that to generate monster icon:
**        [[File:888i.png|{{{iconSize|40}}}px|link={{Monster/NameByID|888}}|No.888　 {{langja|{{Monster/CNNameByID|888}（{{Monster/CNNameByID|888}}）]]
**   However there are too many monster icon these days, wikia parse it too slow (performance) and always exceed node count.
**   We now change to:
**        [[File:888i.png|{{{iconSize|40}}}px|link={{Monster/NameByID|888}}|monster-id-888-title]]
**   So the icon by default don't come with Monster Name. We are going to add the name back to the link's 'title' attribute using JavaScript.
**
** How it works?
**   Get data from Template:Monster/NameByID and Template:Monster/CNNameByID, and store in browser's localStorage. Force update again if the data is too old (30 minutes).
**   Find out all monster icon link with title "monster-icon-XXX-title", and replace with No + JPName + CNName.
**
** How to use?
**   This script run automaticlly. However if you want to re-run this javascript to update monster icon title, such as TabView loaded, just call:
**         if (monsterIconTitle) { monsterIconTitle.reload(); }
**/
function MonsterIconTitle(){
    /****** private variables ************************************/
    var ready = false;
    var updating_flag = false;
    var updated_count = 0;
    var expire_in_milliseconds = 30 * 60 * 1000; // 30 minutes
    // keys for localStorage.
    var monster_name_jp_key = "wikia_local_db_monster_name_jp";
    var monster_name_zh_key = "wikia_local_db_monster_name_zh";
    var monster_name_last_update_key = "wikia_local_db_monster_name_last_update_at";
    // template 
    var jp_name_template = "Template:Monster/NameByID";
    var zh_name_template = "Template:Monster/CNNameByID";
    // variable cached data
    var zh_name_data = {};
    var jp_name_data = {};
    /****** private methods **************************************/
    // check if the name data is expired in localStorage.
    function _is_data_expired(){
        var last_update_at = localStorage.getItem(monster_name_last_update_key);
        return !(typeof(last_update_at) !== "undefined" && Date.now() - parseInt(last_update_at, 10) < expire_in_milliseconds);
    }
    function _update_last_update_at(){
        if (updated_count === 2) { // only mark as updated when both JP and ZH name are done.
            localStorage.setItem(monster_name_last_update_key, Date.now());
            updating_flag = false;
            _update_icon_title();
        }
    }
    function _update_local_storage(){
        if (updating_flag) return; // prevent trigger update multi-times.
        updating_flag = true;
        updated_count = 0;
        // trigger AJAX, get data from templates.
        ajaxWikiaAPI(jp_name_template, function(data){
            var json = {};
            data.split('\n').forEach(function(line, index, array){
                var pattern = new RegExp("^\\|(\\d+)=(.*)$");
                var match = pattern.exec(line);
                if (match !== null) {
                    json[match[1]] = match[2];
                }
            });
            localStorage.setItem(monster_name_jp_key, JSON.stringify(json));
            updated_count += 1;
            _update_last_update_at();
            jp_name_data = json;
        });
        ajaxWikiaAPI(zh_name_template, function(data){
            var json = {};
            data.split('\n').forEach(function(line, index, array){
                var pattern = new RegExp("^\\|(\\d+)=(.*)$");
                var match = pattern.exec(line);
                if (match !== null) {
                    json[match[1]] = match[2];
                }
            });
            localStorage.setItem(monster_name_zh_key, JSON.stringify(json));
            updated_count += 1;
            _update_last_update_at();
            zh_name_data = json;
        });
    }
    function _load_data_from_local_storage(){
        zh_name_data = JSON.parse(localStorage.getItem(monster_name_zh_key));
        jp_name_data = JSON.parse(localStorage.getItem(monster_name_jp_key));
    }
    function _update_icon_title(){
        $("a[title^=monster-id-][title$=-title]").each(function(){
            var title = $(this).attr('title');
            var pattern = new RegExp("^monster-id-(\\d+)-title$");
            var match = pattern.exec(title);
            if (match !== null) {
                var monster_id = match[1];
                var jp_name = jp_name_data[monster_id];
                var zh_name = zh_name_data[monster_id];
                if (typeof(jp_name) === "undefined") jp_name = "";
                if (typeof(zh_name) === "undefined") zh_name = "";
                $(this).attr('title', 'No.'+monster_id+'　 '+jp_name+'（'+zh_name+'）');
            }
        });
    }
    
    
    /****** public methods ***************************************/
    return {
        init: function(){
            if(typeof(Storage) !== "undefined") { // only for modern browsers.
                ready = true;
                if (_is_data_expired()) {
                    _update_local_storage(); // will trigger _update_icon_title() after that.
                } else {
                    _load_data_from_local_storage();
                    _update_icon_title();
                }
            }
        },
        reload: function(){
            if (ready) {
               _update_icon_title();
            }
        }
    };
}
var monsterIconTitle = new MonsterIconTitle();
monsterIconTitle.init();