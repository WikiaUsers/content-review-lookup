// Translate alert messages on the fly
// 以下为翻译词库，请以游戏实际内容为标准进行更新。条目格式为：
// "英文原文": "译文",
var Planets = {
	"Saturn": "土星",
	"Mars": "火星",
	"Jupiter": "木星",
	"Venus": "金星",
	"Mercury": "水星",
	"Neptune": "海王星",
	"Uranus": "天王星",
	"Ceres": "谷神星",
	"Eris": "阋神星",
	"Europa": "欧罗巴",
	"Pluto": "冥王星",
	"Sedna": "塞德娜",
	"Phobos": "火卫一",
};

var Terms = {
	"PHORID SPAWN": "Phorid出现",
	"Orokin Cell": "Orokin电池",
	"Defeat Enemy Defense Forces": "Defeat Enemy Defense Forces",
	"Aura Trinity Helmet": "Aura Trinity Helmet",
	"Orokin Catalyst": "Orokin催化剂",
	"Orokin Reactor": "Orokin反应堆",
	"Gift From The Lotus": "Gift From The Lotus",
	"Enemy Courier Located": "Enemy Courier Located",
	"Research Station Located": "Research Station Located",
	"Enemy Escorts Located": "Enemy Escorts Located",
	"Fieldron": "Fieldron",
	"Detonite Injector": "Detonite喷射器",
	"Aurora Frost Helmet": "极光Frost头盔",
	"Blueprint": "蓝图",
	"VS.": "对抗",
	"Mutagen Mass": "突变原聚合物",

};

var retrieveAlertData = function() {
	var rssDiv = document.getElementsByClassName("wikiaRss");
	var rssData = rssDiv[0].getElementsByTagName("a");
	return rssData;
};

var retrieveAlertInfo = function() {
	var rssDiv = document.getElementsByClassName("wikiaRss");
	var rssData = rssDiv[0].getElementsByTagName("dd");
	return rssData;
};

var translateAlertData = function(rawData) {
	for (var i = 0; i < rawData.length; i++) {
		var str = rawData[i].innerHTML;
		str = translatePlanet(str);
		str = translateTerm(str);
		str = translateSpecialWord(str);
		rawData[i].innerHTML = str;
	}
};

var translatePlanet = function(rawData) {
	var processedData = rawData;
	for (planet in Planets) {
		if (rawData.search(planet) != -1) {
			processedData = rawData.replace(planet, Planets[planet]);
			break;
		}
	}
	return processedData;

};

var translateTerm = function(rawData) {
	var processedData = rawData;
	var regex = null;
	for (term in Terms) {
		regex = new RegExp(term, "ig");
		processedData = processedData.replace(regex, Terms[term]);
	}
	return processedData;
};

var translateSpecialWord = function(rawData) {
	var processedData = rawData;
	processedData = rawData.replace(/(\d+)K/g, "$1000现金");
	processedData = processedData .replace(/(\d+)m/g, "$1分钟");
	processedData = processedData .replace(/(\d+)cr/g, "$1现金");
	return processedData;
};

var translate = function() {
	var data = retrieveAlertData();
	var info = retrieveAlertInfo();
	translateAlertData(data);
	translateAlertData(info);
};

// enable translation in alert notification
if ('addEventListener' in window) {
	window.addEventListener ('load', translate, false);
} else if ('attachEvent' in document) {
	window.attachEvent ('onload', translate);
} else {
	window.onload = translate;
}