/* To be used with [[MediaWiki:SkillTools.js]] <pre> */

var campaignArray = ['<option id="campSel0" value="0 核心">核心</option>\n', 
		'	<option id="campSel1" value="1 首部曲">首部曲</option>\n',
		'	<option id="campSel2" value="2 二部曲">二部曲</option>\n',
		'	<option id="campSel3" value="3 三部曲">三部曲</option>\n',
		'	<option id="campSel4" value="4 四部曲">四部曲</option>\n'];

var profAttribs = ['<option value="無屬性">無屬性</option>\n',
		enumerateOptions(["力量", "精通斧術", "精通劍術","精通鎚術","戰術"]),
		enumerateOptions(["專精", "弓術精通","野獸支配","求生"]),
		enumerateOptions(["神恩", "治療祈禱","防護祈禱","懲戒祈禱"]),
		enumerateOptions(["靈魂吸取", "死亡魔法","血魔法","詛咒"]),
		enumerateOptions(["快速施法", "支配魔法","幻術魔法","靈感魔法"]),
		enumerateOptions(["能量儲存", "火系魔法", "水系魔法","風系魔法","地系魔法"]),
		enumerateOptions(["致命攻擊", "匕首精通","暗影技巧","暗殺技巧"]),
		enumerateOptions(["召喚", "神諭","導引魔法","復原魔法"]),
		enumerateOptions(["領導", "精通矛術","激勵","命令"]),
		enumerateOptions(["祕法", "祕法","地之祈禱","風之祈禱","鐮刀精通"]),
		'<option value="其它">其它</option>\n'];

var commonTypes = '<option value="技能">技能</option>\n'
		+ '	<option value="紋章">紋章</option>\n';
var spellTypes = '	<option value="咒文魔法">咒文魔法</option>\n'
		+ '	<option value="加持魔法">加持魔法</option>\n'
		+ '	<option value="降咒魔法">降咒魔法</option>\n';

var skillTypes = [commonTypes, 
		commonTypes + '	<option value="近身攻擊技能">近身攻擊技能</option>\n'
		+ '	<option value="斧術技能">斧術技能</option>\n'
		+ '	<option value="劍術技能">劍術技能</option>\n'
		+ '	<option value="鎚術技能">鎚術技能</option>\n'
		+ '	<option value="戰嚎">戰嚎</option>\n'
		+ '	<option value="態勢">態勢</option>\n',
		commonTypes+ '	<option value="弓術技能">弓術技能</option>\n'
		+ '	<option value="寵物攻擊">寵物攻擊</option>\n'
		+ '	<option value="態勢">態勢</option>\n'
		+ '	<option value="自然儀式">自然儀式</option>\n'
		+ '	<option value="準備技能">準備技能</option>\n'
		+ '	<option value="陷阱">陷阱</option>\n',
		commonTypes+ spellTypes, 
		commonTypes+ spellTypes + '<option>湧泉魔法</option>\n', 
		commonTypes+ spellTypes + '<option>態勢</option>\n',
		commonTypes+ spellTypes + '<option>結界魔法</option>\n<option>符號</option>\n', 
		commonTypes+ '	<option value="近身攻擊技能">近身攻擊技能</option>\n'
		+ '	<option value="引導攻擊">引導攻擊</option>\n'
		+ '	<option value="即刻攻擊">即刻攻擊</option>\n'
		+ '	<option value="雙重攻擊">雙重攻擊</option>\n'
		+ spellTypes
		+ '	<option value="態勢">態勢</option>\n',
		commonTypes+ spellTypes + '	<option value="抱持魔法">抱持魔法</option>\n'
		+ '	<option value="武裝魔法">武裝魔法</option>\n'
		+ '	<option value="縛靈儀式">縛靈儀式</option>\n',
		commonTypes+ '	<option value="矛術攻擊">矛術攻擊</option>\n'
		+ '	<option value="態勢">態勢</option>\n'
		+ '	<option value="戰嚎">戰嚎</option>\n'
		+ '	<option value="聖歌">聖歌</option>\n'
		+ '	<option value="迴響">迴響</option>\n',
		commonTypes+ '	<option value="型態">型態</option>\n'
		+ '	<option value="近身攻擊技能">近身攻擊技能</option>\n'
		+ '	<option value="鐮刀攻擊">鐮刀攻擊</option>\n'
		+ spellTypes
		+ '	<option value="態勢">態勢</option>\n',
		commonTypes];

var effectTypes = '	<option value="">其他:</option>\n'
		+ '	<option value="持續時間(秒)">持續時間(秒)</option>\n'
		+ '	<option value="傷害">傷害</option>\n'
		+ '	<option value="額外傷害">額外傷害</option>\n'
		+ '	<option value="體力治療">體力治療</option>\n'
		+ '	<option value="體力偷取">體力偷取</option>\n'
		+ '	<option value="體力再生">體力再生</option>\n'
		+ '	<option value="體力衰減">體力衰減</option>\n'
		+ '	<option value="能量喪失">能量喪失</option>\n'
		+ '	<option value="能量獲得">能量獲得</option>\n'
		+ '	<option value="能量偷取">能量偷取</option>\n'
		+ '	<option value="能量再生">能量再生</option>\n'
		+ '	<option value="能量衰減">能量衰減</option>\n'
		+ '	<option value="增加">增加</option>\n'
		+ '	<option value="減少">減少</option>\n'
		+ '	<option value="增加(%)">增加(%)</option>\n'
		+ '	<option value="減少(%)">減少(%)</option>\n'
		+ '';

/* </pre> */