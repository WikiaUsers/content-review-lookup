$("div.title:last").after('<div id="loading_msg">卡片資料庫讀取中...</div><div id="card_evo_info" style="display: none">卡片名稱：<input type="text" id="input_card_name" placeholder="ex. 龍" /><label><input type="checkbox" id="select_with_evo" />選取進化樹</label>&nbsp;<button id="save_to_browser">儲存到瀏覽器</button>&nbsp;<button id="load_from_browser">從瀏覽器讀取</button><div id="card_search_result"></div><h2>選擇卡片列表</h2><table id="evo_list" class="article-table" width="100%"><tr><th colspan="2" style="text-align: center;">卡片名稱</th><th colspan="4" style="text-align: center;">所需素材</th><th style="text-align: center;">進化為</th></tr></table><h2>進化素材統計</h2><table id="evo_total" class="article-table"></table></div>');

function add_range_to_list(low, high, l) {
    for (var i = low; i <= high; ++i) {
        l.push(i);
    }
}

function load_card_from_wiki(loading_msg_div, info_div) {
    loading_msg_div.html("卡片資料庫讀取中...");
    var id_flag = [ -710, 11360, 801859]; // 未知號碼最後一張, 一般圖鑑上限, 繁中版圖鑑上限，數值請參閱精靈圖鑑編輯
    var card_ids = [];
    add_range_to_list( id_flag[0], -12, card_ids); // 未知號碼圖鑑
    add_range_to_list( 1, id_flag[1], card_ids); // 一般圖鑑
    add_range_to_list(80001, 80011, card_ids); // 繁中版異界神編號特例
    add_range_to_list(800001, id_flag[2], card_ids); // 繁中版圖鑑
    var card_datas = [];
    loaded_count = 0;
    for (var index in card_ids) {
        var current_card_id = card_ids[index];
        
        var page_name = "https://nekowiz.fandom.com/zh/index.php?action=raw&title=Template:Card/Data/" + current_card_id.toString();
        $.ajax({
        url: page_name
        })
            .done(function (data) {
                var status = 0;
                /* var card_page = data;
                var card_data = $(card_page).find("#wpTextbox1").html(); */
                var card_data = data;
                var current_id = "";
                var current_card_data = {};
                var card_data_split = card_data.split("\n");
                for (var line_index in card_data_split) {
                    var line = card_data_split[line_index];
                    if (line[0] == "|") {
                        var before = line.substr(1, line.search("=") - 1);
                        var after = line.substr(line.search("=") + 1);
                        if (before != "") {
                            current_card_data[before] = after;
                        }
                    }
                }
                card_datas.push(current_card_data);
            })
            .always(function () {
                loaded_count += 1;
                loading_msg_div.html("卡片資料庫讀取中...<br />讀取進度: " + Math.round(loaded_count/card_ids.length*100).toString() + "%");
                // console.log("Parsing progress: " + (loaded_count/card_ids.length*100).toString() + "%");
                if (loaded_count >= card_ids.length) {
                    loading_msg_div.hide(1000);
                    info_div.show(1000);
                    console.log("Parsing finished");
                    card_db = TAFFY(card_datas);
                }
            });
    }
}

function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

function update_json() {
    var errorHandler = function () {
        console.log("Error.");
    };
    
    var new_json = chunkString(card_db().stringify(), 1000000);

    for(var i in new_json) {
        var new_text = new_json[i];
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                format: 'json',
                action: 'edit',
                title: 'Template:Card/Data/JSON/' + i.toString(),
                text: new_text,
                token: mw.user.tokens.get('editToken')
            },
            dataType: 'json',
            type: 'POST',
            cache: false,
            success: function (data) {
                if ( data && data.edit && data.edit.result == 'Success' ) {
                    console.log("Json updated.");
                } else if ( data && data.error ) {
                    errorHandler();
                    // alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                } else {
                    errorHandler();
                    // alert( 'Error: Unknown result from API.' );
                }
            },
            error: function(xhr) {
                errorHandler();
            }
        });
    }
}

function load_card_from_json(loading_msg_div, info_div) {
    loading_msg_div.html("卡片資料庫讀取中...");
    var page_name = "https://nekowiz.fandom.com/zh/index.php?action=raw&title=Template:Card/Data/JSON/";
    var page_number = 0;
    var page_data = "";
    var page_not_found = false;
    while(!page_not_found) {
        $.ajax({
        url: page_name + page_number.toString(),
        async: false
        })
            .done(function (data) {
                page_data += data;
                page_number += 1;
            })
            .fail(function () {
                page_not_found = true;
            });
    }
    card_db = TAFFY(page_data);
    loading_msg_div.hide(1000);
    info_div.show(1000);
    console.log("Parsing finished");
}