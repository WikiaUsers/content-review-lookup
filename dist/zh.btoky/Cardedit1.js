keys = [
	['name', '卡片名稱'],
	['attr', '屬性', 'select', 'attr'],
	['rare', '稀有', 'select', 'rare'],
	['display', 'display'],
	['cost', '空間'],
	['race', '種族', 'select', 'race'],
	['series', '系列'],

	['lvMax', '最高等級'],
	['exptype', '經驗值類型'],
	['max_hp', '最高血量'],
	['max_atk', '最高攻擊力'],
	['card_filename', '卡片大圖名稱'],
	['small_filename', ''],
	['evo_now', '目前進化級數', 'select', 'evo_level'],
	['evo_max', '最高進化級數', 'select', 'evo_level'],
	['as', '答題技能名稱'],
	['ss', '特殊技能名稱'],
	['as2', '答題技能2名稱'],
	['ss2', '特殊技能2名稱'],
	['senzai_1', '潛在能力1', 'select', 'senzai'],
	['senzai_2', '潛在能力2', 'select', 'senzai'],
	['senzai_3', '潛在能力3', 'select', 'senzai'],
	['senzai_4', '潛在能力4', 'select', 'senzai'],
	['senzai_5', '潛在能力5', 'select', 'senzai'],
	['senzai_6', '潛在能力6', 'select', 'senzai'],
	['senzai_7', '潛在能力7', 'select', 'senzai'],
	['senzai_8', '潛在能力8', 'select', 'senzai'],
	['senzai_9', '潛在能力9', 'select', 'senzai'],
	['senzai_10', '潛在能力10', 'select', 'senzai'],
	['senzaiL_1', '傳奇型態發動效果1'],
	['senzaiL_2', '傳奇型態發動效果2'],
	['senzaiL_3', '傳奇型態發動效果3'],
	['senzaiL_4', '傳奇型態發動效果4'],
	['evo_1', '進化素材1 ID', 'select', 'evo_material'],
	['evo_2', '進化素材2 ID', 'select', 'evo_material'],
	['evo_3', '進化素材3 ID', 'select', 'evo_material'],
	['evo_4', '進化素材4 ID', 'select', 'evo_material'],
	['evo_5', '進化素材5 ID', 'select', 'evo_material'],
	['evo_6', '進化素材6 ID', 'select', 'evo_material'],
	['evo_7', '進化素材7 ID', 'select', 'evo_material'],
	['evo_8', '進化素材8 ID', 'select', 'evo_material'],
	['evo_price', '進化所需金幣'],
	['sell_price', '販賣獲得金幣'],
	['evo_from', '進化自卡片 ID'],
	['evo_to', '進化為卡片 ID'],
	['mutual_evo', ''],
	['evo_chain_before_note', ''],
	['evo_chain_after_note', ''],
	['evo_chain_branch', ''],
	['get_source', '取得來源'],
	['comment', '備註', 'textarea']
];

options = {
//	prop: ["火", "水", "雷"],
	attr: ["水", "火", "木", "光", "暗"],
//	prop2: ["火", "水", "雷", "闇", "光"],
	race: ["人類", "獸類", "妖精類", "龍類", "神族", "進化素材", "強化素材", "魔族", "機械族"],
//	breed: ["戰士", "術士", "魔族", "魔法生物", "妖精", "亞人", "龍族", "神族", "物質", "天使", "道具", "AbCd"],
	rare: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
	evo_level: [1, 2, 3, 4, 5, 6, 7],
	senzai: [
		"攻擊力上升Ⅰ", "攻擊力上升Ⅱ", "攻擊力上升Ⅲ", "攻擊力上升Ⅳ", "攻擊力上升Ⅴ", "攻擊力上升Ⅵ", "攻擊力上升Ⅹ",
		"HP上升Ⅰ", "HP上升Ⅱ", "HP上升Ⅲ", "HP上升Ⅳ", "HP上升Ⅴ", "HP上升Ⅵ", "HP上升Ⅹ",
		"提升傷害Ⅰ＆HP下降Ⅴ",
		"全屬性攻擊力上升Ⅰ", "全屬性攻擊力上升Ⅱ", "全屬性攻擊力上升Ⅲ",
		"全屬性HP上升Ⅰ", "全屬性HP上升Ⅱ", "全屬性HP上升Ⅲ",
		"elmts", "breeds",
		"減輕火屬性傷害Ⅰ", "減輕火屬性傷害Ⅱ",
		"減輕水屬性傷害Ⅰ", "減輕水屬性傷害Ⅱ",
		"減輕雷屬性傷害Ⅰ", "減輕雷屬性傷害Ⅱ",
		"減輕火、水屬性傷害Ⅰ", "減輕火、水屬性傷害Ⅱ",
		"減輕火、雷屬性傷害Ⅰ", "減輕火、雷屬性傷害Ⅱ",
		"減輕水、雷屬性傷害Ⅰ", "減輕水、雷屬性傷害Ⅱ",
		"減輕闇屬性傷害Ⅰ", "減輕闇屬性傷害Ⅱ", "減輕闇屬性傷害Ⅲ", "減輕光屬性傷害Ⅰ", "減輕光屬性傷害Ⅱ",
		"減輕光．闇屬性傷害Ⅰ", "減輕光．闇屬性傷害Ⅱ", "減輕光．闇屬性傷害Ⅲ",
		"減輕全屬性傷害Ⅰ", "減輕全屬性傷害Ⅱ",
		"減輕物質傷害Ⅰ", "減輕物質傷害Ⅲ", "減輕物質傷害Ⅳ", "減輕魔族傷害Ⅰ", "減輕魔族傷害Ⅱ", "減輕魔族傷害Ⅲ", "減輕魔族傷害Ⅳ",
		"減輕魔法生物傷害Ⅲ", "減輕龍族傷害Ⅰ", "減輕龍族傷害Ⅲ", "減輕龍族傷害Ⅴ",
		"減少COSTⅠ", "減少COSTⅡ", "減少COSTⅢ", "減少COSTⅣ", "減少COSTⅤ", "減少COSTⅥ", "減少COSTⅧ", "減少COSTⅩ", "減少COSTⅩⅩ",
		"快速技能Ⅰ", "快速技能Ⅱ", "快速技能Ⅲ", "快速技能Ⅳ", "快速技能Ⅴ",
		"第二回快速技能Ⅰ", "第二回快速技能Ⅱ", "第二回快速技能Ⅲ", "第二回快速技能Ⅳ", "第二回快速技能Ⅴ",
		"九死一生Ⅰ", "九死一生Ⅱ", "九死一生Ⅲ", "九死一生Ξ",
		"獲得EXP量上升Ⅰ", "獲得EXP量上升Ⅱ", "獲得EXP量上升Ⅲ",
		"獲得金幣量上升Ⅰ", "獲得金幣量上升Ⅱ", "獲得金幣量上升Ⅲ", "獲得金幣量上升Ⅴ",
		"戰鬥結束後HP回復Ⅰ", "戰鬥結束後HP回復Ⅱ",
		"心眼", "心眼・破", "心眼・絕" , "更換精靈" , "掉寶率上升Ⅰ" , "減少難易度Ⅰ" , "防禦連鎖Ⅰ" , "提升連鎖Ⅰ" ,
		"使敵方技能的答題技能封印失效", "使敵方技能的特殊技能封印失效", "使敵方技能的特殊技能、答題技能封印失效",
		"使敵方技能的封印失效", "使敵方技能的毒攻擊失效", "使敵方技能的死亡秒針失效",
		"使敵方技能的回復反轉失效", "使敵方技能的消除技能充填失效",
		"使敵方技能的毒攻擊、屬性弱化、死亡秒針失效", "使敵方技能的毒攻擊、屬性弱化、死亡秒針、封印失效",
		"答題技能延長Ⅲ", "答題技能延長Ⅴ",
	],
	evo_material: ["none"]
};

