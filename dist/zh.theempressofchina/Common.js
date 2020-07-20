/* 此处的JavaScript将加载于所有用户每一个页面。 */

var quizName = "武媚娘传奇-看看你是哪位贵妃？";
var quizLang = "zh";
var resultsTextArray = [ 
	"您是杨淑妃",
	"您是刘贤妃",
	"您是徐贤妃",
	"您是王皇后",
	"您是萧淑妃",
	"您是武则天" 
	];
var questions = [
 
	["你觉得你厉害吗？",
	"厉害",
	"不厉害",
	"或许吧",
	"不知道呢"], 
 
	["你觉得你爱权利吗",
	"爱",
	"不爱",
	"或许吧",
	"不知道呢"], 
 
	["你想当皇帝吗",
	"想啊",
	"不想"]
 
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});