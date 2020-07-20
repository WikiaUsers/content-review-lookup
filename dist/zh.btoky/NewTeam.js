importScript('MediaWiki:PetSearch.js');
$('<div id="img" style="text-align:center;"><input type="image" id="chooser1" src="https://vignette.wikia.nocookie.net/tos/images/f/f6/%3Fi.png/revision/latest/scale-to-width-down/60?cb=20130204090140&path-prefix=zh" height="60" width="60" /> <input type="image" id="chooser2" src="https://vignette.wikia.nocookie.net/tos/images/f/f6/%3Fi.png/revision/latest/scale-to-width-down/60?cb=20130204090140&path-prefix=zh" height="60" width="60" /> <input type="image" id="chooser3" src="https://vignette.wikia.nocookie.net/tos/images/f/f6/%3Fi.png/revision/latest/scale-to-width-down/60?cb=20130204090140&path-prefix=zh" height="60" width="60" /> <input type="image" id="chooser4" src="https://vignette.wikia.nocookie.net/tos/images/f/f6/%3Fi.png/revision/latest/scale-to-width-down/60?cb=20130204090140&path-prefix=zh" height="60" width="60" /> <input type="image" id="chooser5" src="https://vignette.wikia.nocookie.net/tos/images/f/f6/%3Fi.png/revision/latest/scale-to-width-down/60?cb=20130204090140&path-prefix=zh" height="60" width="60" /> <input type="image" id="chooser6" src="https://vignette.wikia.nocookie.net/tos/images/f/f6/%3Fi.png/revision/latest/scale-to-width-down/60?cb=20130204090140&path-prefix=zh" height="60" width="60" /></div><div id="monsters" style="display: none"><input type="button" id="closewindows" value="╳" /><table style="position: absolute; top:0;"><tr><th>稀有度</th><td><span class="queryButton" data-group="star" data-value="1">1★</span><span class="queryButton" data-group="star" data-value="2">2★</span><span class="queryButton" data-group="star" data-value="3">3★</span><span class="queryButton" data-group="star" data-value="4">4★</span><span class="queryButton" data-group="star" data-value="5">5★</span><span class="queryButton" data-group="star" data-value="6">6★</span><span class="queryButton" data-group="star" data-value="7">7★</span><span class="queryButton" data-group="star" data-value="8">8★</span></td></tr><tr><th>屬性</th><td><span class="queryButton" data-group="attribute" data-value="1">水</span><span class="queryButton" data-group="attribute" data-value="2">火</span><span class="queryButton" data-group="attribute" data-value="3">木</span><span class="queryButton" data-group="attribute" data-value="4">光</span><span class="queryButton" data-group="attribute" data-value="5">暗</span></td></tr><tr><th>種族</th><td><span class="queryButton" data-group="racialtype" data-value="1">人類</span><span class="queryButton" data-group="racialtype" data-value="2">獸類</span><span class="queryButton" data-group="racialtype" data-value="3">妖精類</span><span class="queryButton" data-group="racialtype" data-value="4">龍類</span><span class="queryButton" data-group="racialtype" data-value="5">神族</span><span class="queryButton" data-group="racialtype" data-value="6">進化素材</span><span class="queryButton" data-group="racialtype" data-value="7">強化素材</span><span class="queryButton" data-group="racialtype" data-value="8">魔族</span></td></tr></table><div id="fixed-center"><div id="displayArea"></div></div><span class="queryButton queryButtonActive" data-group="order" data-value="monsterid" style="display: none"></span></div><span id="new_team_tmp"></span><div class="attr-l" id="status_bar" style="text-align:center; font-weight:bold; line-height:25px; font-size:15px; display: none"></div><br>空間：<span id="sizetotal"></span><style type="text/css">#new_team_table input,#new_team_table select{width:calc(100% - 4px);}</style><form id="new_team"><table><tr><td>遊戲ID：<input style="width:60%;" type="number" id="gameid" /><br />隊伍名：<input style="width:60%;" type="text" id="team_name" /><br /><span style="display:none">用戶名：<input style="width:60%;" type="text" id="user_name" disabled="disabled" /><br /></span>關卡名：<input style="width:60%;" type="text" id="stage_name" disabled="disabled" /><br />關卡難易度：<select id="stagelevel"></select><br />魔法石通關：<input type="number" id="diamond_num" min="0" max="99" value="0" /><br />成就通關：<select id="achievement_num"><option value="0" selected="selected">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select><br /><font color="red"><span id="en_1"></span><br /><span id="msg"></span><span id="en_2"></span></font></td><td style="width:70%"><table id="new_team_table" class="wikitable" style="table-layout: fixed; width: 100%"><tr><th style="width:50px"></th><th>編號</th><th>等級</th><th>技能回合數</th><th>昇華等級</th></tr><tr><td>隊長</td><td><input type="number" id="iconid1" data-id="id1" min="1" max="9999" required="required" /></td><td><input type="number" data-id="lv1" min="1" max="99" placeholder="滿等勿填" /></td><td><input type="number" data-id="cd1" min="1" max="50" placeholder="滿技勿填" /></td><td><select data-id="ref1"><option value="" selected="selected">無</option><option value="1">I</option><option value="2">II</option><option value="3">III</option><option value="4">IV</option></select></td></tr><tr><td>成員1</td><td><input type="number" id="iconid2" data-id="id2" min="1" max="9999" /></td><td><input type="number" data-id="lv2" min="1" max="99" placeholder="滿等勿填" /></td><td><input type="number" data-id="cd2" min="1" max="50" placeholder="滿技勿填" /></td><td><select data-id="ref2"><option value="" selected="selected">無</option><option value="1">I</option><option value="2">II</option><option value="3">III</option><option value="4">IV</option></select></td></tr><tr><td>成員2</td><td><input type="number" id="iconid3" data-id="id3" min="1" max="9999" /></td><td><input type="number" data-id="lv3" min="1" max="99" placeholder="滿等勿填" /></td><td><input type="number" data-id="cd3" min="1" max="50" placeholder="滿技勿填" /></td><td><select data-id="ref3"><option value="" selected="selected">無</option><option value="1">I</option><option value="2">II</option><option value="3">III</option><option value="4">IV</option></select></td></tr><tr><td>成員3</td><td><input type="number" id="iconid4" data-id="id4" min="1" max="9999" /></td><td><input type="number" data-id="lv4" min="1" max="99" placeholder="滿等勿填" /></td><td><input type="number" data-id="cd4" min="1" max="50" placeholder="滿技勿填" /></td><td><select data-id="ref4"><option value="" selected="selected">無</option><option value="1">I</option><option value="2">II</option><option value="3">III</option><option value="4">IV</option></select></td></tr><tr><td>成員4</td><td><input type="number" id="iconid5" data-id="id5" min="1" max="9999" /></td><td><input type="number" data-id="lv5" min="1" max="99" placeholder="滿等勿填" /></td><td><input type="number" data-id="cd5" min="1" max="50" placeholder="滿技勿填" /></td><td><select data-id="ref5"><option value="" selected="selected">無</option><option value="1">I</option><option value="2">II</option><option value="3">III</option><option value="4">IV</option></select></td></tr><tr><td>戰友</td><td><input type="number" id="iconid6" data-id="id6" min="1" max="9999" required="required" /></td><td><input type="number" data-id="lv6" min="1" max="99" placeholder="滿等勿填" /></td><td><input type="number" data-id="cd6" min="1" max="50" placeholder="滿技勿填" /></td><td><select data-id="ref6"><option value="" selected="selected">無</option><option value="1">I</option><option value="2">II</option><option value="3">III</option><option value="4">IV</option></select></td></tr></table></td></tr><tr><td colspan="2"><textarea id="attack_method" style="resize:none;width:100%;height:100px;" placeholder="※通關攻略請盡量詳細說明，內容請勿空白。嚴禁在此處發佈徵友及公會招生訊息。"></textarea></td></tr></table><div id="preview_area"></div><input type="button" value="預覽" id="preview" /><input type="submit" /></form>').appendTo('#mw-content-text');