evo_material = {
	"火": [
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 137, "name": "火石碰碰吉 (C+)" },
		{ "id": 138, "name": "噴火碰碰吉 (B)" },
		{ "id": 139, "name": "紅眼魔法碰碰吉 (B+)" },
		{ "id": 1480, "name": "緋眼魔法碰碰吉 (A)" },
		{ "id": 1481, "name": "真紅眼魔法碰碰吉 (A+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 128, "name": "火之花精靈 (C+)" },
		{ "id": 129, "name": "躍動的火之花精靈 (B+)" },
		{ "id": 130, "name": "月夜舞動的火之花精靈 (A)" },
		{ "id": 1486, "name": "如幻想般舞動的火之花精靈 (A+)" },
		{ "id": 1487, "name": "妝點神話之舞蹈 火之花精靈 (S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 110, "name": "火蘑菇人‧新秀 (C+)" },
		{ "id": 111, "name": "火蘑菇人‧英雄 (B+)" },
		{ "id": 112, "name": "火蘑菇人‧大師 (A)" },
		{ "id": 1492, "name": "火蘑菇人‧將軍(A+)" },
		{ "id": 1493, "name": "火蘑菇人‧君王(S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 146, "name": "緋色樹精 (A)" },
		{ "id": 147, "name": "葉隙光芒之神樹 (A+)" },
		{ "id": 148, "name": "太陽樹尤克特拉希爾 (S)" },
		{ "id": 1498, "name": "灼耀太陽之世界樹 (S+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 119, "name": "火貍貓 (C+)" },
		{ "id": 120, "name": "火狸貓首領 (B+)" },
		{ "id": 121, "name": "火狸貓大王 (A)" },
		{ "id": 1501, "name": "火狸貓皇帝 (A+)" },
		{ "id": 1502, "name": "火狸貓神 (S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 3629, "name": "朱鱗變幻龍 (S+)" },
		{ "id": 3630, "name": "紅寶晶變幻龍 (SS)" },
		{ "id": 6307, "name": "紅鱗黑珠幻色龍 (SS+)" },
	],
	"水": [
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 140, "name": "冰石碰碰吉 (C+)" },
		{ "id": 141, "name": "降雨碰碰吉 (B)" },
		{ "id": 142, "name": "青眼魔法碰碰吉 (B+)" },
		{ "id": 1482, "name": "蒼眼魔法碰碰吉 (A)" },
		{ "id": 1483, "name": "蒼冰眼魔法碰碰吉 (A+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 131, "name": "水之花精靈 (C+)" },
		{ "id": 132, "name": "躍動的水之花精靈 (B+)" },
		{ "id": 133, "name": "月夜舞動的水之花精靈 (A)" },
		{ "id": 1488, "name": "如幻想般舞動的水之花精靈 (A+)" },
		{ "id": 1489, "name": "妝點神話之舞蹈 水之花精靈 (S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 113, "name": "冰蘑菇人‧新秀 (C+)" },
		{ "id": 114, "name": "冰蘑菇人‧英雄 (B+)" },
		{ "id": 115, "name": "冰蘑菇人‧大師 (A)" },
		{ "id": 1494, "name": "冰蘑菇人‧將軍(A+)" },
		{ "id": 1495, "name": "冰蘑菇人‧君王(S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 149, "name": "翡翠樹精 (A)" },
		{ "id": 150, "name": "生命海洋之神樹 (A+)" },
		{ "id": 151, "name": "蒼海樹尤克特拉希爾 (S)" },
		{ "id": 1499, "name": "幽幻蒼海之世界樹 (S+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 122, "name": "雨貍貓 (C+)" },
		{ "id": 123, "name": "雨狸貓首領 (B+)" },
		{ "id": 124, "name": "雨狸貓大王 (A)" },
		{ "id": 1503, "name": "雨狸貓皇帝 (A+)" },
		{ "id": 1504, "name": "雨狸貓神 (S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 3631, "name": "冰鱗變幻龍 (S+)" },
		{ "id": 3632, "name": "蒼琉璃變幻龍 (SS)" },
		{ "id": 6308, "name": "蒼鱗黑珠幻色龍 (SS+)" },
	],
	"雷": [
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 143, "name": "雷石碰碰吉 (C+)" },
		{ "id": 144, "name": "電光碰碰吉 (B)" },
		{ "id": 145, "name": "光眼魔法碰碰吉 (B+)" },
		{ "id": 1484, "name": "閃眼魔法碰碰吉 (A)" },
		{ "id": 1485, "name": "瞬閃眼魔法碰碰吉 (A+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 134, "name": "雷之花精靈 (C+)" },
		{ "id": 135, "name": "躍動的雷之花精靈 (B+)" },
		{ "id": 136, "name": "月夜舞動的雷之花精靈 (A)" },
		{ "id": 1490, "name": "如幻想般舞動的雷之花精靈 (A+)" },
		{ "id": 1491, "name": "妝點神話之舞蹈 雷之花精靈 (S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 116, "name": "雷蘑菇人‧新秀 (C+)" },
		{ "id": 117, "name": "雷蘑菇人‧英雄 (B+)" },
		{ "id": 118, "name": "雷蘑菇人‧大師 (A)" },
		{ "id": 1496, "name": "雷蘑菇人‧將軍(A+)" },
		{ "id": 1497, "name": "雷蘑菇人‧君王 (S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 152, "name": "月光樹精 (A)" },
		{ "id": 153, "name": "向天祈求之神樹 (A+)" },
		{ "id": 154, "name": "天雷樹尤克特拉希爾 (S)" },
		{ "id": 1500, "name": "壯實雷神之世界樹 (S+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 125, "name": "雷貍貓 (C+)" },
		{ "id": 126, "name": "雷狸貓首領 (B+)" },
		{ "id": 127, "name": "雷狸貓大王 (A)" },
		{ "id": 1505, "name": "雷狸貓皇帝 (A+)" },
		{ "id": 1506, "name": "雷狸貓神 (S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 3633, "name": "雷鱗變幻龍 (S+)" },
		{ "id": 3634, "name": "輝黃玉變幻龍 (SS)" },
		{ "id": 6309, "name": "黃鱗黑珠幻色龍 (SS+)" },
	]
};

senzai_elmts = {
	"火": [
		"火屬性攻擊力上升Ⅰ",
		"火屬性攻擊力上升Ⅱ",
		"火屬性攻擊力上升Ⅲ",
		"火屬性攻擊力上升Ⅳ",
		"火屬性攻擊力上升Ⅴ",
		"火屬性HP上升Ⅰ",
		"火屬性HP上升Ⅱ",
		"火屬性HP上升Ⅲ",
		"火屬性HP上升Ⅳ",
		"火屬性HP上升Ⅴ",
		"純屬性攻擊力上升Ⅰ‧火",
		"純屬性攻擊力上升Ⅱ‧火",
		"純屬性攻擊力上升Ⅲ‧火",
		"純屬性攻擊力上升Ⅳ‧火",
		"純屬性HP上升Ⅰ‧火",
		"純屬性HP上升Ⅱ‧火",
		"純屬性HP上升Ⅲ‧火",
		"純屬性HP上升Ⅳ‧火",
		"火．水屬性攻擊力上升Ⅰ",
		"火．水屬性攻擊力上升Ⅱ",
		"火．水屬性攻擊力上升Ⅲ",
		"火．水屬性攻擊力上升Ⅳ",
		"火．雷屬性攻擊力上升Ⅰ",
		"火．雷屬性攻擊力上升Ⅱ",
		"火．雷屬性攻擊力上升Ⅲ",
		"火．水屬性HP上升Ⅰ",
		"火．水屬性HP上升Ⅱ",
		"火．水屬性HP上升Ⅲ",
		"火．雷屬性HP上升Ⅰ",
		"火．雷屬性HP上升Ⅱ",
		"火．雷屬性HP上升Ⅲ",
		"問題類型屬性提昇‧火",
		"問題類型屬性提昇Ⅱ‧火",
		"問題類型屬性提昇Ⅲ‧火",
		"問題類型屬性提昇Ⅳ‧火",
		"問題類型屬性提昇Ⅴ‧火",
	],
	"水": [
		"水屬性攻擊力上升Ⅰ",
		"水屬性攻擊力上升Ⅱ",
		"水屬性攻擊力上升Ⅲ",
		"水屬性攻擊力上升Ⅳ",
		"水屬性攻擊力上升Ⅴ",
		"水屬性HP上升Ⅰ",
		"水屬性HP上升Ⅱ",
		"水屬性HP上升Ⅲ",
		"水屬性HP上升Ⅳ",
		"水屬性HP上升Ⅴ",
		"純屬性攻擊力上升Ⅰ‧水",
		"純屬性攻擊力上升Ⅱ‧水",
		"純屬性攻擊力上升Ⅲ‧水",
		"純屬性攻擊力上升Ⅳ‧水",
		"純屬性HP上升Ⅰ‧水",
		"純屬性HP上升Ⅱ‧水",
		"純屬性HP上升Ⅲ‧水",
		"純屬性HP上升Ⅳ‧水",
		"火．水屬性攻擊力上升Ⅰ",
		"火．水屬性攻擊力上升Ⅱ",
		"火．水屬性攻擊力上升Ⅲ",
		"火．水屬性攻擊力上升Ⅳ",
		"水．雷屬性攻擊力上升Ⅰ",
		"水．雷屬性攻擊力上升Ⅱ",
		"水．雷屬性攻擊力上升Ⅲ",
		"火．水屬性HP上升Ⅰ",
		"火．水屬性HP上升Ⅱ",
		"火．水屬性HP上升Ⅲ",
		"水．雷屬性HP上升Ⅰ",
		"水．雷屬性HP上升Ⅱ",
		"水．雷屬性HP上升Ⅲ",
		"問題類型屬性提昇‧水",
		"問題類型屬性提昇Ⅱ‧水",
		"問題類型屬性提昇Ⅲ‧水",
		"問題類型屬性提昇Ⅳ‧水",
		"問題類型屬性提昇Ⅴ‧水",
	],
	"雷": [
		"雷屬性攻擊力上升Ⅰ",
		"雷屬性攻擊力上升Ⅱ",
		"雷屬性攻擊力上升Ⅲ",
		"雷屬性攻擊力上升Ⅳ",
		"雷屬性攻擊力上升Ⅴ",
		"雷屬性HP上升Ⅰ",
		"雷屬性HP上升Ⅱ",
		"雷屬性HP上升Ⅲ",
		"雷屬性HP上升Ⅳ",
		"雷屬性HP上升Ⅴ",
		"純屬性攻擊力上升Ⅰ‧雷",
		"純屬性攻擊力上升Ⅱ‧雷",
		"純屬性攻擊力上升Ⅲ‧雷",
		"純屬性攻擊力上升Ⅳ‧雷",
		"純屬性HP上升Ⅰ‧雷",
		"純屬性HP上升Ⅱ‧雷",
		"純屬性HP上升Ⅲ‧雷",
		"純屬性HP上升Ⅳ‧雷",
		"火．雷屬性攻擊力上升Ⅰ",
		"火．雷屬性攻擊力上升Ⅱ",
		"火．雷屬性攻擊力上升Ⅲ",
		"水．雷屬性攻擊力上升Ⅰ",
		"水．雷屬性攻擊力上升Ⅱ",
		"水．雷屬性攻擊力上升Ⅲ",
		"火．雷屬性HP上升Ⅰ",
		"火．雷屬性HP上升Ⅱ",
		"火．雷屬性HP上升Ⅲ",
		"水．雷屬性HP上升Ⅰ",
		"水．雷屬性HP上升Ⅱ",
		"水．雷屬性HP上升Ⅲ",
		"問題類型屬性提昇‧雷",
		"問題類型屬性提昇Ⅱ‧雷",
		"問題類型屬性提昇Ⅲ‧雷",
		"問題類型屬性提昇Ⅳ‧雷",
		"問題類型屬性提昇Ⅴ‧雷",
	]
};

/*senzai_elmts2 = {
	"光": [
		"減輕光．闇屬性傷害Ⅰ",
		"減輕光．闇屬性傷害Ⅱ",
		"減輕光．闇屬性傷害Ⅲ",
	],
	"闇": [
		"減輕光．闇屬性傷害Ⅰ",
		"減輕光．闇屬性傷害Ⅱ",
		"減輕光．闇屬性傷害Ⅲ",
	]
};*/

senzai_breeds = {
	"戰士": [
		"戰士攻擊力上升Ⅰ",
		"戰士攻擊力上升Ⅱ",
		"戰士攻擊力上升Ⅲ",
		"戰士攻擊力上升Ⅳ",
		"戰士攻擊力上升Ⅴ",
		"戰士攻擊力上升Ⅵ",
		"術士‧戰士攻擊力上升Ⅱ",
		"龍族‧戰士攻擊力上升Ⅴ",
		"神族‧戰士攻擊力上升Ⅰ",
		"神族‧戰士攻擊力上升Ⅱ",
		"神族‧戰士攻擊力上升Ⅲ",
		"天使‧戰士攻擊力上升Ⅰ",
		"天使‧戰士攻擊力上升Ⅱ",
		"天使‧戰士攻擊力上升Ⅲ",
		"戰士HP上升Ⅰ",
		"戰士HP上升Ⅱ",
		"戰士HP上升Ⅲ",
		"戰士HP上升Ⅳ",
		"戰士HP上升Ⅴ",
		"術士‧戰士HP上升Ⅱ",
		"神族‧戰士HP上升Ⅰ",
		"神族‧戰士HP上升Ⅱ",
		"神族‧戰士HP上升Ⅲ",
		"天使‧戰士HP上升Ⅰ",
		"天使‧戰士HP上升Ⅱ",
		"天使‧戰士HP上升Ⅲ",
	],
	"術士": [
		"術士攻擊力上升Ⅰ",
		"術士攻擊力上升Ⅱ",
		"術士攻擊力上升Ⅲ",
		"術士攻擊力上升Ⅳ",
		"術士攻擊力上升Ⅴ",
		"術士‧戰士攻擊力上升Ⅱ",
		"魔族‧術士攻擊力上升Ⅰ",
		"魔族‧術士攻擊力上升Ⅱ",
		"魔族‧術士攻擊力上升Ⅲ",
		"龍族‧術士攻擊力上升Ⅰ",
		"龍族‧術士攻擊力上升Ⅱ",
		"龍族‧術士攻擊力上升Ⅲ",
		"神族‧術士攻擊力上升Ⅰ",
		"神族‧術士攻擊力上升Ⅱ",
		"術士HP上升Ⅰ",
		"術士HP上升Ⅱ",
		"術士HP上升Ⅲ",
		"術士HP上升Ⅳ",
		"術士HP上升Ⅴ",
		"術士‧戰士HP上升Ⅱ",
		"魔族‧術士HP上升Ⅰ",
		"魔族‧術士HP上升Ⅱ",
		"魔族‧術士HP上升Ⅲ",
		"龍族‧術士HP上升Ⅰ",
		"龍族‧術士HP上升Ⅱ",
		"龍族‧術士HP上升Ⅲ",
		"神族‧術士HP上升Ⅰ",
		"神族‧術士HP上升Ⅱ",
		"神族‧妖精‧術士HP上升Ⅰ",
		"神族‧妖精‧術士HP上升Ⅱ",
	],
	"魔族": [
		"魔族攻擊力上升Ⅰ",
		"魔族攻擊力上升Ⅱ",
		"魔族攻擊力上升Ⅲ",
		"魔族攻擊力上升Ⅳ",
		"魔族攻擊力上升Ⅴ",
		"魔族攻擊力上升Ⅵ",
		"魔族‧術士攻擊力上升Ⅰ",
		"魔族‧術士攻擊力上升Ⅱ",
		"魔族‧術士攻擊力上升Ⅲ",
		"神族‧魔族攻擊力上升Ⅴ",
		"天使‧魔族攻擊力上升Ⅰ",
		"天使‧魔族攻擊力上升Ⅱ",
		"魔族HP上升Ⅰ",
		"魔族HP上升Ⅱ",
		"魔族HP上升Ⅲ",
		"魔族HP上升Ⅳ",
		"魔族HP上升Ⅴ",
		"魔族‧術士HP上升Ⅰ",
		"魔族‧術士HP上升Ⅱ",
		"魔族‧術士HP上升Ⅲ",
		"天使‧魔族HP上升Ⅰ",
		"天使‧魔族HP上升Ⅱ",
	],
	"魔法生物": [
		"魔法生物攻擊力上升Ⅰ",
		"魔法生物攻擊力上升Ⅱ",
		"魔法生物攻擊力上升Ⅲ",
		"魔法生物攻擊力上升Ⅳ",
		"魔法生物HP上升Ⅰ",
		"魔法生物HP上升Ⅱ",
		"魔法生物HP上升Ⅲ",
	],
	"妖精": [
		"妖精攻擊力上升Ⅰ",
		"妖精攻擊力上升Ⅱ",
		"妖精攻擊力上升Ⅲ",
		"妖精攻擊力上升Ⅳ",
		"妖精攻擊力上升Ⅴ",
		"亞人‧妖精攻擊力上升Ⅰ",
		"亞人‧妖精攻擊力上升Ⅱ",
		"妖精‧亞人攻擊力上升Ⅴ",
		"神族‧妖精攻擊力上升Ⅰ",
		"神族‧妖精攻擊力上升Ⅱ",
		"妖精‧物質攻擊力上升Ⅰ",
		"妖精‧物質攻擊力上升Ⅱ",
		"妖精‧物質攻擊力上升Ⅳ",
		"天使‧妖精攻擊力上升Ⅰ",
		"天使‧妖精攻擊力上升Ⅱ",
		"天使‧妖精攻擊力上升Ⅴ",
		"妖精HP上升Ⅰ",
		"妖精HP上升Ⅱ",
		"妖精HP上升Ⅲ",
		"妖精HP上升Ⅳ",
		"妖精HP上升Ⅴ",
		"亞人‧妖精HP上升Ⅰ",
		"亞人‧妖精HP上升Ⅱ",
		"妖精‧亞人HP上升Ⅴ",
		"神族‧妖精HP上升Ⅰ",
		"神族‧妖精HP上升Ⅱ",
		"妖精‧物質HP上升Ⅰ",
		"妖精‧物質HP上升Ⅱ",
		"妖精‧物質HP上升Ⅳ",
		"天使‧妖精HP上升Ⅰ",
		"天使‧妖精HP上升Ⅱ",
		"天使‧妖精HP上升Ⅴ",
		"神族‧妖精‧術士HP上升Ⅰ",
		"神族‧妖精‧術士HP上升Ⅱ",
	],
	"亞人": [
		"亞人攻擊力上升Ⅰ",
		"亞人攻擊力上升Ⅱ",
		"亞人攻擊力上升Ⅲ",
		"亞人攻擊力上升Ⅳ",
		"亞人攻擊力上升Ⅴ",
		"亞人‧妖精攻擊力上升Ⅰ",
		"亞人‧妖精攻擊力上升Ⅱ",
		"妖精‧亞人攻擊力上升Ⅴ",
		"亞人HP上升Ⅰ",
		"亞人HP上升Ⅱ",
		"亞人HP上升Ⅲ",
		"亞人HP上升Ⅳ",
		"亞人HP上升Ⅴ",
		"亞人‧妖精HP上升Ⅰ",
		"亞人‧妖精HP上升Ⅱ",
		"妖精‧亞人HP上升Ⅴ",
	],
	"龍族": [
		"龍族攻擊力上升Ⅰ",
		"龍族攻擊力上升Ⅱ",
		"龍族攻擊力上升Ⅲ",
		"龍族攻擊力上升Ⅳ",
		"龍族攻擊力上升Ⅴ",
		"龍族‧戰士攻擊力上升Ⅴ",
		"龍族‧術士攻擊力上升Ⅰ",
		"龍族‧術士攻擊力上升Ⅱ",
		"龍族‧術士攻擊力上升Ⅲ",
		"神族‧龍族攻擊力上升Ⅰ",
		"神族‧龍族攻擊力上升Ⅱ",
		"龍族HP上升Ⅰ",
		"龍族HP上升Ⅱ",
		"龍族HP上升Ⅲ",
		"龍族HP上升Ⅳ",
		"龍族HP上升Ⅴ",
		"龍族HP上升Ⅹ",
		"龍族‧術士HP上升Ⅰ",
		"龍族‧術士HP上升Ⅱ",
		"龍族‧術士HP上升Ⅲ",
		"神族‧龍族HP上升Ⅰ",
		"神族‧龍族HP上升Ⅱ",
	],
	"神族": [
		"神族攻擊力上升Ⅰ",
		"神族攻擊力上升Ⅱ",
		"神族攻擊力上升Ⅲ",
		"神族攻擊力上升Ⅳ",
		"神族攻擊力上升Ⅴ",
		"神族‧戰士攻擊力上升Ⅰ",
		"神族‧戰士攻擊力上升Ⅱ",
		"神族‧戰士攻擊力上升Ⅲ",
		"神族‧術士攻擊力上升Ⅰ",
		"神族‧術士攻擊力上升Ⅱ",
		"神族‧妖精攻擊力上升Ⅰ",
		"神族‧妖精攻擊力上升Ⅱ",
		"神族‧龍族攻擊力上升Ⅰ",
		"神族‧龍族攻擊力上升Ⅱ",
		"神族‧物質攻擊力上升Ⅴ",
		"神族‧天使攻擊力上升Ⅲ",
		"神族‧天使攻擊力上升Ⅳ",
		"神族HP上升Ⅰ",
		"神族HP上升Ⅱ",
		"神族HP上升Ⅲ",
		"神族HP上升Ⅳ",
		"神族HP上升Ⅴ",
		"神族‧戰士HP上升Ⅰ",
		"神族‧戰士HP上升Ⅱ",
		"神族‧戰士HP上升Ⅲ",
		"神族‧術士HP上升Ⅰ",
		"神族‧術士HP上升Ⅱ",
		"神族‧妖精HP上升Ⅰ",
		"神族‧妖精HP上升Ⅱ",
		"神族‧妖精‧術士HP上升Ⅰ",
		"神族‧妖精‧術士HP上升Ⅱ",
		"神族‧龍族HP上升Ⅰ",
		"神族‧龍族HP上升Ⅱ",
		"神族‧物質HP上升Ⅴ",
		"神族‧天使HP上升Ⅲ",
		"神族‧天使HP上升Ⅳ",
	],
	"物質": [
		"物質攻擊力上升Ⅰ",
		"物質攻擊力上升Ⅱ",
		"物質攻擊力上升Ⅲ",
		"物質攻擊力上升Ⅳ",
		"物質攻擊力上升Ⅴ",
		"物質攻擊力上升Ⅶ",
		"妖精‧物質攻擊力上升Ⅰ",
		"妖精‧物質攻擊力上升Ⅱ",
		"妖精‧物質攻擊力上升Ⅳ",
		"神族‧物質攻擊力上升Ⅴ",
		"物質HP上升Ⅰ",
		"物質HP上升Ⅱ",
		"物質HP上升Ⅲ",
		"物質HP上升Ⅳ",
		"物質HP上升Ⅴ",
		"物質HP上升Ⅵ",
		"物質HP上升Ⅶ",
		"妖精‧物質HP上升Ⅰ",
		"妖精‧物質HP上升Ⅱ",
		"妖精‧物質HP上升Ⅳ",
		"神族‧物質HP上升Ⅴ",
	],
	"天使": [
		"天使攻擊力上升Ⅰ",
		"天使攻擊力上升Ⅱ",
		"天使攻擊力上升Ⅲ",
		"天使攻擊力上升Ⅳ",
		"天使攻擊力上升Ⅴ",
		"天使‧戰士攻擊力上升Ⅰ",
		"天使‧戰士攻擊力上升Ⅱ",
		"天使‧戰士攻擊力上升Ⅲ",
		"天使‧魔族攻擊力上升Ⅰ",
		"天使‧魔族攻擊力上升Ⅱ",
		"天使‧妖精攻擊力上升Ⅰ",
		"天使‧妖精攻擊力上升Ⅱ",
		"天使‧妖精攻擊力上升Ⅴ",
		"神族‧天使攻擊力上升Ⅲ",
		"神族‧天使攻擊力上升Ⅳ",
		"天使HP上升Ⅰ",
		"天使HP上升Ⅱ",
		"天使HP上升Ⅲ",
		"天使HP上升Ⅳ",
		"天使HP上升Ⅴ",
		"天使‧戰士HP上升Ⅰ",
		"天使‧戰士HP上升Ⅱ",
		"天使‧戰士HP上升Ⅲ",
		"天使‧魔族HP上升Ⅰ",
		"天使‧魔族HP上升Ⅱ",
		"天使‧妖精HP上升Ⅰ",
		"天使‧妖精HP上升Ⅱ",
		"天使‧妖精HP上升Ⅴ",
		"神族‧天使HP上升Ⅲ",
		"神族‧天使HP上升Ⅳ",
	],
	 "AbCd": [
		"AbCd攻擊力上升Ⅰ",
		"AbCd攻擊力上升Ⅱ",
		"AbCd攻擊力上升Ⅲ",
		"AbCd攻擊力上升Ⅳ",
		"AbCdHP上升Ⅰ",
		"AbCdHP上升Ⅱ",
		"AbCdHP上升Ⅲ",
	 ],
	"道具": []
};

// For updating evo materials dynamically.
lastProp  = "";
evo_id    = [];
senzai_id = [];

// For updating Senzai Nouryoku dynamically.
lastBreed = "";


strDefaultOption     = "<待填>";
strNoProp            = "<請先選擇屬性>";
strNoBreed           = "<請先選擇種族>";
strOtherMaterial     = "# 我想自己輸入素材";
strBackToRegMaterial = "# 換回一般進化素材";

function get_page_title_by_id(card_id) {
	return "Template:" + card_id.toString();
}

function errorHandler() {
	$("#msg").html("卡片修改/新增發生錯誤，請再試一次").delay(5000).hide(1000);
	$("#search").delay(5000).show(1000, "swing", function () {
		$("#card_id").select();
	});
	$("#data").html("");
	$('html, body').animate({
		scrollTop: 0
	}, 1000);
}

function getCardDataDone(data) {
	// 卡片編號
	var card_id = leftZeroPad(parseInt($("#card_id").val()), 3);

	// 根據編號取得 page title
	var title = get_page_title_by_id(card_id);

	var rep_data = data.replace(/\n\n/g, "\n").replace(/\s=\s/g, "=");
	var card_data_split = rep_data.split("\n");
	var card_data = {};
	card_data["id"] = card_id.toString();
	var status = 0;
	for (var line_index in card_data_split) {
		if (line_index == "") {
			continue;
		}
		var line = card_data_split[line_index];
		if (line[0] == "|") {
			var before = line.substr(1, line.search("=") - 1);
			var after = line.substr(line.search("=") + 1);
			if (before != "") {
				card_data[before] = after;
			}
		}
	}
	lastProp  = (undefined === card_data.attr)  ? "" : card_data.attr.toString();
	lastBreed = (undefined === card_data.race) ? "" : card_data.race.toString();
	// For updating evo materials dynamically.
	for (var i = 1; i <= 8; i++) {
		evo_id["evo_"+i] = (undefined === card_data["evo_"+i]) ? "" : card_data["evo_"+i];
	}
	// For updating Senzai Nouryoku dynamically.
	for (var i = 1; i <= 10; i++) {
		// 151001:
		if ( undefined !== card_data["senzai_"+i] && -1 !== card_data["senzai_"+i].indexOf("問題類型屬性提升") )
			card_data["senzai_"+i] = card_data["senzai_"+i].replace("提升", "提昇");

		senzai_id["senzai_"+i] = (undefined === card_data["senzai_"+i]) ? "" : card_data["senzai_"+i];
	}

	// 產生編輯表單
	var table_elem = $("<table class='article-table'><tr><th>卡片圖示</th><td class='card_smallfile'></td></tr><tr><th>卡片 ID</th><td>" + card_data["id"] + "</td></tr></table>");
	for (var key_index in keys) {
		var key = keys[key_index];
console.log('key[1]:'+key[1]+', key[2]:'+key[2]+', key[3]:'+key[3]);
		if (key[1] == "") {
			table_elem.append("<tr style='display: none;'><th>" + key[1] + "</th><td><input type='hidden' id='" + key[0] + "' value='" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "' /></td></tr>");
		} else {
			if (key[2] && key[2] == "textarea") {
				table_elem.append("<tr><th>" + key[1] + "</th><td><textarea id='" + key[0] + "'>" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "</textarea></td></tr>");
			}
			else if (key[2] && key[2] == "select") {
				table_elem.append($("<tr>").append(
					$("<th>").html(key[1]),
					$("<td>").append(
						$('<select>').attr('id', key[0]).append(function() {
							var htmlOptions;
							if ("evo_material" === key[3]) {
								htmlOptions = htmlEvoMaterialOptions(key[0], card_data.attr);
							}
							else if ("senzai" === key[3]) {
								htmlOptions = htmlSenzaiOptions(key[0], card_data.attr, card_data.race);
							}
							else {
								htmlOptions = $("<option>").html(strDefaultOption).val("");
								for (var option_key in options[key[3]]) {
									var option = options[key[3]][option_key];
									if ( undefined === card_data[key[0]] || option != card_data[key[0]] )
										htmlOptions.after($('<option>').html(option));
									else
										htmlOptions.after($('<option>').html(option).attr('selected', true));
								}
							}
							return htmlOptions;
						})
					)
				));
			}
			else {
				table_elem.append("<tr><th>" + key[1] + "</th><td><input type='text' id='" + key[0] + "' value='" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "' /></td></tr>");
			}
		}
	}
	$("#msg").html("讀取完成").hide(500);
	$("#data").html(table_elem).show(500, "swing", function () {
		var cardId = parseInt($("#card_id").val());
		// Set the dafault file name of small pic to the card data if it is not created.
		if ( undefined === card_data.small_filename || "" === card_data.small_filename ) {
			if ( cardId >= 0 && cardId < 100 )
				$("#small_filename").val(leftZeroPad(cardId, 3) + "i.png");
			else
				$("#small_filename").val(cardId.toString() + "i.png");
		}
		// Otherwise, use the file name of setting.
		else
			$("#small_filename").val(card_data.small_filename);
		getCardImage();
		// hide some input at first, if rank is L will show
		if($("#rare").val().indexOf("8") == -1)$("#as2, #ss2, #senzaiL_1, #senzaiL_2, #senzaiL_3, #senzaiL_4").closest('tr').hide();
	});
	$("#data").append("<button id='cancel_btn'>取消編輯</button>&nbsp;<button id='confirm_btn'>確認編輯</button>");
	$("#cancel_btn").on("click", function () {
		$("#data").hide(500).html("");
		$("#search").show(500, "swing", function () {
			$("#card_id").select();
		});
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	});
	$("#confirm_btn").on("click", function () {
		$("#msg").html("修改卡片資料中...").show(500);
		$("#data").hide(500);
		$('html, body').animate({
			scrollTop: 0
		}, 500);

		// 產生該張卡片的資料表單
		var card_text = "{{召喚獸\n|{{{1|}}}\n|id=" + card_id.toString() + "\n";
		for (var key_index in keys) {
			var key = keys[key_index];
			if($("#" + key[0]).val() == "") continue;
			card_text += "|" + key[0] + " = " + $("#" + key[0]).val() + "\n";
		}
		card_text += "}}\n";

		// 修改頁面
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: 'Template:' + card_id.toString(),
				text: card_text,
				token: mw.user.tokens.get('editToken')
			},
			dataType: 'json',
			type: 'POST',
			cache: false,
			success: function (data) {
				if (data && data.edit && data.edit.result == 'Success') {
					// 成功新增卡片
					$("#msg").html("卡片修改/新增完成").delay(500).hide(500);
					$("#search").delay(500).show(500, "swing", function () {
						$("#card_id").select();
					});
					$("#data").html("");
				} else if (data && data.error) {
					errorHandler();
					// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
				} else {
					errorHandler();
					// alert( 'Error: Unknown result from API.' );
				}
			},
			error: function (xhr) {
				errorHandler();
				// alert( 'Error: Request failed.' );
			}
		});
	});

	// For updating evo materials dynamically.
	// For updating Senzai Nouryoku dynamically.
	$("#attr").change(function() {
		var changedProp = $(this).val();

		for (var i = 1; i <= 8; i++) {
			$("#evo_"+i).html(htmlEvoMaterialOptions("evo_"+i, changedProp));
		}

		for (var i = 1; i <= 10; i++) {
			$("#senzai_"+i).html(htmlSenzaiOptions("senzai_"+i, changedProp, lastBreed));
		}

		if ( "" !== changedProp )
			lastProp = changedProp;
	});

	// For updating Senzai Nouryoku dynamically.
	$("#race").change(function() {
		var changedBreed = $(this).val();

		for (var i = 1; i <= 10; i++) {
			$("#senzai_"+i).html(htmlSenzaiOptions("senzai_"+i, lastProp, changedBreed));
		}

		if ( "" !== changedBreed )
			lastBreed = changedBreed;
	});

	// For updating evo materials dynamically.
	for (var i = 1; i <= 8; i++) {
		$("#evo_"+i).change(function() {
			var htmlSelectedOption = $(this).children(":selected").html();
			var cardEvoKey         = $(this).attr("id");
			var selectedVal        = $(this).val();
			// input the evo material manually.
			if ( strOtherMaterial === htmlSelectedOption ) {
				var evoCardId = prompt("請輸入進化素材的卡片編號ID (整數)。");

				// No-input, or cancel.
				if ( null === evoCardId )
					return;
				// Not-a-Number.
				else if ( isNaN(evoCardId) ) {
					alert("進化素材的編號只能是數字！");
					return;
				}
				// Seccessfully. Update the Options.
				else {
					evo_id[cardEvoKey] = evoCardId;
					$(this).html(htmlEvoMaterialOptions(cardEvoKey, lastProp));
				}
			}
			// Back to the Regular Evo Materials from some Special Evo Material.
			else if ( strBackToRegMaterial === htmlSelectedOption ) {
				evo_id[cardEvoKey] = "";
				$(this).html(htmlEvoMaterialOptions(cardEvoKey, lastProp));
			}
			// Keep the recodes of the Regular Evo Materials (for updating evo materials dynamically).
			else if ( isRegularEvoMaterial(selectedVal) ) {
				evo_id[cardEvoKey] = selectedVal;
			}
		});
	}

	// for more option to do in Legend card
	$("#rare").change(function(){
		var changedRank = $(this).val();
		if(changedRank == "L") $("#as2, #ss2, #senzaiL_1, #senzaiL_2, #senzaiL_3, #senzaiL_4").closest('tr').show();
		else $("#as2, #ss2, #senzaiL_1, #senzaiL_2, #senzaiL_3, #senzaiL_4").closest('tr').hide();
	});
}

function getCardData() {
	// 卡片編號
	var card_id = leftZeroPad(parseInt($("#card_id").val()), 3);
	if ( isNaN(card_id) ) {
		alert("卡片圖鑑編號只能是數字！");
		return;
	}

	// 隱藏搜尋欄
	$("#search").hide(1000);
	$("#msg").html("讀取卡片資料中...").show(1000);

	// 根據編號取得 page title
	var title = get_page_title_by_id(card_id);
	// 取得該頁面資料
	$.ajax({
		url: "https://btoky.fandom.com/zh/wiki/" + title + "?action=raw",
		cache: false,
		statusCode: {
			404: function () {
				getCardDataDone("");
			}
		}
	}).done(function (data) {
		getCardDataDone(data);
	});
}

function leftZeroPad(val, minLength) {
	val = val.toString();
	if (val.length >= minLength) {
		return val;
	} else {
		return leftZeroPad("0" + val, minLength);
	}
}

function getUrlParams() {
	var paramMap = {};
	if (location.search.length == 0) {
		return paramMap;
	}
	var parts = location.search.substring(1).split("&");

	for (var i = 0; i < parts.length; i++) {
		var component = parts[i].split("=");
		paramMap [decodeURIComponent(component[0])] = decodeURIComponent(component[1]);
	}
	return paramMap;
}
function getCardImage() {
	var fileName = $("#small_filename").val();
	var fName = $("#name").val();
	console.log('Trying to get image: '+fileName+' \nTrying to get Name:'+fName);
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%5B%5Bfile:' + fileName + '%7C60px%7Clink=' + fName + '%5D%5D')
	}, function (data) {
		var content = $(data.parse.text['*']).children();
		$("td.card_smallfile").append(content);
	}, 'json')
	.fail(function() {
		  alert( "error" );
	 });
}

/**
 * Dynamically Update the Evo Material Option when changing the Prop; input the Special Evo Material.
 * @param  {string} cardEvoKey   A key to evo_id (the recode of card_data.evo_i in function getCardDataDone).
 * @param  {string} changedProp  New Prop. of some changing.
 * @return {HTML}                Options in HTML format.
 */
function htmlEvoMaterialOptions(cardEvoKey, changedProp) {
	if ( undefined === evo_material[changedProp] )
		// Keep the orginal evo material in "value".
		return $("<option>").html(strNoProp).val(evo_id[cardEvoKey]);

	var htmlOptions = $("<option>").html(strDefaultOption).val("");

	if ( isRegularEvoMaterial(evo_id[cardEvoKey]) ) {
		// if it have been filled in, and user change it from some prop. to another, then we shift its ID to another corresponding to new prop.
		// example: "火石碰碰吉 (C+)" -> "冰石碰碰吉 (C+)" if "火" -> "水".
		if ( "" !== evo_id[cardEvoKey] && "" !== lastProp && "" !== changedProp && lastProp !== changedProp ) {
			for (var i = evo_material[lastProp].length - 1; i >= 0; i--) {
				if ( evo_id[cardEvoKey] == evo_material[lastProp][i].id ) {
					evo_id[cardEvoKey] = evo_material[changedProp][i].id;
					break;
				}
			}
		}

		htmlOptions.after($('<option>').html(strOtherMaterial).val(""));

		for (var option_key in evo_material[changedProp]) {
			var option = evo_material[changedProp][option_key];
			if ( "disabled" == option.id )
				htmlOptions.after($('<option>').html(option.name).attr("disabled", true));
			else if ( undefined === evo_id[cardEvoKey] || option.id != evo_id[cardEvoKey] )
				htmlOptions.after($('<option>').html(option.name).val(option.id));
			else
				htmlOptions.after($('<option>').html(option.name).val(option.id).attr('selected', true));
		}
	}
	// Special Evo Material. (It's usually from Evevt Quest)
	else {
		htmlOptions.after($('<option>').html(strOtherMaterial).val(""));
		htmlOptions.after($('<option>').html(strBackToRegMaterial).val(""));
		htmlOptions.after($('<option>').html(evo_id[cardEvoKey]).attr('selected', true));
	}

	return htmlOptions;
}

/**
 * Check if evoCardID is a Regular Evo Material ID. Null String is regarded as Regular.
 * @param  {int}     evoCardId  The Card ID which is to be checked.
 * @return {Boolean}
 */
function isRegularEvoMaterial(evoCardId) {
	return (110 <= evoCardId && evoCardId <= 154) || (1480 <= evoCardId && evoCardId <= 1506) || (3629 <= evoCardId && evoCardId <= 3634) || (6307 <= evoCardId && evoCardId <= 6309) ||"" == evoCardId;
}

/**
 * Dynamically Update the Senzai Nouryoku Option when changing the Prop or the Breed.
 * @param  {string} cardSenzaiKey  A key to senzai_id (the recode of card_data.senzai_i in function getCardDataDone).
 * @param  {string} changedProp    New Prop. of some changing.
 * @param  {string} changedBreed   New Breed of some changing.
 * @return {HTML}                  Options in HTML format.
 */
function htmlSenzaiOptions(cardSenzaiKey, changedProp, changedBreed) {
	if ( undefined === senzai_elmts[changedProp] )
		return $("<option>").html(strNoProp).val("");

	if ( undefined === senzai_breeds[changedBreed] )
		return $("<option>").html(strNoBreed).val("");

	var htmlOptions = $("<option>").html(strDefaultOption).val("");

	var senzai_altered = options.senzai.slice();
	Array.prototype.splice.apply(senzai_altered, [senzai_altered.indexOf("elmts"), 1].concat(senzai_elmts[changedProp]) );
	Array.prototype.splice.apply(senzai_altered, [senzai_altered.indexOf("breeds"), 1].concat(senzai_breeds[changedBreed]) );

	for (var option_key in senzai_altered) {
		var option = senzai_altered[option_key];
		if ( undefined === senzai_id[cardSenzaiKey] || option != senzai_id[cardSenzaiKey] )
			htmlOptions.after($('<option>').html(option));
		else
			htmlOptions.after($('<option>').html(option).attr('selected', true));
	}

	return htmlOptions;
}

$(document).ready(function () {
	if (mw.user.anonymous()) {
		alert('請先登入Wikia');
		location.replace("https://btoky.fandom.com/zh/wiki/");
		return false;
	}
	$("#get_card").on('click', function () {
		getCardData();
	});
	$(document).on("keydown", function (evt) {
		if ($("#data").is(":visible") && evt.keyCode == 115) {
			$("#confirm_btn").click();
		}
	});
	$("#card_id").on("click", function (evt) {
		$(this).select();
	});
	$("#card_id").on("keypress", function (evt) {
		if (evt.which == 13) {
			getCardData();
		}
	});
	$("#card_id").select();

	var getParams = getUrlParams();
	if (getParams.card_id) {
		$("#card_id").val(getParams.card_id);
		$("#get_card").click();
	}
});