// js导入
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:AbnormalitySearch.js',//异想体搜索
    ]
});

//Abn_Infobox Work_preference 数据形式切换
var workPreferenceButtonCount = 0;

document.getElementById("work_preference_button").addEventListener("click", function(){
	var workPreferenceButton = document.getElementById("work_preference_button");
    var level = document.getElementsByClassName("work_preference_level");
    var stat = document.getElementsByClassName("work_preference_stat");
	console.log("workPreference button clicked");
	if (workPreferenceButtonCount==0){
		workPreferenceButton.innerHTML = "显示文字";
		for (i = 0; i < level.length; i++) {
			level[i].style.display = "none";
		}
		for (i = 0; i < stat.length; i++) {
			stat[i].style.display = "block";
		}
		workPreferenceButtonCount = 1;
	}else{
		workPreferenceButton.innerHTML = "显示数字";
		for (i = 0; i < level.length; i++) {
			level[i].style.display = "block";
		}
		for (i = 0; i < stat.length; i++) {
			stat[i].style.display = "none";
		}
		workPreferenceButtonCount = 0;
	}
});

// Retrans 左侧工具栏按钮
    //按钮位置剪切
document.getElementsByClassName("page-side-tools")[0].appendChild(document.getElementById("retrans-button"));

    //按钮切换功能
var retransButtonCount = 0;
document.getElementById("retrans-button").addEventListener("click", function(){
	var preRetrans = document.getElementsByClassName("pre-retrans");
    var postRetrans = document.getElementsByClassName("post-retrans");
    var retransButton = document.getElementById("retrans-button");
	console.log("retrans button clicked");
	if (retransButtonCount==0){
		retransButton.innerHTML = "原";
		for (i = 0; i < preRetrans.length; i++) {
			preRetrans[i].style.display = "none";
		}
		for (i = 0; i < postRetrans.length; i++) {
			postRetrans[i].style.display = "inline";
		}
    	retransButtonCount = 1;
    }else{
    	retransButton.innerHTML = "译";
    	for (i = 0; i < preRetrans.length; i++) {
			preRetrans[i].style.display = "inline";
		}
		for (i = 0; i < postRetrans.length; i++) {
			postRetrans[i].style.display = "none";
		}
    	retransButtonCount = 0;
    }
});