var chooserId;
$("#img input[type=image]").click(function() {
    var fixed_height = $('div#monsters').height() - 100;
    $('#fixed-center').css('height', fixed_height+'px');
    chooserId =$(this);
	$('#monsters').show();
});

$("#closewindows").click(function() {
	$('#monsters').hide();
});

function onSelect() {
    $('#sizetotal').text($(this).closest('div').parents().data('size'));
	var idSelecttest = $(this).attr('data-image-name').split('i')[0];
	$(chooserId).attr('src', $(this).attr('src'));
	$(chooserId).attr('data-size', $(this).closest('div').parents().data('size'));
	var mobsize = chooserId.data('size');
	console.log(mobsize);
	$('#iconid' + chooserId.attr('id').split('r')[1]).val(idSelecttest);
	$('#monsters').hide();
}
 
function submit(title, text, func) {
	$.post(
		"http://zh.btoky.wikia.com/api.php",
		{
			action: 'edit',
			appendtext: text,
			title: title + '/\u901a\u95dc\u6280\u5de7\u53ca\u53c3\u8003\u968a\u4f0d',
			token: mw.user.tokens.get('editToken'),
			format: 'json'
		},
		func, 'json'
	);
}
 
function numberString(number) {
	number = parseInt(number,10 + '');
	if(number < 10) {
		return '00' + number;
	} else if (number < 100) {
		return '0' + number;
	} else {
		return '' + number;
	}
}
 
function showStatus(text, type) {
	var status_bar = $('#status_bar');
	status_bar.show('slow');
	status_bar.text(text);
	status_bar.removeClass('attr-w attr-l attr-f');
	switch (type) { case 0: status_bar.addClass('attr-w'); return; case 1: status_bar.addClass('attr-l'); return; case 2: status_bar.addClass('attr-f'); return; }
}
 
function error () {
	$(this).find('input[type=submit]:eq(0)').attr('disabled', false);
	showStatus('發生錯誤，請重新整理後再試一次，並請確保在網路狀態良好環境下進行', 2);
}
 
function encode (v) {
	return $('<div/>').text(v).html();
}
 
function parseArguments(url)
{
	var num = url.indexOf('?');
	if(num == -1)return null;
	var str = url.substring(num + 1, url.length);
	var pairs = str.split('&');
	var obj = {};
	for(var index in pairs)
	{
		var pair = pairs[index].split('=');
		obj[pair[0]] = pair[1];
	}
	return obj;
}
 
function buildText() {
	var all = $('#new_team_table input,#new_team_table select');
	var text = '{{NewRanks|title=' + $('#team_name').val() + '|stagelv=[[' + $('#stage_name').val() + '#' + $('#stagelevel').children(':selected').text() + '|' + $('#stagelevel').children(':selected').text() + ']]|A=' + $('#achievement_num').children(':selected').val() + '|D=' + $('#diamond_num').val();
	if($('#gameid').val() > 0) {
	text += '|id=' + '[[User_Talk:' + $('#user_name').val() + '|' + $('#gameid').val() + ']]';
	}
	for(var i = 0; i < all.length; i++) {
		if(all.eq(Math.floor((i)/4)*4).val() === '') continue;
		if(all.eq(i).val() === '') continue;
		text += ('|' + all.eq(i).data('id') + '=' + ((i%4===0)?numberString(all.eq(i).val()):all.eq(i).val()));
	}
 
	text += ('|explain=' + encode($('#attack_method').val()).replace(/~/g, '&#126;').replace(/\n/g,'<br />') + '<br />~~' + '~~}}\n');
	return text;
}
 
var map = parseArguments(location.href);
if(map) {
	var maptemp = decodeURIComponent(map.StageTitle);
	$('#stage_name').val(maptemp);
	$.getJSON('http://zh.btoky.wikia.com/api.php', {
		action: 'parse',
		page: maptemp,
		format: 'json',
		indexpageids: 1
	}, function(data) {
        $('#new_team_tmp').children().remove();
        $(data.parse.text['*'].replace(/\n/g, "")).siblings('table#stage_table.wikitable').appendTo('#new_team_tmp').css({'display':'none'});
        $('[id=stage_name_list]').each(function() {
            $("#stagelevel").append($('<option></option>').text($(this).text()));
        });
    });
} else history.back();
$('#user_name').val((wgUserName.replace(' ','_')));
$('#preview').click(function() {
	$.getJSON('http://zh.btoky.wikia.com/api.php',
		{
			action: 'parse',
			format: 'json',
			text: buildText()
		},
		function (data) {
			$('#preview_area').children().remove();
			$(data.parse.text['*']).appendTo('#preview_area');
		}
	);
});
 
$('#new_team').on('submit', function(e){
	e.preventDefault();
	showStatus('正在新增，請稍候', 1);
	$(this).find('input[type=submit]:eq(0)').attr('disabled', true);
 
	submit($('#stage_name').val(), buildText(), function (data) {
		if (typeof data == 'object') {
			if (typeof data.edit == 'object') {
				if (data.edit.result == "Success") {
					showStatus('新增成功，請等待跳轉...', 0);
					window.location.href='http://zh.btoky.wikia.com/wiki/' + $('#stage_name').val() + '/\u901a\u95dc\u6280\u5de7\u53ca\u53c3\u8003\u968a\u4f0d';
				} else {
					error();
				}
			} else {
				error();
			}
		} else {
			error();
		}
	});
});
$('#monsters').css('background', 'url(http://d1mcde1f7zaaai.cloudfront.net/inapp/img-2/Bg.jpg)').css('background-size', 'cover').css('color', '#FFFFFF').css('border', '2px solid #4d3534').css('width', '670px').css('max-height', '700px').css('height', '100%').css('position', 'absolute').css('top', '0').css('left', '50%').css('margin-left', '-335px').css('border-radius', '10px').css('padding', '15px').css('z-index', '10');
$('#closewindows').css('position', 'absolute').css('top', '0').css('right', '0').css('font', 'bold 15px').css('color', '#ffffff').css('background', '#7d5d3b').css('border', '0px none #000').css('text-shadow', '0px -1px 4px #0a0a0a').css('box-shadow', '0px -1px 6px #000000').css('-moz-box-shadow', '0px -1px 6px #000000').css('-webkit-box-shadow', '0px -1px 6px #000000').css('border-radius', '2px 2px 2px 2px').css('-moz-border-radius', '2px 2px 2px 2px').css('-webkit-border-radius', '2px 2px 2px 2px').css('width', '30px').css('height', '30px').css('cursor', 'pointer').css('z-index', '1');
$('#fixed-center').css('width', '100%').css('position', 'absolute').css('top', '90px').css('left', '0').css('overflow-y', 'scroll');
$('.queryButton').css('margin', '0 2px').css('color', '#fff');
$('.queryButtonActive').css('color', '#000');